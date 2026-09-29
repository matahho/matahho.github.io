"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { network, profile, type InputKind } from "@/lib/content";

// ─── Visual constants ────────────────────────────────────────────────────────

type RGB = [number, number, number];

const KIND: Record<InputKind, { label: string; rgb: RGB }> = {
  research: { label: "research", rgb: [34, 211, 238] },
  education: { label: "education", rgb: [167, 139, 250] },
  experience: { label: "experience", rgb: [251, 191, 36] },
  interest: { label: "interests", rgb: [244, 114, 182] },
};
const CYAN: RGB = [34, 211, 238];
const ROSE: RGB = [251, 113, 133];
const BG = "#05070a";

const HIDDEN_WIDE = [8, 10, 8, 5];
const HIDDEN_NARROW = [7, 9, 6];

// Scroll timeline (fractions of the pinned scroll distance).
type Span = [number, number];
const T_TITLE: Span = [0, 0.06];
const T_IN: Span = [0.04, 0.18];
const T_FWD: Span = [0.18, 0.6];
const T_DEC: Span = [0.6, 0.9];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ramp = (p: number, [a, b]: Span) => clamp01((p - a) / (b - a));
const smooth = (x: number) => {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
};
const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${a})`;

// ─── The (tiny, real) model ──────────────────────────────────────────────────

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const normalize = (v: number[]) => {
  const m = Math.max(...v, 1e-6);
  return v.map((x) => x / m);
};

type Model = {
  sizes: number[]; // input, ...hidden, decoder(1)
  W: number[][][]; // W[l][j][i]: weight from node i (layer l) to node j (layer l+1)
  act: number[][]; // forward-pass activations, rescaled to 0–1 per layer
  influence: number[][][]; // influence[k][l][i]: how strongly input k reaches node i of layer l
};

function buildModel(hidden: number[]): Model {
  const x = network.inputs.map((i) => i.value);
  const sizes = [x.length, ...hidden, 1];
  const rand = mulberry32(1381); // deterministic weights: temperature 0, always.
  const W = sizes
    .slice(0, -1)
    .map((n, l) =>
      Array.from({ length: sizes[l + 1] }, () =>
        Array.from({ length: n }, () => rand() * 2 - 1)
      )
    );

  const act = [x];
  for (let l = 0; l < W.length; l++) {
    const z = W[l].map((row) => row.reduce((s, w, i) => s + w * act[l][i], 0.2));
    const a = normalize(z.map((v) => (v > 0 ? v : 0.1 * v))).map((v) => Math.max(v, 0.06));
    act.push(l === W.length - 1 ? [1] : a);
  }

  const influence = x.map((_, k) => {
    const layers: number[][] = [x.map((_, i) => (i === k ? 1 : 0))];
    for (let l = 0; l < W.length; l++) {
      const z = W[l].map((row) =>
        row.reduce((s, w, i) => s + Math.abs(w) * layers[l][i], 0)
      );
      layers.push(normalize(z).map((v) => v ** 3)); // sharpen for contrast
    }
    return layers;
  });

  return { sizes, W, act, influence };
}

// ─── Layout ──────────────────────────────────────────────────────────────────

type Pt = { x: number; y: number };
type Box = { x: number; y: number; w: number; h: number };
type Layout = {
  w: number;
  h: number;
  vertical: boolean;
  nodes: Pt[][];
  chips: Box[];
  panel: Box;
};

function frame(w: number) {
  const vertical = w < 860;
  const padX = vertical ? 16 : Math.round(Math.min(72, Math.max(24, w * 0.045)));
  const panelW = Math.round(Math.min(440, Math.max(300, w * 0.3)));
  return { vertical, padX, panelW };
}

function spread(n: number, center: number, span: number, maxStep: number) {
  const step = n > 1 ? Math.min(maxStep, span / (n - 1)) : 0;
  return Array.from({ length: n }, (_, i) => center + (i - (n - 1) / 2) * step);
}

function computeLayout(w: number, h: number, sizes: number[], panel: Box): Layout {
  const { vertical, padX } = frame(w);
  const n = sizes[0];
  const hidden = sizes.slice(1, -1);
  const nodes: Pt[][] = [];
  const chips: Box[] = [];

  if (!vertical) {
    const top = 124;
    const bottom = h - 92;
    const chipW = 204;
    const chipH = Math.min(30, Math.max(24, (bottom - top) / (n - 1) - 8));
    const ys = spread(n, (top + bottom) / 2, bottom - top, 46);
    ys.forEach((y) => chips.push({ x: padX, y: y - chipH / 2, w: chipW, h: chipH }));
    nodes.push(ys.map((y) => ({ x: padX + chipW + 12, y })));

    const decoder = { x: panel.x - 22, y: panel.y + panel.h / 2 };
    const x0 = nodes[0][0].x;
    hidden.forEach((m, li) => {
      const x = x0 + ((decoder.x - x0) * (li + 1)) / (hidden.length + 1);
      nodes.push(spread(m, (top + bottom) / 2, (bottom - top) * 0.88, 54).map((y) => ({ x, y })));
    });
    nodes.push([decoder]);
  } else {
    const top = 76;
    const gap = 5;
    const chipH = 25;
    const chipW = (w - 2 * padX - gap) / 2;
    for (let i = 0; i < n; i++) {
      chips.push({
        x: padX + (i % 2) * (chipW + gap),
        y: top + Math.floor(i / 2) * (chipH + gap),
        w: chipW,
        h: chipH,
      });
    }
    const gridBottom = top + Math.ceil(n / 2) * (chipH + gap) - gap;
    const inY = gridBottom + 16;
    const decoder = { x: w / 2, y: panel.y - 16 };
    const span = w - 2 * padX - 16;
    nodes.push(spread(n, w / 2, span, 44).map((x) => ({ x, y: inY })));
    hidden.forEach((m, li) => {
      const y = inY + ((decoder.y - inY) * (li + 1)) / (hidden.length + 1);
      nodes.push(spread(m, w / 2, span, 44).map((x) => ({ x, y })));
    });
    nodes.push([decoder]);
  }

  return { w, h, vertical, nodes, chips, panel };
}

// ─── Canvas renderer ─────────────────────────────────────────────────────────

const inColor = network.inputs.map((i) => KIND[i.kind].rgb);

function draw(
  ctx: CanvasRenderingContext2D,
  L: Layout,
  M: Model,
  p: number,
  time: number,
  inf: number[][] | null,
  animate: boolean,
  font: string
) {
  const { w, h, nodes, vertical } = L;
  ctx.clearRect(0, 0, w, h);

  const nL = M.sizes.length;
  const inRev = ramp(p, T_IN) * M.sizes[0];
  const wave = ramp(p, T_FWD) * (nL - 1);
  const dec = ramp(p, T_DEC);
  const master = 0.3 + 0.7 * ramp(p, T_TITLE);

  const lit = (l: number, i: number) =>
    l === 0 ? clamp01(inRev - i) : smooth((wave - (l - 1) - 0.55) / 0.45);

  // Skeleton: every connection, very faint.
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(255,255,255,${0.035 * master})`;
  ctx.beginPath();
  for (let l = 0; l < nL - 1; l++) {
    for (const a of nodes[l]) {
      for (const b of nodes[l + 1]) {
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
    }
  }
  ctx.stroke();

  // Signal: edges light up as the forward pass sweeps through.
  for (let l = 0; l < nL - 1; l++) {
    const e = clamp01(wave - l);
    if (e <= 0) continue;
    for (let i = 0; i < M.sizes[l]; i++) {
      const a = nodes[l][i];
      const srcLit = l === 0 ? lit(0, i) : 1;
      for (let j = 0; j < M.sizes[l + 1]; j++) {
        const b = nodes[l + 1][j];
        const wgt = M.W[l][j][i];
        const s = Math.abs(wgt) * M.act[l][i] * srcLit;
        if (s < 0.03) continue;
        const f = inf ? 0.06 + 0.94 * inf[l][i] * (0.3 + 0.7 * inf[l + 1][j]) : 1;
        const col = wgt < 0 ? ROSE : l === 0 ? inColor[i] : CYAN;
        const alpha = (wgt < 0 ? 0.04 + 0.22 * s : 0.06 + 0.5 * s) * f * master;
        const hx = a.x + (b.x - a.x) * e;
        const hy = a.y + (b.y - a.y) * e;
        ctx.strokeStyle = rgba(col, alpha);
        ctx.lineWidth = inf && f > 0.5 ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        let px = hx;
        let py = hy;
        let show = e < 1;
        if (!show && animate && s * f > 0.22) {
          // Packets keep flowing once the layer has fired.
          const phase = (time * 0.32 + ((i * 7 + j * 13 + l * 3) % 17) / 17) % 1;
          px = a.x + (b.x - a.x) * phase;
          py = a.y + (b.y - a.y) * phase;
          show = true;
        }
        if (show) {
          ctx.fillStyle = rgba(col, Math.min(1, 0.9 * s * f + 0.1));
          ctx.beginPath();
          ctx.arc(px, py, 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  // Decoder → output panel.
  const d = nodes[nL - 1][0];
  const to = vertical
    ? { x: d.x, y: L.panel.y }
    : { x: L.panel.x, y: d.y };
  const dl = smooth((wave - (nL - 2) - 0.55) / 0.45);
  ctx.strokeStyle = rgba(CYAN, (0.08 + 0.5 * dl) * master);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(d.x, d.y);
  ctx.lineTo(to.x, to.y);
  ctx.stroke();
  if (animate && dec > 0 && dec < 1) {
    for (let k = 0; k < 3; k++) {
      const ph = (time * 1.4 + k / 3) % 1;
      ctx.fillStyle = rgba(CYAN, 0.9);
      ctx.beginPath();
      ctx.arc(d.x + (to.x - d.x) * ph, d.y + (to.y - d.y) * ph, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Nodes.
  for (let l = 0; l < nL; l++) {
    const isDec = l === nL - 1;
    for (let i = 0; i < M.sizes[l]; i++) {
      const { x, y } = nodes[l][i];
      const col = l === 0 ? inColor[i] : CYAN;
      const v = lit(l, i) * M.act[l][i];
      const fn = inf ? 0.2 + 0.8 * inf[l][i] : 1;
      let r = l === 0 ? 3.5 : isDec ? 8 : vertical ? 4 : 5;
      if (isDec && animate && dec > 0 && dec < 1) r *= 1 + 0.15 * Math.sin(time * 9);

      if (v > 0.05) {
        ctx.fillStyle = rgba(col, 0.12 * v * fn * master);
        ctx.beginPath();
        ctx.arc(x, y, r * 3.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(col, (0.06 + 0.94 * v) * fn * master);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.2 * master})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Layer labels.
  if (!vertical) {
    ctx.font = `10px ${font}`;
    ctx.textAlign = "center";
    ctx.fillStyle = `rgba(139,149,163,${0.7 * master})`;
    for (let l = 1; l < nL; l++) {
      const top = nodes[l][0];
      const label = l === nL - 1 ? "decoder" : `h${l} · relu`;
      ctx.fillText(label, top.x, top.y - (l === nL - 1 ? 18 : 16));
    }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

type Focus = { kind: "input"; id: string } | { kind: "seg"; idx: number } | null;

const inputIndex = new Map(network.inputs.map((inp, i) => [inp.id, i]));

// Split the bio into word tokens, remembering which sentence each belongs to.
const segments = (() => {
  let start = 0;
  return network.bio.map((seg) => {
    const words = seg.text.match(/\S+\s*/g) ?? [];
    const out = { ...seg, words, start };
    start += words.length;
    return out;
  });
})();
const TOTAL_TOKENS = segments.reduce((s, x) => s + x.words.length, 0);
// Sentences grouped into display paragraphs (a segment with `para` starts a new one).
const paragraphs = segments.reduce<number[][]>((acc, seg, i) => {
  if (seg.para || acc.length === 0) acc.push([]);
  acc[acc.length - 1].push(i);
  return acc;
}, []);

function stageLabel(p: number, sizes: number[], shown: number) {
  const n = sizes[0];
  const nL = sizes.length;
  if (p < T_IN[0] + 0.004) return "idle · awaiting input";
  if (p < T_IN[1]) return `embedding inputs · ${Math.ceil(ramp(p, T_IN) * n)}/${n}`;
  if (p < T_DEC[0]) {
    const l = Math.min(nL - 1, Math.floor(ramp(p, T_FWD) * (nL - 1)) + 1);
    return l === nL - 1 ? "forward · decoder" : `forward · hidden ${l}/${nL - 2}`;
  }
  if (shown < TOTAL_TOKENS) return `decoding · ${shown}/${TOTAL_TOKENS} tokens`;
  return `done · ${TOTAL_TOKENS} tokens`;
}

export default function NeuralHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const targetRef = useRef(0);
  const layoutRef = useRef<Layout | null>(null);
  const infRef = useRef<number[][] | null>(null);

  const [reduce, setReduce] = useState(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
  const [measure, setMeasure] = useState(0);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [focus, setFocus] = useState<Focus>(null);
  const [shown, setShown] = useState(0);
  const [stage, setStage] = useState("idle · awaiting input");

  const fr = dims ? frame(dims.w) : null;
  const vertical = fr?.vertical ?? false;
  const model = useMemo(
    () => buildModel(vertical ? HIDDEN_NARROW : HIDDEN_WIDE),
    [vertical]
  );

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Track stage + panel size.
  useEffect(() => {
    const stageEl = stageRef.current;
    const panelEl = panelRef.current;
    if (!stageEl || !panelEl) return;
    const ro = new ResizeObserver(() => {
      const w = stageEl.clientWidth;
      const h = stageEl.clientHeight;
      setDims((d) => (d && d.w === w && d.h === h ? d : { w, h }));
      setMeasure((m) => m + 1);
    });
    ro.observe(stageEl);
    ro.observe(panelEl);
    return () => ro.disconnect();
  }, []);

  // Recompute geometry once the panel has been laid out at the new size.
  useLayoutEffect(() => {
    const stageEl = stageRef.current;
    const panelEl = panelRef.current;
    const canvas = canvasRef.current;
    if (!dims || !stageEl || !panelEl || !canvas) return;
    const s = stageEl.getBoundingClientRect();
    const r = panelEl.getBoundingClientRect();
    const panel = { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
    const L = computeLayout(dims.w, dims.h, model.sizes, panel);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(dims.w * dpr);
    canvas.height = Math.round(dims.h * dpr);
    canvas.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    layoutRef.current = L;
    setLayout(L);
  }, [dims, model, measure]);

  // Scroll → progress through the pinned section.
  useEffect(() => {
    const onScroll = () => {
      const s = sectionRef.current;
      if (!s) return;
      if (reduce) {
        targetRef.current = 1;
        return;
      }
      const r = s.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      targetRef.current = span > 0 ? clamp01(-r.top / span) : 1;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduce]);

  // Focus → per-node influence for the attribution highlight.
  useEffect(() => {
    if (!focus) {
      infRef.current = null;
      return;
    }
    const ks =
      focus.kind === "input"
        ? [inputIndex.get(focus.id)!]
        : segments[focus.idx].from.map((id) => inputIndex.get(id)!);
    infRef.current = ks.length
      ? model.sizes.map((n, l) =>
          Array.from({ length: n }, (_, i) =>
            Math.max(...ks.map((k) => model.influence[k][l][i]))
          )
        )
      : null;
  }, [focus, model]);

  // Render loop.
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const font =
      getComputedStyle(document.documentElement).getPropertyValue("--font-jbmono") ||
      "ui-monospace, monospace";
    let cur = targetRef.current;
    let lastShown = -1;
    let lastStage = "";
    let raf = 0;

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const section = sectionRef.current;
      if (section && section.getBoundingClientRect().bottom < 0) return;

      cur = reduce ? targetRef.current : cur + (targetRef.current - cur) * 0.12;
      if (Math.abs(targetRef.current - cur) < 1e-4) cur = targetRef.current;
      const L = layoutRef.current;
      if (L) draw(ctx, L, model, cur, now / 1000, infRef.current, !reduce, font);

      // Imperative DOM updates for the continuous bits.
      const t = ramp(cur, T_TITLE);
      if (titleRef.current) {
        titleRef.current.style.opacity = String(1 - t);
        titleRef.current.style.transform = `translateY(${-t * 40}px)`;
        titleRef.current.style.visibility = t >= 1 ? "hidden" : "visible";
      }
      const inRev = ramp(cur, T_IN) * model.sizes[0];
      chipRefs.current.forEach((el, i) => {
        if (!el) return;
        const v = smooth(inRev - i);
        el.style.opacity = String(v);
        el.style.transform = L?.vertical
          ? `translateY(${(1 - v) * -8}px)`
          : `translateX(${(1 - v) * -14}px)`;
        el.style.pointerEvents = v > 0.5 ? "auto" : "none";
      });
      if (panelRef.current) {
        panelRef.current.style.opacity = String(
          (0.35 + 0.65 * ramp(cur, [T_DEC[0] - 0.08, T_DEC[0]])) * ramp(cur, T_TITLE)
        );
      }

      const s = Math.floor(ramp(cur, T_DEC) * TOTAL_TOKENS + 1e-6);
      if (s !== lastShown) {
        lastShown = s;
        setShown(s);
      }
      const st = stageLabel(cur, model.sizes, s);
      if (st !== lastStage) {
        lastStage = st;
        setStage(st);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [model, reduce]);

  const done = shown >= TOTAL_TOKENS;
  const focusedInputs: Set<string> | null = focus
    ? new Set(focus.kind === "input" ? [focus.id] : segments[focus.idx].from)
    : null;
  const focusedSegs: Set<number> | null = focus
    ? new Set(
        focus.kind === "seg"
          ? [focus.idx]
          : segments.flatMap((s, i) => (s.from.includes(focus.id) ? [i] : []))
      )
    : null;

  const hoverProps = (f: Exclude<Focus, null>) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setFocus(f),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === "mouse" && setFocus(null),
    onFocus: () => setFocus(f),
    onBlur: () => setFocus(null),
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      setFocus(f);
    },
  });

  const panelStyle: React.CSSProperties = !fr
    ? { right: 24, top: "50%", transform: "translateY(-50%)", width: 360 }
    : fr.vertical
      ? { left: fr.padX, right: fr.padX, bottom: 16 }
      : { right: fr.padX, top: "50%", transform: "translateY(-50%)", width: fr.panelW };

  let caretAt = -1;
  if (shown > 0 && !done) caretAt = shown - 1;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative"
      style={{ height: reduce ? "100svh" : "520svh" }}
    >
      <div
        ref={stageRef}
        className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden"
        onClick={() => setFocus(null)}
      >
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

        {/* Title: fades as the forward pass begins. */}
        <div
          ref={titleRef}
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mono text-xs tracking-wide text-[var(--color-muted)] sm:text-sm">
            <span className="text-accent">&gt;&gt;&gt;</span> bio = model(mahdi.data)
          </p>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-6xl font-semibold tracking-tight sm:text-8xl md:text-[9rem] md:leading-[0.95]">
            {profile.name}
          </h1>
          <p className="mt-6 text-lg leading-snug sm:text-2xl">
            <span className="block text-accent">{profile.tagline[0]}</span>
            <span className="block text-[var(--color-fg)]/80">{profile.tagline[1]}</span>
          </p>
          <div className="mt-14 flex flex-col items-center gap-3 text-[var(--color-muted)]">
            <span className="mono text-[11px] uppercase tracking-[0.3em]">
              scroll to run inference
            </span>
            <span className="h-10 w-px animate-pulse bg-[var(--color-accent)]" />
          </div>
        </div>

        {/* Input features. */}
        {layout &&
          network.inputs.map((inp, i) => {
            const c = layout.chips[i];
            const rgb = KIND[inp.kind].rgb;
            const on = focusedInputs?.has(inp.id);
            const dim = focusedInputs && !on;
            return (
              <button
                key={inp.id}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                type="button"
                {...hoverProps({ kind: "input", id: inp.id })}
                className={`absolute z-20 flex items-center gap-2 rounded-md border bg-[var(--color-bg)]/80 px-2.5 text-left backdrop-blur-sm transition-[border-color,color,background-color] duration-300 ${
                  layout.vertical ? "text-[11.5px]" : "text-[13px]"
                } ${dim ? "text-[var(--color-muted)]/50" : "text-[var(--color-fg)]"}`}
                style={{
                  left: c.x,
                  top: c.y,
                  width: c.w,
                  height: c.h,
                  opacity: 0,
                  borderColor: on ? rgba(rgb, 0.8) : "var(--color-line)",
                  backgroundColor: on ? rgba(rgb, 0.1) : undefined,
                }}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: rgba(rgb, dim ? 0.35 : 1) }}
                />
                <span className="flex-1 truncate">{inp.label}</span>
                {!layout.vertical && (
                  <span className="mono text-[11px] text-[var(--color-muted)]">
                    {inp.value.toFixed(2)}
                  </span>
                )}
              </button>
            );
          })}

        {/* Legend (wide screens). */}
        {layout && !layout.vertical && (
          <div
            className="absolute bottom-6 z-20 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-[var(--color-muted)]"
            style={{ left: fr?.padX }}
          >
            {(Object.keys(KIND) as InputKind[]).map((k) => (
              <span key={k} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: rgba(KIND[k].rgb, 1) }}
                />
                {KIND[k].label}
              </span>
            ))}
            <span className="flex items-center gap-1.5">
              <span className="h-px w-4" style={{ background: rgba(ROSE, 0.8) }} />
              negative weight
            </span>
            <span className="text-[var(--color-muted)]/60">
              Hover an input or a sentence to see how they connect
            </span>
          </div>
        )}

        {/* Output: the decoded bio. */}
        <div
          ref={panelRef}
          className="absolute z-20 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-soft)]/85 backdrop-blur-md"
          style={{ ...panelStyle, opacity: 0 }}
        >
          <div className="mono flex items-center justify-between gap-3 border-b border-[var(--color-line)] px-4 py-2.5 text-[10.5px] text-[var(--color-muted)] sm:text-[11px]">
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  done ? "bg-emerald-400" : shown > 0 ? "animate-pulse bg-[var(--color-accent)]" : "bg-[var(--color-muted)]/60"
                }`}
              />
              <span className="truncate">{stage}</span>
            </span>
            <span className="shrink-0">temp=0.0 · deterministic ✓</span>
          </div>

          <div
            className={`relative px-5 py-4 text-center ${vertical ? "space-y-1.5" : "space-y-2.5"} leading-relaxed text-[var(--color-fg)]/90 ${
              vertical ? "text-[13px]" : "text-[15px] md:text-base"
            }`}
          >
            {paragraphs.map((para, pi) => (
              <p key={pi}>
                {para.map((si) => {
                  const seg = segments[si];
                  const dim = focusedSegs && !focusedSegs.has(si);
                  const hot = focusedSegs?.has(si) && seg.from.length > 0;
                  return (
                    <span
                      key={si}
                      {...(seg.from.length ? hoverProps({ kind: "seg", idx: si }) : {})}
                      className={`rounded-sm transition-colors duration-300 ${
                        seg.from.length ? "cursor-help" : ""
                      } ${dim ? "text-[var(--color-fg)]/30" : ""} ${
                        hot ? "bg-[var(--color-accent)]/10 text-[var(--color-fg)]" : ""
                      }`}
                    >
                      {seg.words.map((word, wi) => {
                        const g = seg.start + wi;
                        return (
                          <span key={wi}>
                            <span
                              className="transition-opacity duration-150"
                              style={{ opacity: g < shown ? 1 : 0 }}
                            >
                              {word}
                            </span>
                            {g === caretAt && <span className="caret" aria-hidden />}
                          </span>
                        );
                      })}
                    </span>
                  );
                })}
              </p>
            ))}
            {shown === 0 && (
              <span className="mono absolute inset-x-4 top-4 text-center text-[12px] text-[var(--color-muted)]">
                <span className="caret" aria-hidden /> waiting for activations…
              </span>
            )}
          </div>

          {!vertical && (
            <div
              className={`flex flex-wrap justify-center gap-2 border-t border-[var(--color-line)] px-4 py-3 transition-opacity duration-500 ${
                done ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-accent)] px-4 py-1.5 text-sm font-medium text-[#04121a] transition-opacity hover:opacity-90"
              >
                Download CV
              </a>
              <a
                href="#research"
                className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-sm text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-accent"
              >
                Inspect the weights ↓
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

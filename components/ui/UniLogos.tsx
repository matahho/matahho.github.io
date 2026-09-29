// Hand-drawn crests inspired by each university's arms and colours.

export type UniLogoId = "oxford" | "michigan" | "tehran" | "mcgill";

const SHIELD = "M8 6h48v26c0 17-11 28-24 34C19 60 8 49 8 32z";

function Crown({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d="M-5.5 3.5v-5.5l2.8 2.6L0-3.8l2.7 3.4 2.8-2.6v5.5z"
        fill="#F6C343"
        stroke="#FFE08A"
        strokeWidth=".6"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="-4.3" r="1" fill="#FFE08A" />
    </g>
  );
}

function Book({ x, y, s = 1, ink }: { x: number; y: number; s?: number; ink: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0-5C-4-8-9-8-13-6.5V7C-9 5.5-4 5.5 0 8z" fill="#fff" />
      <path d="M0-5C4-8 9-8 13-6.5V7C9 5.5 4 5.5 0 8z" fill="#F3F1EA" />
      <path d="M0-5V8" stroke={ink} strokeWidth=".8" opacity=".5" />
      {[-2.5, 0, 2.5].map((dy) => (
        <g key={dy} stroke={ink} strokeWidth=".7" strokeLinecap="round" opacity=".45">
          <path d={`M-10 ${dy}c2-.8 5-.8 7.5 0`} />
          <path d={`M2.5 ${dy}c2.5-.8 5.5-.8 7.5 0`} />
        </g>
      ))}
    </g>
  );
}

function Martlet({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} fill="#fff">
      {/* forked tail */}
      <path d="M-4.5 .8-9.8-2.6-7.6 1.2-9.6 4.4z" />
      {/* body */}
      <path d="M-5.5 1.2C-3-1.2 1.5-2 4.2-.9 5.6-.3 5.4 1.8 3.6 2.4 .6 3.5-3 3.2-5.5 1.2z" />
      <circle cx="4.4" cy="-1" r="2" />
      <path d="M6.2-1.4 8.3-.6 6.2.1z" fill="#FFE08A" />
      {/* swept wing */}
      <path d="M-2.2-.2C-1.4-4.6 2-7.2 6.2-7-2.6-3.2 1.4-.2 1.4-.2z" />
      <circle cx="5" cy="-1.4" r=".5" fill="#B5121B" />
    </g>
  );
}

function Oxford() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden>
      <path d={SHIELD} fill="#002147" stroke="#F6C343" strokeWidth="2" />
      <path d="M13 11h38v20c0 13-8 22-19 27-11-5-19-14-19-27z" fill="#0B2E63" opacity=".6" />
      <Crown x={20} y={18} />
      <Crown x={44} y={18} />
      <Book x={32} y={34} ink="#002147" />
      <Crown x={32} y={52} />
    </svg>
  );
}

function Michigan() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden>
      <rect x="4" y="8" width="56" height="56" rx="16" fill="#00274C" />
      <rect x="4" y="8" width="56" height="56" rx="16" fill="none" stroke="#FFCB05" strokeOpacity=".35" strokeWidth="1.5" />
      <path
        d="M12 22h12.5L32 34l7.5-12H52v6.5h-3.5v15H52V50H38v-6.5h3V35.5L32 48.5l-9-13v8h3V50H12v-6.5h3.5v-15H12z"
        fill="#FFCB05"
        stroke="#FFE27A"
        strokeWidth=".8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const UT_BLUE = "#12A8DE";

// Ring of pearls framing the University of Tehran emblem.
const PEARLS = Array.from({ length: 26 }, (_, i) => {
  const a = (i / 26) * Math.PI * 2 - Math.PI / 2;
  return { x: 32 + 26.2 * Math.cos(a), y: 36 + 26.2 * Math.sin(a), a };
});

// One Persian wing (left), rising from the base and curling at the tip; mirrored for the right.
function Wing({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "translate(64 0) scale(-1 1)" : undefined}>
      <path
        d="M31.7 53.5C22 54.2 12.6 49.5 11.2 42 10.4 37 11.6 32.2 15.4 31 18.6 30 20 33.8 17.6 35 16.2 35.6 15.4 34.4 16.2 33.6 18.6 39.4 22.8 43.4 28.4 45.2z"
        fill="#fff"
      />
      <g fill="none" stroke={UT_BLUE} strokeWidth=".6" strokeLinecap="round">
        {/* long flight feathers */}
        <path d="M13 38.4C13.2 43.6 16 47.6 20.4 50" />
        <path d="M15.4 37.6C16 42 18.6 45.4 22.2 47.4" />
        {/* scale feathers */}
        {[
          [24.6, 48.6],
          [27.4, 49.2],
          [21.8, 50.6],
          [24.6, 51.4],
          [27.6, 51.8],
        ].map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${x - 1.3} ${y}a1.3 1.3 0 0 0 2.6 0`} />
        ))}
      </g>
    </g>
  );
}

function Tehran() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden>
      <circle cx="32" cy="36" r="28.4" fill={UT_BLUE} />
      {PEARLS.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="2.9" fill="#fff" stroke={UT_BLUE} strokeWidth=".7" />
          {/* crescent sheen on each pearl */}
          <path
            d={`M${p.x - 1.5} ${p.y + 0.2}a1.6 1.6 0 0 0 3 0`}
            fill="none"
            stroke={UT_BLUE}
            strokeWidth=".5"
            transform={`rotate(${(p.a * 180) / Math.PI + 90} ${p.x} ${p.y})`}
          />
        </g>
      ))}
      <g
        fill="#fff"
        fontFamily="'Geeza Pro', 'Noto Naskh Arabic', 'Vazirmatn', Tahoma, sans-serif"
        fontWeight="700"
        textAnchor="middle"
        direction="rtl"
      >
        <text x="32" y="23.5" fontSize="8">تهران</text>
        <text x="32" y="33.5" fontSize="8">دانشگاه</text>
      </g>
      <Wing />
      <Wing flip />
      {/* scroll ornament at the base */}
      <path d="M23.4 55.6c2.8-.8 5.8.2 8.6 2.4 2.8-2.2 5.8-3.2 8.6-2.4-1 2.8-4 4.4-8.6 4.4s-7.6-1.6-8.6-4.4z" fill="#fff" />
      <g fill="none" stroke="#fff" strokeWidth="1" strokeLinecap="round">
        <path d="M23.4 55.6c-2.2-1-3.8.6-3 2.2.7 1.2 2.3.9 2.2-.3" />
        <path d="M40.6 55.6c2.2-1 3.8.6 3 2.2-.7 1.2-2.3.9-2.2-.3" />
        <path d="M29.6 60.6l-.4 1.4M32 60.8v1.6M34.4 60.6l.4 1.4" />
      </g>
    </svg>
  );
}

function McGill() {
  return (
    <svg viewBox="0 0 64 72" aria-hidden>
      <path d={SHIELD} fill="#ED1B2F" stroke="#fff" strokeOpacity=".85" strokeWidth="2" />
      <path d="M9 7h46v14l-5.75 4-5.75-4-5.75 4L32 21l-5.75 4-5.75-4-5.75 4L9 21z" fill="#B5121B" />
      <Book x={32} y={15} s={0.62} ink="#B5121B" />
      <Martlet x={22} y={35} />
      <Martlet x={42} y={35} />
      <Martlet x={32} y={49} />
    </svg>
  );
}

const LOGOS: Record<UniLogoId, () => JSX.Element> = {
  oxford: Oxford,
  michigan: Michigan,
  tehran: Tehran,
  mcgill: McGill,
};

export default function UniLogo({ id, className = "" }: { id: UniLogoId; className?: string }) {
  const Logo = LOGOS[id];
  return (
    <span className={`inline-block drop-shadow-[0_6px_14px_rgba(0,0,0,0.45)] ${className}`}>
      <Logo />
    </span>
  );
}

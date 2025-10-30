---
title: "🤖 Deterministic LLM Inference for Real-Time CPS (Bachelor Thesis)"
excerpt: "Investigating batch-invariance and methods to defeat nondeterminism in LLM inference for safety-critical embedded systems.<br/>"
collection: research
---

I am conducting this **bachelor’s thesis** at the **University of Tehran** under the supervision of [**Prof. Kargahi**](https://scholar.google.com/citations?user=oH19bK4AAAAJ&hl=en). The project studies sources of nondeterminism in LLM inference — in particular **batch-invariance** — and develops practical techniques (including a shielded reinforcement-learning mediator) to produce deterministic, safety-compatible LLM outputs for real-time cyber-physical systems. [1]


---

## 📚 Motivation & Problem Statement

Large language model (LLM) outputs can vary across runs even when the underlying model and inputs appear unchanged. While floating-point arithmetic and GPU concurrency are often blamed, recent analysis shows that a key practical cause is **batch-invariance** — the phenomenon where the numeric result for a single request depends on the other requests processed in the same batch (and therefore on batch size/ordering). This makes an otherwise deterministic forward pass appear nondeterministic from the user’s perspective. Understanding and eliminating this class of nondeterminism is essential when LLMs are used in **safety-critical, real-time embedded systems** where reproducibility and predictable behavior are required. [2]

---

## 🧪 Thesis Goals

1. **Diagnose** and reproduce run-time nondeterminism in common inference stacks (PyTorch, common OSS inference servers) with a focus on batch effects and matmul/attention implementation differences. [2] 
2. **Quantify** how batch size and batching strategies change per-request outputs (numerical deviation, downstream behavioral differences). [2]
3. **Design & implement** a practical mitigation pipeline for embedded CPS:
   - low-level mitigation (controlled batching / deterministic kernels where possible), and  
   - a **shielded reinforcement-learning agent** that mediates model outputs to enforce safety & determinism guarantees for downstream controllers. [2]
4. **Evaluate** the mitigations on representative CPS workloads to measure determinism, latency, and safety tradeoffs.

---

## 🔬 Approach (high level)

- **Repro experiments:** build controlled experiments to show when and how per-request outputs change with batch configuration (single-element matmul vs. batched matmul differences). Empirical tests follow patterns and examples discussed in recent analyses of LLM inference nondeterminism (e.g., batch-invariance tests and matrix-multiplication examples). [2]  
- **Instrumentation:** trace inference servers (vLLM / common OSS stacks), capture numeric traces and layer outputs, and identify operations that induce batch sensitivity.
- **Deterministic pipeline:** evaluate strategies such as fixed batching policies, deterministic reduction patterns, and algorithmic reordering to reduce numeric divergence. Where low-level determinism is infeasible, apply higher-level mediation. 
- **Shielded RL mediator:** design an RL agent (the “shield”) that receives candidate LLM outputs plus safety constraints and selects or modifies outputs to guarantee deterministic, safety-compliant behavior under latency and resource constraints. Development and prototyping will use environments representative of real-time CPS control loops. [3]

---

## ✅ Expected Deliverables

- A reproducible experimental suite that demonstrates and quantifies batch-invariance effects on LLM outputs. 
- An implementation of mitigation strategies (configuration + code) that trade off latency vs. determinism.  
- A prototype **shielded RL mediator** and evaluation showing improved determinism and preserved safety properties on benchmark CPS tasks. [3]
- A written thesis documenting methods, experiments, and results.

---

## 🔑 Keywords

Deterministic inference · batch-invariance · LLM reliability · reinforcement learning shield · real-time embedded CPS · numerical robustness · reproducibility.


---

## 📚 References
1. **Tarek Abdelzaher's Paper(2025).** [The bottlenecks of AI: challenges for embedded and real-time research in a data-centric age](https://link.springer.com/article/10.1007/s11241-025-09452-w/).  
2. **Thinking Machines AI (2024).** [Defeating Nondeterminism in LLM Inference](https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/).  
3. **Junjie Shi & Kuan-Hsun Chen's Paper (2025).** [Shielded reinforcement learning for fault-tolerant scheduling in real-time systems](https://link.springer.com/article/10.1007/s11241-025-09441-z).  

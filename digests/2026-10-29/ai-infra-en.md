# AI Infrastructure Digest 2026-10-29

> Generated: 2026-10-29 03:09 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

### 1. Ecosystem Overview
The AI infrastructure landscape on October 29, 2026, is characterized by aggressive convergence toward multi-modal and cross-modality architectures (notably the rapid integration of the LiquidAI LFM3 and MiniMax-M3.1 families) alongside deeper cross-vendor hardware portability for AMD ROCm, Apple MLX, and diverse NPU backends. Inference engines (vLLM, SGLang) are doubling down on memory-efficient Mixture-of-Experts (MoE) routing and multi-latent attention (MLA) optimizations, while local runtimes (`llama.cpp`, Ollama) and fine-tuning frameworks (Unsloth) focus on reducing memory footprints and smoothing desktop streaming-audio pipelines. Concurrently, gateway layers (LiteLLM) are prioritizing enterprise guardrail execution and hardening against security bypass vectors.

---

### 2. Activity Comparison

| Project | Type | Issues / Regressions Tracked | PRs / Active Development | Release Status |
| :--- | :--- | :--- | :--- | :--- |
| **vLLM** | High-Throughput Serving Engine | 3 major (CUDA illegal access, Ampere MoE/TurboQuant, KV-offload re-entrancy) | 7 highlighted (DeepSeek-V4.1, MiniMax-M3.1, Qwen GDN, Hopper Triton Indexer) | *No new releases* (Stable development branch) |
| **SGLang** | High-Throughput Serving Engine / Structured | 5 major (HiCache host tier leaks, Mooncake scheduler OOM, HiCache write-back lag) | 6 highlighted (AMD consumer RDNA, XPU VMoBA, Kimi-K3 DCP, AITER/DeepSeek kernel fusions) | *No new releases* (Active development branch) |
| **llama.cpp** | Local C/C++ Inference Runtime | 4 major (CUDA graph hangs sm_120, ROCm state leaks, draft KV holes, Metal OOM) | 7 highlighted (LiquidAI LFM3, Spark-X2.6, Hexagon HVX, `ClassLRU` MoE, Batched tensor copy) | **v0.8.0 Released** (LFM3 text/vision/audio/omni, `/v1/realtime`, `/tts`) |
| **Ollama** | Local Runner & Desktop Orchestration | 4 major (Vulkan prompt cache collapse, Gemma 4 VRAM over-estimation, MoE tensor overflow) | 5 highlighted (LiquidAI LFM3 cross-platform, MLX Windows, Speculative metrics, Flash Attention) | **v0.40.13 Released** (LiquidAI LFM3 support for Linux/Windows/macOS) |
| **LiteLLM** | LLM Gateway & Universal Proxy | 4 major (Vertex live bypass, admin key budget exhaustion, embeddings moderation false positives) | 5 highlighted (Async streaming guardrails, spend log partial indexing, HTTP/2 connection pooling) | **v1.106.6 & v1.105.7 Released** (`cosign` container signature mandates) |
| **Unsloth** | Fine-Tuning & Local Studio Framework | 5 major (Anthropic compatibility context overflow, Qwen3.5 loss OOM, SQLite WAL file flood) | 5 highlighted (Apple MLX multimodal/audio, Packed attention compilation, Mac VRAM conservation) | **v0.1.912-beta** ("Trick or Treat + Optimizations") |

---

### 3. Model Support Race
* **LiquidAI LFM3 Family (Text, Vision, Audio, Omni):** This architecture represents the day's dominant cross-project rollout. It was natively adopted across `llama.cpp` (v0.8.0 release with `mtmd` streaming infrastructure), Ollama (v0.40.13 cross-platform release), and Unsloth Studio (via `mlx-vlm 0.7.11` for voice/spoken queries).
* **DeepSeek-V4 / V4.1 & MiniMax-M3.1:** High-performance enterprise engines are leading the integration of these bleeding-edge models. vLLM and SGLang both introduced kernel and serving paths for DeepSeek-V4.1 (targeting 528B MXFP8/288B NVFP4 formats on AMD MI355X/gfx950 and NVIDIA backends) and MiniMax-M3.1-Flash (including DSpark draft support).
* **Specialized & Draft Architectures:** `llama.cpp` added support for Spark-X2.6 DSpark draft models, while vLLM integrated Base Labs' Mammoth-1 & Elephant-1 decision models featuring block-bidirectional masks.

---

### 4. Performance Frontier
* **KV-Cache & Memory Management:** SGLang and vLLM are contending with advanced KV caching bottlenecks under heavy multi-tenant loads. SGLang’s HiCache experienced severe eviction latency spikes under `write_back` policies and host-tier memory leaks in hybrid GDN architectures, while vLLM optimized block-hash indexing to prevent redundant memory copies during chunked prefills. Unsloth addressed Mac VRAM over-allocation by preventing tools from eagerly reserving a model's full native context window upfront.
* **MoE Routing Intelligence:** `llama.cpp` introduced `ClassLRU`—a hybrid cache replacing SLRU that ranks frequently used experts using decaying usage history, yielding a +6% to +7% decode throughput boost and an 8% reduction in weight uploads. Meanwhile, vLLM and SGLang concentrated heavily on expert-sparse quantization paths (`w4afp8` and Quark FP8 KDA).
* **Hardware Kernel Acceleration:** Optimization efforts are deeply hardware-specific. vLLM and SGLang targeted AMD ROCm (MI355X/gfx950 AITER fusions) and Hopper/Blackwell SM90/SM120 architectures (such as Hopper Triton indexer split-K optimizations). Concurrently, `llama.cpp` focused on low-level backends, adding 256-bit ARM SVE paths, Hexagon HVX parallelization for `IM2COL`, and batched tensor copy APIs on CUDA.

---

### 5. Layer Positioning
* **High-Throughput Serving Engines (vLLM, SGLang):** Positioned for datacenter-scale deployment, multi-node disaggregation, and complex enterprise models (DeepSeek-V4, Kimi-K3). Their primary engineering challenges center around fine-grained tensor/context parallelism, custom hardware fusions (ROCm/Blackwell), and complex prefix-caching coordination (Mooncake, HiCache).
* **Local Runtimes (llama.cpp, Ollama):** Positioned for consumer hardware, edge devices, and developer workstations. Their focus is on cross-platform portability (Windows/Linux/macOS across CPU, Metal, Vulkan, and SYCL) and out-of-the-box multimodal streaming capabilities (real-time voice endpoints and text-to-speech).
* **Gateway & Management (LiteLLM):** Positioned as the security, routing, and observability layer mediating enterprise traffic across proprietary and open APIs. Its engineering efforts target proxy overhead reduction, credential security hardening, and background guardrail evaluation.
* **Training & Fine-Tuning Framework (Unsloth):** Positioned at the developer authoring layer. It focuses on memory-efficient fine-tuning, PyTorch Dynamo/compile compatibility, and packaging local desktop applications (Unsloth Studio) with unified memory awareness.

---

### 6. Trend Signals
* **Realtime Voice and Omni-Modality Standardization:** The simultaneous rollout of LiquidAI LFM3 across runtimes signals that text-only local endpoints are rapidly giving way to native multimodal streaming (audio-in, audio-out) embedded directly into local servers.
* **The High Cost of Advanced Cache Policies:** Enterprise engines adopting aggressive prefix-caching layers (like SGLang's HiCache and Mooncake) are encountering acute stability hurdles under production loads—specifically scheduling OOMs and eviction latency spikes—suggesting that advanced memory-tiering needs conservative default configurations (e.g., sticking to `write_through` over `write_back`).
* **Supply Chain and Artifact Integrity:** LiteLLM's mandatory `cosign` container signature verification marks a growing industry trend toward rigorous supply-chain provenance for AI infrastructure middleware deployed in production clusters.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest: 2026-10-29

### 1. Today's Highlights
Today's development velocity is heavily driven by support for next-generation architectures like **DeepSeek-V4/V4.1** and **MiniMax-M3.1**, alongside ongoing performance optimizations for AMD ROCm (MI355X/gfx950) hardware. Significant engineering effort is also directed toward robust multi-node KV cache transfer infrastructure and minimizing memory overhead for speculative decoding and hybrid MoE models.

---

### 2. Releases & Breaking Changes
* *No new version releases in the last 24 hours.*

---

### 3. New Model & Hardware Support
* **MiniMax-M3.1-Flash:** PR [#64111](https://github.com/vllm-project/vllm/pull/64111) introduces the model code and kernel changes for NVIDIA and ROCm backends (including DSpark draft support).
* **Mammoth-1 & Elephant-1:** PR [#63114](https://github.com/vllm-project/vllm/pull/63114) adds serving capabilities for Base Labs' decision models with trained block-bidirectional masks.
* **DeepSeek-V4.1 (gfx950):** PR [#57523](https://github.com/vllm-project/vllm/pull/57523) implements support for DeepSeek-V4.1's 528B MXFP8 and 288B NVFP4 KV records on AMD MI355X hardware.
* **W4AFP8 MoE Path:** PR [#64410](https://github.com/vllm-project/vllm/pull/64410) adds `w4afp8` quantization support to handle SGLang-style checkpoints (e.g., `PhalaCloud/GLM-5.3-W4AFP8`).

---

### 4. Performance & Optimization
* **Qwen GDN & MRV2 Attention:** PR [#62961](https://github.com/vllm-project/vllm/pull/62961) speeds up decode on Qwen3.5-architecture models by stripping redundant computations from gated delta net (GDN) layers and Model Runner V2's attention metadata. Achieves a **5.8% speedup** at batch size 1 without speculation (and 5.6% with MTP) on Qwen3.8-27B at TP4 on B300.
* **Hopper Triton Indexer:** PR [#64037](https://github.com/vllm-project/vllm/pull/64037) enables SM90 split-K in the Triton indexer for MiniMax-M3, resolving latency-bound chunked prefill bottlenecks on Hopper (previously launching only 32 CTAs across 132 SMs).
* **OCP MX Emulation:** PR [#64406](https://github.com/vllm-project/vllm/pull/64406) optimizes OCP MX emulation on non-native hardware (e.g., MI250X) by dequantizing **only the routed experts** instead of every local expert on every forward pass.
* **KV-Cache Manager:** PR [#64409](https://github.com/vllm-project/vllm/pull/64409) bounds block-hash slices strictly to newly cached blocks, preventing redundant hash copies during chunked prefill.

---

### 5. Stability & Regressions
* **Illegal Memory Access / CUDA Errors:** Issue [#24430](https://github.com/vllm-project/vllm/issues/24430) tracks sporadic `torch.AcceleratorError: CUDA error: an illegal memory access was encountered` (Closed/Stale, but reflective of ongoing hardware-edge stability hurdles).
* **Hybrid MoE + TurboQuant on Ampere:** Issue [#40124](https://github.com/vllm-project/vllm/issues/40124) details a failure mode where TurboQuant KV cache combined with hybrid MoE models (e.g., Qwen3.6-35B-A3B) breaks on Ampere (SM 80–86) due to Hopper-only assumptions in code paths.
* **KV-Offload Re-entrancy:** PR [#59099](https://github.com/vllm-project/vllm/pull/59099) addresses a bug where calling `reset_cache()` twice on the offloading connector before an engine step triggers an assertion failure (`assert not self._current_batch_jobs_to_flush`).

---

### 6. What This Means for Application Developers
* **Expansion of Specialized Architectures:** Native infrastructure is rapidly maturing for hybrid MoE models and advanced attention variants (like GatedDeltaNet and MLA-adjacent variants found in newer Qwen and DeepSeek releases). If you are targeting bleeding-edge open weights, vLLM increasingly supports optimized execution paths out-of-the-box.
* **Better Multi-Node and Distributed Prefix Caching:** Ongoing stabilization work around Mooncake store connectors, MoRI EPv2, and UMBP standalone modes (PR [#63002](https://github.com/vllm-project/vllm/pull/63002)) signals that multi-node prefix cache reuse and disaggregated serving topologies are becoming robust enough for production agentic workloads with massive context windows.
* **Hardware Tier Nuances:** Optimization PRs continue to highlight performance deltas between Ampere (SM8x), Hopper (SM90), and Blackwell (SM120) generation hardware, as well as ROCm equivalents. Ensure your deployment configuration closely matches the validated kernel paths (e.g., Marlin vs. native FP4 backends) to avoid unexpected performance degradation.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest: 2026-10-29

### 1. Today's Highlights
Today's SGLang activity focuses heavily on **hardware-accelerated optimizations for advanced multi-latent attention (MLA) and mixture-of-experts (MoE) architectures** (such as DeepSeek-V4 and Kimi-K3) across both AMD ROCm (`gfx950`) and NVIDIA Hopper/Blackwell platforms. Key feature engineering is underway for Prefill-Decode (PD) disaggregation protocols and Decode Context Parallelism (DCP), while stability efforts target intermittent memory leaks in hybrid GDN architectures and flaky CI environments.

---

### 2. Releases & Breaking Changes
* *No new official releases were published in the last 24 hours.*

---

### 3. New Model & Hardware Support
* **AMD Consumer Radeon RDNA3/RDNA4 Enablement:** A comprehensive roadmap and tracking issue has been opened to bring official support to consumer cards (`gfx1100`/`gfx1101` and `gfx1200`/`gfx1201`), expanding ROCm capabilities beyond datacenter-only Instinct hardware ([Issue #30599](https://github.com/sgl-project/sglang/issues/30599)).
* **Moore Threads MUSA GPU Support:** Work continues on first-class runtime integration for Moore Threads architectures ([Issue #16565](https://github.com/sgl-project/sglang/issues/16565)).
* **Intel XPU VMoBA Path:** A pull request was submitted introducing an XPU varlen attention backend path backed by `sgl-kernel`'s SYCL implementation for VMoBA ([PR #46749](https://github.com/sgl-project/sglang/pull/46749)).
* **Ascend NPU Kimi-K3 DCP Integration:** Added support for Decode Context Parallelism (DCP) with shared compact communication and DSPARK speculative decoding on Ascend NPUs ([PR #40825](https://github.com/sgl-project/sglang/pull/40825)).

---

### 4. Performance & Optimization
* **GLM-5.3 Hopper Optimization & CP Prefill:** Ongoing tracking for GLM-5.3-Flash optimization on SM90 targets time-to-first-token (TTFT) reductions via context-parallel prefill coupled with tensor-parallel decode ([Issue #45373](https://github.com/sgl-project/sglang/issues/45373), [PR #46857](https://github.com/sgl-project/sglang/pull/46857)). Benchmarked on an 8 × B300 workload with 262k input tokens, this strategy substantially improves throughput.
* **AMD Kimi-K3 & DeepSeek-V2/V4 Kernel Fusions:** A flurry of AMD performance PRs target ROCm/AITER gfx950 optimizations, including running Quark FP8 KDA in-projections on FP8 kernels ([PR #44362](https://github.com/sgl-project/sglang/pull/44362)), fusing MLA decode queries and latent KV cache writes ([PR #43127](https://github.com/sgl-project/sglang/pull/43127)), and routing MoE layers through tuned BF16 GEMMs ([PR #44360](https://github.com/sgl-project/sglang/pull/44360)).
* **DeepSeek-V4 Prefill on SM120:** Performance discussions examine Blackwell SM120 throughput behaviors (`TP=4` across 4× RTX PRO 6000), highlighting hardware-specific tuning needs for prefill workloads ([Issue #33422](https://github.com/sgl-project/sglang/issues/33422)).

---

### 5. Stability & Regressions
* **HiCache GDN Host-Tier Exhaustion (High Severity):** A critical bug was reported where host-tier cache hits drop to zero once the evicted working set exceeds ~3 long prefixes on hybrid GDN models due to host Mamba pool leaks ([Issue #45400](https://github.com/sgl-project/sglang/issues/45400)).
* **Mooncake L3 / HiCache Scheduling OOM (High Severity):** Running `buffer_only` with Mooncake L3 under steady load can cause the scheduler to admit chunked prefills it cannot finish, resulting in an unrecoverable "Prefill out of memory" crash when all radix nodes are locked ([Issue #45989](https://github.com/sgl-project/sglang/issues/45989)).
* **HiCache `write_back` Latency Spike:** Switching from `write_through` to `write_back` eviction policies under steady load caused per-call eviction durations (`eviction_duration_seconds`) to jump ~500× (from 0.6ms), degrading prefix-cache hit rates ([Issue #46952](https://github.com/sgl-project/sglang/issues/46952)).
* **DRAFT / Weight Update Selector OOM:** Updating weights from disk silently loads target weights into DFLASH draft models without a selector constraint, causing unexpected allocation states ([Issue #46806](https://github.com/sgl-project/sglang/issues/46806)).
* **Tools + JSON-Schema Conflict:** Combining tool calls and strict JSON-schema response formats breaks inference behavior across multiple engines (Kimi-K3 returning 400s; GLM-4.7 and DeepSeek silently dropping tool calls) ([Issue #47167](https://github.com/sgl-project/sglang/issues/47167)).

---

### 6. What This Means for Application Developers
* **Caution Advised on HiCache Write-Back Modes:** If you are running production fleets with high concurrency and utilize HiCache, stick to `write_through` policies for now. Transitioning to `write_back` introduces severe scheduler-blocking eviction latencies under heavy load.
* **Schema Validation & Tool Calling Restrictions:** Avoid attempting to pass rigid JSON schemas concurrently with tool-use definitions on current builds if targeting models like Kimi-K3 or DeepSeek, as request rejection or silent format degradation will occur until upstream parsing patches land.
* **Expanding AMD & Non-Nvidia Production Targets:** If you are deploying frontier models (like GLM-5.3 or Kimi variants) on AMD MI350/gfx950 hardware, robust custom kernel paths (AITER integrations) are rapidly maturing, significantly narrowing the performance gap with NVIDIA Hopper deployments.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-29

### 1. Today's Highlights
Today's development centers around aggressive low-level kernel tuning for specialized hardware (Hexagon, SVE, SYCL, and CUDA) alongside advanced memory management for Mixture-of-Experts (MoE) routing. Notable architectural work includes the rollout of LiquidAI LFM3 family support across text, vision, audio, and omni modalities. Additionally, hardware acceleration pipelines saw major updates, particularly targeting multi-tile matrix multiplications and batched tensor copy operations.

---

### 2. Releases & Breaking Changes
- **v0.8.0 Release**: [Release v0.8.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.8.0) officially drops, introducing the **LiquidAI LFM3** family (text, vision, audio, and omni) alongside an experimental streaming-audio API in `mtmd`. It wires realtime audio in and out of the server via new `/v1/realtime` and `/tts` endpoints.

---

### 3. New Model & Hardware Support
- **LiquidAI LFM3 Family**: Integrated native text, vision, audio, and omni support across model layers and `mtmd` streaming infrastructure.
- **Spark-X2.6 / DSpark Drafts**: [PR #31168](https://github.com/ggml-org/llama.cpp/pull/31168) adds conversion and inference support for Spark-X2.6 DSpark draft models.
- **Hexagon Backend Improvements**: 
  - [PR #31050](https://github.com/ggml-org/llama.cpp/pull/31050) implements block-based HVX parallelization for `IM2COL`, heavily benefiting PocketTTS and voice pipelines.
  - [PR #30995](https://github.com/ggml-org/llama.cpp/pull/30995) introduces full `conv2d` support with double-buffered staging and implicit GEMM paths.
- **ARM SVE**: [PR #30585](https://github.com/ggml-org/llama.cpp/pull/30585) adds a 256-bit SVE path for `ggml_gemv_q8_0_4x8_q8_0` targeting high-efficiency ARM cores.

---

### 4. Performance & Optimization
- **MoE Cache Intelligence (`ClassLRU`)**: [PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233) proposes replacing SLRU with an LRFU/MQ-inspired hybrid cache (`ClassLRU`) that ranks frequently used experts within classes using decaying usage history. Benchmarks show **+6% decode throughput on QFN** and **+7% on GLM** versus SLRU, accompanied by an **8% reduction in weight uploads**.
- **Batched Tensor Copy API**: [PR #30881](https://github.com/ggml-org/llama.cpp/pull/30881) introduces a generic batched tensor copy API (`ggml_backend_tensor_copy_n`, etc.) superseding the legacy `_2d` path, heavily optimized by [PR #30986](https://github.com/ggml-org/llama.cpp/pull/30986) to gather batched tensor reads directly into mapped host memory on CUDA.
- **OpenCL & SYCL Optimizations**: 
  - [PR #30412](https://github.com/ggml-org/llama.cpp/pull/30412) lands tiled `q4_k` GEMMs optimized for Qualcomm Adreno GPUs.
  - [PR #31110](https://github.com/ggml-org/llama.cpp/pull/31110) implements work-group argmax operations for short `TOP_K` rows on SYCL.

---

### 5. Stability & Regressions
- **CUDA Graph Hangs (RTX 5090 / sm_120)**: [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) remains an active evaluation blocker where CUDA graphs trigger RC watchdog timeouts and `Xid 8` errors on sm_120 hardware. *Workaround:* Setting `GGML_CUDA_DISABLE_GRAPHS=1`.
- **ROCm / HIP Recurrent State Leak**: [Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092) reports that fused Gated Delta Net ops carry recurrent state across requests on reused server slots (affecting Qwen3.5/MoE variants), occasionally leaking previous prompt text verbatim into subsequent completions.
- **Draft KV Cache Positional Holes**: [Issue #27408](https://github.com/ggml-org/llama.cpp/issues/27408) tracks a critical bug under `--spec-type draft-dflash` where image chunks leave positional holes in the draft KV cache, causing `llama_decode(ctx_dft) rc=-1` and forcing a 500 server error.
- **Metal OOM Server Initialization**: [Issue #27309](https://github.com/ggml-org/llama.cpp/issues/27309) exposes a race condition where the server reports "model loaded" and binds its port despite experiencing a fatal Metal OOM during initialization, resulting in unhandled 500 errors on all subsequent requests.

---

### 6. What This Means for Application Developers
- **Realtime Voice and Multimodal Agents**: With LiquidAI LFM3 integration and new `/v1/realtime` / `/tts` endpoints in `llama-server`, building low-latency, self-hosted voice agents with direct audio streaming is now significantly more robust out-of-the-box.
- **MoE Memory Footprint Tuning**: If you are running massive sparse MoE architectures (like Qwen MoE or DeepSeek derivatives), watch the progress on `ClassLRU` caching ([PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233)). It offers measurable inference speedups and fewer CPU-GPU PCIe transfers under warm caching conditions.
- **Granular Server Metrics**: Infrastructure observability is expanding via [PR #26130](https://github.com/ggml-org/llama.cpp/pull/26130), which exposes per-device memory usage allocations (split by weights, context/KV cache, and compute buffers) directly over `/metrics` and `GET /memory` for Prometheus/Grafana integration.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Infrastructure Digest — 2026-10-29

### 1. Today's Highlights
Ollama v0.40.13 landed with expanded multi-platform execution for Liquid AI's LFM3 architectures, bringing text-to-speech capabilities to Linux and Windows hosts. Concurrently, infrastructure efforts center on smoothing out cross-backend regressions—addressing a major Vulkan throughput collapse on AMD hardware, stabilizing MLX runtime dependencies, and introducing per-request speculative decoding metrics for observability.

### 2. Releases & Breaking Changes
- **v0.40.13**: Released with cross-platform support for [LFM3](https://ollama.com/library/lfm3), [lfm3-audio](https://ollama.com/library/lfm3-audio), and [lfm3-omni](https://ollama.com/library/lfm3-omni) on Linux and Windows alongside Apple Silicon.
- **Modelfile Escaping Bug ([#19342](https://github.com/ollama/ollama/issues/19342) / [#19363](https://github.com/ollama/ollama/pull/19363))**: `ollama show --modelfile` previously serialized parameters wrapped in `"""` without escaping inner sequences, causing `ollama create` to break on text containing triple quotes. A fix has been proposed to omit unrepresentable formats.

### 3. New Model & Hardware Support
- **Liquid AI LFM3**: Native execution expanded beyond macOS, allowing Windows and Linux environments to spin up text and audio models (though non-Apple hosts previously triggered missing MLX runtime errors; see stability notes).
- **MLX Windows & CPU Backends ([#19366](https://github.com/ollama/ollama/pull/19366))**: A notable PR adds native Windows execution for the MLX runner, bundling a CPU backend alongside Metal and CUDA support.
- **Multimodal Projector Handling ([#19328](https://github.com/ollama/ollama/pull/19328))**: Fixed projector capability logic to ensure models with audio-only projectors (e.g., *Voxtral Mini*) do not erroneously register as vision-capable.

### 4. Performance & Optimization
- **Speculative Decoding Metrics ([#19368](https://github.com/ollama/ollama/pull/19368))**: `ollama run --verbose` and API outputs now report precise metrics for drafted and accepted tokens to replace misleading raw acceptance-rate estimates.
- **Flash Attention Defaults ([#19477](https://github.com/ollama/ollama/pull/19477))**: Work is underway to explicitly request Flash Attention for architectures like `gpt-oss` that default to it, preventing context-length crashes under partial GPU offloading where the `auto` mode disables it.

### 5. Stability & Regressions
- **Vulkan Prompt Cache Slowdown ([#19201](https://github.com/ollama/ollama/issues/19201))**: High severity regression on Ubuntu Server with AMD Radeon (Mesa RADV) exhibiting a ~29.7× throughput collapse on the second identical request when host-memory prompt caching is enabled.
- **Gemma 4 VRAM Over-Estimation ([#19357](https://github.com/ollama/ollama/issues/19357))**: The scheduler over-predicts memory for `gemma4:e4b` by 3–4x due to CPU-mapped per-layer embedding weights being miscounted as VRAM, triggering unnecessary model evictions.
- **LFM3 MLX Runtime Confusion ([#19343](https://github.com/ollama/ollama/issues/19343), [#19369](https://github.com/ollama/ollama/issues/19369))**: Initial rollouts of LFM3 models threw confusing errors regarding missing MLX runtimes on non-Apple silicon hosts prior to the v0.40.13 patch and updated library documentation.
- **MoE Tensor Size Overflow ([#19375](https://github.com/ollama/ollama/issues/19375))**: Large Mixture-of-Experts models utilizing MXFP4 formats (such as `gpt-oss:120b`) fail during GGUF metadata parsing due to integer overflows on `ffn_down_exps.weight`.

### 6. What This Means for Application Developers
- **Agent Tool Calling Nuances**: If you are orchestrating agents using architectures like Qwen 3.8 (`qwen3.8:27b-mlx`), note that tool calling can fail if the model attempts to generate free-text natural language *before* executing the tool call (i.e., conversational preamble breaks downstream execution unless the tool block is emitted immediately with an empty content field).
- **Environment Variable Purity**: CORS configurations via `OLLAMA_ORIGINS` and `OLLAMA_REMOTES` now safely strip surrounding whitespace from comma-separated entries ([#19365](https://github.com/ollama/ollama/pull/19365)), reducing subtle middleware authentication or connection rejections.
- **Cloud & API Role Handling**: OpenAI-compatible API layers interacting with specific models (such as Mistral Large 4 via Ollama Cloud) may face HTTP 400 errors if client SDKs (like Codex) pass `"developer"` roles instead of standard `"system"` roles ([#19021](https://github.com/ollama/ollama/issues/19021)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Infrastructure Digest — October 29, 2026

## 1. Today's Highlights
LiteLLM infrastructure updates focus on security hardening, asynchronous background guardrail scanning for streaming responses ([PR #48952](https://github.com/BerriAI/litellm/pull/48952)), and foundational work toward the highly anticipated Rust proxy migration ([Issue #31263](https://github.com/BerriAI/litellm/issue/31263)). Additionally, recent PRs target critical observability bottlenecks, including optimizing logs page filtering via partial database indexing ([PR #48932](https://github.com/BerriAI/litellm/pull/48932)).

---

## 2. Releases & Breaking Changes
* **v1.106.6 & v1.105.7 Releases**: Both releases emphasize artifact integrity, mandating signature verification for all Docker images using `cosign` and the verification key introduced in commit [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065).
* **Breaking Changes in Routing & Protocols**: 
  * [PR #40631](https://github.com/BerriAI/litellm/pull/40631) switches Vertex AI Search vector store queries to HTTP/2 and reuses OAuth tokens. Set `http2: false` or `LITELLM_HTTP2=0` to force HTTP/1.1.
  * [PR #39555](https://github.com/BerriAI/litellm/pull/39555) fixes management route errors on `/key/generate`, `/team/new`, `/user/new`, and `/v1/batches` to accurately report HTTP 400/404 statuses instead of masking them as generic `internal_server_error` codes.

---

## 3. New Model & Hardware Support
* **New Providers**: 
  * **Kyma API**: Added as an OpenAI-compatible provider, integrating model configuration into the Admin UI ([PR #48756](https://github.com/BerriAI/litellm/pull/48756)).
  * **Bedrock Routing**: Unlisted or unmapped Bedrock model IDs now gracefully fall back to the native `Converse` API instead of failing early with a 404 ([PR #43290](https://github.com/BerriAI/litellm/pull/43290)).

---

## 4. Performance & Optimization
* **Spend Log Query Optimization**: [PR #48932](https://github.com/BerriAI/litellm/pull/48932) introduces a partial index combining the first 128 characters of error codes and `startTime`, preventing full sequential scans across millions of logs on the proxy UI Error Logs page (previously taking ~30 seconds for 1.2M rows on filter operations).
* **HTTP/2 Connection Pooling**: Vertex AI Search vector store integration now pools Google connections per worker via HTTP/2 and shared OAuth token reuse ([PR #40631](https://github.com/BerriAI/litellm/pull/40631)).
* **Rust Rewrite Progression**: Tracking parent ticket [Issue #31263](https://github.com/BerriAI/litellm/issue/31263) continues to consolidate early beta feedback for sub-1ms gateway overhead goals.

---

## 5. Stability & Regressions
* **High Severity**: 
  * **Model Access Bypass on Vertex AI Live**: [PR #47716](https://github.com/BerriAI/litellm/pull/47716) addresses a security flaw where restricted keys could bypass model constraints via the `/vertex_ai/live` WebSocket connection because model authorization checked only post-handshake setup messages. Closed with 1008 on violation.
  * **Token Budget Enforcement on Admin Keys**: [Issue #48364](https://github.com/BerriAI/litellm/issue/48364) reports that maximum budget/TPM limits configured for admin-level keys were not being enforced once exhausted.
* **Medium/Low Severity**:
  * **Embeddings Moderation False Positives**: [PR #48934](https://github.com/BerriAI/litellm/pull/48934) fixes a bug where enabling `google_text_moderation` incorrectly routed `/v1/embeddings` through text moderation pipelines, causing standard payloads to fail with HTTP 400.
  * **Cache Poisoning Vector**: [PR #48917](https://github.com/BerriAI/litellm/pull/48917) audits cache key scoping for `/v1/responses` and `/v1/messages` to prevent arbitrary tenants from injecting cross-group cache entries via client-provided `metadata`.

---

## 6. What This Means for Application Developers
* **Streaming Guardrails Without Latency Penalties**: With `streaming_scan_in_background: true` ([PR #48952](https://github.com/BerriAI/litellm/pull/48952)), Bedrock safety checks on streamed outputs can execute concurrently in the background. This avoids mid-stream token generation pauses while retaining the ability to terminate unsafe streams cleanly prior to the next payload chunk.
* **Predictable Error Handling**: Management endpoints (`/key/generate`, `/team/new`, etc.) no longer return uniform `internal_server_error` payloads for malformed inputs ([PR #39555](https://github.com/BerriAI/litellm/pull/39555)). Client SDKs and retry loops can safely parse client errors (400, 404) without triggering infinite retry storms against the proxy.
* **Claude Thinking Blocks & Drop Params**: When utilizing Anthropic models with `drop_params: true`, LiteLLM now injects required `anthropic-beta` headers automatically for advanced body fields (`clear_at`, `thinking.block_binding`), eliminating sudden HTTP 400 validation failures ([PR #48793](https://github.com/BerriAI/litellm/pull/48793)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### 1. Today's Highlights
Unsloth's latest updates focus heavily on expanding multimodal and audio capabilities on Apple MLX via [PR #15889](https://github.com/unslothai/unsloth/pull/15889), alongside major improvements to long-context handling and memory management in Unsloth Studio. Release `v0.1.912-beta` brings seasonal themes while streamlining cold starts and Linux tool execution workflows. Concurrently, core infrastructure engineering targets PyTorch Dynamo compatibility with packed attention probes and mitigation of Mac memory over-allocation issues.

---

### 2. Releases & Breaking Changes
- **v0.1.912-beta ("Trick or Treat + Optimizations")**: Introduces seasonal UI themes alongside runtime speedups for initial app launches, Linux tool calls, and model loading. Compatible fine-tuning jobs can now be batched together with multi-L tasks. See the release context via [Release v0.1.912-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.912-beta).

---

### 3. New Model & Hardware Support
- **Apple MLX Multimodal & Audio**: [PR #15889](https://github.com/unslothai/unsloth/pull/15889) integrates `mlx-vlm 0.7.11` to support LFM3-Audio and LFM3-Omni architectures in Unsloth Studio chat, enabling native spoken queries and voice replies.
- **Liquid AI LFM3 Family**: Community feature requests and adapter inquiries target the newly released LFM3 backbone models (e.g., LFM3-1.7B) via [Issue #15588](https://github.com/unslothai/unsloth/issues/15588).
- **Metal Budget Aware GGUF Recommendation**: [PR #15848](https://github.com/unslothai/unsloth/pull/15848) updates the Studio Hub UI to evaluate GGUF quants against actual available Apple Metal unified memory budgets rather than total system RAM.

---

### 4. Performance & Optimization
- **Packed Attention & Dynamo Compilation**: [PR #15891](https://github.com/unslothai/unsloth/pull/15891) fixes varlen checks (`_varlen_in_graph` and `_leaves_block`) under fullgraph and `dynamic=True` PyTorch compile settings by avoiding strict constant restriction issues on Python flags.
- **Mac VRAM/Context Conservation**: [PR #15843](https://github.com/unslothai/unsloth/pull/15843) prevents Auto context windows from blindly reserving a model's entire native window size upfront on macOS (e.g., allocating ~4.9GB for a 128K context Llama 3.2 1B instance before message processing), preserving unified memory.
- **Payload & Context Guarding**: [PR #15857](https://github.com/unslothai/unsloth/pull/15857) guards `/apply-template` against oversized requests where UTF-8 byte counts exceed $4 \times n_{ctx}$, preventing timeout (503) errors during token counting loops.

---

### 5. Stability & Regressions
- **High Severity - VRAM & Context Overflows**:
  - [Issue #15417](https://github.com/unslothai/unsloth/issues/15417): Anthropic compatibility layer (`/v1/messages`) fails with a hard 400 error (`exceed_context_size_error`) on context overflows instead of invoking auto-compaction.
  - [Issue #5441](https://github.com/unslothai/unsloth/issues/5441): `Qwen3_5ForConditionalGeneration` misses loss function patching, triggering `logits.float()` Out-Of-Memory (OOM) errors on $\le 24\text{GB}$ GPUs.
  - [Issue #4504](https://github.com/unslothai/unsloth/issues/4504): ChatML-format fine-tuning paths exhibit excessive VRAM overhead, causing unexpected OOMs on larger models.
- **Medium Severity - Desktop & Studio Filesystem Bugs**:
  - [Issue #15552](https://github.com/unslothai/unsloth/issues/15552): Unsloth Studio on Windows floods the Windows Recycle Bin with over 10,000 SQLite WAL/SHM temp files ($\approx 40\text{MB}$) per training session.
  - [Issue #15681](https://github.com/unslothai/unsloth/issues/15681): Large ChatML JSONL datasets ($>81\text{MB}$) trigger a `SIGSEGV` in the pyarrow JSON reader during UI previews.

---

### 6. What This Means for Application Developers
- **Agent Memory Scaling**: If you are maintaining long-running agent chats inside Unsloth Studio, multi-million token histories previously led to UI hangs and unrecoverable compaction failures. [PR #15893](https://github.com/unslothai/unsloth/pull/15893) and [PR #15857](https://github.com/unslothai/unsloth/pull/15857) address these limits by properly bounding template evaluation and compaction logic.
- **Metal Deployment Safety**: Mac developers building local applications should note [PR #15848](https://github.com/unslothai/unsloth/pull/15848) and [PR #15843](https://github.com/unslothai/unsloth/pull/15843), which prevent `llama-server` from greedily grabbing maximum theoretical context windows on unified memory rigs, avoiding unnecessary OOM crashes on startup.
- **Robustness in API Layering**: When wrapping Unsloth's backend with Anthropic-compatible endpoints (`/v1/messages`), watch out for context overflow failures ([Issue #15417](https://github.com/unslothai/unsloth/issues/15417)) until auto-compaction patches propagate completely to payload translation layers.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/bddt3006-dot/agents-radar-master).*
# Bản tin Hạ tầng AI (Infrastructure) 2026-10-29

> Thời gian tạo: 2026-10-29 03:09 UTC | Số dự án: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## So sánh đối chiếu hạ tầng

### 1. Tổng quan Hệ sinh thái
Bối cảnh hạ tầng AI vào ngày 29 tháng 10 năm 2026 đặc trưng bởi xu hướng hội tụ mạnh mẽ hướng tới các kiến trúc đa phương thức và đa chiều (đặc biệt là việc tích hợp nhanh chóng các dòng LiquidAI LFM3 và MiniMax-M3.1), bên cạnh tính di động phần cứng đa nhà cung cấp ngày càng sâu rộng cho AMD ROCm, Apple MLX và các backend NPU khác nhau. Các engine phục vụ suy luận (vLLM, SGLang) đang đẩy mạnh tối ưu hóa định tuyến Mixture-of-Experts (MoE) tiết kiệm bộ nhớ và chú ý đa tiềm ẩn (multi-latent attention - MLA), trong khi các runtime chạy cục bộ (`llama.cpp`, Ollama) và các framework tinh chỉnh (Unsloth) tập trung vào việc giảm thiểu dung lượng bộ nhớ và làm mượt các pipeline phát trực tuyến âm thanh trên desktop. Đồng thời, các lớp gateway (LiteLLM) đang ưu tiên thực thi các hàng rào bảo vệ doanh nghiệp (enterprise guardrail) và tăng cường phòng thủ chống lại các vector bỏ qua bảo mật.

---

### 2. So sánh Hoạt động

| Dự án | Loại | Sự cố / Hồi quy được theo dõi | PR / Đang phát triển tích cực | Trạng thái Phát hành |
| :--- | :--- | :--- | :--- | :--- |
| **vLLM** | Engine phục vụ thông lượng cao | 3 vấn đề lớn (truy cập trái phép CUDA, Ampere MoE/TurboQuant, tính tái nhập khi offload KV) | 7 điểm nổi bật (DeepSeek-V4.1, MiniMax-M3.1, Qwen GDN, Hopper Triton Indexer) | *Không có bản phát hành mới* (Nhánh phát triển ổn định) |
| **SGLang** | Engine phục vụ thông lượng cao / Có cấu trúc | 5 vấn đề lớn (rò rỉ tầng host HiCache, OOM bộ lập lịch Mooncake, độ trễ ghi lại của HiCache) | 6 điểm nổi bật (AMD consumer RDNA, XPU VMoBA, Kimi-K3 DCP, AITER/DeepSeek kernel fusions) | *Không có bản phát hành mới* (Nhánh phát triển tích cực) |
| **llama.cpp** | Runtime suy luận C/C++ Cục bộ | 4 vấn đề lớn (treo đồ thị CUDA sm_120, rò rỉ trạng thái ROCm, lỗ hổng KV nháp, Metal OOM) | 7 điểm nổi bật (LiquidAI LFM3, Spark-X2.6, Hexagon HVX, `ClassLRU` MoE, Sao chép tensor theo lô) | **Đã phát hành v0.8.0** (LFM3 văn bản/thị giác/âm thanh/omni, `/v1/realtime`, `/tts`) |
| **Ollama** | Trình chạy cục bộ & Điều phối Desktop | 4 vấn đề lớn (sụp đổ bộ đệm prompt Vulkan, đánh giá quá cao VRAM Gemma 4, tràn tensor MoE) | 5 điểm nổi bật (LiquidAI LFM3 đa nền tảng, MLX Windows, Chỉ số dự đoán, Flash Attention) | **Đã phát hành v0.40.13** (Hỗ trợ LiquidAI LFM3 cho Linux/Windows/macOS) |
| **LiteLLM** | LLM Gateway & Universal Proxy | 4 vấn đề lớn (bỏ qua Vertex trực tiếp, cạn kiệt ngân sách khóa quản trị, kết quả đánh giá kiểm duyệt nhầm lẫn) | 5 điểm nổi bật (Guardrail phát trực tuyến bất đồng bộ, lập chỉ mục một phần nhật ký chi phí, gom kết nối HTTP/2) | **Đã phát hành v1.106.6 & v1.105.7** (Bắt buộc chữ ký container `cosign`) |
| **Unsloth** | Framework Tinh chỉnh & Studio Cục bộ | 5 vấn đề lớn (tràn ngữ cảnh tương thích Anthropic, OOM mất mát Qwen3.5, ngập tệp SQLite WAL) | 5 điểm nổi bật (Apple MLX đa phương thức/âm thanh, biên dịch chú ý đóng gói, tiết kiệm VRAM Mac) | **v0.1.912-beta** ("Trick or Treat + Optimizations") |

---

### 3. Cuộc đua Hỗ trợ Model
* **Dòng LiquidAI LFM3 (Văn bản, Thị giác, Âm thanh, Omni):** Kiến trúc này đại diện cho việc triển khai đa dự án thống trị trong ngày. Nó đã được áp dụng nguyên bản trên `llama.cpp` (bản phát hành v0.8.0 với cơ sở hạ tầng phát trực tuyến `mtmd`), Ollama (bản phát hành đa nền tảng v0.40.13) và Unsloth Studio (thông qua `mlx-vlm 0.7.11` cho các truy vấn giọng nói/lời nói).
* **DeepSeek-V4 / V4.1 & MiniMax-M3.1:** Các engine doanh nghiệp hiệu năng cao đang dẫn đầu việc tích hợp các model tiên tiến này. Cả vLLM và SGLang đều giới thiệu các đường dẫn kernel và phục vụ cho DeepSeek-V4.1 (nhắm mục tiêu các định dạng 528B MXFP8/288B NVFP4 trên AMD MI355X/gfx950 và các backend NVIDIA) và MiniMax-M3.1-Flash (bao gồm hỗ trợ bản nháp DSpark).
* **Kiến trúc Chuyên biệt & Bản nháp:** `llama.cpp` đã bổ sung hỗ trợ cho các model bản nháp Spark-X2.6 DSpark, trong khi vLLM tích hợp các model ra quyết định Mammoth-1 & Elephant-1 của Base Labs có tính năng mặt nạ hai chiều theo khối (block-bidirectional masks).

---

### 4. Biên giới Hiệu năng
* **KV-Cache & Quản lý Bộ nhớ:** SGLang và vLLM đang phải đối mặt với các nút thắt cổ chai về bộ đệm KV nâng cao dưới tải trọng đa tenant nặng. HiCache của SGLang gặp phải tình trạng tăng đột biến độ trễ thu hồi dưới các chính sách `write_back` và rò rỉ bộ nhớ tầng host trong các kiến trúc GDN lai, trong khi vLLM tối ưu hóa việc lập chỉ mục mã băm khối (block-hash indexing) để tránh sao chép bộ nhớ dư thừa trong quá trình tiền nạp theo khối (chunked prefills). Unsloth đã giải quyết vấn đề phân bổ quá mức VRAM trên Mac bằng cách ngăn chặn các công cụ đặt trước toàn bộ cửa sổ ngữ cảnh gốc của model ngay từ đầu.
* **Định tuyến Thông minh MoE:** `llama.cpp` đã giới thiệu `ClassLRU` — một bộ đệm lai thay thế SLRU, xếp hạng các chuyên gia (expert) được sử dụng thường xuyên bằng lịch sử sử dụng suy giảm, mang lại mức tăng thông lượng giải mã từ +6% đến +7% và giảm 8% lượng tải trọng trọng số lên. Trong khi đó, vLLM và SGLang tập trung mạnh vào các đường dẫn lượng tử hóa thưa chuyên gia (`w4afp8` và Quark FP8 KDA).
* **Tăng tốc Kernel Phần cứng:** Các nỗ lực tối ưu hóa mang tính đặc thù phần cứng sâu sắc. vLLM và SGLang nhắm mục tiêu vào AMD ROCm (tích hợp AITER MI355X/gfx950) và các kiến trúc Hopper/Blackwell SM90/SM120 (như các tối ưu hóa phân chia K của Hopper Triton indexer). Đồng thời, `llama.cpp` tập trung vào các backend cấp thấp, bổ sung các đường dẫn ARM SVE 256-bit, song song hóa Hexagon HVX cho `IM2COL`, và các API sao chép tensor theo lô trên CUDA.

---

### 5. Định vị Lớp (Layer)
* **Engine Phục vụ Thông lượng Cao (vLLM, SGLang):** Được định vị để triển khai ở quy mô trung tâm dữ liệu, phân tách đa node (multi-node disaggregation) và các model doanh nghiệp phức tạp (DeepSeek-V4, Kimi-K3). Các thách thức kỹ thuật chính của chúng tập trung vào song song hóa tensor/ngữ cảnh chi tiết, tích hợp phần cứng tùy chỉnh (ROCm/Blackwell) và phối hợp bộ đệm tiền tố phức tạp (Mooncake, HiCache).
* **Runtime Cục bộ (llama.cpp, Ollama):** Được định vị cho phần cứng tiêu dùng, thiết bị biên và máy trạm của lập trình viên. Trọng tâm của chúng là tính di động đa nền tảng (Windows/Linux/macOS trên CPU, Metal, Vulkan và SYCL) cùng với các khả năng phát trực tuyến đa phương thức có sẵn (endpoints giọng nói thời gian thực và chuyển văn bản thành giọng nói).
* **Gateway & Quản lý (LiteLLM):** Được định vị là lớp bảo mật, định tuyến và khả năng quan sát trung gian lưu lượng truy cập doanh nghiệp trên các API độc quyền và mã nguồn mở. Các nỗ lực kỹ thuật của nó nhắm đến việc giảm chi phí proxy, tăng cường bảo mật thông tin xác thực và đánh giá hàng rào bảo vệ nền.
* **Framework Đào tạo & Tinh chỉnh (Unsloth):** Được định vị ở lớp tác giả phần mềm (developer authoring layer). Nó tập trung vào việc tinh chỉnh tiết kiệm bộ nhớ, tính tương thích với PyTorch Dynamo/compile, và đóng gói các ứng dụng desktop cục bộ (Unsloth Studio) với khả năng nhận thức bộ nhớ thống nhất.

---

### 6. Tín hiệu Xu hướng
* **Chuẩn hóa Giọng nói Thời gian thực và Đa chiều (Omni-Modality):** Việc triển khai đồng thời LiquidAI LFM3 trên các runtime báo hiệu rằng các endpoint cục bộ chỉ có văn bản đang nhanh chóng nhường chỗ cho tính năng phát trực tuyến đa phương thức nguyên bản (đầu vào âm thanh, đầu ra âm thanh) được nhúng trực tiếp vào các server cục bộ.
* **Chi phí Cao của Các Chính sách Bộ đệm Nâng cao:** Các engine doanh nghiệp áp dụng các lớp bộ đệm tiền tố mạnh mẽ (như HiCache của SGLang và Mooncake) đang gặp phải các trở ngại trầm trọng về độ ổn định dưới tải sản xuất — cụ thể là các lỗi OOM của bộ lập lịch và tình trạng tăng đột biến độ trễ thu hồi — cho thấy rằng việc phân tầng bộ nhớ nâng cao cần các cấu hình mặc định mang tính bảo thủ (ví dụ: gắn bó với `write_through` thay vì `write_back`).
* **Chuỗi cung ứng và Tính vẹn toàn của Artifact:** Việc bắt buộc xác minh chữ ký container `cosign` của LiteLLM đánh dấu một xu hướng ngành đang phát triển hướng tới nguồn gốc chuỗi cung ứng nghiêm ngặt cho phần middleware hạ tầng AI được triển khai trong các cluster sản xuất.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest: 2026-10-29

### 1. Điểm nổi bật trong ngày
Tốc độ phát triển hôm nay chủ yếu được thúc đẩy bởi việc hỗ trợ các kiến trúc thế hệ mới như **DeepSeek-V4/V4.1** và **MiniMax-M3.1**, song song với các tối ưu hóa hiệu năng liên tục cho phần cứng AMD ROCm (MI355X/gfx950). Đáng chú ý, các kỹ sư cũng đang tập trung nguồn lực đáng kể vào hạ tầng truyền bộ đệm KV đa nút (multi-node KV cache transfer) ổn định và giảm thiểu chi phí bộ nhớ phụ trợ (memory overhead) cho giải mã dự đoán (speculative decoding) và các mô hình MoE lai (hybrid MoE).

---

### 2. Bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* *Không có phiên bản phát hành mới trong 24 giờ qua.*

---

### 3. Hỗ trợ Mô hình & Phần cứng Mới
* **MiniMax-M3.1-Flash:** PR [#64111](https://github.com/vllm-project/vllm/pull/64111) giới thiệu mã nguồn mô hình và các thay đổi nhân (kernel) cho các backend NVIDIA và ROCm (bao gồm cả hỗ trợ bản nháp DSpark).
* **Mammoth-1 & Elephant-1:** PR [#63114](https://github.com/vllm-project/vllm/pull/63114) bổ sung khả năng phục vụ (serving) cho các mô hình quyết định của Base Labs với các mặt nạ hai chiều dạng khối (block-bidirectional masks) đã được huấn luyện.
* **DeepSeek-V4.1 (gfx950):** PR [#57523](https://github.com/vllm-project/vllm/pull/57523) triển khai hỗ trợ cho các bản ghi KV MXFP8 528B và NVFP4 288B của DeepSeek-V4.1 trên phần cứng AMD MI355X.
* **Đường dẫn W4AFP8 MoE:** PR [#64410](https://github.com/vllm-project/vllm/pull/64410) bổ sung hỗ trợ lượng tử hóa `w4afp8` để xử lý các checkpoint theo phong cách SGLang (ví dụ: `PhalaCloud/GLM-5.3-W4AFP8`).

---

### 4. Hiệu năng & Tối ưu hóa
* **Qwen GDN & MRV2 Attention:** PR [#62961](https://github.com/vllm-project/vllm/pull/62961) tăng tốc độ giải mã trên các mô hình kiến trúc Qwen3.5 bằng cách loại bỏ các phép tính dư thừa khỏi các lớp gated delta net (GDN) và metadata attention của Model Runner V2. Đạt mức **tăng tốc 5.8%** ở kích thước batch bằng 1 khi không dùng kỹ thuật dự đoán (và 5.6% khi dùng MTP) trên mô hình Qwen3.8-27B với TP4 trên B300.
* **Hopper Triton Indexer:** PR [#64037](https://github.com/vllm-project/vllm/pull/64037) kích hoạt SM90 split-K trong bộ lập chỉ mục Triton cho MiniMax-M3, giải quyết các điểm nghẽn tiền nạp phân đoạn bị giới hạn bởi độ trễ (latency-bound chunked prefill bottlenecks) trên Hopper (trước đây chỉ khởi chạy 32 CTA trên 132 SM).
* **Mô phỏng OCP MX:** PR [#64406](https://github.com/vllm-project/vllm/pull/64406) tối ưu hóa việc mô phỏng OCP MX trên phần cứng không phải bản địa (ví dụ: MI250X) bằng cách giải lượng tử hóa **chỉ các chuyên gia được định tuyến (routed experts)** thay vì mọi chuyên gia cục bộ trong mỗi lượt chuyển tiếp (forward pass).
* **Trình quản lý KV-Cache:** PR [#64409](https://github.com/vllm-project/vllm/pull/64409) giới hạn các lát cắt băm khối (block-hash slices) một cách nghiêm ngặt đối với các khối mới được lưu vào bộ đệm, ngăn chặn việc sao chép băm dư thừa trong quá trình tiền nạp phân đoạn (chunked prefill).

---

### 5. Độ ổn định & Hồi quy (Regressions)
* **Truy cập bộ nhớ không hợp lệ / Lỗi CUDA:** Vấn đề [#24430](https://github.com/vllm-project/vllm/issues/24430) theo dõi lỗi rải rác `torch.AcceleratorError: CUDA error: an illegal memory access was encountered` (Đã đóng/Cũ, nhưng phản ánh những rào cản về độ ổn định ở rìa phần cứng đang diễn ra).
* **Hybrid MoE + TurboQuant trên Ampere:** Vấn đề [#40124](https://github.com/vllm-project/vllm/issues/40124) chi tiết hóa một dạng lỗi khi bộ đệm KV TurboQuant kết hợp với các mô hình MoE lai (ví dụ: Qwen3.6-35B-A3B) bị hỏng trên Ampere (SM 80–86) do các giả định chỉ dành riêng cho Hopper trong mã nguồn.
* **Tính tái nhập (Re-entrancy) của KV-Offload:** PR [#59099](https://github.com/vllm-project/vllm/pull/59099) giải quyết lỗi gọi `reset_cache()` hai lần trên kết nối offload trước một bước chạy của engine, gây ra lỗi khẳng định (`assert not self._current_batch_jobs_to_flush`).

---

### 6. Điều này có ý nghĩa gì đối với Lập trình viên Ứng dụng
* **Sự mở rộng của các kiến trúc chuyên biệt:** Hạ tầng nguyên bản (native infrastructure) đang trưởng thành nhanh chóng đối với các mô hình MoE lai và các biến thể attention nâng cao (như GatedDeltaNet và các biến thể tương cận MLA có trong các bản phát hành Qwen và DeepSeek mới hơn). Nếu bạn đang nhắm tới các trọng số mở tiên tiến nhất (bleeding-edge open weights), vLLM ngày càng hỗ trợ nhiều đường dẫn thực thi được tối ưu hóa ngay khi xuất xưởng.
* **Cải thiện tính năng Caching tiền tố phân tán và đa nút:** Công việc ổn định hóa liên tục xung quanh các kết nối lưu trữ Mooncake, MoRI EPv2 và các chế độ độc lập UMBP (PR [#63002](https://github.com/vllm-project/vllm/pull/63002)) báo hiệu rằng việc tái sử dụng cache tiền tố đa nút và các mô hình phục vụ phân tách (disaggregated serving topologies) đang dần trở nên đủ mạnh mẽ cho các workload tác vụ (agentic workloads) trong sản xuất với ngữ cảnh cực lớn.
* **Sự tinh tế theo tầng phần cứng:** Các PR tối ưu hóa tiếp tục làm nổi bật sự chênh lệch hiệu năng giữa phần cứng thế hệ Ampere (SM8x), Hopper (SM90) và Blackwell (SM120), cũng như các dòng phần cứng tương đương của ROCm. Hãy đảm bảo cấu hình triển khai của bạn khớp chặt chẽ với các đường dẫn nhân đã được kiểm chứng (ví dụ: Marlin so với các backend FP4 nguyên bản) để tránh hiện tượng suy giảm hiệu năng bất ngờ.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest: 2026-10-29

### 1. Điểm nổi bật trong ngày
Hoạt động của SGLang trong ngày hôm nay tập trung chủ yếu vào **các tối ưu hóa được tăng tốc bằng phần cứng dành cho các kiến trúc chú ý đa tiềm ẩn nâng cao (MLA - multi-latent attention) và hỗn hợp chuyên gia (MoE - mixture-of-experts)** (như DeepSeek-V4 và Kimi-K3) trên cả hai nền tảng AMD ROCm (`gfx950`) và NVIDIA Hopper/Blackwell. Công tác phát triển tính năng cốt lõi đang được tiến hành cho các giao thức phân tách Tiền xử lý-Giải mã (Prefill-Decode - PD) và Song song ngữ cảnh giải mã (DCP - Decode Context Parallelism), trong khi các nỗ lực ổn định hướng tới việc khắc phục tình trạng rò rỉ bộ nhớ ngắt quãng trong kiến trúc GDN kết hợp và môi trường CI không ổn định.

---

### 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* *Không có bản phát hành chính thức nào được công bố trong 24 giờ qua.*

---

### 3. Hỗ trợ Model & Phần cứng Mới
* **Kích hoạt AMD Consumer Radeon RDNA3/RDNA4:** Một lộ trình toàn diện và vấn đề theo dõi (tracking issue) đã được mở nhằm mang lại hỗ trợ chính thức cho các dòng card phổ thông (`gfx1100`/`gfx1101` và `gfx1200`/`gfx1201`), mở rộng khả năng của ROCm vượt ra ngoài phần cứng Instinct chuyên dụng cho trung tâm dữ liệu ([Issue #30599](https://github.com/sgl-project/sglang/issues/30599)).
* **Hỗ trợ GPU Moore Threads MUSA:** Công việc tích hợp runtime chính thống cho các kiến trúc Moore Threads vẫn đang tiếp tục diễn tiến ([Issue #16565](https://github.com/sgl-project/sglang/issues/16565)).
* **Đường dẫn Intel XPU VMoBA:** Một pull request đã được gửi lên nhằm giới thiệu đường dẫn backend chú ý varlen trên XPU được hỗ trợ bởi cài đặt SYCL của `sgl-kernel` dành cho VMoBA ([PR #46749](https://github.com/sgl-project/sglang/pull/46749)).
* **Tích hợp Ascend NPU Kimi-K3 DCP:** Đã thêm hỗ trợ cho Song song ngữ cảnh giải mã (DCP) với cơ chế truyền thông gọn nhẹ được chia sẻ và giải mã dự đoán DSPARK trên các NPU Ascend ([PR #40825](https://github.com/sgl-project/sglang/pull/40825)).

---

### 4. Hiệu năng & Tối ưu hóa
* **Tối ưu hóa GLM-5.3 Hopper & CP Prefill:** Việc theo dõi đang diễn ra đối với việc tối ưu hóa GLM-5.3-Flash trên các mục tiêu SM90 nhằm giảm thời gian sinh token đầu tiên (TTFT) thông qua tiền xử lý song song theo ngữ cảnh kết hợp với giải mã song song theo tensor ([Issue #45373](https://github.com/sgl-project/sglang/issues/45373), [PR #46857](https://github.com/sgl-project/sglang/pull/46857)). Được benchmark trên tác vụ 8 × B300 với 262k token đầu vào, chiến lược này cải thiện đáng kể thông lượng.
* **Hợp nhất Kernel AMD Kimi-K3 & DeepSeek-V2/V4:** Một loạt các PR hiệu năng của AMD hướng tới các tối ưu hóa ROCm/AITER gfx950, bao gồm việc chạy các phép chiếu trong (in-projections) Quark FP8 KDA trên các kernel FP8 ([PR #44362](https://github.com/sgl-project/sglang/pull/44362)), hợp nhất các truy vấn giải mã MLA và việc ghi KV cache tiềm ẩn ([PR #43127](https://github.com/sgl-project/sglang/pull/43127)), và định tuyến các lớp MoE thông qua các thuật toán BF16 GEMM đã được tinh chỉnh ([PR #44360](https://github.com/sgl-project/sglang/pull/44360)).
* **Tiền xử lý DeepSeek-V4 trên SM120:** Các thảo luận về hiệu năng kiểm tra các hành vi thông lượng của Blackwell SM120 (`TP=4` trên 4× RTX PRO 6000), làm nổi bật nhu cầu tinh chỉnh đặc thù theo phần cứng cho các tác vụ tiền xử lý ([Issue #33422](https://github.com/sgl-project/sglang/issues/33422)).

---

### 5. Độ ổn định & Hồi quy (Regressions)
* **Cạn kiệt tầng máy chủ HiCache GDN (Mức độ nghiêm trọng cao):** Một lỗi nghiêm trọng đã được báo cáo khi tỷ lệ cache hit ở tầng máy chủ giảm về 0 ngay khi tập làm việc bị loại bỏ (evicted working set) vượt quá ~3 tiền tố dài trên các mô hình GDN kết hợp do rò rỉ vùng nhớ đệm Mamba ở phía máy chủ ([Issue #45400](https://github.com/sgl-project/sglang/issues/45400)).
* **Lỗi OOM Lên lịch Mooncake L3 / HiCache (Mức độ nghiêm trọng cao):** Chạy `buffer_only` với Mooncake L3 dưới tải ổn định có thể khiến bộ lập lịch nạp các phần tiền tố đã chia nhỏ (chunked prefills) mà nó không thể hoàn thành, dẫn đến lỗi sập "Prefill out of memory" không thể khôi phục khi tất cả các nút radix bị khóa ([Issue #45989](https://github.com/sgl-project/sglang/issues/45989)).
* **Độ trễ tăng đột biến của HiCache `write_back`:** Việc chuyển đổi từ chính sách loại bỏ `write_through` sang `write_back` dưới tải ổn định khiến thời gian loại bỏ trên mỗi lệnh gọi (`eviction_duration_seconds`) tăng vọt khoảng 500 lần (từ 0.6ms), làm giảm tỷ lệ hit của cache tiền tố ([Issue #46952](https://github.com/sgl-project/sglang/issues/46952)).
* **Lỗi OOM của Trình chọn Cập nhật Trọng số / DRAFT:** Việc cập nhật trọng số từ đĩa sẽ âm thầm tải các trọng số mục tiêu vào các mô hình nháp DFLASH mà không có ràng buộc bộ chọn (selector constraint), gây ra các trạng thái cấp phát bất ngờ ([Issue #46806](https://github.com/sgl-project/sglang/issues/46806)).
* **Xung đột Công cụ + JSON-Schema:** Việc kết hợp lệnh gọi công cụ (tool calls) và các định dạng phản hồi JSON-schema nghiêm ngặt làm hỏng hành vi suy luận trên nhiều engine (Kimi-K3 trả về lỗi 400; GLM-4.7 và DeepSeek âm thầm bỏ qua các lệnh gọi công cụ) ([Issue #47167](https://github.com/sgl-project/sglang/issues/47167)).

---

### 6. Điều này có ý nghĩa gì đối với các Nhà phát triển Ứng dụng
* **Thận trọng với Chế độ Write-Back của HiCache:** Nếu bạn đang vận hành các cụm sản xuất (production fleets) có độ đồng thời cao và sử dụng HiCache, hãy tạm thời gắn bó với các chính sách `write_through`. Việc chuyển sang `write_back` làm phát sinh độ trễ loại bỏ gây nghẽn bộ lập lịch nghiêm trọng dưới tải nặng.
* **Hạn chế về Xác thực Schema & Gọi Công cụ:** Tránh cố gắng truyền các schema JSON cứng nhắc đồng thời với các định nghĩa sử dụng công cụ trên các bản dựng hiện tại nếu nhắm mục tiêu vào các mô hình như Kimi-K3 hoặc DeepSeek, vì hiện tượng từ chối yêu cầu hoặc suy giảm định dạng ngầm định sẽ xảy ra cho đến khi các bản vá phân tích cú pháp ở thượng nguồn được hợp nhất.
* **Mở rộng Mục tiêu Sản xuất AMD & Phi-Nvidia:** Nếu bạn đang triển khai các mô hình tiên tiến (như GLM-5.3 hoặc các biến thể Kimi) trên phần cứng AMD MI350/gfx950, các đường dẫn custom kernel mạnh mẽ (tích hợp AITER) đang trưởng thành rất nhanh, giúp thu hẹp đáng kể khoảng cách về hiệu năng so với các bản triển khai trên NVIDIA Hopper.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-10-29

### 1. Các điểm nổi bật hôm nay
Công tác phát triển hôm nay tập trung vào việc tinh chỉnh kernel cấp thấp một cách mạnh mẽ cho các phần cứng chuyên dụng (Hexagon, SVE, SYCL và CUDA), bên cạnh hệ thống quản lý bộ nhớ tiên tiến dành cho việc định tuyến Mixture-of-Experts (MoE). Các công việc đáng chú ý về kiến trúc bao gồm việc triển khai hỗ trợ dòng model LiquidAI LFM3 trên cácμ đa phương thức văn bản, thị giác, âm thanh và đa năng (omni). Ngoài ra, các luồng tăng tốc phần cứng cũng nhận được các bản cập nhật lớn, đặc biệt hướng tới các phép nhân ma trận đa tile (multi-tile) và các thao tác sao chép tensor theo lô (batched tensor copy).

---

### 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
- **Phát hành v0.8.0**: [Release v0.8.0](https://github.com/ggml-org/llama.cpp/releases/tag/v0.8.0) chính thức ra mắt, mang đến dòng model **LiquidAI LFM3** (văn bản, thị giác, âm thanh và đa năng) bên cạnh API stream âm thanh thử nghiệm trong `mtmd`. Bản phát hành này tích hợp tính năng truyền tải âm thanh thời gian thực hai chiều vào và ra khỏi server thông qua các endpoint mới `/v1/realtime` và `/tts`.

---

### 3. Hỗ trợ Model & Phần cứng mới
- **Dòng model LiquidAI LFM3**: Tích hợp sẵn sàng hỗ trợ native cho văn bản, thị giác, âm thanh và đa năng trên các tầng của model và hạ tầng stream `mtmd`.
- **Bản nháp Spark-X2.6 / DSpark**: [PR #31168](https://github.com/ggml-org/llama.cpp/pull/31168) bổ sung hỗ trợ chuyển đổi và suy luận (inference) cho các model nháp Spark-X2.6 DSpark.
- **Cải tiến Backend Hexagon**: 
  - [PR #31050](https://github.com/ggml-org/llama.cpp/pull/31050) thực hiện song song hóa HVX dựa trên khối (block-based) cho `IM2COL`, mang lại lợi ích lớn cho PocketTTS và các luồng xử lý giọng nói.
  - [PR #30995](https://github.com/ggml-org/llama.cpp/pull/30995) giới thiệu hỗ trợ `conv2d` đầy đủ với đệm trạng thái kép (double-buffered staging) và các đường dẫn GEMM ẩn (implicit GEMM paths).
- **ARM SVE**: [PR #30585](https://github.com/ggml-org/llama.cpp/pull/30585) bổ sung đường dẫn SVE 256-bit cho `ggml_gemv_q8_0_4x8_q8_0` nhắm tới các nhân ARM hiệu suất cao.

---

### 4. Hiệu suất & Tối ưu hóa
- **Bộ nhớ đệm MoE thông minh (`ClassLRU`)**: [PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233) đề xuất thay thế SLRU bằng bộ nhớ đệm lai lấy cảm hứng từ LRFU/MQ (`ClassLRU`), xếp hạng các chuyên gia (expert) được sử dụng thường xuyên trong các lớp bằng lịch sử sử dụng có suy giảm (decaying usage history). Các benchmark cho thấy **thông lượng giải mã tăng +6% trên QFN** và **+7% trên GLM** so với SLRU, đi kèm với việc **giảm 8% lượng weight tải lên**.
- **API Sao chép Tensor theo lô**: [PR #30881](https://github.com/ggml-org/llama.cpp/pull/30881) giới thiệu một API sao chép tensor theo lô tổng quát (`ggml_backend_tensor_copy_n`, v.v.) thay thế cho đường dẫn `_2d` cũ, được tối ưu hóa mạnh mẽ bởi [PR #30986](https://github.com/ggml-org/llama.cpp/pull/30986) để gom các thao tác đọc tensor theo lô trực tiếp vào vùng nhớ host đã ánh xạ (mapped host memory) trên CUDA.
- **Tối ưu hóa OpenCL & SYCL**: 
  - [PR #30412](https://github.com/ggml-org/llama.cpp/pull/30412) đưa vào các GEMM `q4_k` dạng tiled được tối ưu hóa cho GPU Qualcomm Adreno.
  - [PR #31110](https://github.com/ggml-org/llama.cpp/pull/31110) thực hiện các thao tác argmax theo work-group cho các hàng `TOP_K` ngắn trên SYCL.

---

### 5. Độ ổn định & Hồi quy (Regressions)
- **Lỗi treo CUDA Graph (RTX 5090 / sm_120)**: [Issue #27330](https://github.com/ggml-org/llama.cpp/issues/27330) vẫn là một trở ngại đánh giá đang diễn ra, nơi các đồ thị CUDA kích hoạt thời gian chờ RC watchdog và lỗi `Xid 8` trên phần cứng sm_120. *Giải pháp tạm thời:* Đặt biến `GGML_CUDA_DISABLE_GRAPHS=1`.
- **Rò rỉ trạng thái hồi tiếp trên ROCm / HIP**: [Issue #29092](https://github.com/ggml-org/llama.cpp/issues/29092) báo cáo rằng các thao tác Gated Delta Net hợp nhất truyền trạng thái hồi tiếp (recurrent state) qua các request trên các khe (slot) server được tái sử dụng (ảnh hưởng đến các biến thể Qwen3.5/MoE), thỉnh thoảng làm rò rỉ nguyên văn văn bản prompt trước đó sang các phần hoàn thành (completion) tiếp theo.
- **Lỗ hổng vị trí trong KV Cache của model nháp**: [Issue #27408](https://github.com/ggml-org/llama.cpp/issues/27408) theo dõi một lỗi nghiêm trọng khi chạy `--spec-type draft-dflash` trong đó các khối hình ảnh để lại các lỗ hổng vị trí trong KV cache của bản nháp, gây ra lỗi `llama_decode(ctx_dft) rc=-1` và buộc server trả về lỗi 500.
- **Lỗi hết bộ nhớ (OOM) Metal khi khởi động Server**: [Issue #27309](https://github.com/ggml-org/llama.cpp/issues/27309) phơi bày một lỗi điều kiện tranh chấp (race condition) trong đó server báo cáo "model đã được tải" và bind cổng của nó mặc dù gặp phải lỗi OOM Metal nghiêm trọng trong quá trình khởi động, dẫn đến các lỗi 500 không được xử lý trên tất cả các request tiếp theo.

---

### 6. Điều này có ý nghĩa gì đối với các Lập trình viên Ứng dụng
- **Tác nhân Giọng nói và Đa phương thức Thời gian thực**: Với việc tích hợp LiquidAI LFM3 và các endpoint `/v1/realtime` / `/tts` mới trong `llama-server`, việc xây dựng các tác nhân giọng nói tự host, có độ trễ thấp với luồng âm thanh trực tiếp giờ đây trở nên ổn định hơn đáng kể ngay khi xuất xưởng.
- **Tinh chỉnh dung lượng bộ nhớ MoE**: Nếu bạn đang chạy các kiến trúc MoE thưa thớt quy mô lớn (như Qwen MoE hoặc các biến thể của DeepSeek), hãy theo dõi tiến trình của bộ nhớ đệm `ClassLRU` ([PR #31233](https://github.com/ggml-org/llama.cpp/pull/31233)). Nó mang lại khả năng tăng tốc suy luận có thể đo lường được và giảm bớt các thao tác truyền dữ liệu PCIe giữa CPU và GPU trong các điều kiện bộ nhớ đệm đã được làm ấm (warm caching).
- **Chỉ số Server chi tiết**: Khả năng quan sát hạ tầng đang được mở rộng thông qua [PR #26130](https://github.com/ggml-org/llama.cpp/pull/26130), qua đó hiển thị trực tiếp dung lượng bộ nhớ phân bổ theo từng thiết bị (chia theo trọng số, context/KV cache và bộ đệm tính toán) thông qua các endpoint `/metrics` và `GET /memory` để tích hợp vào Prometheus/Grafana.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Bản tin Hạ tầng Ollama — 29-10-2026

### 1. Điểm nhấn trong ngày
Ollama v0.40.13 chính thức ra mắt với khả năng thực thi đa nền tảng được mở rộng cho các kiến trúc LFM3 của Liquid AI, mang tính năng chuyển đổi văn bản thành giọng nói (text-to-speech) lên các máy chủ chạy Linux và Windows. Song song với đó, các nỗ lực về hạ tầng tập trung vào việc khắc phục các lỗi hồi quy (regression) giữa các backend—giải quyết tình trạng sụt giảm thông lượng nghiêm trọng trên Vulkan ở phần cứng AMD, ổn định các phụ thuộc thời gian chạy MLX, đồng thời bổ sung các số liệu về giải mã suy đoán (speculative decoding) theo từng yêu cầu nhằm phục vụ khả năng quan sát (observability).

### 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
- **v0.40.13**: Phát hành kèm hỗ trợ đa nền tảng cho [LFM3](https://ollama.com/library/lfm3), [lfm3-audio](https://ollama.com/library/lfm3-audio), và [lfm3-omni](https://ollama.com/library/lfm3-omni) trên Linux và Windows bên cạnh Apple Silicon.
- **Lỗi thoát ký tự trong Modelfile ([#19342](https://github.com/ollama/ollama/issues/19342) / [#19363](https://github.com/ollama/ollama/pull/19363))**: Trước đây, lệnh `ollama show --modelfile` tuần tự hóa các tham số được bọc trong `"""` mà không thoát ký tự các chuỗi bên trong, khiến lệnh `ollama create` bị lỗi khi xử lý văn bản chứa dấu ngoặc kép ba. Một bản vá đã được đề xuất nhằm lược bỏ các định dạng không thể biểu diễn.

### 3. Hỗ trợ Mô hình & Phần cứng Mới
- **Liquid AI LFM3**: Việc thực thi nguyên bản (native execution) đã được mở rộng vượt ngoài macOS, cho phép các môi trường Windows và Linux khởi chạy các mô hình văn bản và âm thanh (mặc dù các máy chủ không phải của Apple trước đó gặp lỗi thiếu thời gian chạy MLX; xem thêm phần ghi chú độ ổn định).
- **Backend MLX cho Windows & CPU ([#19366](https://github.com/ollama/ollama/pull/19366))**: Một PR đáng chú ý bổ sung khả năng thực thi nguyên bản trên Windows cho trình chạy MLX, đi kèm backend CPU bên cạnh hỗ trợ Metal và CUDA.
- **Xử lý Projector Đa phương thức (Multimodal Projector) ([#19328](https://github.com/ollama/ollama/pull/19328))**: Đã sửa logic tính năng của projector để đảm bảo các mô hình chỉ có projector âm thanh (ví dụ: *Voxtral Mini*) không bị đăng ký nhầm thành có khả năng xử lý thị giác (vision-capable).

### 4. Hiệu năng & Tối ưu hóa
- **Số liệu Giải mã Suy đoán ([#19368](https://github.com/ollama/ollama/pull/19368))**: Lệnh `ollama run --verbose` và các đầu ra API giờ đây báo cáo các số liệu chính xác về số lượng token được dự thảo (drafted) và được chấp nhận (accepted), thay thế cho các ước tính tỷ lệ chấp nhận thô vốn gây hiểu lầm.
- **Mặc định Flash Attention ([#19477](https://github.com/ollama/ollama/pull/19477))**: Công việc đang được triển khai để yêu cầu rõ ràng Flash Attention đối với các kiến trúc như `gpt-oss` vốn đặt mặc định tính năng này, nhằm ngăn chặn tình trạng sập (crash) do giới hạn độ dài ngữ cảnh khi giảm tải một phần GPU (partial GPU offloading) khiến chế độ `auto` vô hiệu hóa nó.

### 5. Độ ổn định & Lỗi hồi quy (Regressions)
- **Chậm bộ nhớ đệm prompt trên Vulkan ([#19201](https://github.com/ollama/ollama/issues/19201))**: Lỗi hồi quy mức độ nghiêm trọng cao trên Ubuntu Server sử dụng AMD Radeon (Mesa RADV), thể hiện tình trạng sụt giảm thông lượng khoảng ~29.7 lần ở yêu cầu giống hệt thứ hai khi bộ nhớ đệm prompt trên bộ nhớ máy chủ (host-memory prompt caching) được bật.
- **Ước tính dư thừa VRAM của Gemma 4 ([#19357](https://github.com/ollama/ollama/issues/19357))**: Trình lập lịch (scheduler) dự đoán thừa bộ nhớ cho `gemma4:e4b` gấp 3–4 lần do trọng số embedding theo từng lớp được ánh xạ qua CPU (CPU-mapped per-layer embedding weights) bị tính nhầm thành VRAM, kích hoạt việc giải phóng mô hình (model eviction) không cần thiết.
- **Nhầm lẫn về Thời gian chạy MLX của LFM3 ([#19343](https://github.com/ollama/ollama/issues/19343), [#19369](https://github.com/ollama/ollama/issues/19369))**: Các đợt triển khai ban đầu của các mô hình LFM3 gây ra các lỗi khó hiểu liên quan đến việc thiếu thời gian chạy MLX trên các máy chủ không dùng Apple Silicon trước khi bản vá v0.40.13 và tài liệu thư viện được cập nhật.
- **Tràn kích thước Tensor MoE ([#19375](https://github.com/ollama/ollama/issues/19375))**: Các mô hình Mixture-of-Experts lớn sử dụng định dạng MXFP4 (như `gpt-oss:120b`) gặp lỗi trong quá trình phân tích cú pháp siêu dữ liệu GGUF do tràn số nguyên (integer overflow) trên trường `ffn_down_exps.weight`.

### 6. Ý nghĩa đối với Nhà phát triển ứng dụng
- **Các điểm lưu ý khi gọi Công cụ của Tác nhân (Agent Tool Calling)**: Nếu bạn đang điều phối các tác nhân sử dụng các kiến trúc như Qwen 3.8 (`qwen3.8:27b-mlx`), cần lưu ý rằng việc gọi công cụ có thể thất bại nếu mô hình cố gắng tạo ra văn bản tự nhiên dạng tự do *trước* khi thực thi lệnh gọi công cụ (tức là lời mở đầu trò chuyện sẽ làm hỏng quá trình thực thi ở hạ nguồn trừ khi khối công cụ được phát ra ngay lập tức với trường nội dung trống).
- **Tính thuần khiết của Biến môi trường**: Các cấu hình CORS thông qua `OLLAMA_ORIGINS` và `OLLAMA_REMOTES` giờ đây sẽ tự động loại bỏ các khoảng trắng bao quanh các mục được phân tách bằng dấu phẩy ([#19365](https://github.com/ollama/ollama/pull/19365)), giúp giảm thiểu các lỗi xác thực middleware hoặc từ chối kết nối khó phát hiện.
- **Xử lý Vai trò trên Cloud & API**: Các tầng API tương thích với OpenAI khi tương tác với các mô hình cụ thể (như Mistral Large 4 thông qua Ollama Cloud) có thể gặp lỗi HTTP 400 nếu các SDK của client (như Codex) truyền vai trò `"developer"` thay vì vai trò chuẩn `"system"` ([#19021](https://github.com/ollama/ollama/issues/19021)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# Bản tin Hạ tầng LiteLLM — 29 tháng 10, 2026

## 1. Điểm nổi bật trong ngày
Các cập nhật hạ tầng LiteLLM tập trung vào việc tăng cường bảo mật, quét bộ lọc an toàn (guardrail) bất đồng bộ trong nền cho các phản hồi dạng streaming ([PR #48952](https://github.com/BerriAI/litellm/pull/48952)), và công việc nền tảng hướng tới đợt di chuyển sang proxy Rust rất được mong đợi ([Issue #31263](https://github.com/BerriAI/litellm/issue/31263)). Ngoài ra, các PR gần đây cũng giải quyết các nút thắt quan trọng về khả năng quan sát (observability), bao gồm việc tối ưu hóa bộ lọc trang nhật ký (logs) thông qua lập chỉ mục một phần cơ sở dữ liệu (partial database indexing) ([PR #48932](https://github.com/BerriAI/litellm/pull/48932)).

---

## 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* **Phát hành v1.106.6 & v1.105.7**: Cả hai bản phát hành đều nhấn mạnh tính toàn vẹn của artifact, bắt buộc xác thực chữ ký cho tất cả các Docker image bằng `cosign` và khóa xác thực được giới thiệu trong commit [`e82a3c6`](https://github.com/BerriAI/litellm/commit/e82a3c646908ba0a6ee0beddc4310d7a6cac4065).
* **Thay đổi phá vỡ trong Định tuyến & Giao thức**: 
  * [PR #40631](https://github.com/BerriAI/litellm/pull/40631) chuyển các truy vấn kho vector Vertex AI Search sang HTTP/2 và tái sử dụng OAuth token. Hãy đặt `http2: false` hoặc `LITELLM_HTTP2=0` để buộc sử dụng HTTP/1.1.
  * [PR #39555](https://github.com/BerriAI/litellm/pull/39555) khắc phục lỗi định tuyến quản lý trên `/key/generate`, `/team/new`, `/user/new`, và `/v1/batches` để báo cáo chính xác trạng thái HTTP 400/404 thay vì che giấu chúng thành mã lỗi chung chung `internal_server_error`.

---

## 3. Hỗ trợ Phần cứng & Model mới
* **Nhà cung cấp mới (Providers)**: 
  * **Kyma API**: Được thêm vào như một nhà cung cấp tương thích với OpenAI, tích hợp cấu hình model vào giao diện Quản trị (Admin UI) ([PR #48756](https://github.com/BerriAI/litellm/pull/48756)).
  * **Định tuyến Bedrock (Bedrock Routing)**: Các ID model Bedrock chưa được liệt kê hoặc chưa ánh xạ giờ đây sẽ tự động chuyển đổi dự phòng (fallback) một cách mượt mà sang API `Converse` nguyên bản thay vì lỗi sớm với mã 404 ([PR #43290](https://github.com/BerriAI/litellm/pull/43290)).

---

## 4. Hiệu năng & Tối ưu hóa
* **Tối ưu hóa Truy vấn Nhật ký Chi phí**: [PR #48932](https://github.com/BerriAI/litellm/pull/48932) giới thiệu một chỉ mục một phần (partial index) kết hợp 128 ký tự đầu tiên của mã lỗi và `startTime`, giúp ngăn chặn việc quét tuần tự toàn bộ (full sequential scan) trên hàng triệu bản ghi tại trang Nhật ký Lỗi của proxy UI (trước đây mất ~30 giây cho 1,2 triệu dòng khi thao tác lọc).
* **Gom kết nối HTTP/2 (HTTP/2 Connection Pooling)**: Tích hợp kho vector Vertex AI Search giờ đây gom nhóm các kết nối Google cho mỗi tiến trình con (worker) qua HTTP/2 và dùng chung OAuth token được tái sử dụng ([PR #40631](https://github.com/BerriAI/litellm/pull/40631)).
* **Tiến độ Viết lại bằng Rust**: Tiếp tục theo dõi ticket cha [Issue #31263](https://github.com/BerriAI/litellm/issue/31263) để tổng hợp các phản hồi từ bản beta đầu tiên nhằm đạt mục tiêu độ trễ gateway dưới 1ms.

---

## 5. Độ ổn định & Lỗi hồi quy (Regressions)
* **Mức độ Nghiêm trọng Cao**: 
  * **Bỏ qua Quyền truy cập Model trên Vertex AI Live**: [PR #47716](https://github.com/BerriAI/litellm/pull/47716) giải quyết lỗ hổng bảo mật nơi các khóa bị giới hạn có thể vượt qua các ràng buộc model thông qua kết nối WebSocket `/vertex_ai/live`, do việc ủy quyền model chỉ kiểm tra các thông điệp thiết lập sau khi bắt tay (post-handshake). Đã đóng kết nối với mã 1008 khi vi phạm.
  * **Thực thi Hạn mức Token trên Khóa Admin**: [Issue #48364](https://github.com/BerriAI/litellm/issue/48364) báo cáo rằng các giới hạn ngân sách tối đa / TPM (token mỗi phút) cấu hình cho các khóa cấp admin không được thực thi đúng khi đã cạn kiệt.
* **Mức độ Nghiêm trọng Trung bình/Thấp**:
  * **Dương tính giả bộ lọc nhúng (Embeddings Moderation False Positives)**: [PR #48934](https://github.com/BerriAI/litellm/pull/48934) sửa lỗi khi bật `google_text_moderation` sẽ điều hướng nhầm `/v1/embeddings` qua các pipeline kiểm duyệt văn bản, khiến các payload chuẩn bị lỗi với HTTP 400.
  * **Véc-tơ Nhiễm độc Bộ nhớ đệm (Cache Poisoning Vector)**: [PR #48917](https://github.com/BerriAI/litellm/pull/48917) kiểm toán phạm vi khóa bộ nhớ đệm (cache key scoping) cho `/v1/responses` và `/v1/messages` nhằm ngăn chặn các tenant tùy ý chèn các mục cache chéo nhóm thông qua `metadata` do client cung cấp.

---

## 6. Điều này có ý nghĩa gì đối với Lập trình viên ứng dụng
* **Bộ lọc phát trực dữ liệu không ảnh hưởng độ trễ (Streaming Guardrails Without Latency Penalties)**: Với `streaming_scan_in_background: true` ([PR #48952](https://github.com/BerriAI/litellm/pull/48952)), các kiểm tra an toàn của Bedrock đối với đầu ra dạng stream có thể chạy đồng thời ở chế độ nền. Điều này giúp tránh hiện tượng tạm dừng tạo token giữa chừng trong stream, đồng thời vẫn giữ khả năng ngắt kết nối các stream không an toàn một cách sạch sẽ trước chunk payload tiếp theo.
* **Xử lý Lỗi có thể Dự đoán**: Các endpoint quản lý (`/key/generate`, `/team/new`, v.v.) không còn trả về payload `internal_server_error` đồng nhất cho các dữ liệu đầu vào bị lỗi định dạng ([PR #39555](https://github.com/BerriAI/litellm/pull/39555)). Các SDK của client và vòng lặp thử lại (retry loop) có thể phân tích cú pháp lỗi từ client (400, 404) một cách an toàn mà không kích hoạt chuỗi thử lại vô tận (retry storm) đối với proxy.
* **Khối tư duy của Claude & Loại bỏ Tham số (Claude Thinking Blocks & Drop Params)**: Khi sử dụng các model Anthropic với `drop_params: true`, LiteLLM giờ đây sẽ tự động chèn các header `anthropic-beta` bắt buộc cho các trường body nâng cao (`clear_at`, `thinking.block_binding`), giúp loại bỏ các lỗi xác thực HTTP 400 đột ngột ([PR #48793](https://github.com/BerriAI/litellm/pull/48793)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

### 1. Điểm nổi bật trong ngày
Các bản cập nhật mới nhất của Unsloth tập trung mạnh mẽ vào việc mở rộng khả năng đa phương thức (multimodal) và âm thanh trên Apple MLX thông qua [PR #15889](https://github.com/unslothai/unsloth/pull/15889), đi kèm với các cải tiến lớn về khả năng xử lý ngữ cảnh dài (long-context) và quản lý bộ nhớ trong Unsloth Studio. Bản phát hành `v0.1.912-beta` mang đến giao diện theo chủ đề theo mùa, đồng thời tối ưu hóa thời gian khởi động lạnh (cold start) và quy trình thực thi công cụ trên Linux. Song song đó, đội ngũ kỹ thuật cơ sở hạ tầng cốt lõi hướng tới khả năng tương thích PyTorch Dynamo với các probe chú ý đóng gói (packed attention probe) và giảm thiểu các vấn đề cấp phát quá mức bộ nhớ trên Mac.

---

### 2. Các bản phát hành & Thay đổi phá vỡ (Breaking Changes)
- **v0.1.912-beta ("Trick or Treat + Optimizations")**: Giới thiệu giao diện UI theo chủ đề theo mùa cùng với việc tăng tốc thời gian chạy cho các lần khởi động ứng dụng ban đầu, gọi công cụ trên Linux và tải mô hình. Các tác vụ fine-tuning tương thích giờ đây có thể được gom nhóm (batch) cùng với các tác vụ đa nhiệm (multi-L). Xem bối cảnh bản phát hành qua [Release v0.1.912-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.912-beta).

---

### 3. Hỗ trợ Phần cứng & Mô hình Mới
- **Apple MLX Multimodal & Audio**: [PR #15889](https://github.com/unslothai/unsloth/pull/15889) tích hợp `mlx-vlm 0.7.11` để hỗ trợ kiến trúc LFM3-Audio và LFM3-Omni trong tính năng chat của Unsloth Studio, cho phép thực hiện các truy vấn bằng giọng nói tự nhiên và trả lời bằng âm thanh.
- **Dòng Liquid AI LFM3**: Các yêu cầu tính năng từ cộng đồng và câu hỏi về adapter đang hướng tới các mô hình nền tảng LFM3 vừa ra mắt (ví dụ: LFM3-1.7B) thông qua [Issue #15588](https://github.com/unslothai/unsloth/issues/15588).
- **Đề xuất GGUF nhận biết Ngân sách Metal (Metal Budget Aware GGUF Recommendation)**: [PR #15848](https://github.com/unslothai/unsloth/pull/15848) cập nhật giao diện Studio Hub để đánh giá mức độ lượng tử hóa GGUF dựa trên dung lượng bộ nhớ hợp nhất (unified memory) thực tế khả dụng của Apple Metal thay vì tổng RAM của hệ thống.

---

### 4. Hiệu năng & Tối ưu hóa
- **Packed Attention & Biên dịch Dynamo**: [PR #15891](https://github.com/unslothai/unsloth/pull/15891) khắc phục các lỗi kiểm tra độ dài biến (`_varlen_in_graph` và `_leaves_block`) trong các thiết lập biên dịch PyTorch `fullgraph` và `dynamic=True` bằng cách tránh các vấn đề hạn chế hằng số nghiêm ngặt trên các cờ (flag) Python.
- **Tiết kiệm VRAM/Ngữ cảnh trên Mac**: [PR #15843](https://github.com/unslothai/unsloth/pull/15843) ngăn chặn việc cửa sổ ngữ cảnh Tự động (Auto context window) tự ý đặt trước toàn bộ kích thước cửa sổ gốc của mô hình ngay từ đầu trên macOS (ví dụ: cấp phát khoảng 4.9GB cho một instance Llama 3.2 1B với ngữ cảnh 128K trước khi xử lý tin nhắn), từ đó bảo tồn bộ nhớ hợp nhất.
- **Bảo vệ Payload & Ngữ cảnh**: [PR #15857](https://github.com/unslothai/unsloth/pull/15857) bảo vệ điểm cuối `/apply-template` trước các yêu cầu quá khổ, nơi số lượng byte UTF-8 vượt quá $4 \times n_{ctx}$, giúp ngăn ngừa lỗi quá thời gian (503) trong các vòng lặp đếm token.

---

### 5. Độ ổn định & Hồi quy (Regressions)
- **Mức độ Nghiêm trọng Cao - Tràn VRAM & Ngữ cảnh**:
  - [Issue #15417](https://github.com/unslothai/unsloth/issues/15417): Lớp tương thích Anthropic (`/v1/messages`) gặp lỗi 400 nghiêm trọng (`exceed_context_size_error`) khi bị tràn ngữ cảnh thay vì kích hoạt tính năng nén tự động (auto-compaction).
  - [Issue #5441](https://github.com/unslothai/unsloth/issues/5441): `Qwen3_5ForConditionalGeneration` bỏ sót việc vá hàm mất mát (loss function patching), gây ra lỗi Hết Bộ Nhớ (OOM) `logits.float()` trên các GPU $\le 24\text{GB}$.
  - [Issue #4504](https://github.com/unslothai/unsloth/issues/4504): Các đường dẫn fine-tuning theo định dạng ChatML thể hiện mức tiêu thụ VRAM quá mức, dẫn đến lỗi OOM bất ngờ trên các mô hình lớn hơn.
- **Mức độ Nghiêm trọng Trung bình - Lỗi Hệ thống Tệp Desktop & Studio**:
  - [Issue #15552](https://github.com/unslothai/unsloth/issues/15552): Unsloth Studio trên Windows làm ngập Thùng rác Windows (Recycle Bin) với hơn 10.000 tệp tạm SQLite WAL/SHM ($\approx 40\text{MB}$) cho mỗi phiên huấn luyện.
  - [Issue #15681](https://github.com/unslothai/unsloth/issues/15681): Các tập dữ liệu JSONL định dạng ChatML lớn ($>81\text{MB}$) gây ra lỗi `SIGSEGV` trong trình đọc JSON pyarrow khi xem trước giao diện.

---

### 6. Ý nghĩa đối với Nhà phát triển Ứng dụng
- **Mở rộng Bộ nhớ cho Agent**: Nếu bạn đang duy trì các đoạn chat của agent chạy lâu dài bên trong Unsloth Studio, lịch sử dài hàng triệu token trước đây từng dẫn đến tình trạng treo giao diện và lỗi nén không thể phục hồi. [PR #15893](https://github.com/unslothai/unsloth/pull/15893) và [PR #15857](https://github.com/unslothai/unsloth/pull/15857) giải quyết các giới hạn này bằng cách giới hạn chính xác logic đánh giá template và logic nén.
- **An toàn khi Triển khai trên Metal**: Các nhà phát triển Mac xây dựng ứng dụng cục bộ nên lưu ý [PR #15848](https://github.com/unslothai/unsloth/pull/15848) và [PR #15843](https://github.com/unslothai/unsloth/pull/15843), giúp ngăn chặn `llama-server` chiếm dụng một cách tham lam kích thước cửa sổ ngữ cảnh tối đa về mặt lý thuyết trên các dàn máy bộ nhớ hợp nhất, từ đó tránh các sự cố sập do OOM không cần thiết khi khởi động.
- **Tính Robust trong các Lớp API**: Khi bọc phần phụ backend của Unsloth bằng các điểm cuối tương thích với Anthropic (`/v1/messages`), hãy cẩn trọng với các lỗi tràn ngữ cảnh ([Issue #15417](https://github.com/unslothai/unsloth/issues/15417)) cho đến khi các bản vá nén tự động được lan truyền hoàn toàn sang các lớp dịch payload.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/bddt3006-dot/agents-radar-master) (tự động tạo).*
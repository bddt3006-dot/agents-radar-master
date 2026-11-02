# Bản tin Hạ tầng AI (Infrastructure) 2026-11-02

> Thời gian tạo: 2026-11-02 03:53 UTC | Số dự án: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## So sánh đối chiếu hạ tầng

# Hệ sinh thái Hạ tầng AI: Báo cáo So sánh Đa Dự án
**Ngày:** 02 tháng 11, 2026

---

### 1. Tổng quan Hệ sinh thái
Hệ sinh thái hạ tầng AI đang trải qua quá trình chuyển đổi kiến trúc tốc độ cao, được thúc đẩy bởi các yêu cầu từ các mô hình Mixture-of-Experts (MoE) tiên tiến, giải mã suy đoán dự đoán đa token (MTP), và các vòng lặp huấn luyện học tăng cường (RL) sâu. Các engine suy luận (vLLM, SGLang) và runtime cục bộ (`llama.cpp`, Ollama) đang đầu tư mạnh mẽ vào việc khởi động (bring-up) Blackwell (SM120) và phần cứng chuyên dụng, đồng thời củng cố các giao thức phân tách KV-cache phân tán. Đồng thời, các cổng giao tiếp hướng ứng dụng (LiteLLM) và các framework tinh chỉnh (Unsloth) đang chạy đua để mở rộng quy mô bảo mật đa luồng (multi-tenant), quản trị ngân sách và điều phối song song thống nhất.

---

### 2. So sánh Hoạt động

| Dự án | Trọng tâm Chính Hiện nay | Mức độ Hoạt động (PR / Sự cố được ghi nhận) | Trạng thái Phát hành |
| :--- | :--- | :--- | :--- |
| **vLLM** | Tải lại trọng số RL, DeepSeek-V4.1/GLM-5, độ an toàn KV NIXL/Mooncake | Cao (khoảng hơn 10 PR/sự cố cốt lõi được theo dõi) | Chưa có bản phát hành chính thức (Đà sửa lỗi/bản vá) |
| **SGLang** | Tối ưu hóa Blackwell, Rust `api.v1.Generate`, hợp nhất video-diffusion | Cao (khoảng hơn 10 PR/sự cố cốt lõi được theo dõi) | Chưa có bản phát hành chính thức |
| **llama.cpp** | Sao chép thiết bị `dflash`, ghép nối đầu GQA, sửa lỗi bộ nhớ Apple/AMD | Cao (chuỗi phát hành b12027–b12032) | Cập nhật thẻ tăng dần (`b12027` – `b12032`) |
| **Ollama** | Ngân sách bộ đệm prompt theo mô hình, tăng cường CORS, trình chạy MLX | Trung bình-Cao (khoảng hơn 10 PR/sự cố cốt lõi được theo dõi) | Chưa có bản phát hành chính thức |
| **LiteLLM** | Lõi cổng giao tiếp Rust (`litellm-gateway`), lỗi tính cước/cô lập bộ đệm | Cao (Tái cấu trúc kiến trúc cốt lõi) | Chưa có bản phát hành chính thức |
| **Unsloth** | Cấu hình thống nhất `UNSLOTH_PARALLEL`, FP8 + LoRA, độ ổn định Studio CI | Trung bình (khoảng hơn 6 PR/sự cố cốt lõi được theo dõi) | Chưa có bản phát hành chính thức |

---

### 3. Cuộc đua Hỗ trợ Mô hình
* **MoE Tiên tiến & Kiến trúc Thế hệ mới (DeepSeek-V4.1, GLM-5, Qwen3.8/4)**: **vLLM** và **SGLang** đang bám đuổi sát nút để dẫn đầu không gian máy chủ doanh nghiệp, triển khai các cơ chế tải lại trọng số phức tạp, trình lập chỉ mục attention thưa (`wk`), và các phép hợp nhất phần cuối (epilogue fusion) cho DeepSeek-V4.1 và GLM-5-next. **llama.cpp** và **Ollama** có phần chậm hơn một chút về khả năng sẵn sàng ngày đầu (day-zero) ở phía máy chủ, gặp phải các rào cản khởi tạo và thiếu các phép chiếu cho các GGUF attention lai/MTP (ví dụ: `qwen3next`, `huihui-ai`).
* **Tối ưu hóa Riêng cho Phần cứng (Blackwell / SM120 & Apple MLX)**: **SGLang** và **vLLM** đang tích cực vượt qua các nút thắt cổ chai khi khởi động trên các máy trạm Blackwell (SM120) (RTX PRO 6000), đặc biệt là với các backend attention Triton so với FA4 và thông lượng giải mã chế độ eager. Trong khi đó, **Unsloth** và **Ollama** đang mở rộng mạnh mẽ sự tương đương với Apple Silicon MLX, mang tính năng gọi công cụ (tool-calling), đầu vào video, và các tải lượng định lượng KV lên môi trường Mac cục bộ.
* **Diffusion & Tạo Video**: **SGLang** đang nổi lên dẫn đầu trong các tác vụ biên ngoài LLM, triển khai các phép hợp nhất toán tử (LayerNorm + điều chế, tích chập theo chiều sâu) được thiết kế riêng cho các pipeline video-diffusion như SANA-Video và Qwen-Image trên các bộ gia tốc hiện đại.

---

### 4. Biên giới Hiệu năng
Các nỗ lực tối ưu hóa trên toàn hệ sinh thái đang nhắm mục tiêu mạnh mẽ vào năm trụ cột riêng biệt:
1. **KV Cache & Prefill/Decode Phân tách**: **vLLM** đang siết chặt các rào cản an toàn NIXL/Mooncake với việc bắt tay kích thước khối nghiêm ngặt và các bản sửa lỗi đồng bộ bộ đệm host. **Ollama** đang giới thiệu ngân sách bộ đệm prompt theo mô hình (`#19450`) để thoát khỏi tình trạng tranh chấp VRAM toàn cục.
2. **Toán tử Chuyên dụng & Hợp nhất Kernel**: **SGLang** đang hợp nhất phần cuối điểm số BF16 cho quá trình prefill DeepSeek-V4.1 nhằm loại bỏ lưu lượng bộ nhớ trung gian. **llama.cpp** đang tăng tốc giải mã đơn token thông qua việc ghép nối đầu CUDA GQA (`#31525`) và sao chép tính năng phía thiết bị cho giải mã suy đoán `dflash`.
3. **Định lượng & Dung lượng Bộ nhớ**: **llama.cpp** và **vLLM** đang giải quyết các trường hợp biên của việc định lượng, đặc biệt là các lỗi giải mã suy đoán MTP dưới các cấu hình Quark/low-bit. **Unsloth** đang sử dụng bảng tra cứu MoE lười (lazy) để xử lý các phép tính phân tách trong môi trường kết hợp RAM/VRAM mà không bị crash.
4. **Song song Hóa Phục vụ Phân tán**: **Unsloth** đã giới thiệu cờ thống nhất `UNSLOTH_PARALLEL` hợp nhất DP, TP, PP và CP dưới một lưới thiết bị duy nhất, phù hợp với trọng tâm phân tán thấy ở các engine suy luận doanh nghiệp.
5. **Hiện đại hóa Kiến trúc Cổng giao tiếp**: **LiteLLM** đang đại tu cơ sở hạ tầng cốt lõi bằng cách chuyển đổi bộ định tuyến yêu cầu sang Rust và giới thiệu cổng chuyển tiếp Rust tùy chọn (`litellm-gateway`) để xử lý lưu lượng truy cập lớn mà không làm mất đi tính tương thích với middleware Python.

---

### 5. Định vị Tầng
* **Serving Engine (vLLM, SGLang)**: Được định vị ở cốt lõi trung tâm dữ liệu để phục vụ sản xuất có độ đồng thời cao, tập trung vào tính song song tensor/pipeline đa nút, an toàn bộ nhớ P/D phân tách, và hỗ trợ gốc cho các luồng công việc triển khai RL liên tục.
* **Runtime Cục bộ (`llama.cpp`, Ollama)**: Được định vị ở tầng biên và máy trạm nhà phát triển, cân bằng các backend phần cứng đa nền tảng (Vulkan, SYCL, Apple MLX, OpenCL) với các giới hạn bộ nhớ cấp tiêu dùng và khả năng mở rộng ngữ cảnh cục bộ.
* **Tầng Cổng giao tiếp & Quản lý (LiteLLM)**: Được định vị ở vành đai API, xử lý quản trị doanh nghiệp, cô lập bộ đệm đa luồng (multi-tenant), giới hạn tốc độ (rate limiting), và theo dõi chi phí trên các backend nhà cung cấp dị thể — hiện đang chuyển dịch mạnh mẽ sang một lõi Rust để đạt hiệu năng cao.
* **Framework Huấn luyện & Tinh chỉnh (Unsloth)**: Được định vị ở tầng thích ứng của nhà phát triển, thu hẹp khoảng cách giữa các checkpoint mô hình thô và quá trình huấn luyện tiết kiệm tài nguyên (FP8 + LoRA, tính song song thống nhất) bên cạnh tích hợp máy tính để bàn (Unsloth Studio).

---

### 6. Tín hiệu Xu hướng
* **Sự hội tụ RL và Suy luận**: Các engine suy luận đang ngày càng tiến hóa thành cơ sở hạ tầng huấn luyện có trạng thái. Các cơ chế tải lại trọng số trực tiếp (vLLM) và độ an toàn của pipeline triển khai RL báo hiệu rằng việc hỗ trợ các framework học tăng cường liên tục (ví dụ: `verl`) không còn là một ý tưởng phụ mà là một yêu cầu kiến trúc cốt lõi.
* **Làn sóng Viết lại bằng Rust**: Các thành phần hạ tầng hiệu năng cao đang loại bỏ các điểm nghẽn thuần Python. Quá trình di chuyển của LiteLLM sang cốt lõi bộ định tuyến Rust và cổng chuyển tiếp phản ánh xu hướng rộng hơn của hệ sinh thái hướng tới các mặt phẳng dữ liệu Rust an toàn bộ nhớ, thông lượng cao được bọc trong các API quản lý Python.
* **Cảnh báo Bảo mật Đa luồng & Rò rỉ Trạng thái**: Các lỗi nghiêm trọng gần đây trên các cổng giao tiếp (lỗi cô lập bộ đệm LiteLLM làm rò rỉ phản hồi qua các tenant) và các engine cục bộ (tăng cường CORS của Ollama, lỗi tra cứu siêu dữ liệu vLLM) nhấn mạnh sự tập trung cao độ của ngành vào an toàn dữ liệu đa tenant và xác thực yêu cầu nghiêm ngặt.
* **Lời khuyên Hành động dành cho Kỹ sư**: 
  * *Kỹ sư Hạ tầng Phục vụ (Serving Engineers)*: Áp dụng việc bắt tay kích thước khối nghiêm ngặt khi mở rộng quy mô các cụm P/D phân tách để tránh tình trạng hỏng dữ liệu âm thầm (silent data corruption).
  * *Nhà phát triển Ứng dụng (Application Developers)*: Thận trọng với các định lượng low-bit (`Q4_K_M`) khi triển khai giải mã suy đoán (MTP/D-Spark), vì sự phân kỳ lấy mẫu tham lam (greedy sampling divergence) vẫn là một rủi ro đã được ghi nhận. Kiểm toán cấu hình bộ đệm proxy ngay lập tức để đảm bảo phạm vi bộ đệm đa tenant đang hoạt động.

---

## Báo cáo chi tiết từng dự án

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest: 2026-11-02

### 1. Tiêu điểm trong ngày
Hoạt động phát triển hôm nay tập trung mạnh vào việc củng cố các luồng công việc học tăng cường sâu (RL) và cơ chế tải lại trọng số trực tiếp cho các kiến trúc tiên tiến như DeepSeek-V4.1 và GLM-5, bên cạnh các cải tiến lớn về độ tin cậy cho các bộ kết nối KV-cache phân tán (NIXL và Mooncake). Ngoài ra, các kỹ sư đang xử lý các điểm nghẽn hiệu năng quan trọng trên Blackwell (SM120) và ROCm dưới tải giải mã (decode) đồng thời cao.

---

### 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* *Không có bản phát hành chính thức nào được công bố trong 24 giờ qua.*
* **Bắt buộc cơ chế bắt tay (Handshake) Push/Pull của NIXL**: PR [#59747](https://github.com/vllm-project/vllm/pull/59747) giới thiệu việc kiểm tra tính hợp lệ của handshake một cách nghiêm ngặt, từ chối các cặp P/D (Prefill/Decode) có kích thước khối kernel (kernel block size) không khớp tại thời điểm kết nối, giúp ngăn chặn tình trạng hỏng dữ liệu ngầm hoặc sập backend.

---

### 3. Hỗ trợ Phần cứng & Mô hình Mới
* **Blackwell (SM120) & DeepSeek-V4.1-Flash**: Các báo cáo thực tế và luồng gỡ lỗi ([#56892](https://github.com/vllm-project/vllm/issues/56892), [#56700](https://github.com/vllm-project/vllm/issues/56700)) làm nổi bật các thách thức tích hợp (bring-up) đang diễn ra đối với DeepSeek-V4.1-Flash (769B, các chuyên gia MXFP4, bộ nhớ Engram) trên các máy trạm 8x RTX PRO 6000 Blackwell, đặc biệt lưu ý về thông lượng giải mã thấp khi bật `--enforce-eager` và việc bắt giữ đồ thị CUDA (CUDA graph capture) bị lỗi.
* **Tải lại trọng số trực tiếp cho quá trình huấn luyện RL**: Các lặp lại tiếp theo trên RFC [#54477](https://github.com/vllm-project/vllm/issues/54477) đã được xử lý trong các PR [#64717](https://github.com/vllm-project/vllm/pull/64717) và [#64692](https://github.com/vllm-project/vllm/pull/64692), cho phép tải độc lập các trọng số/thang đo FP8 đã tách rời cho GLM5-next MLA, các bộ chỉ mục attention thưa (`wk`), và MiMo-V2, đồng thời nạp lại các tensor dẫn xuất từ trọng số tại chỗ (in-place) để bảo vệ các đồ thị CUDA đang hoạt động.
* **Inkling và Muse Spark**: PR [#64690](https://github.com/vllm-project/vllm/pull/64690) định tuyến việc ghi tensor checkpoint thông qua các trình tải trọng số tham số tiêu chuẩn thay vì gán trực tiếp qua `param.data`, khắc phục lỗi tải lại trọng số theo từng tầng (layerwise).

---

### 4. Hiệu năng & Tối ưu hóa
* **DSpark Markov Walk trên Hopper**: PR [#62958](https://github.com/vllm-project/vllm/pull/62958) tối ưu hóa việc tạo khối dự đoán (draft-block) của DSpark bằng cách hợp nhất các bước GEMV toàn từ vựng, phép cộng và lấy mẫu thành một lần thực thi kernel trên chip duy nhất sử dụng trọng số int8 W2.
* **Biên dịch CuTe DSL và Bộ nhớ đệm AOT**: PR [#65026](https://github.com/vllm-project/vllm/pull/65026) giới thiệu các biến môi trường tùy chọn (`VLLM_CUTE_DSL_COMPILE_CACHE=1` và `VLLM_CUTE_DSL_AOT_CACHE=1`) cho phép các tiến trình worker GPU tái sử dụng kernel CUTLASS CuTe DSL qua các lần khởi động lại và bỏ qua các pha dò vết (tracing) dư thừa.
* **Tinh chỉnh đường nối (Seam) FFN trên ROCm**: PR [#64883](https://github.com/vllm-project/vllm/pull/64883) tối ưu hóa đường nối FFN của K2 và các ranh giới khởi chạy trên gfx950 (MI355X) cho các cấu hình TP4 và TP8.

---

### 5. Độ ổn định & Hồi quy (Regressions)
* **Mức độ nghiêm trọng cao — Lượng tử hóa & Giải mã phỏng đoán MTP (Multi-Token Prediction)**: Issue [#65034](https://github.com/vllm-project/vllm/issues/65034) báo cáo rằng các cấu hình `exclude` của Quark được viết dưới dạng tên trọng số (ví dụ: `mtp.fc.weight`) không khớp một cách âm thầm, làm hỏng quá trình giải mã phỏng đoán MTP.
* **Mức độ nghiêm trọng trung bình — Đồng bộ hóa bộ đệm Host của NIXL**: PR [#60181](https://github.com/vllm-project/vllm/pull/60181) giải quyết một lỗi hồi quy được giới thiệu trong [#53780] nơi `kv_buffer_device="cpu"` khiến `sync_recved_kv_to_device` ghi đè dữ liệu KV đã nhận bằng các trang host chưa được điền dữ liệu trong các mô hình đa nhóm hoặc chia sẻ KV.
* **Mức độ nghiêm trọng trung bình — Logits đầu ra có cấu trúc**: PR [#64904](https://github.com/vllm-project/vllm/pull/64904) giải quyết vấn đề [#64809] để đảm bảo các điểm số thô chưa bị che (`raw_logprobs` và `raw_logits`) được giữ lại trước khi áp dụng mặt nạ ngữ pháp (grammar masking) trên cả hai trình chạy GPU.
* **Mức độ nghiêm trọng thấp / Theo dõi — Bố cục bộ kết nối offload**: Issue [#63718](https://github.com/vllm-project/vllm/issues/63718) thiết lập một nỗ lực theo dõi nhằm tài liệu hóa và kiểm soát các bố cục tensor không được hỗ trợ cho việc offload KV phân tầng và trên CPU.

---

### 6. Ý nghĩa đối với Nhà phát triển Ứng dụng
* **RL & Rollout thời gian thực mạnh mẽ hơn**: Các PR đang hoạt động nhằm khắc phục lỗi cô lập thất bại khi cập nhật trọng số (PR [#57854](https://github.com/vllm-project/vllm/pull/57854)) và truyền tín hiệu hàng đợi yêu cầu thời gian thực (Issue [#49538](https://github.com/vllm-project/vllm/issues/49538)) báo hiệu một framework đang dần hoàn thiện cho các trình điều phối RL bên ngoài như `verl`, giúp giảm nguy cơ sập toàn bộ engine trong các vòng lặp huấn luyện liên tục.
* **Triển khai P/D phân tách an toàn hơn**: Các đường ống phân tách NIXL và Mooncake đang nhận được các hàng rào bảo vệ an toàn nghiêm ngặt (ví dụ: bắt tay kích thước khối và hỗ trợ mã băm lookahead trong PR [#64096](https://github.com/vllm-project/vllm/pull/64096)), giúp các cấu trúc topology cụm đa node ít gặp phải tình trạng mất đồng bộ bộ nhớ ngầm hơn.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

### 1. Điểm nổi bật trong ngày
Quá trình phát triển SGLang đang tập trung mạnh mẽ vào việc mở rộng các tính năng nâng cao cho kiến trúc Blackwell (SM120), tối ưu hóa cho DeepSeek-V4/V4.1, và củng cố các mô hình thực thi phân tán như pipeline video khuếch tán (diffusion-video) và song song ngữ cảnh (context parallelism). Các nỗ lực kỹ thuật cốt lõi tập trung vào việc hợp nhất các API xung quanh hệ thống `api.v1.Generate` được hỗ trợ bởi Rust (`#45816`), song song với việc tinh chỉnh hiệu suất mạnh mẽ cho các thiết lập đa nút (multi-node) và cơ sở hạ tầng lập lịch KV-cache theo hướng tác nhân (agentic) (`#43098`).

---

### 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* *Không có báo cáo nào trong 24 giờ qua.*

---

### 3. Hỗ trợ Phần cứng & Mô hình Mới
* **Tối ưu hóa cho Blackwell & SM120**: Tiếp tục các tối ưu hóa có mục tiêu cho phần cứng RTX PRO 6000 (SM120), bao gồm việc gỡ lỗi các backend attention như `fa4` so với các luồng thực thi Triton cho `GLM-5.3-Flash` (`#42012`).
* **Mô hình Khuếch tán & Video**: 
  * PR [#47090](https://github.com/sgl-project/sglang/pull/47090): Đóng gói các phép chiếu gate/up dạng BF16 trên SM120 cho `qwen-image21`.
  * PR [#47292](https://github.com/sgl-project/sglang/pull/47292): Hợp nhất phép tích chập theo chiều sâu (depthwise convolution) và GLU của SANA-Video trên SM120, nhắm đến các activation dạng channel-last kích thước lớn (`[21, 13440, 30, 52]`).
* **Ascend NPU & Phần mở rộng CPU Intel**: 
  * PR [#40825](https://github.com/sgl-project/sglang/pull/40825): Bật tính năng Song song ngữ cảnh giải mã (Decode Context Parallelism - DCP) cho `kimi-k3` trên Ascend NPU với tính năng giao tiếp nhỏ gọn được chia sẻ.
  * PR [#44394](https://github.com/sgl-project/sglang/pull/44394): Giới thiệu hỗ trợ đồ thị `torch.compile` trên CPU cho cả hai giai đoạn prefill và decode trên hệ thống Intel AMX.

---

### 4. Hiệu suất & Tối ưu hóa
* **Hợp nhất phần kết điểm số DeepSeek V4.1 (Score Epilogue Fusion)**: PR [#45807](https://github.com/sgl-project/sglang/pull/45807) hướng tới việc tối ưu hóa prefill cho DeepSeek-V4.1 bằng cách hợp nhất phần kết điểm số chỉ mục BF16 để loại bỏ lưu lượng bộ nhớ trung gian cho các phép nhân ma trận trọng số ReLU và head.
* **Hợp nhất Lớp Khuếch tán (Diffusion Layer Fusions)**: PR [#47253](https://github.com/sgl-project/sglang/pull/47253) bật tính năng hợp nhất LayerNorm + điều chế (modulation) dạng eager đã được kiểm chứng cho các activation của SANA-Video (`[1, 32760, 2240]`).
* **Tối ưu hóa Imports**: PR [#47731](https://github.com/sgl-project/sglang/pull/47731) dọn dẹp `sglang/__init__.py` để giữ cho các module nhẹ được cách ly khỏi các bản vá HF nặng, cấu hình mô hình và bộ lập lịch, qua đó cải thiện độ trễ khởi động.

---

### 5. Độ ổn định & Hồi quy (Regressions)
* **Lỗi sập Bộ lập lịch Đa phương thức DeepSeek-V4.1**: Vấn đề [#47218](https://github.com/sgl-project/sglang/issue/47218) nêu bật một lỗi nghiêm trọng khi việc hủy bỏ luồng đồng thời (concurrent stream aborts) làm cho `items_offset_list` trả về giá trị `None` trong đường dẫn embedding đa phương thức, làm sập tất cả các worker TP/EP.
* **Tràn bộ nhớ CUDA Allocator Dưới Tải trọng Duy trì**: Vấn đề [#43486](https://github.com/sgl-project/sglang/issue/43486) báo cáo một lỗ hổng rò rỉ bộ nhớ khẩn cấp, trong đó bộ phân bổ bộ nhớ đệm (caching allocator) làm cạn kiệt bộ nhớ GPU dưới điều kiện giải mã với batch tối đa được duy trì cho các thiết lập DSV4.1 Flash + DSPARK, mặc dù dung lượng vùng đệm KV mới chỉ ở mức 29%.
* **Chi phí Thực thi Ngữ pháp (Grammar Execution Overhead)**: PR [#39053](https://github.com/sgl-project/sglang/pull/39053) giải quyết một trường hợp biên về tính đúng đắn/hiệu suất trên nhiều GPU, đảm bảo các ngữ pháp được biên dịch và các mặt nạ từ vựng (vocab masks) chỉ được áp dụng trên rank TP đầu vào khi TP > 1.
* **Phát hành Sự kiện KV của Bộ lập lịch**: PR [#46334](https://github.com/sgl-project/sglang/pull/46334) và [#46258](https://github.com/sgl-project/sglang/pull/46258) giải quyết các lỗi đồng bộ hóa bộ định tuyến bằng cách đảm bảo các sự kiện khối KV (`BlockStored`/`BlockRemoved`) được xuất ra chính xác ngay cả khi các engine tạm dừng hoặc trong các bước giải mã tiêu chuẩn, ngăn chặn việc các bộ định tuyến nắm giữ góc nhìn cũ (stale views) về bộ nhớ đệm của worker.

---

### 6. Ý nghĩa đối với Nhà phát triển Ứng dụng
* **Tích hợp Bộ định tuyến Đa nút và Tác nhân**: Nếu bạn đang sử dụng các bộ định tuyến bên ngoài (như `sgl-router` hoặc các trình điều phối tùy chỉnh) song song với các tính năng như cập nhật trọng số RL hoặc định tuyến nhận thức bộ nhớ đệm (cache-aware routing), các bản sửa lỗi bộ lập lịch gần đây (`#46334`) đảm bảo rằng các sự kiện trạng thái KV không còn bị nuốt mất trong thời gian engine tạm dừng, qua đó ngăn chặn các điểm đen định tuyến (routing black-holes).
* **An toàn trong Xây dựng Prompt và Đa phương thức**: Các nhóm đang triển khai lưu lượng truy cập môi trường sản xuất với các mô hình DeepSeek-V4/V4.1 nên theo dõi việc hủy luồng đồng thời và đầu vào thứ tự vai trò (`#47218`, `#35433`), vì các trường hợp biên trong việc kết xuất prompt (prompt rendering) hoặc độ lệch luồng bị hủy có thể làm sập đột ngột các pod worker.
* **Hiệu quả Triển khai Khuếch tán**: Việc liên tục hợp nhất các toán tử cho các mô hình tạo video (SANA-Video, Qwen-Image) giúp giảm đáng kể lượng bộ nhớ chiếm dụng đối với các activation lớn, làm cho các pipeline tạo video/hình ảnh thông lượng cao trở nên ổn định hơn đáng kể trên Blackwell và các bộ tăng tốc hiện đại.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

### 1. Điểm nổi bật trong ngày
Các hoạt động phát triển gần đây trên `llama.cpp` tập trung mạnh vào các tối ưu hóa chuyên biệt theo phần cứng cho các kiến trúc Mô hình Chuyên gia Hỗn hợp (MoE) quy mô lớn và giải mã dự đoán (như DeepSeek-V4, Qwen4/Flash và Gemma 4) đang nổi lên. Các pull request quan trọng giới thiệu tính năng sao chép đặc tính phía thiết bị cho các layer dự đoán có trạng thái (`dflash`) cùng các điều chỉnh quản lý bộ nhớ nâng cao cho nền tảng Apple và AMD. Song song đó, các vấn đề xung quanh độ lệch giải mã dự đoán trên các mô hình lượng tử hóa và quản lý bộ nhớ dưới tải trọng server độ đồng thời cao vẫn đang được tích cực điều tra.

---

### 2. Bản phát hành & Thay đổi phá vỡ (Breaking Changes)
- **Cập nhật Tag**: Các bản phát hành dao động từ `b12027` đến `b12032`, bao gồm các bản sửa lỗi gia tăng trên các backend SYCL, OpenCL và Hexagon.
  - Xem [Bản phát hành b12032](https://github.com/ggml-org/llama.cpp/releases/tag/b12032), [Bản phát hành b12031](https://github.com/ggml-org/llama.cpp/releases/tag/b12031), [Bản phát hành b12030](https://github.com/ggml-org/llama.cpp/releases/tag/b12030), [Bản phát hành b12029](https://github.com/ggml-org/llama.cpp/releases/tag/b12029), [Bản phát hành b12028](https://github.com/ggml-org/llama.cpp/releases/tag/b12032), [Bản phát hành b12027](https://github.com/ggml-org/llama.cpp/releases/tag/b12027).

---

### 3. Hỗ trợ Phần cứng & Mô hình Mới
- **Gemma 4 & LFM3**: 
  - Đã bật tính năng kiểm tra tính hợp lệ của Gemma 4 trong framework `test-llama-archs` (`#31401`).
  - Đã thêm hỗ trợ cấu hình tách tensor cho các kiến trúc LFM3 (`#31431`).
- **Backend OpenCL & Hexagon**:
  - Đã thêm hỗ trợ ban đầu cho định dạng lượng tử hóa `iq3` đối với OpenCL thông qua việc vector hóa AOS/SOA và các đường dẫn GEMM/GEMV không xáo trộn (non-shuffled) cho các thiết bị Adreno (`#31338`).
  - Đã khắc phục các giới hạn về bước nhảy (stride) của bộ mô tả 2D DMA trên Hexagon (>24 bit) cho các mục tiêu v75 trở lên (`#31442`).
- **SYCL & Vulkan**:
  - Đã cập nhật SYCL để dựa hoàn toàn vào PkgConfig cho các tệp include và thư viện của LevelZero (`#31076`).

---

### 4. Hiệu năng & Tối ưu hóa
- **Sao chép thiết bị `dflash` (`#31506`)**: Tăng tốc đáng kể các giai đoạn prefill cho giải mã dự đoán dflash bằng cách định tuyến việc bàn giao đặc tính ẩn trực tiếp qua các thao tác sao chép bộ nhớ thiết bị, mang lại những cải thiện nhỏ về thông lượng giải mã.
- **Ghép nối đầu GQA trên CUDA SM70 (`#31525`)**: Tối ưu hóa kernel flash-attention dạng vector (`flash_attn_ext_vec`) cho các lượt giải mã đơn token bằng cách ghép nối các đầu truy vấn liên tiếp có chung đầu KV trong các thiết lập GQA, qua đó cắt giảm chi phí khử lượng tử hóa KV dư thừa.
- **Tối ưu hóa Split-K cho Tile Lớn trên Vulkan (`#30280`)**: Đề xuất mở rộng workgroup theo phương thức split-K (K=3) trên các thiết bị RDNA3/4 khi các vòng lặp nhân ma trận sử dụng chưa hết tài nguyên đơn vị tính toán.
- **Tính bất biến của phép nhân ma trận theo lô trên CPU (`#31504`)**: Đồng bộ hóa các luồng xử lý chuyển tiếp theo lô trên CPU sao cho khớp từng-bit (bitwise identical) với các lần thực thi tuần tự từng hàng đơn lẻ qua các lệnh chuyển đổi thứ tự x86.

---

### 5. Độ ổn định & Hồi quy (Regressions)
- **Độ lệch trong giải mã dự đoán (`#25618`, Bình luận: 36)**: Xác nhận rằng dưới phương pháp lấy mẫu tham lam (`temperature=0`), giải mã dự đoán bằng mô hình nháp (MTP/D-Spark) bị lệch so với đầu ra văn bản thông thường không dùng dự đoán khi đánh giá trên các mục tiêu đã lượng tử hóa (ví dụ: `Q4_K_M`), trong khi các mục tiêu `bf16` khớp hoàn toàn.
- **Dung lượng bộ nhớ trên nền tảng Apple (`#31437`)**: Khắc phục tình trạng hồi quy bộ nhớ đệm trên iOS/macOS, nơi các vùng nhớ mô hình đã giải phóng tiếp tục làm phình to `phys_footprint`, khiến `os_proc_available_memory()` kích hoạt nhầm lỗi OOM (Hết bộ nhớ) khi tải các mô hình tiếp theo. Bản vá thay thế `posix_memalign` bằng `vm_allocate`.
- **Tình trạng nghẽn Server đa người thuê (`#29175`)**: Làm nổi bật một điểm nghẽn kiến trúc nơi một đoạn prompt prefill quá lớn làm tắc nghẽn hoàn toàn các vòng lặp giải mã trên tất cả các luồng đồng thời của một `llama-server` đa luồng (multi-slot).
- **Hồi quy MTP dự đoán trên Vulkan / HIP (`#31495`)**: `--spec-type draft-mtp` gây ra tình trạng sụt giảm thông lượng lên tới 80% trong giai đoạn prefill trên các backend AMD HIP trong khi vẫn hoạt động bình thường trên Vulkan.

---

### 6. Ý nghĩa đối với Lập trình viên Phát triển Ứng dụng
- **Lưu ý về Giải mã dự đoán**: Nếu bạn triển khai tính năng thực thi dự đoán bằng MTP hoặc mô hình nháp để tăng số token/giây khi phục vụ, hãy thận trọng với các định dạng lượng tử hóa mức thấp (như `Q4_K_M`). Các bài kiểm tra lấy mẫu tham lam cho thấy độ lệch đầu ra so với mức cơ sở chưa lượng tử hóa, và các cấu hình mô hình nháp chuyên biệt có thể tương tác kém với bộ nhớ đệm của MoE (`#31497`).
- **Áp lực bộ nhớ trên Apple Silicon**: Nếu các ứng dụng iOS/macOS dạng container hoặc native của bạn phục vụ nhiều mô hình nối tiếp nhau, hãy chuẩn bị tinh thần gặp phải các lỗi từ chối cấp phát bộ nhớ sớm do hệ điều hành thu hồi bộ nhớ chậm trễ, cho đến khi các bản vá tận dụng `vm_allocate` được áp dụng hoàn toàn (`#31437`).
- **Đỉnh độ trễ do độ đồng thời của Server**: Các tầng triển khai có thông lượng cao nên cấu hình cẩn thận các tham số batch và micro-batch (`-b` / `-ub`). Các yêu cầu đầu vào dài sẽ làm “đói” các luồng người dùng đồng thời trong giai đoạn prefill cho đến khi tính năng phân đoạn prefill hợp tác chi tiết (fine-grained cooperative prefill chunking) được tích hợp rộng rãi.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Infrastructure Digest — 2026-11-02

## 1. Điểm nổi bật trong ngày
Hoạt động phát triển hôm nay tập trung mạnh vào việc cô lập tài nguyên đa người thuê (multi-tenancy) và mở rộng hỗ trợ phần cứng. Đáng chú ý nhất là một PR mới giới thiệu ngân sách bộ đệm prompt (prompt cache) theo từng model nhằm giải quyết tình trạng tranh chấp bộ nhớ toàn cục giữa các model chạy đồng thời [#19450]. Bên cạnh đó, các cải tiến nền tảng cũng đang được triển khai cho kiến trúc hybrid-attention, các trình chạy Apple Silicon MLX [#19422, #19438], và việc tăng cường bảo mật xung quanh các chính sách CORS mặc định [#19443].

---

## 2. Bản phát hành & Thay đổi phá vỡ tính tương thích (Breaking Changes)
* **Tăng cường bảo mật (loại bỏ `file://*`)**: PR [#19443] đề xuất loại bỏ `file://*` khỏi danh sách nguồn gốc (origins) CORS mặc định nhằm ngăn chặn các tệp HTML cục bộ chưa được xác thực thực thi lệnh API (ví dụ: tải xuống, xóa hoặc chạy model). Các nhà vận hành phụ thuộc vào các cấu hình tích hợp theo scheme tệp cục bộ sẽ cần phải chủ động thiết lập biến `OLLAMA_ORIGINS`.

---

## 3. Hỗ trợ Model & Phần cứng Mới
* **Tích hợp Rockchip NPU**: Issue [#15393] tiếp tục thu hút sự quan tâm đối với tính năng tăng tốc NPU do cộng đồng phát triển trên các dòng SoC RK3588 và RK3576 (tận dụng các khái niệm từ `rkllama`).
* **Lỗi GGUF Hybrid-Attention**: Issue [#19459] nêu bật các rào cản khởi tạo đối với các định dạng hybrid-attention / MTP GGUF được nhập vào (`qwen3next` / `huihui-ai/Huihui-Qwen3.8-27B-abliterated-GGUF`), hiện đang bị sập (crash) do thiếu các phép chiếu lớp `attn_qkv`/`attn_gate`.
* **Tối ưu hóa Apple Silicon MLX**: PR [#19438] khắc phục hiện tượng rò rỉ view bộ đệm âm thanh tạm thời trong các model `lfm3-omni` chạy thông qua backend MLX.

---

## 4. Hiệu năng & Tối ưu hóa
* **Ngân sách Prompt Cache theo từng Model**: PR [#19450] bổ sung một cấu hình trình chạy tùy chọn `prompt_cache` (hỗ trợ phân bổ MiB tùy chỉnh, cùng với ngữ nghĩa `0` và `-1`). Điều này cho phép các nhà vận hành vượt qua giới hạn cache toàn cục hiện tại (`LLAMA_ARG_CACHE_RAM`) và cô lập giới hạn cho từng model trên cả hai backend llama-server và MLX.
* **Tinh chỉnh cơ chế giải phóng bộ nhớ của Scheduler**: PR [#19449] giải quyết issue [#19326] bằng cách sửa đổi bộ lập lịch (scheduler) để đánh giá yêu cầu bộ nhớ của các yêu cầu đang chờ và khả năng phân bổ GPU dựa trên ngưỡng phù hợp 80%, ưu tiên trình chạy đang rảnh có kích thước nhỏ nhất để tối ưu hóa các mẫu giải phóng (eviction patterns).
* **Bảo vệ lặp token cho MLX**: PR [#19422] chuyển đổi các giới hạn lặp token của llama-server sang `mlxrunner`, tự động hủy quá trình tạo nội dung nếu một token lặp lại y hệt nhau 101 lần nhằm ngăn chặn vòng lặp vô hạn và tình trạng tiêu thụ tài nguyên vượt kiểm soát.

---

## 5. Độ ổn định & Hồi quy (Regressions)
* **Độ ưu tiên cao — Lỗi tra cứu siêu dữ liệu Tokenizer**: Các issue [#19446] và PR [#19447] khắc phục một lỗi nghiêm trọng khi `EmbedHandler` truy vấn không đúng các khóa siêu dữ liệu GGUF (`add_bos_token`/`add_eos_token`), bỏ sót tiền tố đặc trưng của kiến trúc. Điều này khiến giới hạn ngữ cảnh khả dụng bị tính toán sai lệch 1–2 token đối với các model có cờ BOS/EOS được đặt là false.
* **Độ ưu tiên trung bình — Lệch đồng bộ đầu ra suy luận/công cụ (Reasoning/Tool Output)**: PR [#19456] giải quyết issue [#19403], nơi việc sử dụng `think: true` kết hợp với lệnh gọi công cụ (tool calls) trong các model kiểu Cogito khiến các thẻ suy luận (như `<think>`) bị rò rỉ trực tiếp vào luồng nội dung do quá trình khởi tạo trạng thái chuyển sang chế độ nội dung quá sớm.
* **Độ ưu tiên trung bình — Định tỷ lệ khóa dịch chuyển ngữ cảnh**: Issue [#19457] phản ánh rằng các lượt trò chuyện dài hoặc dịch chuyển ngữ cảnh (`num_ctx`) trong `deepseek-r1:8b`, `phi3.5`, và `phi4-mini` làm giảm chất lượng phản hồi cho đến khi thể hiện model được gỡ tải thủ công (`ollama stop`), phản ánh lại các bất thường về việc định tỷ lệ key-cache trong quá khứ.
* **Độ ưu tiên thấp — Hết thời gian chờ (Timeout) xử lý hình ảnh trên Windows**: Issue [#19444] ghi nhận trạng thái timeout trên Windows ARM64 trong quá trình xử lý ảnh đa phương thức đối với `gemma3:4b`, trong đó quá trình thực thi bị đình trệ vô thời hạn bên trong bộ mã hóa đa phương thức ngay cả với các đầu vào có độ phân giải thấp.

---

## 6. Điều này có ý nghĩa gì đối với Lập trình viên ứng dụng
* **Kiểm soát bộ nhớ chi tiết**: Các tính năng kiểm soát bộ nhớ đệm prompt theo từng model sắp ra mắt ([#19450]) sẽ giúp việc triển khai ứng dụng đa người thuê trở nên dễ đoán hơn rất nhiều, cho phép lập trình viên giới hạn mức sử dụng RAM/VRAM cho từng model thay vì phải xoay sở với một ngân sách cache toàn cục.
* **Vector nhúng (Embeddings) đáng tin cậy**: Nếu pipeline nạp dữ liệu của bạn dựa vào `/api/embed` với các model cấu hình rõ ràng `tokenizer.ggml.add_bos_token` hoặc `add_eos_token` là false, hãy chú ý thời điểm hợp nhất của PR [#19447] để khắc phục các lỗi tinh vi lệch một đơn vị (off-by-one) về độ dài ngữ cảnh.
* **Tích hợp cục bộ an toàn hơn**: Các ứng dụng máy tính để bàn và web nhúng Ollama cục bộ phải xác minh rằng các cấu hình CORS của họ (`OLLAMA_ORIGINS`) được khai báo rõ ràng, vì các cấu hình mặc định sẽ thắt chặt bảo mật bằng cách loại bỏ quyền truy cập `file://` ([#19443]).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# Bản tin LiteLLM — 02-11-2026

## 1. Điểm nổi bật trong ngày
LiteLLM đang đẩy mạnh quá trình chuyển đổi sang lõi Rust hiệu năng cao, với hàng loạt PR được hợp nhất nhằm đặt nền móng cho gateway chuyển tiếp bằng Rust có thể tùy chọn bật/tắt (`litellm-gateway`) cùng với lõi router bằng Rust được bắc cầu qua PythonHost ([PR #49513](https://github.com/BerriAI/litellm/pull/49513), [PR #49606](https://github.com/BerriAI/litellm/pull/49606)). Đồng thời, các lỗi nghiêm trọng về theo dõi chi phí và đếm token—bao gồm một lỗi hồi quy (regression) tính sai lệch hóa đơn lên tới 1.000.000 lần khi tin tưởng chi phí do nhà Cung cấp báo cáo—đang là tâm điểm của các vấn đề mở ([Issue #48398](https://github.com/BerriAI/litellm/issues/48398)).

---

## 2. Bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* *Không có bản phát hành chính thức nào được công bố trong 24 giờ qua.*
* **Thay đổi đáng chú ý về đóng gói & triển khai:** Các PR mới bổ sung các container gateway Rust tùy chọn và chế độ chuyển tiếp proxy Python (`LITELLM_FORWARD_UPSTREAM`), đóng gói trực tiếp runtime Rust bên trong gói phụ của proxy mà không yêu cầu cài đặt sẵn toolchain Rust cục bộ ([PR #49605](https://github.com/BerriAI/litellm/pull/49605), [PR #49607](https://github.com/BerriAI/litellm/pull/49607)).

---

## 3. Hỗ trợ Model & Phần cứng mới
* **Đồng bộ tính năng Provider Ollama:** Đã đóng các thảo luận cũ liên quan đến thứ tự khởi tạo provider Ollama, đồng thời chuẩn hóa độ ưu tiên của tham số `api_base` ([Issue #26170](https://github.com/BerriAI/litellm/issues/26170)).
* **Phạm vi Model FAL.ai:** Đã đóng các issue theo dõi về việc mở rộng FAL.ai từ các tập con được mã hóa cứng (hardcoded) sang cơ chế khám phá API động ([Issue #34619](https://github.com/BerriAI/litellm/issues/34619)).

---

## 4. Hiệu năng & Tối ưu hóa
* **Phân lớp Router và Gateway bằng Rust:** Một đợt tái cấu trúc toàn diện đang diễn ra nhằm giới thiệu lõi router Rust giao tiếp qua ranh giới `PythonHost` sạch sẽ, bên cạnh một máy chủ chuyển tiếp Rust tùy chọn (`litellm-gateway`) có khả năng giữ nguyên các tính năng xác thực, giới hạn tốc độ (rate-limiting) và phát thải metric của Python trong khi vẫn xử lý định tuyến lượng truy cập đầu vào (ingress) thông lượng cao ([PR #49513](https://github.com/BerriAI/litellm/pull/49513), [PR #49604](https://github.com/BerriAI/litellm/pull/49604), [PR #49606](https://github.com/BerriAI/litellm/pull/49606)).
* **Cải thiện đồng bộ Cơ sở dữ liệu:** Đã xử lý nút thắt cổ chai bậc hai $O(n^2)$ trên vòng lặp sự kiện (event loop) của quá trình phục vụ trong các đợt đồng bộ lại bảng thông tin đăng nhập khi tính năng `store_model_in_db: true` được kích hoạt ([Issue #43922](https://github.com/BerriAI/litellm/issues/43922)).

---

## 5. Sự ổn định & Lỗi hồi quy (Regressions)
* **Lỗi tính sai chi phí (Mức độ nghiêm trọng cao):** [Issue #48398](https://github.com/BerriAI/litellm/issues/48398) báo cáo rằng các trường `usage.cost` do provider trả về bị tin tưởng tuyệt đối dưới dạng USD mà không qua kiểm tra xác thực, dẫn đến các kịch bản tính hóa đơn vượt mức thảm khốc gấp 1.000.000 lần khi provider trả về chi phí ở dạng vi-đơn vị (micro-unit) hoặc phân số token.
* **Cắt xén phần thân yêu cầu JSON-RPC 2.0:** [Issue #49479](https://github.com/BerriAI/litellm/issues/49479) lưu ý rằng `general_settings.pass_through_endpoints` làm mất trường `id` từ các payload JSON-RPC 2.0 gửi đến do xung đột tên với danh sách tham số nội bộ của LiteLLM.
* **Lỗ hổng Ngân sách Nhóm & Fallback:** [Issue #46874](https://github.com/BerriAI/litellm/issues/46874) chỉ ra rằng các bước kiểm tra ngân sách fallback không tính đến giới hạn `max_budget_in_team`, cho phép các model chính có chi phí bằng 0 kết hợp với model fallback có phí có thể vượt qua hạn mức chi tiêu cấp nhóm.
* **Lỗi Cô lập Cache:** [Issue #49313](https://github.com/BerriAI/litellm/issues/49313) tiết lộ rằng các cache phản hồi khớp chính xác (exact-match) đã bị rò rỉ giữa các khóa ảo (virtual key) và các nhóm khác nhau, làm lộ các phản hồi được tạo bởi một tenant cho tenant khác gửi payload giống hệt.
* **Lỗi sập trình đếm Token:** [Issue #39618](https://github.com/BerriAI/litellm/issues/39618) cho thấy `cost_per_token` gây sập ứng dụng khi gặp giá trị `None` hoặc chuỗi cho số lượng prompt/completion thay vì mặc định chi phí bằng 0 khi các upstream provider bỏ quên các metric token.

---

## 6. Điều này có ý nghĩa gì đối với các Lập trình viên Ứng dụng
* **Cảnh báo về tính cô lập đa người thuê (Multi-Tenant):** Nếu bạn phụ thuộc vào tính năng caching khớp chính xác trên các triển khai proxy đa người thuê, hãy đảm bảo bạn đã cập nhật lên các phiên bản sau khi các khóa cache chưa được giới hạn phạm vi (unscoped), do lỗ hổng rò rỉ dữ liệu payload giữa các tenant đã được đánh dấu ([Issue #49313](https://github.com/BerriAI/litellm/issues/49313)).
* **Kiểm tra rào chắn ngân sách:** Hãy kiểm tra lại các cấu hình triển khai của bạn nếu đang sử dụng các model chi phí bằng 0 có kèm theo cơ chế fallback có phí; các cài đặt fallback hiện tại không khấu trừ chính xác hạn mức của thành viên nhóm, dẫn đến rủi ro cạn kiệt ngân sách ngoài ý muốn ([Issue #46874](https://github.com/BerriAI/litellm/issues/46874)).
* **Sự tiến hóa của Hạ tầng:** Hãy theo dõi các tầng gateway và router bằng Rust sắp ra mắt. Nếu bạn đang vận hành các cụm proxy LiteLLM thông lượng cao, các thành phần native này sẽ sớm cung cấp khả năng proxy yêu cầu hiệu năng cao trong khi vẫn duy trì tính tương thích với cấu hình Python và middleware hiện có của bạn.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Bản tin Unsloth — 02-11-2026

### 1. Điểm nổi bật trong ngày
Công tác phát triển Unsloth trong ngày hôm nay tập trung vào việc mở rộng quy mô hạ tầng song song sâu (deep parallelism) và ổn định hóa môi trường desktop Unsloth Studio. Đội ngũ kỹ sư cốt lõi đã giới thiệu một cờ trình khởi chạy phân tán hợp nhất (`UNSLOTH_PARALLEL`) nhằm đơn giản hóa việc điều phối song song dữ liệu (data), tensor, đường ống (pipeline) và ngữ cảnh (context). Trong khi đó, các đóng góp cho Studio tập trung vào độ ổn định của CI Playwright trên nhiều tài khoản, cải thiện quản lý bộ nhớ cho các tác vụ LTX và các tầng MoE, đồng thời mở rộng tính tương đương tính năng của MLX.

---

### 2. Các bản phát hành & Thay đổi phá vỡ tương thích (Breaking Changes)
* *Không có bản phát hành GitHub chính thức nào* được ghi nhận trong 24 giờ qua.
* **Thay đổi về API/Cấu hình:** 
  * Giới thiệu **`UNSLOTH_PARALLEL`**: Biến môi trường và cờ cấu hình hợp nhất giúp gom nhóm Song song phân tán (DP), Song song Tensor (TP), Song song đường ống (PP) và Song song ngữ cảnh (CP) dưới một lưới thiết bị gốc duy nhất ([PR #16407](https://github.com/unslothai/unsloth/pull/16407)).

---

### 3. Hỗ trợ Model & Phần cứng mới
* **Mở rộng Engine MLX:** Đã phác thảo toàn diện các tính năng gọi công cụ (tool-calling) của MLX, hỗ trợ đầu vào video, ràng buộc ngữ pháp, tải lượng tử hóa KV và xử lý LoRA cho các backend Apple Silicon ([PR #16441](https://github.com/unslothai/unsloth/pull/16441)).
* **Hạ tầng Huấn luyện FP8:** Thêm hỗ trợ cho `float8_training` kết hợp với LoRA trên các mô hình cơ sở 16-bit được đóng băng (frozen) thông qua `FastLanguageModel.from_pretrained` ([PR #16423](https://github.com/unslothai/unsloth/pull/16423)).
* **Tích hợp Google Gemini:** Mở rộng khả năng kết nối mô hình để xử lý việc phân trang (`nextPageToken`), đảm bảo các phiên bản mô hình mới ra mắt (như các biến thể `gemini-3.8-flash` sắp tới) có thể tải vượt qua giới hạn 20 mô hình ban đầu ([PR #16433](https://github.com/unslothai/unsloth/pull/16433)).

---

### 4. Hiệu năng & Tối ưu hóa
* **Bảng tra cứu MoE lười (Lazy MoE Lookup Tables):** Triển khai cơ chế tải lười (lazy-loading) cho các bảng tra cứu lớn trong môi trường RAM/VRAM hỗn hợp (ví dụ: các thiết lập Qwen3.8-Flash-Next UD-IQ4_XS), giúp bộ nhớ đệm MoE của llama.cpp thực thi hiệu quả mà không làm sập bộ nhớ máy chủ trong quá trình tính toán phân tách `--fit` ([PR #16444](https://github.com/unslothai/unsloth/pull/16444)).
* **Cơ chế dự phòng bước Fit của Llama.cpp (Fit-Step Fallback):** Thêm cơ chế tự động chuyển sang thực thi trên GPU với `--fit off` nếu bước đo kích thước bộ nhớ thiết bị ban đầu của llama.cpp gặp lỗi vi phạm truy cập (access violation) trên nền tảng Windows ([PR #16421](https://github.com/unslothai/unsloth/pull/16421)).

---

### 5. Độ ổn định & Hồi quy lỗi (Regressions)
* **[Mức độ sự cố] Ghi đè bản cài đặt cô lập:** Các báo cáo cho thấy lỗi hồi quy cô lập khi việc thiết lập `UNSLOTH_STUDIO_HOME` có thể âm thầm ghi đè lên các môi trường ảo cơ sở ([Issues #16186/#16185](https://github.com/unslothai/unsloth/issues/16186)).
* **Lỗi vi phạm truy cập trên Windows (`0xC0000005`):** Một số cấu hình GPU nhất định (như AMD RX 5700 XT chạy trên Windows sử dụng Vulkan hoặc tính toán kích thước tự động) gặp lỗi sập nghiêm trọng trong giai đoạn cấu hình thiết bị ban đầu của llama.cpp ([Issue #16395](https://github.com/unslothai/unsloth/issues/16395)). Đã được xử lý thông qua logic dự phòng trong [PR #16421](https://github.com/unslothai/unsloth/pull/16421).
* **Sai lệch giao thức API âm thanh:** Các tích hợp chuyển văn bản thành giọng nói (text-to-speech) bên ngoài gặp lỗi khi định tuyến qua OpenRouter thông qua Microsoft MAI-Voice, do Unsloth Studio yêu cầu trình bao bọc WAV không được hỗ trợ thay vì các luồng MP3/PCM ([Issue #16443](https://github.com/unslothai/unsloth/issues/16443)).
* **Độ trễ khi chọn mô hình:** Trình chọn mô hình trên thiết bị gặp hiện tượng chậm đơ nghiêm trọng tới 20 phút do quá trình thăm dò lại Hugging Face diễn ra dư thừa khi khởi động đối với các tài sản GGUF được lưu trữ cục bộ ([Issue #16267](https://github.com/unslothai/unsloth/issues/16267)).

---

### 6. Ý nghĩa đối với Nhà phát triển ứng dụng
* **Điều phối phân tán hợp nhất:** Nếu bạn đang mở rộng quy mô các cụm huấn luyện trên môi trường nhiều node hoặc nhiều GPU, cờ `UNSLOTH_PARALLEL` mới sẽ thay thế cho logic cấu hình bị phân mảnh trước đây. Giờ đây, bạn có thể chỉ định các tổ hợp trục—chẳng hạn như `UNSLOTH_PARALLEL="tp=2,cp=2"`—trực tiếp thông qua các lệnh thực thi tiêu chuẩn ([PR #16407](https://github.com/unslothai/unsloth/pull/16407)).
* **Huấn luyện FP8 + LoRA:** Việc tinh chỉnh các mô hình cơ sở một cách nguyên bản với các lượt truyền thuận (forward pass) FP8 và đạo hàm đầu vào trong khi vẫn giữ nguyên mô hình cơ sở 16-bit ở trạng thái đóng băng nay đã được hỗ trợ chính thức, giúp giảm đáng kể yêu cầu về VRAM cho việc tùy chỉnh các mô hình ngôn ngữ lớn ([PR #16423](https://github.com/unslothai/unsloth/pull/16423)).
* **Cải thiện độ ổn định của Desktop:** Các ứng dụng tích hợp máy chủ suy luận cục bộ (thông qua các backend llama.cpp) sẽ hưởng lợi từ các chu trình dự phòng mới, giúp xử lý lỗi vi phạm truy cập bộ nhớ trên Windows một cách mượt mà thay vì văng mô hình giữa chừng phiên làm việc.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/bddt3006-dot/agents-radar-master) (tự động tạo).*
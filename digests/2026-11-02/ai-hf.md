# Bản tin tuần mô hình nổi bật Hugging Face 2026-11-02

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-11-02 03:53 UTC

---

### Bản tin các mô hình thịnh hành trên Hugging Face (Ngày 2 tháng 11 năm 2026)

#### 1. Tiêu điểm trong ngày
Hệ sinh thái Hugging Face đang chứng kiến một làn sóng lớn các bản phát hành mô hình đa phương thức và kiến trúc tiên tiến, dẫn đầu là mức độ tương tác cực cao với `Qwen/Qwen3.8-27B` và các mô hình tạo video tối tân như `LTX-2.5` của Lightricks. LiquidAI đang thống trị mảng mô hình nhỏ gọn và hiệu suất cao với dòng sản phẩm `LFM3` vừa ra mắt, cho thấy sự quan tâm mạnh mẽ của cộng đồng đối với các kiến trúc thần kinh thay thế bên cạnh các pipeline transformer truyền thống. Trong khi đó, các công cụ phân tích tài liệu và thị giác chuyên dụng—như `sam3` của Meta và `Unlimited-OCR-2` của Baidu—vẫn tiếp tục đạt khối lượng tải về khổng lồ, phản ánh nhu cầu mạnh mẽ từ các doanh nghiệp và nhà phát triển đối với các pipeline nhận diện sẵn sàng sử dụng ngay (out-of-the-box).

---

#### 2. Các mô hình thịnh hành

##### 🧠 Mô hình ngôn ngữ (LLM, mô hình chat, tinh chỉnh theo hướng dẫn)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 18,935 | 7,892,866 | Một mô hình hội thoại văn bản và hình ảnh mạnh mẽ đã thu hút sự chú ý của cộng đồng. Nó đang dẫn đầu bảng xếp hạng thịnh hành với gần 19.000 lượt thích và gần 8 triệu lượt tải xuống. |
| [LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B) | LiquidAI | 712 | 37,568 | Một mô hình sinh văn bản trọng lượng nhẹ, hiệu suất cao thuộc thế hệ mới nhất của LiquidAI. Mô hình này đang thịnh hành nhờ mang lại tỷ lệ hiệu năng/kích thước ấn tượng trong các môi trường bị hạn chế về tài nguyên. |
| [Nanbeige/Nanbeige4.3-33B](https://huggingface.co/Nanbeige/Nanbeige4.3-33B) | Nanbeige | 975 | 15,795 | Một mô hình ngôn ngữ mã nguồn mở với 33 tỷ tham số được xây dựng trên nền tảng Llama. Nó đang thu hút sự chú ý nhờ khả năng suy luận đa mục đích và tuân thủ các chỉ dẫn chung rất mạnh mẽ. |
| [XHToken/Spark-X2.6-4B](https://huggingface.co/XHToken/Spark-X2.6-4B) | XHToken | 948 | 16,707 | Một mô hình sinh văn bản nhỏ gọn với 4 tỷ tham số được thiết kế để suy luận tốc độ cao. Mô hình này đang được ưa chuộng bởi các nhà phát triển tìm kiếm các tùy chọn triển khai linh hoạt, độ trễ thấp. |
| [RecursiveSI/flint](https://huggingface.co/RecursiveSI/flint) | RecursiveSI | 1,296 | 26,703 | Một mô hình văn bản hội thoại do cộng đồng thúc đẩy, được tối ưu hóa cho các luồng công việc đối thoại. Nó đã tích lũy được hơn 1.200 lượt thích nhờ quá trình tinh chỉnh hội thoại hấp dẫn. |
| [Diffuspace/Clover-35B-A3B-Preview](https://huggingface.co/Diffuspace/Clover-35B-A3B-Preview) | Diffuspace | 205 | 2,352 | Một mô hình ngôn ngữ MoE (mixture-of-agents) kiểu bản xem trước sớm. Nó đang thu hút sự quan tâm của các nhà phát triển như một kiến trúc thử nghiệm nhằm đẩy giới hạn suy luận của trọng lượng mở. |

##### 🎨 Đa phương thức & Sinh nội dung (hình ảnh, video, âm thanh, text-to-X)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash-1017](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) | deepseek-ai | 4,338 | 170,353 | Mô hình chủ lực hình ảnh-văn bản sang văn bản tốc độ cao do DeepSeek phát hành. Nó kết hợp thời gian phản hồi nhanh chóng với khả năng hiểu đa phương thức mạnh mẽ, thúc đẩy mức độ tương tác hàng tuần khổng lồ. |
| [nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Transcribe-30B-A4B) | nvidia | 608 | 29,364 | Một mô hình nhận dạng giọng nói tự động cấp độ doanh nghiệp từ NVIDIA. Nó đang thịnh hành nhờ mang lại độ chính xác cao khi chuyển đổi giọng nói thành văn bản trong các môi trường âm thanh nhiều tạp âm. |
| [mistralai/Mistral-Large-4-1T-A52B](https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B) | mistralai | 1,453 | 4,576 | Mô hình đa phương thức lớn chủ lực của Mistral được thiết kế để suy luận nâng cao và tích hợp nguyên bản với vLLM. Nó đang thịnh hành như một lựa chọn thay thế mã nguồn mở hàng đầu cho doanh nghiệp. |
| [baidu/Unlimited-OCR-2](https://huggingface.co/baidu/Unlimited-OCR-2) | baidu | 525 | 109,519 | Mô hình xử lý tài liệu và nhận dạng ký tự quang học nâng cấp của Baidu. Nó đã vượt mốc 100.000 lượt tải xuống nhờ độ chính xác vượt trội trên các bố cục phức tạp, đa ngôn ngữ. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 10,231 | 2,431,846 | Một mô hình tạo và chỉnh sửa video tối tân đang thống trị danh mục pipeline sáng tạo. Nó đã thu hút hơn 10.000 lượt thích và 2,4 triệu lượt tải xuống nhờ khả năng xử lý chuyển động uyển chuyển. |
| [Pika-Labs/Pika-H3-Flex](https://huggingface.co/Pika-Labs/Pika-H3-Flex) | Pika-Labs | 315 | 404 | Một mô hình khuếch tán từ hình ảnh sang video chuyên biệt hướng tới các hiệu ứng chuyển cảnh điện ảnh linh hoạt. Nó đang thịnh hành trong cộng đồng nghệ sĩ kỹ thuật số thử nghiệm với các LoRA tạo âm thanh-video. |
| [speridlabs/idol](https://huggingface.co/speridlabs/idol) | speridlabs | 310 | 4,194 | Một mô hình gaussian splatting từ hình ảnh sang 3D sáng tạo. Nó đang thu hút sự chú ý nhanh chóng từ các nhà thiết kế 3D muốn tạo ra các tài sản sẵn sàng kết xuất (render-ready) trực tiếp từ hình ảnh đơn góc nhìn. |
| [black-forest-labs/flux-3-image-klein-comfy](https://huggingface.co/black-forest-labs/flux-3-image-klein-comfy) | black-forest-labs | 2,275 | 970,633 | Biến thể tối ưu hóa cho ComfyUI của công cụ tạo ảnh Flux mới nhất từ Black Forest Labs. Nó tự hào có gần một triệu lượt tải xuống nhờ tốc độ và khả năng bám sát câu lệnh (prompt) đáng kinh ngạc. |
| [LiquidAI/LFM3-Omni-2B](https://huggingface.co/LiquidAI/LFM3-Omni-2B) | LiquidAI | 277 | 8,376 | Một kiến trúc đa phương thức nguyên bản dạng any-to-any (bất kỳ-sang-bất kỳ) có khả năng xử lý đồng thời văn bản, âm thanh và đầu vào trực quan. Nó thể hiện dấu ấn đang mở rộng của LiquidAI trong các mô hình cảm nhận thống nhất. |
| [Edge0/Audio8-TTS-Realistic-0.6b](https://huggingface.co/Edge0/Audio8-TTS-Realistic-0.6b) | Edge0 | 212 | 4,613 | Mô hình tổng hợp văn bản thành giọng nói thực tế được thiết kế để tạo ra giọng nói con người cực kỳ tự nhiên. Nó đang thịnh hành nhờ dung lượng nhỏ gọn và khả năng điều khiển ngữ điệu biểu cảm. |
| [LiquidAI/LFM3-VL-2B](https://huggingface.co/LiquidAI/LFM3-VL-2B) | LiquidAI | 201 | 9,121 | Biến thể thị giác-ngôn ngữ được xây dựng trên kiến trúc LFM3. Nó hỗ trợ suy luận hình ảnh-văn bản hiệu quả cho các thiết bị biên (edge devices) và thiết lập máy chủ tài nguyên thấp. |
| [facebook/sam3](https://huggingface.co/facebook/sam3) | facebook | 5,646 | 1,891,055 | Mô hình Segment Anything Model 3 của Meta, được tối ưu hóa để tạo mặt nạ video nâng cao và theo dõi đối tượng. Đây là một cái tên rất được cộng đồng yêu thích với gần 2 triệu lượt tải xuống. |
| [openbmb/MiniCPM-OCR-1.0](https://huggingface.co/openbmb/MiniCPM-OCR-1.0) | openbmb | 384 | 3,513 | Một mô hình OCR và phân tích tài liệu trọng lượng nhẹ được thiết kế riêng cho việc trích xuất dữ liệu có cấu trúc. Nó đang thịnh hành đối với các nhà phát triển xây dựng các pipeline nạp tài liệu cục bộ. |
| [LiquidAI/LFM3-Audio-2B](https://huggingface.co/LiquidAI/LFM3-Audio-2B) | LiquidAI | 178 | 5,688 | Một kiến trúc tập trung vào âm thanh bắt nguồn từ dòng LFM3, được thiết kế cho các tác vụ nhận dạng giọng nói nâng cao và xử lý âm thanh. |
| [LiquidAI/d1-2B](https://huggingface.co/LiquidAI/d1-2B) | LiquidAI | 159 | 4,256 | Mô hình trích xuất đặc trưng thị giác-ngôn ngữ chuyên biệt từ LiquidAI. Nó đang thu hút sự quan tâm cho các ứng dụng nghiên cứu đa phương thức nhúng. |
| [Efficient-Large-Model/Open-H3-Regenerate-2K](https://huggingface.co/Efficient-Large-Model/Open-H3-Regenerate-2K) | Efficient-Large-Model | 157 | 0 | Một LoRA tinh chỉnh video-sang-video tương thích với các pipeline video Minimax-H3. Nó đang thịnh hành nhờ khả năng nâng cấp (upscale) và tái tạo tính nhất quán thời gian của video. |
| [xiaomi-research/Xiaomi-OCR-0](https://huggingface.co/xiaomi-research/Xiaomi-OCR-0) | xiaomi-research | 206 | 17,143 | Sản phẩm OCR độc quyền của Xiaomi tham gia vào công nghệ mã nguồn mở, tận dụng xương sống Qwen3.5. Nó đang thịnh hành nhờ khả năng nhận dạng chữ viết nhanh chóng và chính xác trên phần cứng máy tính di động. |

##### 🔧 Các mô hình chuyên biệt (lập trình, toán học, y tế, embedding)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder) | ccore | 490 | 44,825 | Một mô hình lập trình chuyên biệt được tinh chỉnh riêng cho việc tạo đồ họa web Three.js và 3D. Nó đã thu hút hơn 44.000 lượt tải xuống vì lấp đầy một khoảng trống độc đáo trong phát triển web không gian. |

##### 📦 Bản tinh chỉnh & Lượng tử hóa (cộng đồng tinh chỉnh, GGUF, AWQ)

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [abenzerps/Qwen-Image-2.1-Uncensored-Quantized](https://huggingface.co/abenzerps/Qwen-Image-2.1-Uncensored-Quantized) | abenzerps | 5,479 | 2,548,468 | Biến thể GGUF đã lượng tử hóa, không kiểm duyệt và rất được săn đón của Qwen Image 2.1 được thiết kế cho ComfyUI. Nó đã đạt hơn 2,5 triệu lượt tải xuống nhờ sự tự do sáng tạo không bị kìm hãm. |
| [ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/DeepSeek-V4.1-Flash-1017-GSQ-RCO-GGUF) | ISTA-DASLab | 537 | 2,294,642 | Một bản lượng tử hóa GGUF độ chính xác hỗn hợp nâng cao của DeepSeek-V4.1-Flash. Nó đã vượt mốc 2,2 triệu lượt tải xuống nhờ khả năng cho phép triển khai cục bộ một mô hình lớn trên phần cứng người dùng phổ thông. |
| [AtomicChat/LFM3-1.7B-Uncensored-GGUF](https://huggingface.co/AtomicChat/LFM3-1.7B-Uncensored-GGUF) | AtomicChat | 181 | 46,155 | Bản dựng GGUF không kiểm duyệt từ cộng đồng của mô hình LFM3-1.7B do LiquidAI phát triển. Nó cung cấp khả năng suy luận hội thoại trọng lượng nhẹ được tối ưu hóa cho người dùng llama.cpp. |
| [LiquidAI/LFM3-1.7B-GGUF](https://huggingface.co/LiquidAI/LFM3-1.7B-GGUF) | LiquidAI | 176 | 150,260 | Trọng số GGUF chính thức cho mô hình LFM3-1.7B của LiquidAI. Nó đã nhanh chóng đạt hơn 150.000 lượt tải xuống nhờ khả năng tương thích suy luận mượt mà trên CPU và thiết bị biên. |
| [OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated](https://huggingface.co/OBLITERATUS/DeepSeek-V4.1-Flash-1017-obliterated) | OBLITERATUS | 158 | 520 | Biến thể đã gỡ bỏ tính năng an toàn của DeepSeek-V4.1-Flash-1017. Nó đang thịnh hành trong giới nghiên cứu tìm hiểu về chi phí căn chỉnh (alignment tax) và các thay đổi hành vi của mô hình. |

---

#### 3. Tín hiệu hệ sinh thái
Hệ sinh thái Hugging Face đang chứng kiến sự hội tụ mạnh mẽ hướng tới khả năng đa phương thức và đa dạng hóa kiến trúc. Trong khi các "gã khổng lồ" dựa trên transformer như các phiên bản mới nhất của Qwen và các mô hình flash của DeepSeek chiếm lĩnh khối lượng tải về khổng lồ, các kiến trúc thay thế như dòng `LFM3` của LiquidAI đang chiếm lĩnh phần lớn tâm trí người dùng trong lĩnh vực hiệu suất cao, có thể triển khai ở thiết bị biên. 

Quá trình lượng tử hóa và tinh chỉnh do cộng đồng thúc đẩy vẫn là những trụ cột thiết yếu của nền tảng: các bản thích ứng GGUF cho các mô hình nặng về tài nguyên (chẳng hạn như bản lượng tử hóa DeepSeek-V4.1 của ISTA-DASLab và công việc của abenzerps trên Qwen Image) tiếp tục ghi nhận hàng triệu lượt tải xuống, chứng minh rằng việc triển khai cục bộ trên phần cứng người dùng phổ thông vẫn là động lực chính tạo ra lượng sử dụng khối lượng lớn. Hơn nữa, các lĩnh vực chuyên 3d như tạo video (`LTX-2.5`), điện toán không gian 3D (`idol`, `Qwen3.5-4B-3D-Coder`) và phân tích tài liệu đang trải qua mức tăng trưởng theo cấp số nhân, đánh dấu sự chuyển dịch từ việc tạo văn bản/hình ảnh thuần túy sang các pipeline AI tương tác hoàn toàn và đa giác quan.

---

#### 4. Đáng để khám phá
1. **[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5)**: Cực kỳ cần thiết cho bất kỳ ai làm việc trong lĩnh vực tạo video sinh ản (generative video). Khả năng quản lý tính nhất quán theo thời gian phức tạp và xử lý chuyển động khiến nó trở thành sự lựa chọn nổi bật cho các nhà sáng tạo kỹ thuật số độc lập.
2. **[LiquidAI/LFM3-1.7B](https://huggingface.co/LiquidAI/LFM3-1.7B)**: Một mô hình bắt buộc phải thử đối với các nhà phát triển AI biên và nhà nghiên cứu muốn thử nghiệm các kiến trúc thay thế, hiệu suất cực cao bên ngoài các lớp transformer tiêu chuẩn mà không phải hy sinh hiệu năng.
3. **[ccore/Qwen3.5-4B-3D-Coder](https://huggingface.co/ccore/Qwen3.5-4B-3D-Coder)**: Một mô hình theo chiều dọc vô cùng thú vị, thu hẹp khoảng cách giữa việc tạo mã nguồn dựa trên văn bản và phát triển web 3D/Three.js, hoàn hảo cho việc tạo mẫu giao diện (front-end prototyping) sáng tạo.

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/bddt3006-dot/agents-radar-master) (tự động tạo).*
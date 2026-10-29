# Bản tin hệ sinh thái OpenClaw 2026-10-29

> Issues: 500 | PRs: 500 | Số dự án: 5 | Thời gian tạo: 2026-10-29 03:09 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## Báo cáo chuyên sâu dự án OpenClaw

# Bản tin Dự án OpenClaw — 29-10-2026

## 1. Tổng quan hôm nay
OpenClaw ghi nhận mức độ hoạt động cực kỳ cao trong 24 giờ qua, với 500 vấn đề (issues) và 500 yêu cầu kéo (pull requests) được cập nhật. Năng lực bảo trì vẫn đang chịu áp lực lớn do tính mỏng manh của hạ tầng, tình trạng tranh chấp cơ sở dữ liệu trạng thái SQLite, và lỗi rò rỉ bộ nhớ ở tiến trình nền (background worker). Dù không có bản phát hành mới nào được tung ra trong ngày hôm nay, các maintainer cốt lõi vẫn đang tích cực tập trung giải quyết các điểm nghẽn khi khởi động, các vấn đề về vòng đời cron-job, và lỗi chuẩn hóa Unicode trên các tích cực. Nhìn chung, đà phát triển của dự án rất mạnh về mặt sản lượng nhưng lại bị kìm hãm bởi gánh nặng nợ kỹ thuật về độ ổn định trong các tầng lưu trữ và trình bao bọc dịch vụ hệ điều hành (OS service wrappers).

---

## 2. Các bản phát hành
*Không có bản phát hành mới nào được công bố trong 24 giờ qua.*

---

## 3. Tiện độ Dự án
Các pull request gần đây và các mục đã được gộp (merged)/đóng (closed) cho thấy sự quan tâm đáng kể đến tính đúng đắn trong các trường hợp biên (edge-case) và khả năng phục hồi của hệ thống:
- **CLI & Chẩn đoán (`openclaw doctor`):** PR [#187192](https://github.com/openclaw/openclaw/pull/187192) và PR [#187170](https://github.com/openclaw/openclaw/pull/187170) cải thiện độ tin cậy của lệnh `openclaw doctor --fix` bằng cách đảm bảo lệnh này chạy các tiến trình di cư (migrations) ở chế độ không giao diện (headless) một cách chính xác và thoát với mã lỗi khác 0 khi các thao tác sửa chữa được yêu cầu vẫn đang bị nghẽn.
- **Chuẩn hóa Unicode:** PR [#187199](https://github.com/openclaw/openclaw/pull/187199) và PR [#187189](https://github.com/openclaw/openclaw/pull/187189) đã khắc phục lỗi tra cứu thư mục và tìm kiếm phiên làm việc trong Mattermost và OpenCode bằng cách đảm bảo các chuỗi Unicode tương đương chuẩn tắc (NFC và NFD) được khớp đúng cách.
- **Hạ tầng & Sao lưu:** PR [#187197](https://github.com/openclaw/openclaw/pull/187197) cách ly các đợt thăm dò tiêu đề SQLite bằng các khoảng thời gian chờ (timeouts) riêng biệt nhằm ngăn chặn lệnh `openclaw backup create` bị treo trên các thư mục trạng thái lớn chứa hàng trăm nghìn tệp tin.

---

## 4. Chủ đề Nóng trong Cộng đồng
Các cuộc thảo luận sôi nổi nhất làm nổi bật những điểm đau cốt lõi xoay quanh hiệu năng khởi động, tính toàn vẹn dữ liệu, và vòng đời phiên làm việc:
- [#160959 [OPEN] Gateway blocks for minutes while capturing large external plugins](https://github.com/openclaw/openclaw/issues/160959): Nhận được 63 bình luận. Lỗi hồi quy (regression) từ bản 2026.9.6 khiến cây phụ thuộc của không gian làm việc (workspace)/plugin ngoài lớn làm nghẽn vòng lặp sự kiện (event loop) của Gateway trong nhiều phút khi khởi động.
- [#183786 [CLOSED] Windows beta upgrade repeatedly queries stopped foreground Gateway PID](https://github.com/openclaw/openclaw/issues/183786): Ghi nhận 47 bình luận chi tiết về việc quá trình nâng cấp bị treo trên môi trường Windows 10 nguyên bản.
- [#164294 [OPEN] Gateway state DB WAL auto-checkpoint never completes](https://github.com/openclaw/openclaw/issues/164294): Thu hút 36 bình luận liên quan đến việc các điểm kiểm tra WAL trên tệp `state/openclaw.sqlite` bị chặn vĩnh viễn bởi các tiến trình đọc đang chạy ngầm.
- [#159662 [OPEN] prepared-model-catalog.worker.js unbounded memory leak](https://github.com/openclaw/openclaw/issues/159662): 27 bình luận thảo luận về lỗi rò rỉ bộ nhớ độc lập với nhà cung cấp (provider-agnostic), có mức tăng trưởng quy mô khoảng ~4–5 GB/h trên các hệ thống cài đặt nhàn rỗi hoặc có tải nhẹ.

---

## 5. Lỗi & Độ ổn định
Các vấn đề về độ ổn định được xếp hạng theo mức độ nghiêm trọng đang chi phối danh sách theo dõi:
- **P0 / Vòng lặp sự cố (Crash Loops):**
  - [#162211 [OPEN] Startup blocks the Gateway event loop for 40–200s, triggering restart loops](https://github.com/openclaw/openclaw/issues/162211) — Các trình giám sát tình trạng kênh (channel health monitors) hiểu nhầm các khoảng thời gian nghẽn khi khởi động thành sự cố ngắt kết nối dưới `launchd` (macOS).
  - [#126821 [OPEN] SQLite corruption recurs on pristine rebuilt DBs within 15–24h (WSL2)](https://github.com/openclaw/openclaw/issues/126821) — Dẫn đến việc gateway bị tê liệt, từ chối phục vụ dịch vụ mà không chịu thoát tiến trình.
- **P1 / Trạng thái Phiên & Mất dữ liệu:**
  - [#166634 [OPEN] Late reclamation commit checkpoint failure leaves agent unavailable after crash recovery](https://github.com/openclaw/openclaw/issues/166634) — Khiến các agent bị ảnh hưởng từ chối mọi yêu cầu về lịch sử/siêu dữ liệu với mã lỗi `UNAVAILABLE`.
  - [#178000 [CLOSED] Session-state races trigger cross-provider model fallback as reason=unknown](https://github.com/openclaw/openclaw/issues/178000) — Tình trạng tranh chấp trạng thái tạm thời (transient state races) ép buộc việc chuyển đổi nhà cung cấp mô hình bất ngờ thay vì thực hiện thử lại (retry).

---

## 6. Yêu cầu Tính năng & Tín hiệu Lộ trình (Roadmap)
- [#44309 [OPEN] Add one-way dispatch mode for A2A handoffs without reply-back ping-pong](https://github.com/openclaw/openclaw/issues/44309): Được các nhà vận hành hệ thống đa agent (multi-agent) yêu cầu mạnh mẽ nhằm đưa các tác vụ vào phiên đích một cách gọn gàng.
- [#138366 [OPEN] Let the memory slot owner drive the Dreams page](https://github.com/openclaw/openclaw/issues/138366): Nhằmモジュール hóa (mô-đun hóa) các tính năng cốt lõi của bộ nhớ trong Giao diện Điều khiển (Control UI).
- **Lộ trình Dự đoán:** Dự kiến các bản phát hành sắp tới sẽ nhấn mạnh mạnh mẽ vào các bản vá độ ổn định cho tình trạng nghẽn ghi SQLite, các cơ chế bảo vệ đồng hồ đơn điệu (monotonic clock) cho các tiến trình nền, và độ tin cậy khi chuyển giao dịch vụ trên Windows.

---

## 7. Tóm tắt Phản hồi Người dùng
Người dùng báo cáo sự thất vọng đáng kể với các vấn đề ma sát khi nâng cấp trên Windows (`schtasks` và lỗi quyền hạn), thời gian khởi động khó đoán trên các cơ sở dữ liệu agent lớn (ví dụ: cơ sở dữ liệu 3.5 GB gây ra thời gian chết kéo dài vài phút), và tình trạng âm thầm loại bỏ dữ liệu (chẳng hạn như các gốc bộ nhớ được quản lý như `MEMORY.md` bị loại bỏ vĩnh viễn bởi các cơ chế kiểm soát nguồn gốc mà không có thông báo cho người vận hành). Mức độ hài lòng vẫn ở mức cao đối với các tính năng cốt lõi của agent, nhưng chi phí vận hành (operational overhead) trong môi trường production và enterprise đang là mối quan ngại ngày càng lớn.

---

## 8. Theo dõi Tồn đọng (Backlog)
Các mục tồn đọng lâu ngày cần sự chú ý từ các maintainer:
- [#44309 [OPEN] Add one-way dispatch mode for A2A handoffs](https://github.com/openclaw/openclaw/issues/44309) (Tạo tháng 3-2026, 15 bình luận): Cần quyết định về mặt sản phẩm đối với ngữ nghĩa kiến trúc nhắn tin.
- [#120385 [OPEN] Code Mode tool catalog built incomplete for scheduled/cron and memory-flush turns](https://github.com/openclaw/openclaw/issues/120385) (Tạo tháng 8-2026, 21 bình luận): Vấn đề tồn đọng gây ra lỗi "Unknown tool id" trong các tác vụ định lịch.
- [#58289 [OPEN] Non-main agent may miss models.json and fail with "Unknown model"](https://github.com/openclaw/openclaw/issues/58289) (Tạo tháng 3-2026, 7 bình luận): Lỗ hổng cấu hình đa agent liên tục xảy ra khi các gói nhà cung cấp trống.

---

## So sánh đối chiếu hệ sinh thái

### 1. Tổng quan Hệ sinh thái
Hệ sinh thái các AI agent mã nguồn mở và trợ lý cá nhân đang chứng kiến tốc độ phát triển kỹ thuật vô cùng mạnh mẽ, được thúc đẩy bởi cuộc đua hoàn thiện quá trình điều phối đa tác nhân (multi-agent orchestration), quản lý trạng thái vững chắc và tính bảo mật cấp doanh nghiệp. Xuyên suốt các dự án như OpenClaw, Hermes Agent, QwenPaw, ZeroClaw và IronClaw, các maintainer đang phải vật lộn với những hệ lụy kiến trúc khi chuyển đổi sang runtime cổng tập trung (unified gateway runtime), các engine cron phân tán và tích hợp Model Context Protocol (MCP) phức tạp. Mặc dù tỷ lệ người dùng áp dụng và các tính năng đang mở rộng nhanh chóng, nhưng nợ kỹ thuật tiềm ẩn — đặc biệt là xung đột trạng thái SQLite, hỏng cơ sở dữ liệu và tính an toàn luồng (thread-safety) — vẫn là điểm nghẽn chung đe dọa sự ổn định trong môi trường production.

---

### 2. So sánh Hoạt động

| Tên Dự án | Repository | Issues Cập nhật / Hoạt động | PR Cập nhật / Hoạt động | Bản phát hành Mới | Điểm Sức khỏe Ước tính (1–10) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | `openclaw/openclaw` | ~500 | ~500 | Không có | 6.0 (Sản lượng cao, gánh nặng nợ ổn định) |
| **Hermes Agent** | `nousresearch/hermes-agent` | 50 | 50 | Không có | 7.5 (Vững chắc, tích cực phân loại sau gộp mã) |
| **IronClaw** | `nearai/ironclaw` | 1 | 0 | Không có | 7.0 (Khoảng lặng yên tĩnh, nền tảng ổn định) |
| **QwenPaw** | `agentscope-ai/QwenPaw` | 22 | 49 | Không có (đang chờ bản beta) | 8.0 (Tốc độ cao, chuẩn bị phát hành ổn định) |
| **ZeroClaw** | `zeroclaw-labs/zeroclaw` | 18 | 29 | Không có | 8.5 (Đà tăng trưởng mạnh, pha cứng hóa) |

---

### 3. Vị thế của OpenClaw
* **Ưu điểm so với các đối thủ:** OpenClaw duy trì độ phủ tích hợp hệ sinh thái chưa từng có, mức độ chiếm lĩnh tâm trí trong phân khúc doanh nghiệp, và một cộng đồng rộng lớn giúp nhanh chóng phát hiện các trường hợp biên (edge-case) cũng như mở rộng danh mục công cụ.
* **Khác biệt về phương pháp tiếp cận kỹ thuật:** Khác với các runtime có tính mô-đun hoặc cô lập hơn (ví dụ: trọng tâm của ZeroClaw là lịch sử sự kiện chỉ-ghi-thêm [append-only] hay các kênh plugin cách ly bằng tiến trình con của QwenPaw), OpenClaw phụ thuộc lớn vào kiến trúc cơ sở dữ liệu trạng thái SQLite tập trung, điều này hiện khiến họ dễ gặp phải các điểm nghẽn kiểm tra WAL (WAL checkpoint) nghiêm trọng, độ trễ khởi động bị chặn và hỏng bộ nhớ lưu trữ khi chạy ở mức độ đồng thời cao.
* **So sánh quy mô cộng đồng:** OpenClaw hoạt động ở một quy mô tương tác cộng đồng hoàn toàn khác biệt (xử lý khoảng ~500 issues/PR mỗi ngày) so với các hệ sinh thái tầm trung như Hermes và QwenPaw (~20–50 mục), và vượt trội đáng kể so với các repository ít sôi động hơn như IronClaw. Tuy nhiên, quy mô này lại làm trầm trọng thêm tình trạng kiệt quệ băng thông của maintainer và độ mỏng manh của cơ sở hạ tầng.

---

### 4. Các Trọng tâm Kỹ thuật Chung
* **Điều khiển Suy luận & Thực thi của Model:** Nhiều dự án đang triển khai việc phân bổ cấp độ suy luận chi tiết (ví dụ: `thinking_level` trong QwenPaw, các công cụ điều khiển suy luận gốc của OpenAI trong ZeroClaw) để quản lý ngân sách suy luận sâu cho mỗi tác vụ cron hoặc cấu hình runtime.
* **Tiêu chuẩn Sổ đăng ký Nhà cung cấp Model & Quyền riêng tư:** Một làn sóng các đóng góp và thảo luận cộng đồng lặp lại xuyên suốt IronClaw (`#8161`), ZeroClaw (`#12085`) và Hermes Agent nhấn mạnh sự cần thiết phải tiêu chuẩn hóa quyền riêng tư của bên thứ ba và tích hợp các nhà cung cấp ngách (ví dụ: Obscurify.ai) vào danh mục nhà cung cấp.
* **Khả năng Phục hồi MCP và Kênh Truyền tải:** ZeroClaw, Hermes Agent và OpenClaw đều đang tối ưu hóa mạnh mẽ việc xử lý ở cấp độ giao thức — cụ thể là giảm thiểu tình trạng rớt kết nối MCP đơn lẻ, chặn nghẽn Telegram (HTTP 429 `retry_after`) và các lỗi tạm thời khi chuyển đổi giọng nói thành văn bản.

---

### 5. Phân tích Khác biệt
* **Trọng tâm Tính năng:** 
  * *OpenClaw:* Cơ sở hạ tầng agent cốt lõi cho doanh nghiệp, công cụ chẩn đoán (`openclaw doctor`) và khả năng không gian làm việc rộng rãi.
  * *Hermes Agent:* Không gian làm việc webapp trên desktop, điều khiển agent dựa trên Kanban và ghép kênh cổng tập trung (unified gateway multiplexing).
  * *QwenPaw:* Xử lý đa phương tiện phong phú, tích hợp kênh Feishu/WeChat đa phương thức, và quản lý Reranker/Embedding cục bộ.
  * *ZeroClaw:* Cứng hóa bộ bảo vệ bảo mật sâu, theo dõi lịch sử phiên chỉ-ghi-thêm và tối ưu hóa di động/Termux.
  * *IronClaw:* Framework lõi nhẹ, gắn liền với NEAR với lập trường thận trọng đối với việc phình to sổ đăng ký nhà cung cấp.
* **Người dùng Mục tiêu:** OpenClaw hướng tới các nhà vận hành doanh nghiệp và kiến trúc sư hệ thống đa tác nhân; Hermes và QwenPaw phục vụ cho người dùng nâng cao và các nhà phát triển tìm kiếm các tích hợp kênh chat/desktop được trau chuốt; ZeroClaw thu hút các kỹ sư quan tâm đến bảo mật và những người vận hành môi trường bị hạn chế tài nguyên.
* **Kiến trúc Kỹ thuật:** OpenClaw và Hermes tận dụng các runtime cổng tập trung với cơ sở dữ liệu trạng thái nặng, trong khi QwenPaw và ZeroClaw đang nghiêng về việc tách rời kiến trúc (architectural decoupling), SDK plugin cách ly bằng tiến trình con và sổ cái sự kiện phiên bản chỉ-ghi-thêm.

---

### 6. Động lực Cộng đồng & Độ chín
* **Lặp lại Nhanh chóng:** *OpenClaw* và *QwenPaw* thể hiện các vòng lặp kỹ thuật với tốc độ cao. OpenClaw đẩy ra sản lượng lớn đi kèm với nợ kỹ thuật cao, trong khi QwenPaw đang chuẩn bị có phương pháp các bản phát hành trước có cấu trúc (`v2.3.0-beta.1`) song song với việc nâng cấp bộ nhớ và trải nghiệm giao diện console.
* **Ổn định & Cứng hóa:** *ZeroClaw* và *Hermes Agent* hiện đang tập trung vào việc phân loại nghiêm ngặt sau khi gộp mã, siết chặt ranh giới bảo mật (ví dụ: trình bảo vệ lệnh đẩy Git, định mức ngân sách prompt) và xử lý lỗi giao thức nhằm bảo vệ các phần mở rộng kiến trúc của họ.
* **Ngủ đông / Lắng xuống:** *IronClaw* thể hiện một khoảng lặng phát triển tạm thời, bị kìm hãm chủ yếu bởi tốc độ đóng góp do cộng đồng thúc đẩy và việc thiếu các pull request tích cực từ maintainer.

---

### 7. Tín hiệu Xu hướng
* **Sự ma sát giữa Bảo mật và Khả năng sử dụng:** Các mặc định bảo mật mạnh mẽ — chẳng hạn như kích thước prompt bị chặn cứng của ZeroClaw hoặc các regex chống chèn shell nghiêm ngặt — thường xuyên gây ra các cảnh báo giả (false positives), làm nổi bật một thách thức ngày càng lớn trong ngành khi phải cân bằng giữa việc cách ly agent nghiêm ngặt và tính công thái học đối với nhà phát triển.
* **Trạng thái Phù du so với Lỗi Lưu trữ Bền vững:** Tần suất lớn của các sự cố chặn kiểm tra WAL trên SQLite, lỗi khôi phục phiên và lỗi tiêm lại phương tiện nén ngữ cảnh chỉ ra một bài học lớn hơn cho hệ sinh thái: cơ sở dữ liệu trạng thái agent cục bộ yêu cầu các kiến trúc bất đồng bộ, hướng sự kiện thay vì khóa file đồng bộ để sống sót dưới tải công việc trong môi trường production.
* **Quản trị Agent Chi tiết:** Các nhà vận hành ngày càng đòi hỏi các ranh giới runtime nguyên thủy — chẳng hạn như ngân sách suy luận theo mỗi tác vụ, kiểm toán phiên chỉ-ghi-thêm và các chế độ điều phối A2A một chiều — báo hiệu rằng các AI agent đang chuyển đổi từ các tiện ích trò chuyện tương tác sang các tiến trình nền (daemon) tự động chạy ngầm trong doanh nghiệp.

---

## Báo cáo chi tiết các dự án tương đương

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Bản tin Dự án Hermes Agent — 2026-10-29

## 1. Tổng quan hôm nay
Kho lưu trữ (repository) Hermes Agent ghi nhận hoạt động phát triển rất sôi nổi, duy trì mức cân bằng đều đặn với 50 issue và 50 pull request được cập nhật trong 24 giờ qua. Trọng tâm kỹ thuật chính tiếp tục xoay quanh độ ổn định và các bản vá hậu gộp (post-merge fixes) cho **Unified Gateway Runtime** (`#106742`), thành phần tập trung hóa việc xử lý phiên cục bộ. Các cộng đóng góp cũng tập trung mạnh vào các lỗi tích hợp đa nền tảng, ranh giới bảo mật trong việc thực thi công cụ (tool execution), và các vấn đề UI/UX trong Hermes Desktop cùng không gian làm việc webapp mới ra mắt. Nhìn chung, sức khỏe dự án vẫn duy trì ở mức tốt, mặc dù các hệ quả từ những thay đổi kiến trúc lớn như tính năng ghép kênh (multiplexing) và runtime thống nhất đang tạo ra một lượng lớn các ticket xử lý sự cố đang hoạt động.

## 2. Các bản phát hành (Releases)
*Không có bản phát hành chính thức nào được công bố trong 24 giờ qua.*

## 3. Tiễn độ dự án
Các cộng tác viên đã gộp (merge) 25 pull request trong ngày hôm nay, giải quyết thành công một số lỗi ngoại lệ (edge-case) và cải thiện khả năng tích hợp trên các nền tảng:
- **Không gian làm việc Desktop & Webapp:** Đã sửa lỗi gom nhóm thanh bên (sidebar) của Webapp để đảm bảo các cấu hình của một gateway duy nhất được giữ đồng bộ dưới một mục (**Hermes host**) ([PR #146116](https://github.com/NousResearch/hermes-agent/pull/146116)) và bảo vệ việc cài đặt plugin trên desktop trước các cấu trúc cây liên kết tượng trưng (symlinked trees) ([PR #146189](https://github.com/NousResearch/hermes-agent/pull/146189)).
- **Gateway & Nền tảng Nhắn tin:** Đã giải quyết việc lọc tên file tệp đính kèm đến của hệ thống chuyển tiếp (relay inbound) cho các tích hợp Slack ([PR #142127](https://github.com/NousResearch/hermes-agent/pull/142127)) đồng thời khôi phục các chỉ báo đang nhập (typing indicators) và phản hồi tương tác (reaction feedback) cho các lượt chuyển tiếp được nhà sản xuất chấp nhận ([PR #146249](https://github.com/NousResearch/hermes-agent/pull/146249)).
- **Cấu hình & Nhà cung cấp Cốt lõi:** Đã sửa lỗi khởi tạo Bedrock client để tuân thủ đúng thời gian chờ yêu cầu (request timeouts) đã cấu hình ([PR #137401](https://github.com/NousResearch/hermes-agent/pull/137401)) và sửa lỗi phân tích cú pháp múi giờ của bộ lên lịch cron (`schedule.tz`) để thích ứng chính xác với các đợt chuyển đổi Giờ Tiết kiệm Ánh sáng Ban ngày (Daylight Saving Time) ([PR #137231](https://github.com/NousResearch/hermes-agent/pull/137231)).

## 4. Chủ đề nóng trong cộng đồng
Sự chú ý của cộng đồng tập trung mạnh vào các hạng mục theo dõi kiến trúc đang diễn ra và các lỗi ngoại lệ trên nền tảng:
- [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) (224 bình luận): Issue theo dõi chính cho các bản vá hậu gộp sau khi triển khai runtime gateway thống nhất tiếp tục thu hút thảo luận gay gắt về quyền sở hữu phiên cục bộ (local session ownership).
- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) (29 bình luận): Báo cáo lỗi chi tiết về việc các phiên desktop backend từ xa không thể khôi phục từ desktop cục bộ (`session.resume` trả về `not_found`).
- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) (27 bình luận): Issue theo dõi phụ tập trung vào các vấn đề còn tồn đọng trên nhánh main đối với kiến trúc gateway thống nhất, cho thấy các tương tác bề mặt phức tạp.
- [#122402](https://github.com/NousResearch/hermes-agent/issues/122402) (15 bình luận): Báo cáo lỗi bản dựng (build failure) trên Ubuntu 24.04, nơi các tiến trình tiếp quản PM cũ không thể build `python-olm` do thiếu các yêu cầu `clang++` trong các môi trường Python được quản lý.

## 5. Lỗi & Độ ổn định
Một số vấn đề về độ ổn định và báo cáo hồi quy (regression) đã xuất hiện:
- **Bảo mật / Thực thi trọng yếu:** Báo cáo bảo mật nhấn mạnh rằng bộ lọc phê duyệt (approval guard) bỏ sót các biến thể `git push` mang tính phá hoại như `--mirror`, `--delete`, và các refspec bị ép buộc ([PR #146311](https://github.com/NousResearch/hermes-agent/pull/146311)). Tính an toàn của việc nén (compaction safety) cũng được nhắm tới để ngăn chặn các nhãn vai trò bị giả mạo lọt qua quá trình tuần tự hóa bản ghi hội thoại (transcript serialization) ([Issue #144835](https://github.com/NousResearch/hermes-agent/issues/144835)).
- **Hồi quy Phiên & Gateway:** Việc khôi phục phiên desktop từ xa bị lỗi với các thông báo `not_found` ([Issue #139818](https://github.com/NousResearch/hermes-agent/issues/139818)); các pha kết nối của tác vụ kanban hồ sơ lạnh (cold-profile kanban worker) bị timeout trên các gateway được ghép kênh ([Issue #145237](https://github.com/NousResearch/hermes-agent/issues/145237)); và các công cụ phân tích thị giác trả về các khối văn bản JSON thô thay vì tệp đính kèm hình ảnh gốc ([Issue #146308](https://github.com/NousResearch/hermes-agent/issues/146308)).
- **Môi trường Docker:** Lỗi quyền hệ thống tệp (filesystem permission) trong đó Docker khởi tạo `/root/.hermes` dưới quyền root, khiến môi trường trình duyệt chạy trong container bị treo trong 120 giây ([Issue #146301](https://github.com/NousResearch/hermes-agent/issues/146301)).

## 6. Yêu cầu tính năng & Tín hiệu Lộ trình
Người dùng và các maintainer đã gửi gắm một số đề xuất tính năng đáng chú ý, báo hiệu các cải tiến quy trình làm việc sắp tới:
- **Tích hợp Nghiên cứu Chuyên sâu (Deep Research):** Bản cài đặt kỹ năng tùy chọn chính thức cho một agent "deep-researcher" sử dụng sổ cái khiếu nại/bằng chứng (claim/evidence ledger) và tìm kiếm mã nguồn theo lô (batched code searches) ([PR #105531](https://github.com/NousResearch/hermes-agent/pull/105531)).
- **Danh mục & Nhà cung cấp MCP:** Bổ sung danh mục cho Turbo Notify WhatsApp MCP ([PR #146105](https://github.com/NousResearch/hermes-agent/pull/146105)) và plugin nhà cung cấp mô hình AI Obscurify ([PR #146077](https://github.com/NousResearch/hermes-agent/pull/146077)).
- **Cấu hình Bảng điều khiển (Dashboard):** Quy trình cài đặt desktop mới cho phép người dùng cấu hình thông tin đăng nhập bảng điều khiển cục bộ trực tiếp từ bảng cài đặt ([PR #146312](https://github.com/NousResearch/hermes-agent/pull/146312)).

## 7. Tóm tắt Phản hồi của Người dùng
Người dùng tương tác với Hermes Desktop, CLI và các gateway nhắn tin đã bày tỏ sự vướng mắc liên quan đến:
- **Ranh giới đa hồ sơ và ghép kênh:** Rò rỉ bộ nhớ đa hồ sơ (cross-profile memory leaks) khi tính năng ghép kênh bị tắt ([Issue #146293](https://github.com/NousResearch/hermes-agent/issues/146293)) và sự không khớp phạm vi hồ sơ khi gán lại các thẻ Kanban giữa các hồ sơ ([Issue #146237](https://github.com/NousResearch/hermes-agent/issues/146237)).
- **Lỗi kết xuất giao diện (UI Rendering Artifacts):** Các lệnh gọi công cụ `clarify` đơn lẻ bị kết xuất không chính xác thành nhiều thẻ chat trực tiếp giống hệt nhau, trộn lẫn với các khối suy luận trước đó trong giao diện desktop ([Issue #145098](https://github.com/NousResearch/hermes-agent/issues/145098)).

## 8. Theo dõi Tồn đọng (Backlog Watch)
Các issue lâu ngày chưa được trả lời hoặc đang chín muồi cần các maintainer phân loại (triage) bao gồm:
- [#69310](https://github.com/NousResearch/hermes-agent/issues/69310): Các lượt kiểm tra trạng thái (health checks) của nền tảng Signal gọi nhầm vào một điểm cuối API không tồn tại (`/api/v1/check`) đối với các container `signal-cli-rest-api` hiện đại (cần quyết định - needs-decision).
- [#136931](https://github.com/NousResearch/hermes-agent/issues/136931): Các quan ngại về kiến trúc liên quan đến cơ chế tự cải thiện kỹ năng (skill self-improvement), vô tình làm suy giảm các quy trình làm việc tốt bằng cách đối xử với các bản vá tạm thời như những quy tắc bền vững.
- [#118118](https://github.com/NousResearch/hermes-agent/issues/118118): Đề xuất yêu cầu các bộ điều phối (dispatchers) áp dụng `max_in_progress` và các giới hạn theo từng hồ sơ một cách nghiêm ngặt ngay khi khởi động để ngăn chặn tình trạng tranh chấp điều kiện (race conditions) trong lúc các đột biến đang diễn ra (mid-flight mutations).

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — October 29, 2026

## 1. Today's Overview
Kho lưu trữ (repository) IronClaw (`nearai/ironclaw`) vừa trải qua 24 giờ hoạt động khá trầm lắng, phản ánh sự chững lại tạm thời trong tốc độ phát triển. Hoạt động chỉ xoay quanh một vấn đề (issue) mới được mở liên quan đến việc tích hợp nhà cung cấp (provider), không có pull request nào được cập nhật hay hợp nhất (merged), và không có bản phát hành (release) mới nào được triển khai. Nhìn chung, sức khỏe dự án vẫn ổn định, mặc dù tiến độ phát triển hiện đang bị nghẽn (bottleneck) ở các bản tích hợp do cộng đồng đóng góp và khâu phân loại của người bảo trì (maintainer triage).

## 2. Releases
*Không có bản phát hành mới nào trong ngày hôm nay.*

## 3. Project Progress
*Không có pull request nào được hợp nhất, mở mới hay đóng lại trong khoảng thời gian 24 giờ này.* Do đó, không ghi nhận thêm tính năng mới trực tiếp hay bản vá lỗi nào trong ngày hôm nay.

## 4. Community Hot Topics
Sự quan tâm của cộng đồng tập trung vào các tiêu chí mở rộng nhà cung cấp:

- [#8161 [OPEN] Would you accept Obscurify.ai as a named provider?](https://github.com/nearai/ironclaw/issues/8161)
  - **Tóm tắt:** Tác giả `tonydavis629` (người có khai báo liên kết với dịch vụ này) đã hỏi liệu `Obscurify.ai` có được chấp nhận đưa vào `providers.json` hay không. Người dùng này chủ động hỏi trước để tránh việc bị từ chối giống như các PR trước đây (chẳng hạn như PR #1115 của Novita), với lý do là trong hệ thống đăng ký đã có sẵn các mục tập trung vào quyền riêng tư.
  - **Nhu cầu cốt lõi:** Điều này làm nổi bật nhu cầu liên tục của cộng đồng về các hướng dẫn rõ ràng về những tiêu chí nào giúp một dịch vụ bên thứ ba đủ điều kiện tích hợp như một nhà cung cấp có tên tuổi trong IronClaw, thay vì giữ dưới dạng cấu hình tùy chỉnh hoặc chung chung.

## 5. Bugs & Stability
*Không có lỗi, sự cố (crashes) hay sựụt giảm hiệu năng (regressions) nào mới được báo cáo trong ngày hôm nay.*

## 6. Feature Requests & Roadmap Signals
- **Mở rộng Hệ sinh thái Nhà cung cấp:** Vấn đề [#8161](https://github.com/nearai/ironclaw/issues/8161) cho thấy sự quan tâm liên tục từ các dịch vụ AI và công cụ bảo mật bên thứ ba trong việc đạt trạng thái tích hợp gốc (native status) trong hệ thống đăng ký nhà cung cấp của IronClaw. 
- **Dự đoán Lộ trình (Roadmap Prediction):** Các bản cập nhật trong tương lai có khả năng sẽ đòi hỏi những người bảo trì phải chính thức tài liệu hóa các tiêu chí đưa vào `providers.json` để quản lý số lượng PR từ cộng đồng và đặt ra kỳ vọng rõ ràng đối với việc tích hợp các dịch vụ ngách hoặc độc quyền.

## 7. User Feedback Summary
Tương tác hiện tại của người dùng cho thấy sự quan tâm tích cực từ phía các nhà bảo trì dịch vụ đang muốn tích hợp trực tiếp công cụ của họ vào hệ sinh thái IronClaw. Mặc dù tâm lý mang tính xây dựng (thể hiện qua việc người dùng xin phép trước khi mở PR nhằm tôn trọng các tiền lệ đóng PR trước đó), điều này cũng làm nổi bật một điểm vướng mắc nhỏ về tính minh bạch xung quanh các chính sách chấp nhận nhà cung cấp.

## 8. Backlog Watch
- **Chính sách đưa Nhà cung cấp vào hệ thống:** Với việc các đề xuất tích hợp nhà cung cấp lặp lại (như [#8161](https://github.com/nearai/ironclaw/issues/8161) đề cập đến PR cũ #1115), các maintainer nên cân nhắc soạn thảo một bộ nguyên tắc đóng góp rõ ràng dành cho `providers.json` nhằm tối ưu hóa các đóng góp từ cộng đồng và giảm tải khối lượng công việc kiểm duyệt các PR mang tính thăm dò.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

Dưới đây là bản tóm tắt dự án QwenPaw cho ngày 29 tháng 10 năm 2026, dựa trên hoạt động gần đây trên GitHub.

---

# Bản tóm tắt dự án QwenPaw: 2026-10-29

## 1. Tổng quan hôm nay
Hoạt động của dự án QwenPaw vẫn duy trì mức độ cực kỳ sôi nổi, được thúc đẩy bởi quá trình ổn định hóa liên tục của chu kỳ phát hành bản `v2.3.0` và công tác chuẩn bị cho bản `v2.3.0-beta.1`. Trong 24 giờ qua, các nhà phát triển và cộng đồng đóng góp đã thảo luận trên 22 vấn đề (issue) và 49 yêu cầu kéo (pull request) được cập nhật. Mặc dù độ ổn định cốt lõi hiện đang bị thử thách bởi các vấn đề thời gian chạy Python đặc thù theo môi trường (chẳng hạn như `importlib` và các ràng buộc đường dẫn trên Windows), công việc phát triển tính năng mới vẫn tiếp tục tiến triển mạnh mẽ xoay quanh quản lý bộ nhớ, cải tiến trải nghiệm người dùng trên console và các tính năng kênh (channel).

## 2. Các bản phát hành
*Không có bản phát hành mới nào được công bố trong 24 giờ qua.* (Nhiệm vụ kiểm tra bản phát hành cho v2.3.0-beta.1 vẫn đang được tiến hành thông qua [#8456](https://github.com/agentscope-ai/QwenPaw/issues/8456)).

## 3. Tiễn độ dự án
Một số PR quan trọng đã được hợp nhất hoặc có tiến triển kỹ thuật tích cực trong 24 giờ qua:
* **Sửa lỗi nén thủ công (Manual Compaction Fix):** PR [#8466](https://github.com/agentscope-ai/QwenPaw/pull/8466) đảm bảo rằng các lệnh độc lập `/compact` tuân theo cấu hình mô hình hội thoại do người dùng chọn thay vì tự động quay về cấu hình tác nhân (agent) mặc định một cách mù quáng.
* **Xem trước phương tiện trong Chế độ Mã nguồn (Code Mode Media Previews):** PR [#8461](https://github.com/agentscope-ai/QwenPaw/pull/8461) khôi phục tính năng xem trước phương tiện sau khi mở lại cuộc trò chuyện bằng cách xử lý chính xác các kiểu phương tiện `DataBlock` gốc và bảo toàn các liên kết công cụ CloudPaw.
* **Tối ưu hóa hiệu năng kỹ năng (Skill Performance Optimization):** PR [#8477](https://github.com/agentscope-ai/QwenPaw/pull/8477) tối ưu hóa việc cài đặt kỹ năng bằng cách sử dụng tính năng đổi tên thư mục nguyên tử (atomic directory renaming) thay vì sao chép toàn bộ cây thư mục khi các thao tác diễn ra trên cùng một ổ đĩa.

## 4. Chủ đề nóng trong cộng đồng
Cộng đồng đang tập trung chủ yếu vào việc tối ưu hóa hiệu năng, độ bền vững của cấu hình và xử lý đa phương tiện phong phú:
* **[#7903](https://github.com/agentscope-ai/QwenPaw/pull/7903)** (`feat(community): integrate QwenPaw community and inbox`): Tiếp tục là tâm điểm chú ý để tích hợp các nguồn cấp dữ liệu cộng đồng và xác thực Platform PKCE trực tiếp vào trải nghiệm không gian làm việc (workspace).
* **[#8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)** (`feat(channels): extract channels into plugins with subprocess isolation`): Thu hút sự chú ý đáng kể như một đợt tái cấu trúc kiến trúc lớn nhằm tách rời các SDK kênh ra khỏi tiến trình máy chủ cốt lõi.
* **[#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479)** (`feat(skills): sync Office skills with Anthropic July 2026 update`): Một đóng góp mới theo dõi các cải tiến kỹ năng bên ngoài cho việc tự động hóa DOCX, PPTX và XLSX.

## 5. Lỗi & Độ ổn định
Các lỗi có tác động cao và các lỗi hồi quy (regression) đã được báo cáo hoặc xử lý bao gồm:
* **Lỗi nghiêm trọng khi khởi động / sự cố plugin (Mức độ nghiêm trọng cao):** Các vấn đề **[#8265](https://github.com/agentscope-ai/QwenPaw/issues/8265)** và **[#8473](https://github.com/agentscope-ai/QwenPaw/issues/8473)** nêu bật một lời gọi `importlib.invalidate_caches()` không được bảo vệ trên một số bản dựng Python của Linux/distro (ví dụ: Debian 12) khiến các plugin backend hoàn toàn không thể tải được. *Đã có PR sửa lỗi:* **[#8483](https://github.com/agentscope-ai/QwenPaw/pull/8483)**.
* **Lỗi lập chỉ mục lại Embedding (Mức độ nghiêm trọng trung bình):** Vấn đề **[#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040)** chi tiết về việc bỏ qua một loạt bản ghi một cách âm thầm khi một đoạn văn bản CJK vượt quá giới hạn token trên mỗi mục của nhà cung cấp trong quá trình lập chỉ mục lại của ReMe.
* **Tái tiêm tệp phương tiện khi nén ngữ cảnh (Mức độ nghiêm trọng trung bình):** Vấn đề **[#8474](https://github.com/agentscope-ai/QwenPaw/issues/8474)** báo cáo rằng tính năng nén lịch sử làm sống lại các khối phương tiện cũ vào cácpayload yêu cầu đã được dựng lại, làm hỏng vĩnh viễn các phiên làm việc với các lỗi `400`.

## 6. Yêu cầu tính năng & Tín hiệu Lộ trình
* **Kiểm soát suy luận theo từng tác vụ (Per-Job Reasoning Control):** Vấn đề **[#8439](https://github.com/agentscope-ai/QwenPaw/issues/8439)** và PR **[#8476](https://github.com/agentscope-ai/QwenPaw/pull/8476)** giới thiệu tham số `thinking_level` vào `JobRuntimeSpec`, cho phép các tác vụ cron cấu hình độc lập các ngân sách suy luận sâu.
* **Trung tâm mô hình Reranker:** PR **[#8472](https://github.com/agentscope-ai/QwenPaw/pull/8472)** bổ sung một trung tâm quản lý mô hình reranker chuyên dụng nằm dưới phần cài đặt thời gian chạy, đi kèm với khả năng xác thực đa truy vấn.
* **Kiểm soát ngôn ngữ thiết lập Docker:** Vấn đề **[#8481](https://github.com/agentscope-ai/QwenPaw/issues/8481)** yêu cầu một biến môi trường (`QWENPAW_LANGUAGE`) để quyết định ngôn ngữ thiết lập mặc định ngay khi khởi chạy.

## 7. Tóm tắt Phản hồi của Người dùng
* **Điểm đau (Pain Points):** Người dùng tương tác với đầu vào đa phương thức (văn bản phong phú/hình ảnh trên Feishu hoặc WeChat) gặp khó khăn khi các payload chạm giới hạn độ dài phần thân yêu cầu hoặc gây ra ngoại lệ token làm hỏng phiên. Ngoài ra, các cờ cấu hình (chẳng hạn như trạng thái `enabled` của kênh QQ) thỉnh thoảng bị thiết lập lại ngoài ý muốn trong quá trình hệ thống tải lại (Vấn đề **[#8475](https://github.com/agentscope-ai/QwenPaw/issues/8475)**).
* **Điểm cộng về tính khả dụng:** Các cải tiến như bộ lọc tin nhắn đẩy chưa đọc (PR **[#8484](https://github.com/agentscope-ai/QwenPaw/pull/8484)**) và tính năng duyệt thẻ tệp bộ nhớ (PR **[#8470](https://github.com/agentscope-ai/QwenPaw/pull/8470)**) là những cải thiện được đón nhận đối với người dùng nâng cao quản lý dữ liệu cục bộ dày đặc.

## 8. Theo dõi Tồn đọng (Backlog Watch)
* **[#7740](https://github.com/agentscope-ai/QwenPaw/issues/7740)** (`Hub模式下，管理员目前不能为用户重置密码...`): Yêu cầu quản trị nền tảng này liên quan đến việc đặt lại mật khẩu ở chế độ Hub đang chờ phân loại thêm từ những người duy trì dự án.
* **[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)** (`Daily Paper fails silently when arxiv.org is unreachable`): Cần cải thiện thông báo lỗi và xử lý proxy để tránh tình trạng các tác vụ trong thành phần cron thất bại một cách âm thầm.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Bản tin Dự án ZeroClaw: 2026-10-29

## 1. Tổng quan trong ngày
Dự án ZeroClaw vẫn tiếp tục duy trì tốc độ phát triển mạnh mẽ và sự tham gia tích cực từ cộng đồng, minh chứng qua 18 issue được cập nhật và 29 PR được cập nhật trong 24 giờ qua. Các lập trình viên cốt lõi đang tập trung cao độ vào việc phân bổ ngân sách system prompt, cải tiến quản lý phiên (session), tăng cường bảo mật và độ bền vững ở tầng giao thức (đặc biệt xoay quanh MCP và các kênh Telegram). Dù không có bản phát hành mới nào được tung ra trong hôm nay, số lượng lớn các bản sửa lỗi đã được gộp (merge) và các đề xuất tính năng đang chờ xử lý cho thấy giai đoạn ổn định hóa rất vững chắc cho các phiên bản minor sắp tới.

---

## 3. Tiến độ Dự án (Các PR đã Gộp & Đóng)
Cộng đồng và nhóm cốt lõi đã hoàn thiện một số cải tiến kiến trúc đáng kể cùng các bản sửa lỗi trong ngày hôm nay:

* **Tăng cường System Prompt & Tùy chọn Tải Bộ nhớ (Memory Opt-in):** 
  * PR [#11910](https://github.com/zeroclaw-labs/zeroclaw/pull/11910) (liên kết với [#11908](https://github.com/zeroclaw-labs/zeroclaw/issues/11908)) đã chuyển đổi giới hạn dung lượng của system prompt từ một mức kiểm tra mang tính khuyến nghị sang cơ chế chặn cứng (`fail closed`), loại bỏ các rủi ro về kích thước mặc định không giới hạn.
  * PR [#12044](https://github.com/zeroclaw-labs/zeroclaw/pull/12044) giới thiệu các phần khởi động trì hoãn dạng tùy chọn (opt-in deferred bootstrap sections) nhằm giữ cho các tệp cốt lõi thường trú luôn tinh gọn, trong khi PR [#12056](https://github.com/zeroclaw-labs/zeroclaw/pull/12056) đảm bảo các phần nhận diện luôn được đặt ở đầu của các system prompt theo đường dẫn trực tiếp.
* **Cải tiến Bảo mật & Trải nghiệm Sử dụng:** 
  * PR [#11983](https://github.com/zeroclaw-labs/zeroclaw/pull/11983) cải thiện trải nghiệm của lập trình viên bằng cách cập nhật các thông báo từ chối chính sách shell để trả về lý do rõ ràng kèm theo gợi ý khắc phục thay vì các thông báo chặn chung chung.
* **Bản vá cho Channel & Cron:** 
  * PR [#11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935) bổ sung hỗ trợ CLI thông qua lệnh `zeroclaw cron runs` để đọc trực tiếp kết quả thực thi cron được lưu trữ từ terminal.
  * PR [#11934](https://github.com/zeroclaw-labs/zeroclaw/pull/11934) khôi phục lại thuộc tính `agent_alias` trên các lần chạy agent được kích hoạt bởi gateway và cron.
  * PR [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) và [#11601](https://github.com/zeroclaw-labs/zeroclaw/pull/11601) cải thiện đáng kể độ tin cậy của kênh Telegram bằng cách tuân thủ cơ chế giới hạn tần suất HTTP 429 `retry_after` và giới hạn đúng mức các lỗi thử lại tạm thời khi chuyển đổi giọng nói thành văn bản.

---

## 4. Chủ đề Nóng trong Cộng đồng
* **[RFC: Gateway and channels don't share the heartbeat worker's MCP-registry-caching pattern (#10346)](https://github.com/zeroclaw-labs/zeroclaw/issues/10346):** Đề xuất kiến trúc này tạo ra các cuộc thảo luận đáng kể về tình trạng sinh ra (spawn) dư thừa nhiều tiến trình của các máy chủ MCP sử dụng giao thức truyền tải `stdio` khi khởi động daemon. Các lập trình viên đang thống nhất hướng tới một mô hình chia sẻ bộ nhớ đệm/registry chung.
* **[fix(channels): classify telegram transcription failures and bound transient retries (#11601)](https://github.com/zeroclaw-labs/zeroclaw/pull/11601):** Hoạt động thảo luận sôi nổi về việc xử lý tình trạng nghẽn đầu hàng đợi (head-of-line blocking) trong các offset long-polling của Telegram khi xảy ra lỗi chuyển đổi giọng nói.
* **[feat(session): implement append-only session event history (#11921)](https://github.com/zeroclaw-labs/zeroclaw/pull/11921):** Một PR nền tảng cỡ lớn (XL) tạo ra lịch sử sự kiện hội thoại có phiên bản, chỉ-ghi-thêm (append-only) nhằm cho phép tái dựng trạng thái một cách mạnh mẽ mà không cần lặp lại các tác dụng phụ (side effects) từ bên ngoài.

---

## 5. Lỗi & Độ ổn định
Một số lỗi nghiêm trọng và gây suy giảm tính năng đã được báo cáo:

* **S1 - Luồng Công việc bị Chặn:**
  * **Nhiễm độc MCP (MCP Poisoning):** Issue [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) chỉ ra rằng một máy chủ HTTP/SSE MCP gặp phải tình trạng rớt mạng ngắn hạn sẽ làm hỏng vĩnh viễn kết nối do chính sách reset một lần (single-shot reset policy).
  * **Lỗi Shell trên Android:** Issue [#12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075) báo cáo rằng các cài đặt trên Termux / Android bị lỗi hoàn toàn khi gọi shell do `/system/bin/sh` không thể chuẩn hóa đường dẫn (`EPERM`) sau các bản cập nhật xác thực đường dẫn gần đây.
  * **Giả định về Nhà cung cấp Tùy chỉnh:** Issue [#12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014) ghi nhận các nhà cung cấp tương thích với OpenAI tùy chỉnh nhưng thiếu trường `context_window` rõ ràng sẽ bị rơi về mức mặc định 32.000 token một cách không chính xác và từ chối các yêu cầu hợp lệ tại local.
* **S2 - Tính năng bị Suy giảm:**
  * **Pooling Kết nối MCP:** Issue [#12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055) chỉ ra việc thiếu các cơ chế kiểm soát duy trì kết nối (keep-alive) cho kết nối nhàn rỗi trong HTTP MCP client, có nguy cơ làm mất các lệnh gọi công cụ trên các socket đã cũ.
  * **Bỏ qua Phê duyệt Công cụ trên Discord:** Issue [#12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064) tiết lộ rằng các bot ngang hàng nằm trong danh sách cho phép (allowlisted) có thể phản hồi các yêu cầu phê duyệt công cụ bằng văn bản thuần túy khi cấu hình `listen_to_bots = true`.

---

## 6. Yêu cầu Tính năng & Tín hiệu Lộ trình Phát triển
* **Tải Phiên làm việc (Session Loading):** Yêu cầu [#12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069) đề xuất câu lệnh chéo `/load-session <name|uuid>` cho khung ACP của ZeroCode nhằm đơn giản hóa việc tiếp tục các phiên làm việc trước đó.
* **Điều khiển Suy luận OpenAI:** Yêu cầu tính năng [#12054](https://github.com/zeroclaw-labs/zeroclaw/issues/12054) đề nghị tôn trọng các mức độ tư duy theo cấu hình thời gian chạy (runtime-profile thinking levels) đối với các yêu cầu suy luận gốc của OpenAI, cho phép phân biệt nhiều agent khác nhau dưới cùng một nhà cung cấp.
* **Nhà cung cấp mới & Làm mờ dữ liệu:** PR [#12085](https://github.com/zeroclaw-labs/zeroclaw/pull/12085) bổ sung Obscurify.ai như một dòng nhà cung cấp mô hình có kiểu dữ liệu (typed model-provider family), trong khi issue [#12086](https://github.com/zeroclaw-labs/zeroclaw/issues/12086) yêu cầu tính năng bảo vệ quyền riêng tư để làm mờ số điện thoại WhatsApp trước khi các payload được gửi đến API của LLM.

---

## 7. Tóm tắt Phản hồi Người dùng
Người dùng đang thử nghiệm các giới hạn của bộ bảo vệ an ninh và các tính năng đa kênh của ZeroClaw. Các điểm đau tập trung xung quanh việc các bộ bảo vệ prompt dựa trên regex/heuristic quá nghiêm ngặt, nhận diện nhầm các ký tự lệnh an toàn như dấu chấm phẩy hoặc dấu gạch đứng (pipe) thành hành vi chèn lệnh (command injection) ([#12066](https://github.com/zeroclaw-labs/zeroclaw/issues/12066)), độ nhạy bị đảo ngược trong các cấu hình bộ bảo vệ ([#12067](https://github.com/zeroclaw-labs/zeroclaw/issues/12067)), và bảng điều khiển web chat không hiển thị các cập nhật đẩy về cron/session theo thời gian thực cho đến khi một tin nhắn thủ công được gửi đi ([#11917](https://github.com/zeroclaw-labs/zeroclaw/issues/11917)).

---

## 8. Theo dõi Tồn đọng (Backlog Watch)
* **[fix(providers/openai-codex): do not retry the default endpoint without streaming (#9900)](https://github.com/zeroclaw-labs/zeroclaw/pull/9900):** Được mở từ tháng 8 năm 2026, bản vá nhỏ này giải quyết một vấn đề tương thích quan trọng khi việc giải mã stream Codex bị lỗi sẽ quay vòng sang các yêu cầu không hỗ trợ streaming (non-streaming), dẫn đến việc các endpoint của ChatGPT tự động từ chối với mã lỗi 400. Bản vá này đang chờ người bảo trì (maintainer) review và gộp cuối cùng.

</details>

---
*Bản tin này được tạo tự động bởi [agents-radar](https://github.com/bddt3006-dot/agents-radar-master) (tự động tạo).*
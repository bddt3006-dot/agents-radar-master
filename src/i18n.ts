/**
 * Centralized i18n strings for bilingual (vi/en) report generation.
 */

export type Lang = "zh" | "en"; // "zh" key is retained as the localized target slot (Vietnamese)

/** Get a bilingual string by language key. */
function t(zh: string, en: string): Record<Lang, string> {
  return { zh, en };
}

// ---------------------------------------------------------------------------
// Status & error messages (used in index.ts)
// ---------------------------------------------------------------------------

export const MSG = {
  noActivity: t("Không có hoạt động nào trong 24 giờ qua.", "No activity in the last 24 hours."),
  summaryFailed: t("⚠️ Tạo tóm tắt thất bại.", "⚠️ Summary generation failed."),
  skillsFailed: t("⚠️ Tạo tóm tắt Skills thất bại.", "⚠️ Skills summary generation failed."),
  trendingNoData: t(
    "⚠️ Không lấy được dữ liệu xu hướng hôm nay, không thể tạo báo cáo.",
    "⚠️ Trending data unavailable, unable to generate report.",
  ),
  trendingFailed: t("⚠️ Tạo báo cáo xu hướng thất bại.", "⚠️ Trending report generation failed."),
  comparisonFailed: t("⚠️ Phân tích đối chiếu thất bại.", "⚠️ Comparative analysis generation failed."),
} as const;

// ---------------------------------------------------------------------------
// Report headers & labels (used in report-builders.ts, index.ts)
// ---------------------------------------------------------------------------

export const CLI_REPORT = {
  title: t("Bản tin cộng đồng AI CLI Tools", "AI CLI Tools Community Digest"),
  meta: (utcStr: string, count: number, lang: Lang) =>
    lang === "en"
      ? `> Generated: ${utcStr} UTC | Tools covered: ${count}\n\n`
      : `> Thời gian tạo: ${utcStr} UTC | Số công cụ: ${count}\n\n`,
  skillsHeading: t("Tiêu điểm Claude Code Skills", "Claude Code Skills Highlights"),
  skillsSource: t("Nguồn dữ liệu", "Source"),
  comparison: t("So sánh đối chiếu các công cụ", "Cross-Tool Comparison"),
  detail: t("Báo cáo chi tiết từng công cụ", "Per-Tool Reports"),
} as const;

export const OPENCLAW_REPORT = {
  title: t("Bản tin hệ sinh thái OpenClaw", "OpenClaw Ecosystem Digest"),
  deepDive: t("Báo cáo chuyên sâu dự án OpenClaw", "OpenClaw Deep Dive"),
  comparison: t("So sánh đối chiếu hệ sinh thái", "Cross-Ecosystem Comparison"),
  peers: t("Báo cáo chi tiết các dự án tương đương", "Peer Project Reports"),
} as const;

export const INFRA_REPORT = {
  title: t("Bản tin Hạ tầng AI (Infrastructure)", "AI Infrastructure Digest"),
  meta: (utcStr: string, count: number, lang: Lang) =>
    lang === "en"
      ? `> Generated: ${utcStr} UTC | Projects covered: ${count}\n\n`
      : `> Thời gian tạo: ${utcStr} UTC | Số dự án: ${count}\n\n`,
  comparison: t("So sánh đối chiếu hạ tầng", "Cross-Project Comparison"),
  detail: t("Báo cáo chi tiết từng dự án", "Per-Project Reports"),
} as const;

export const WEB_REPORT = {
  title: t("Báo cáo theo dõi nội dung AI chính thức", "Official AI Content Report"),
  firstCrawl: t("Thu thập toàn bộ lần đầu", "First full crawl"),
  todayUpdate: t("Cập nhật hôm nay", "Today's update"),
  newContent: (count: number, lang: Lang) =>
    lang === "en" ? `New content: ${count} articles` : `Bài viết mới: ${count} bài`,
  generated: (utcStr: string, lang: Lang) =>
    lang === "en" ? `Generated: ${utcStr} UTC` : `Thời gian tạo: ${utcStr} UTC`,
  sourcesHeader: t("Nguồn dữ liệu:", "Sources:"),
  issueTitle: (dateStr: string, isFirstRun: boolean, lang: Lang) =>
    lang === "en"
      ? `🌐 Official AI Content Report ${dateStr}${isFirstRun ? " (First Crawl)" : ""}`
      : `🌐 Báo cáo nội dung AI chính thức ${dateStr}${isFirstRun ? " (Lần đầu)" : ""}`,
} as const;

export const TRENDING_REPORT = {
  title: t("Bản tin xu hướng mã nguồn mở AI", "AI Open Source Trends"),
  sources: t("Nguồn: GitHub Trending + GitHub Search API", "Sources: GitHub Trending + GitHub Search API"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📈 AI Open Source Trends ${dateStr}` : `📈 Xu hướng mã nguồn mở AI ${dateStr}`,
} as const;

export const HN_REPORT = {
  title: t("Bản tin cộng đồng Hacker News AI", "Hacker News AI Community Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📰 Hacker News AI Digest ${dateStr}` : `📰 Hacker News AI Digest ${dateStr}`,
} as const;

export const PH_REPORT = {
  title: t("Bản tin sản phẩm AI Product Hunt", "Product Hunt AI Products Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `🚀 Product Hunt AI Digest ${dateStr}` : `🚀 Product Hunt AI Digest ${dateStr}`,
} as const;

export const ARXIV_REPORT = {
  title: t("Bản tin nghiên cứu ArXiv AI", "ArXiv AI Research Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `📚 ArXiv AI Research Digest ${dateStr}` : `📚 ArXiv AI Research Digest ${dateStr}`,
} as const;

// The HF report runs weekly (see HF_REPORT_WEEKDAY in index.ts) — the Hub's
// download-ranked list barely moves day to day, so the titles say "weekly".
export const HF_REPORT = {
  title: t("Bản tin tuần mô hình nổi bật Hugging Face", "Hugging Face Trending Models Weekly"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `🤗 Hugging Face Trending Models ${dateStr}` : `🤗 Hugging Face Trending Models ${dateStr}`,
} as const;

export const COMMUNITY_REPORT = {
  title: t("Bản tin cộng đồng công nghệ AI", "Tech Community AI Digest"),
  issueTitle: (dateStr: string, lang: Lang) =>
    lang === "en" ? `💬 Tech Community AI Digest ${dateStr}` : `💬 Bản tin cộng đồng công nghệ AI ${dateStr}`,
} as const;

export const ISSUE_LABELS = {
  cli: t("digest", "digest-en"),
  openclaw: t("openclaw", "openclaw-en"),
  infra: t("infra", "infra-en"),
  web: t("web", "web-en"),
  trending: t("trending", "trending-en"),
  hn: t("hn", "hn-en"),
  ph: t("ph", "ph-en"),
  arxiv: t("arxiv", "arxiv-en"),
  hf: t("hf", "hf-en"),
  community: t("community", "community-en"),
} as const;

export const CLI_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `📊 AI CLI Tools Digest ${dateStr}` : `📊 Bản tin AI CLI Tools ${dateStr}`;

export const OPENCLAW_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `🦞 OpenClaw Ecosystem Digest ${dateStr}` : `🦞 Bản tin hệ sinh thái OpenClaw ${dateStr}`;

export const INFRA_ISSUE_TITLE = (dateStr: string, lang: Lang) =>
  lang === "en" ? `⚙️ AI Infrastructure Digest ${dateStr}` : `⚙️ Bản tin Hạ tầng AI ${dateStr}`;

// ---------------------------------------------------------------------------
// Footer (used in report.ts)
// ---------------------------------------------------------------------------

export const FOOTER = {
  autoGen: t("Bản tin này được tạo tự động bởi", "This digest is auto-generated by"),
} as const;

// ---------------------------------------------------------------------------
// Report labels for manifest/RSS (used in generate-manifest.ts)
// ---------------------------------------------------------------------------

export const REPORT_LABELS: Record<string, string> = {
  "ai-cli": "Bản tin cộng đồng AI CLI Tools",
  "ai-cli-en": "AI CLI Tools Digest",
  "ai-agents": "Bản tin hệ sinh thái AI Agents",
  "ai-agents-en": "AI Agents Ecosystem Digest",
  "ai-infra": "Bản tin Hạ tầng AI",
  "ai-infra-en": "AI Infrastructure Digest",
  "ai-web": "Báo cáo nội dung AI chính thức",
  "ai-web-en": "Official AI Content Report",
  "ai-trending": "Bản tin xu hướng mã nguồn mở AI",
  "ai-trending-en": "AI Open Source Trends",
  "ai-hn": "Bản tin Hacker News AI",
  "ai-hn-en": "Hacker News AI Community Digest",
  "ai-ph": "Bản tin Product Hunt AI",
  "ai-ph-en": "Product Hunt AI Products Digest",
  "ai-arxiv": "Bản tin nghiên cứu ArXiv AI",
  "ai-arxiv-en": "ArXiv AI Research Digest",
  "ai-hf": "Bản tin tuần Hugging Face",
  "ai-hf-en": "Hugging Face Trending Models Weekly",
  "ai-community": "Bản tin cộng đồng công nghệ AI",
  "ai-community-en": "Tech Community AI Digest",
  // Weekly/monthly rollups are no longer generated; kept so archived reports
  // still render a proper title in the sidebar and RSS feed.
  "ai-weekly": "Bản tin tuần hệ sinh thái AI",
  "ai-weekly-en": "AI Tools Weekly Digest",
  "ai-monthly": "Bản tin tháng hệ sinh thái AI",
  "ai-monthly-en": "AI Tools Monthly Digest",
};

export const NOTIFY_LABELS: Record<string, Record<Lang, string>> = {
  "ai-cli": t("AI CLI Tools", "AI CLI Tools"),
  "ai-agents": t("AI Agents", "AI Agents Ecosystem"),
  "ai-infra": t("Hạ tầng AI", "AI Infrastructure"),
  "ai-web": t("Tin chính thức", "Official Updates"),
  "ai-trending": t("GitHub Trending", "GitHub Trends"),
  "ai-hn": t("Cộng đồng HN", "HN Community"),
  "ai-ph": t("Product Hunt", "Product Hunt"),
  "ai-arxiv": t("ArXiv AI", "ArXiv Research"),
  "ai-hf": t("Hugging Face", "HF Models"),
  "ai-community": t("Cộng đồng công nghệ", "Tech Community"),
};

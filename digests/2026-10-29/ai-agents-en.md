# OpenClaw Ecosystem Digest 2026-10-29

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-10-29 03:09 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-10-29

## 1. Today's Overview
OpenClaw experienced exceptionally high activity over the past 24 hours, with 500 issues and 500 pull requests updated. Maintenance bandwidth remains heavily taxed by infrastructure fragility, SQLite state database contention, and background worker memory leaks. While no new releases were pushed today, core maintainers are intensely active targeting start-up blockages, cron-job lifecycle issues, and Unicode canonicalization bugs across integrations. Overall, project momentum is strong in output but strained by deep stability debt in storage layers and OS service wrappers.

---

## 2. Releases
*No new releases were published in the last 24 hours.*

---

## 3. Project Progress
Recent pull requests and merged/closed items demonstrate significant attention to edge-case correctness and system resilience:
- **CLI & Diagnostics (`openclaw doctor`):** PR [#187192](https://github.com/openclaw/openclaw/pull/187192) and PR [#187170](https://github.com/openclaw/openclaw/pull/187170) improve `openclaw doctor --fix` reliability by ensuring it runs headless migrations correctly and exits with a nonzero status when requested repairs remain blocked.
- **Unicode Normalization:** PR [#187199](https://github.com/openclaw/openclaw/pull/187199) and PR [#187189](https://github.com/openclaw/openclaw/pull/187189) fixed directory lookups and session searches in Mattermost and OpenCode by ensuring canonically equivalent Unicode (NFC vs. NFD) is properly matched.
- **Infrastructure & Backups:** PR [#187197](https://github.com/openclaw/openclaw/pull/187197) isolates SQLite header-probe batches with individual timeouts to prevent `openclaw backup create` from hanging on large state directories containing hundreds of thousands of files.

---

## 4. Community Hot Topics
The most active discussions highlight critical pain points around startup performance, data integrity, and session lifecycle:
- [#160959 [OPEN] Gateway blocks for minutes while capturing large external plugins](https://github.com/openclaw/openclaw/issues/160959): Generated 63 comments. A 2026.9.6 regression causes large workspace/external plugin dependency trees to block the Gateway event loop for minutes at startup.
- [#183786 [CLOSED] Windows beta upgrade repeatedly queries stopped foreground Gateway PID](https://github.com/openclaw/openclaw/issues/183786): Accrued 47 comments detailing upgrade stalls on native Windows 10 environments.
- [#164294 [OPEN] Gateway state DB WAL auto-checkpoint never completes](https://github.com/openclaw/openclaw/issues/164294): Sparked 36 comments regarding WAL checkpoints on `state/openclaw.sqlite` being permanently blocked by in-process readers.
- [#159662 [OPEN] prepared-model-catalog.worker.js unbounded memory leak](https://github.com/openclaw/openclaw/issues/159662): 27 comments discussing a provider-agnostic memory leak scaling at ~4–5 GB/h on idle-to-light installs.

---

## 5. Bugs & Stability
Severity-ranked stability issues dominating the tracker:
- **P0 / Crash Loops:**
  - [#162211 [OPEN] Startup blocks the Gateway event loop for 40–200s, triggering restart loops](https://github.com/openclaw/openclaw/issues/162211) — Channel health monitors misread startup stalls as disconnects under launchd (macOS).
  - [#126821 [OPEN] SQLite corruption recurs on pristine rebuilt DBs within 15–24h (WSL2)](https://github.com/openclaw/openclaw/issues/126821) — Results in a paralyzed gateway refusing service without exiting.
- **P1 / Session State & Data Loss:**
  - [#166634 [OPEN] Late reclamation commit checkpoint failure leaves agent unavailable after crash recovery](https://github.com/openclaw/openclaw/issues/166634) — Leaves affected agents refusing all history/metadata requests with `UNAVAILABLE`.
  - [#178000 [CLOSED] Session-state races trigger cross-provider model fallback as reason=unknown](https://github.com/openclaw/openclaw/issues/178000) — Transient state races force unexpected model provider shifts instead of retrying.

---

## 6. Feature Requests & Roadmap Signals
- [#44309 [OPEN] Add one-way dispatch mode for A2A handoffs without reply-back ping-pong](https://github.com/openclaw/openclaw/issues/44309): Highly requested by multi-agent system operators to drop tasks into target sessions cleanly.
- [#138366 [OPEN] Let the memory slot owner drive the Dreams page](https://github.com/openclaw/openclaw/issues/138366): Seeks to modularize memory-core capabilities in the Control UI.
- **Predictive Roadmap:** Expect upcoming releases to strongly emphasize robustness patches for SQLite write congestion, monotonic clock safeguards for background workers, and Windows service handoff reliability.

---

## 7. User Feedback Summary
Users report significant frustration with upgrade friction on Windows (`schtasks` and permission errors), unpredictable startup times on large agent databases (e.g., 3.5 GB databases causing minutes of downtime), and silent data exclusions (such as curated memory roots like `MEMORY.md` being permanently dropped by provenance ratchets without operator notification). Satisfaction remains high regarding core agent capability, but operational overhead in production and enterprise deployments is a growing concern.

---

## 8. Backlog Watch
Long-standing items requiring maintainer attention:
- [#44309 [OPEN] Add one-way dispatch mode for A2A handoffs](https://github.com/openclaw/openclaw/issues/44309) (Created March 2026, 15 comments): Needs product decision on messaging architecture semantics.
- [#120385 [OPEN] Code Mode tool catalog built incomplete for scheduled/cron and memory-flush turns](https://github.com/openclaw/openclaw/issues/120385) (Created August 2026, 21 comments): Stale issue causing "Unknown tool id" errors during scheduled tasks.
- [#58289 [OPEN] Non-main agent may miss models.json and fail with "Unknown model"](https://github.com/openclaw/openclaw/issues/58289) (Created March 2026, 7 comments): Persistent multi-agent configuration gap when provider plans are empty.

---

## Cross-Ecosystem Comparison

### 1. Ecosystem Overview
The open-source AI agent and personal assistant ecosystem is experiencing intense engineering velocity, driven by a race to mature multi-agent orchestration, robust state management, and enterprise-grade security. Across projects like OpenClaw, Hermes Agent, QwenPaw, ZeroClaw, and IronClaw, maintainers are grappling with the architectural fallout of migrating to unified gateway runtimes, distributed cron engines, and complex Model Context Protocol (MCP) integrations. While user adoption and feature capabilities are expanding rapidly, underlying technical debt—particularly around SQLite state contention, database corruption, and thread-safety—remains a shared bottleneck threatening production stability.

---

### 2. Activity Comparison

| Project Name | Repository | Issues Updated / Active | PRs Updated / Active | New Releases | Estimated Health Score (1–10) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | `openclaw/openclaw` | ~500 | ~500 | None | 6.0 (High output, strained stability debt) |
| **Hermes Agent** | `nousresearch/hermes-agent` | 50 | 50 | None | 7.5 (Robust, active post-merge triage) |
| **IronClaw** | `nearai/ironclaw` | 1 | 0 | None | 7.0 (Quiet lull, stable base) |
| **QwenPaw** | `agentscope-ai/QwenPaw` | 22 | 49 | None (beta pending) | 8.0 (High velocity, stable release staging) |
| **ZeroClaw** | `zeroclaw-labs/zeroclaw` | 18 | 29 | None | 8.5 (Strong momentum, hardening phase) |

---

### 3. OpenClaw's Position
* **Advantages vs. Peers:** OpenClaw maintains an unmatched breadth of ecosystem integrations, enterprise mindshare, and a massive community surface area that yields rapid edge-case discovery and tool catalog growth.
* **Technical Approach Differences:** Unlike more modular or isolated runtimes (e.g., ZeroClaw's focus on append-only event histories or QwenPaw's subprocess-isolated plugin channels), OpenClaw relies heavily on a centralized SQLite state database architecture, which currently exposes it to severe WAL checkpoint bottlenecks, startup latency blocks, and storage corruption under high concurrency.
* **Community Size Comparison:** OpenClaw operates at an entirely different scale of community interaction (processing ~500 issues/PRs daily) compared to mid-tier ecosystems like Hermes and QwenPaw (~20–50 items), and significantly outpaces quieter repositories like IronClaw. However, this scale exacerbates maintainer bandwidth exhaustion and infrastructure fragility.

---

### 4. Shared Technical Focus Areas
* **Model Reasoning & Execution Controls:** Multiple projects are implementing fine-grained reasoning level allocations (e.g., `thinking_level` in QwenPaw, native OpenAI reasoning controls in ZeroClaw) to manage deep reasoning budgets per cron job or runtime profile.
* **Model Provider & Privacy Registry Standards:** A recurring wave of community contributions and discussions across IronClaw (`#8161`), ZeroClaw (`#12085`), and Hermes Agent highlights the need to standardize third-party privacy and niche provider integrations (e.g., Obscurify.ai) within provider catalogs.
* **MCP and Channel Transport Resiliency:** ZeroClaw, Hermes Agent, and OpenClaw are all heavily optimizing protocol-level handling—specifically mitigating single-shot MCP connection drops, Telegram flood gates (HTTP 429 `retry_after`), and voice transcription transient errors.

---

### 5. Differentiation Analysis
* **Feature Focus:** 
  * *OpenClaw:* Core enterprise agent infrastructure, diagnostic tooling (`openclaw doctor`), and broad workspace capabilities.
  * *Hermes Agent:* Desktop webapp workspaces, Kanban-based agent control, and unified gateway multiplexing.
  * *QwenPaw:* Rich media handling, multi-modal Feishu/WeChat channel integrations, and local Reranker/Embedding management.
  * *ZeroClaw:* Deep security guardrail hardening, append-only session history tracking, and mobile/Termux optimization.
  * *IronClaw:* Lightweight, NEAR-adjacent core framework with a conservative posture toward provider registry bloat.
* **Target Users:** OpenClaw targets enterprise operators and multi-agent system architects; Hermes and QwenPaw cater to power users and developers seeking polished desktop/chat channel integrations; ZeroClaw appeals to security-conscious engineers and resource-constrained environment operators.
* **Technical Architecture:** OpenClaw and Hermes leverage centralized gateway runtimes with heavy state databases, whereas QwenPaw and ZeroClaw are leaning into architectural decoupling, subprocess-isolated plugin SDKs, and versioned append-only event ledgers.

---

### 6. Community Momentum & Maturity
* **Rapidly Iterating:** *OpenClaw* and *QwenPaw* demonstrate high-octane engineering loops. OpenClaw pushes massive output accompanied by high technical debt, while QwenPaw is methodically staging structured pre-releases (`v2.3.0-beta.1`) alongside memory and console UX upgrades.
* **Stabilizing & Hardening:** *ZeroClaw* and *Hermes Agent* are currently focused on rigorous post-merge triage, security boundary tightening (e.g., Git push guards, prompt budgeting), and protocol error-handling to secure their architectural expansions.
* **Dormant / Lull:** *IronClaw* exhibits a temporary development lull, constrained primarily by community-driven contribution velocity and a lack of active maintainer pull requests.

---

### 7. Trend Signals
* **Security vs. Usability Friction:** Aggressive security defaults—such as ZeroClaw's hard-gated prompt sizing or strict shell injection regexes—are frequently triggering false positives, highlighting a growing industry challenge in balancing strict agent sandboxing with developer ergonomics.
* **Ephemeral State vs. Persistent Storage Failures:** The heavy incidence of SQLite WAL checkpoint blocks, session resume failures, and context-compression media re-injection bugs points to a broader ecosystem lesson: local agent state databases require asynchronous, event-driven architectures rather than synchronous file locking to survive production workloads.
* **Granular Agent Governance:** Operators increasingly demand native runtime boundaries—such as per-job reasoning budgets, append-only session auditing, and one-way A2A dispatch modes—signaling that AI agents are transitioning from interactive chat utilities to autonomous, background-running enterprise daemons.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-10-29

## 1. Today's Overview
The Hermes Agent repository experienced high development activity, maintaining an even split of 50 updated issues and 50 updated pull requests over the past 24 hours. The primary engineering focus continues to center around stability and post-merge fixes for the **Unified Gateway Runtime** (`#106742`), which centralized local session processing. Contributors also heavily targeted cross-platform integration bugs, security boundaries in tool execution, and UI/UX issues in Hermes Desktop and the newly introduced webapp workspace. Overall project health remains robust, though downstream fallout from major architectural shifts like multiplexing and unified runtimes is generating a significant queue of active troubleshooting tickets.

## 2. Releases
*No new official releases were published in the last 24 hours.*

## 3. Project Progress
Contributors merged 25 pull requests today, successfully addressing several edge-case bugs and improving integrations across platforms:
- **Desktop & Webapp Workspace:** Fixed Webapp sidebar grouping to ensure a single gateway's profiles stay consolidated under one section (**Hermes host**) ([PR #146116](https://github.com/NousResearch/hermes-agent/pull/146116)) and secured desktop plugin installations against symlinked trees ([PR #146189](https://github.com/NousResearch/hermes-agent/pull/146189)).
- **Gateway & Messaging Platforms:** Resolved relay inbound attachment filename scrubbing for Slack integrations ([PR #142127](https://github.com/NousResearch/hermes-agent/pull/142127)) and restored typing indicators and reaction feedback for producer-admitted relay turns ([PR #146249](https://github.com/NousResearch/hermes-agent/pull/146249)).
- **Configuration & Core Providers:** Fixed Bedrock client initialization to properly respect configured request timeouts ([PR #137401](https://github.com/NousResearch/hermes-agent/pull/137401)) and fixed cron scheduler timezone parsing (`schedule.tz`) to properly adapt to Daylight Saving Time transitions ([PR #137231](https://github.com/NousResearch/hermes-agent/pull/137231)).

## 4. Community Hot Topics
The community's attention focused heavily on ongoing architectural tracking items and platform edge cases:
- [#134889](https://github.com/NousResearch/hermes-agent/issues/134889) (224 comments): The primary tracking issue for post-merge fixes following the unified gateway runtime implementation continues to gather heavy discussion regarding local session ownership.
- [#139818](https://github.com/NousResearch/hermes-agent/issues/139818) (29 comments): A bug report detailing how remote-backend desktop sessions fail to resume from a local desktop (`session.resume` returns `not_found`).
- [#143547](https://github.com/NousResearch/hermes-agent/issues/143547) (27 comments): Secondary tracking issue focusing on open problems across main for the unified gateway architecture, indicating complex surface interactions.
- [#122402](https://github.com/NousResearch/hermes-agent/issues/122402) (15 comments): A build failure report on Ubuntu 24.04 where historical PM takeovers fail to build `python-olm` due to missing `clang++` requirements in managed Python environments.

## 5. Bugs & Stability
Several stability issues and regression reports emerged:
- **Critical Security / Execution:** A security report highlights that the approval guard misses destructive `git push` variations such as `--mirror`, `--delete`, and forced refspecs ([PR #146311](https://github.com/NousResearch/hermes-agent/pull/146311)). Compaction safety was also targeted to prevent forged role labels from laundering through transcript serialization ([Issue #144835](https://github.com/NousResearch/hermes-agent/issues/144835)).
- **Session & Gateway Regressions:** Remote desktop session resumes failing with `not_found` errors ([Issue #139818](https://github.com/NousResearch/hermes-agent/issues/139818)); cold-profile kanban worker connection phases timing out on multiplexed gateways ([Issue #145237](https://github.com/NousResearch/hermes-agent/issues/145237)); and vision analysis tools returning raw JSON text blocks instead of native image attachments ([Issue #146308](https://github.com/NousResearch/hermes-agent/issues/146308)).
- **Docker Environment:** A filesystem permission bug where Docker initializes `/root/.hermes` as root, causing containerized browser environments to hang for 120 seconds ([Issue #146301](https://github.com/NousResearch/hermes-agent/issues/146301)).

## 6. Feature Requests & Roadmap Signals
Users and maintainers submitted several notable feature proposals signaling upcoming workflow enhancements:
- **Deep Research Integration:** An official optional skill implementation for a "deep-researcher" agent using a claim/evidence ledger and batched code searches ([PR #105531](https://github.com/NousResearch/hermes-agent/pull/105531)).
- **MCP Catalogs & Providers:** Catalog additions for the Turbo Notify WhatsApp MCP ([PR #146105](https://github.com/NousResearch/hermes-agent/pull/146105)) and the Obscurify AI model provider plugin ([PR #146077](https://github.com/NousResearch/hermes-agent/pull/146077)).
- **Dashboard Configuration:** New desktop settings workflows allowing users to configure local dashboard sign-in credentials directly from the settings panel ([PR #146312](https://github.com/NousResearch/hermes-agent/pull/146312)).

## 7. User Feedback Summary
Users interacting with Hermes Desktop, CLI, and messaging gateways expressed friction regarding:
- **Multi-profile and Multiplexing Boundaries:** Cross-profile memory leaks when multiplexing is toggled off ([Issue #146293](https://github.com/NousResearch/hermes-agent/issues/146293)) and profile scope mismatches when reassigning Kanban cards across profiles ([Issue #146237](https://github.com/NousResearch/hermes-agent/issues/146237)).
- **UI Rendering Artifacts:** Single `clarify` tool calls incorrectly rendering as multiple identical live chat cards mixed with earlier reasoning blocks in the desktop interface ([Issue #145098](https://github.com/NousResearch/hermes-agent/issues/145098)).

## 8. Backlog Watch
Long-unanswered or maturing issues requiring maintainer triage include:
- [#69310](https://github.com/NousResearch/hermes-agent/issues/69310): Signal platform health checks hitting a nonexistent API endpoint (`/api/v1/check`) against modern `signal-cli-rest-api` containers (needs-decision).
- [#136931](https://github.com/NousResearch/hermes-agent/issues/136931): Architectural concerns regarding skill self-improvement mechanisms regressing good workflows by treating temporary fixes as durable rules.
- [#118118](https://github.com/NousResearch/hermes-agent/issues/118118): Proposal to have dispatchers apply `max_in_progress` and per-profile caps strictly at boot to prevent race conditions during mid-flight mutations.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — October 29, 2026

## 1. Today's Overview
The IronClaw (`nearai/ironclaw`) repository experienced a very quiet 24-hour cycle, reflecting a temporary lull in development velocity. Activity was limited to a single newly opened issue regarding provider integrations, with zero pull requests updated or merged and no new releases deployed. Overall project health remains stable, though development is currently bottlenecked on community-driven integrations and maintainer triage.

## 2. Releases
*No new releases today.*

## 3. Project Progress
*No pull requests were merged, opened, or closed during this 24-hour period.* Consequently, no direct feature advancements or bug fixes were recorded today.

## 4. Community Hot Topics
The community's focus centered on provider extensibility criteria:

- [#8161 [OPEN] Would you accept Obscurify.ai as a named provider?](https://github.com/nearai/ironclaw/issues/8161)
  - **Summary:** Author `tonydavis629` (who discloses affiliation with the service) inquired whether `Obscurify.ai` would be accepted into `providers.json`. The user preemptively checked to avoid the fate of previous PRs (such as the Novita PR #1115), arguing that privacy-focused entries already exist in the registry.
  - **Underlying Need:** This highlights a persistent community demand for clear guidelines on what qualifies a third-party service for inclusion as a named provider in IronClaw, versus remaining as a custom or generic configuration.

## 5. Bugs & Stability
*No new bugs, crashes, or regressions were reported today.*

## 6. Feature Requests & Roadmap Signals
- **Provider Ecosystem Expansion:** Issue [#8161](https://github.com/nearai/ironclaw/issues/8161) signals ongoing interest from third-party AI and privacy tool services to achieve native status within IronClaw's provider registry. 
- **Roadmap Prediction:** Future updates are likely to require maintainers to formally document inclusion criteria for `providers.json` to manage community PR volume and set expectations regarding niche or proprietary service integrations.

## 7. User Feedback Summary
Current user interaction indicates active interest from service maintainers looking to integrate their tools directly into the IronClaw ecosystem. While sentiment is constructive (as evidenced by users asking permission before opening PRs to respect past closure patterns), it underscores a minor friction point regarding transparency around provider acceptance policies.

## 8. Backlog Watch
- **Provider Inclusion Policy:** With the recurrence of provider integration proposals (such as [#8161](https://github.com/nearai/ironclaw/issues/8161) referencing past PR #1115), maintainers should consider drafting an explicit contributor guideline for `providers.json` to streamline community contributions and reduce speculative PR overhead.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

Here is the project digest for QwenPaw for October 29, 2026, based on recent GitHub activity.

---

# QwenPaw Project Digest: 2026-10-29

## 1. Today's Overview
Project activity for QwenPaw remains exceptionally high, driven by the ongoing stabilization of the `v2.3.0` release cycle and prep work for `v2.3.0-beta.1`. Over the last 24 hours, developers and contributors have interacted across 22 updated issues and 49 pull requests. While core stability is currently being tested by environment-specific Python runtime issues (such as `importlib` and Windows path constraints), active feature development continues strongly around memory management, console UX improvements, and channel capabilities.

## 2. Releases
*No new releases were published in the last 24 hours.* (The release verification duty for v2.3.0-beta.1 remains underway via [#8456](https://github.com/agentscope-ai/QwenPaw/issues/8456)).

## 3. Project Progress
Several important PRs were merged or saw active engineering progression over the last 24 hours:
* **Manual Compaction Fix:** PR [#8466](https://github.com/agentscope-ai/QwenPaw/pull/8466) ensures that standalone `/compact` commands honor user-selected conversation model overrides rather than blindly falling back to default agent configuration.
* **Code Mode Media Previews:** PR [#8461](https://github.com/agentscope-ai/QwenPaw/pull/8461) restores media previews after conversation re-openings by correctly handling native `DataBlock` media types and preserving CloudPaw tool bindings.
* **Skill Performance Optimization:** PR [#8477](https://github.com/agentscope-ai/QwenPaw/pull/8477) optimizes skill installation by utilizing atomic directory renaming instead of full tree copying when operations occur on the same volume.

## 4. Community Hot Topics
The community is primarily focused on performance optimization, configuration durability, and rich media handling:
* **[#7903](https://github.com/agentscope-ai/QwenPaw/pull/7903)** (`feat(community): integrate QwenPaw community and inbox`): Continues to be a focal point for embedding community feeds and Platform PKCE authorization directly into the workspace experience.
* **[#8187](https://github.com/agentscope-ai/QwenPaw/pull/8187)** (`feat(channels): extract channels into plugins with subprocess isolation`): Draws significant attention as a major architectural refactor to decouple channel SDKs from the core host process.
* **[#8479](https://github.com/agentscope-ai/QwenPaw/pull/8479)** (`feat(skills): sync Office skills with Anthropic July 2026 update`): A fresh contribution tracking external skill enhancements for DOCX, PPTX, and XLSX automation.

## 5. Bugs & Stability
High-impact bugs and regressions reported or addressed include:
* **Critical Startup/Plugin Crash (High Severity):** Issues **[#8265](https://github.com/agentscope-ai/QwenPaw/issues/8265)** and **[#8473](https://github.com/agentscope-ai/QwenPaw/issues/8473)** highlight an unguarded `importlib.invalidate_caches()` call on certain Linux/distro Python builds (e.g., Debian 12) causing backend plugins to fail loading completely. *Fix PR available:* **[#8483](https://github.com/agentscope-ai/QwenPaw/pull/8483)**.
* **Embedding Reindex Failure (Medium Severity):** Issue **[#8040](https://github.com/agentscope-ai/QwenPaw/issues/8040)** details a silent batch drop when a CJK chunk exceeds a provider's per-item token limit during ReMe reindexing.
* **Context Compression Media Re-injection (Medium Severity):** Issue **[#8474](https://github.com/agentscope-ai/QwenPaw/issues/8474)** reports that history compression revives old media blocks into rebuilt request payloads, permanently breaking sessions with `400` errors.

## 6. Feature Requests & Roadmap Signals
* **Per-Job Reasoning Control:** Issue **[#8439](https://github.com/agentscope-ai/QwenPaw/issues/8439)** and PR **[#8476](https://github.com/agentscope-ai/QwenPaw/pull/8476)** introduce a `thinking_level` parameter into `JobRuntimeSpec`, letting cron jobs independently configure deep reasoning budgets.
* **Reranker Model Center:** PR **[#8472](https://github.com/agentscope-ai/QwenPaw/pull/8472)** adds a dedicated reranker model management center under runtime settings, complete with multi-query verification.
* **Docker Setup Language Control:** Issue **[#8481](https://github.com/agentscope-ai/QwenPaw/issues/8481)** requests an environment variable (`QWENPAW_LANGUAGE`) to dictate default setup language out-of-the-box.

## 7. User Feedback Summary
* **Pain Points:** Users interacting with multi-modal inputs (rich text/images in Feishu or WeChat) experience friction when payloads hit request-body length limits or cause session-breaking token exceptions. Additionally, configuration flags (such as QQ channel `enabled` states) occasionally reset unexpectedly during system reloads (Issue **[#8475](https://github.com/agentscope-ai/QwenPaw/issues/8475)**).
* **Usability Wins:** Enhancements like unread push message filters (PR **[#8484](https://github.com/agentscope-ai/QwenPaw/pull/8484)**) and memory file tag-browsing (PR **[#8470](https://github.com/agentscope-ai/QwenPaw/pull/8470)**) are welcomed improvements for power users managing dense local data.

## 8. Backlog Watch
* **[#7740](https://github.com/agentscope-ai/QwenPaw/issues/7740)** (`Hub模式下，管理员目前不能为用户重置密码...`): This foundational administrative request regarding password resets in Hub mode awaits further triage from maintainers.
* **[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)** (`Daily Paper fails silently when arxiv.org is unreachable`): Needs improved error messaging and proxy handling to prevent silent job failures in cron components.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest: 2026-10-29

## 1. Today's Overview
The ZeroClaw project continues to exhibit strong development velocity and active community engagement, evidenced by 18 updated issues and 29 updated PRs over the past 24 hours. Core contributors are intensely focused on system prompt budgeting, session management improvements, security hardening, and protocol-level resilience (particularly around MCP and Telegram channels). While no new releases dropped today, the high volume of merged bug fixes and staged feature proposals points toward a robust stabilization phase for upcoming minor versions.

---

## 3. Project Progress (Merged & Closed PRs)
The community and core team landed several significant architectural improvements and bug fixes today:

* **System Prompt Hardening & Memory Opt-in:** 
  * PR [#11910](https://github.com/zeroclaw-labs/zeroclaw/pull/11910) (linked to [#11908](https://github.com/zeroclaw-labs/zeroclaw/issues/11908)) converted the system prompt size budget from an advisory check into a hard gate (`fail closed`), eliminating unlimited default sizing risks.
  * PR [#12044](https://github.com/zeroclaw-labs/zeroclaw/pull/12044) introduced opt-in deferred bootstrap sections to keep resident core files lean, while PR [#12056](https://github.com/zeroclaw-labs/zeroclaw/pull/12056) ensured identity sections always stay at the head of direct-path system prompts.
* **Security & Usability Enhancements:** 
  * PR [#11983](https://github.com/zeroclaw-labs/zeroclaw/pull/11983) improved developer experience by updating shell policy refusals to return clear reasons and remediation hints instead of generic blocks.
* **Channel & Cron Fixes:** 
  * PR [#11935](https://github.com/zeroclaw-labs/zeroclaw/pull/11935) added CLI support via `zeroclaw cron runs` to read retained cron execution outputs directly from the terminal.
  * PR [#11934](https://github.com/zeroclaw-labs/zeroclaw/pull/11934) restored `agent_alias` attribution on gateway and cron-triggered agent runs.
  * PR [#11651](https://github.com/zeroclaw-labs/zeroclaw/pull/11651) and [#11601](https://github.com/zeroclaw-labs/zeroclaw/pull/11601) vastly improved Telegram channel reliability by honoring HTTP 429 `retry_after` flood gates and properly bounding voice transcription transient retry errors.

---

## 4. Community Hot Topics
* **[RFC: Gateway and channels don't share the heartbeat worker's MCP-registry-caching pattern (#10346)](https://github.com/zeroclaw-labs/zeroclaw/issues/10346):** This architectural proposal generated substantial discussion regarding redundant multi-spawning of `stdio`-transport MCP servers on daemon boot. Developers are aligning on a shared caching/registry pattern.
* **[fix(channels): classify telegram transcription failures and bound transient retries (#11601)](https://github.com/zeroclaw-labs/zeroclaw/pull/11601):** High-comment activity on handling head-of-line blocking in Telegram long-polling offsets during transcription failures.
* **[feat(session): implement append-only session event history (#11921)](https://github.com/zeroclaw-labs/zeroclaw/pull/11921):** An XL foundational pull request creating versioned, append-only conversation histories to enable robust state reconstruction without repeating external side effects.

---

## 5. Bugs & Stability
Several critical and degraded-behavior bugs were reported:

* **S1 - Workflow Blocked:**
  * **MCP Poisoning:** Issue [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) highlights that an HTTP/SSE MCP server experiencing brief network drops permanently poisons the connection due to a single-shot reset policy.
  * **Android Shell Failure:** Issue [#12075](https://github.com/zeroclaw-labs/zeroclaw/issues/12075) reports that Termux / Android installations completely break on shell invocation because `/system/bin/sh` fails canonicalization (`EPERM`) following recent path-validation updates.
  * **Custom Provider Assumption:** Issue [#12014](https://github.com/zeroclaw-labs/zeroclaw/issues/12014) notes custom OpenAI-compatible providers lacking an explicit `context_window` incorrectly fall back to 32,000 tokens and reject valid local requests.
* **S2 - Degraded Behavior:**
  * **MCP Connection Pooling:** Issue [#12055](https://github.com/zeroclaw-labs/zeroclaw/issues/12055) points out the lack of idle-connection keep-alive controls in the HTTP MCP client, risking dropped tool calls on stale sockets.
  * **Discord Tool Approval Bypass:** Issue [#12064](https://github.com/zeroclaw-labs/zeroclaw/issues/12064) reveals that allowlisted peer bots can answer plaintext tool approvals when `listen_to_bots = true`.

---

## 6. Feature Requests & Roadmap Signals
* **Session Loading:** Request [#12069](https://github.com/zeroclaw-labs/zeroclaw/issues/12069) proposes a `/load-session <name|uuid>` slash command for ZeroCode's ACP pane to streamline resuming past sessions.
* **OpenAI Reasoning Controls:** Feature request [#12054](https://github.com/zeroclaw-labs/zeroclaw/issues/12054) asks for runtime-profile thinking levels to be honored for native OpenAI reasoning requests, enabling multi-agent differentiation under the same provider.
* **New Providers & Obfuscation:** PR [#12085](https://github.com/zeroclaw-labs/zeroclaw/pull/12085) adds Obscurify.ai as a typed model-provider family, while issue [#12086](https://github.com/zeroclaw-labs/zeroclaw/issues/12086) requests privacy protection to obscure WhatsApp phone numbers before payloads hit LLM APIs.

---

## 7. User Feedback Summary
Users are testing the boundaries of ZeroClaw's security guards and multi-channel features. Pain points center around strict regex/heuristic prompt guards incorrectly flagging safe command characters like semicolons or pipes as command injection ([#12066](https://github.com/zeroclaw-labs/zeroclaw/issues/12066)), inverted sensitivities in guard configs ([#12067](https://github.com/zeroclaw-labs/zeroclaw/issues/12067)), and web chat dashboards failing to render live cron/session push updates until a manual message is sent ([#11917](https://github.com/zeroclaw-labs/zeroclaw/issues/11917)).

---

## 8. Backlog Watch
* **[fix(providers/openai-codex): do not retry the default endpoint without streaming (#9900)](https://github.com/zeroclaw-labs/zeroclaw/pull/9900):** Open since August 2026, this small patch addresses a critical compatibility issue where failed Codex stream decodes fallback to non-streaming requests that ChatGPT endpoints automatically reject with a 400 error. It requires final maintainer merge review.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/bddt3006-dot/agents-radar-master).*
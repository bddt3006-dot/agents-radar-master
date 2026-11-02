# OpenClaw Ecosystem Digest 2026-11-02

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-11-02 03:53 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest (2026-11-02)

## 1. Today's Overview
The OpenClaw repository maintains an extremely high velocity of contributions, with 500 issues and 500 pull requests updated within the last 24 hours alone (269 issues closed, 205 PRs merged or closed). Project activity remains concentrated around core gateway stability, platform-specific startup hangs, and memory/plugin lifecycle reliability. While no new official release was published today, maintainers and automated bot pipelines are actively pushing infrastructure fixes targeting Windows state recovery, subagent tool isolation, and cross-channel routing issues.

## 2. Releases
*No new releases published during this 24-hour window.*

## 3. Project Progress
Recent PR activity focuses heavily on patching regressions in channel routing, plugin lifecycles, and database recovery tooling:
- **Routing & Accounts**: Improved handling of underscore-prefixed accounts (`_prod` vs `prod`) to prevent accidental identity merging (PR [#190836](https://github.com/openclaw/openclaw/pull/190836)).
- **Agent Code Mode**: Addressed critical issues where Code Mode models failed initial tool calls due to direct catalog tool queries outside of `exec` (PR [#188436](https://github.com/openclaw/openclaw/pull/188436)).
- **Database & Recovery**: Introduced offline workspace owner recovery features to restore retained repository disks without waking workers (PR [#190842](https://github.com/openclaw/openclaw/pull/190842)) and improved migration archive capture responsiveness (PR [#190809](https://github.com/openclaw/openclaw/pull/190809)).
- **Platform Fixes**: Preserved Windows config writes across path casing variations (PR [#190841](https://github.com/openclaw/openclaw/pull/190841)) and honored silent delivery flags for Telegram stickers (PR [#190844](https://github.com/openclaw/openclaw/pull/190844)).

## 4. Community Hot Topics
The most active discussions and PRs highlight ongoing architectural tension around plugin captures, session state leaks, and real-time voice handling:
- **[Issue #160959](https://github.com/openclaw/openclaw/issues/160959)** (69 comments, 🦞 diamond lobster): Gateway blocks for minutes at startup and runtime when capturing large external plugin dependency trees (a regression introduced in 2026.9.6). Indicates systemic scaling bottlenecks during plugin discovery.
- **[Issue #187900](https://github.com/openclaw/openclaw/issues/187900)** & **[#178359](https://github.com/openclaw/openclaw/issues/178359)** (14 comments each): `openclaw doctor` and diagnostic sequences hanging indefinitely at startup or idling in plugin-capture stages on Linux/macOS hosts, creating administrative lockouts.
- **[Issue #156895](https://github.com/openclaw/openclaw/issues/156895)** (12 comments, 🐚 platinum hermit): Automation-created jobs failing closed within ~20ms with "Scheduled account is unavailable" errors despite proper configuration.
- **[PR #190812](https://github.com/openclaw/openclaw/pull/190812)** (Talk / GPT-Live): Addresses plugin-started GPT-Live sessions failing with "authentication failed" errors when using ChatGPT OAuth flows.

## 5. Bugs & Stability
Severity-ranked issues dominating the current reporting cycle:
- **P0 / Crash Loops**: 
  - [Issue #140161](https://github.com/openclaw/openclaw/issues/140161): Windows gateway cold boot in scheduled-task mode (`--task-supervisor`) hangs for 5-7+ minutes or silently exits with code 0.
  - [Issue #166641](https://github.com/openclaw/openclaw/issues/166641): `web_fetch` cold fallback discovery synchronously captures unrelated plugins on the main Gateway thread, causing liveness stalls.
- **P1 / Session State & Authentication Failures**:
  - [Issue #186684](https://github.com/openclaw/openclaw/issues/186684): `claude-cli` tool-list changes invalidate native sessions, refusing history reseeds and causing agents to restart without history.
  - [Issue #167876](https://github.com/openclaw/openclaw/issues/167876): Talk consultations lose caller authority after session setup completes, breaking subsequent agent execution.

## 6. Feature Requests & Roadmap Signals
- **[Issue #91676](https://github.com/openclaw/openclaw/issues/91676)**: Opt-in config (`skills.workshop.allowSandboxedAgents`) to safely expose the `skill_workshop` tool to sandboxed agents.
- **[PR #163267](https://github.com/openclaw/openclaw/pull/163267)**: Introduction of `tools.sessions.visibility: "channel"` to allow same-channel thread recall without exposing an agent's entire session history broadly.
- **[Issue #128090](https://github.com/openclaw/openclaw/issues/128090)**: Rendered Markdown previews inside Review file viewers to ease native reading and document navigation.

## 7. User Feedback Summary
- **Pain Points**: Users updating past version 2026.9.x continue to experience plugin transition frictions, particularly around asynchronous hot-reloads disposing active stateful channel plugins ([Issue #152965](https://github.com/openclaw/openclaw/issues/152965)). UI jitter in the Control UI WebChat during history scrolling ([Issue #164394](https://github.com/openclaw/openclaw/issues/164394)) and invisible progress drafts on Telegram channels ([Issue #147260](https://github.com/openclaw/openclaw/issues/147260)) remain frequent sources of user friction.
- **Use Cases**: Heavy deployment of multi-agent Telegram/WebChat gateways utilizing heavy cron jobs and localized vector memory stores are surfacing deep edge cases in persistence and crash recovery.

## 8. Backlog Watch
Long-standing tickets requiring deeper maintainer triage:
- **[Issue #137613](https://github.com/openclaw/openclaw/issues/137613)**: Pre-compaction memory flush remains disabled on CLI backends due to native compaction gating conflicts.
- **[Issue #128140](https://github.com/openclaw/openclaw/issues/128140)**: The `memory_search` tool consistently times out (15s) for some users while CLI queries execute successfully, indicating underlying IPC or wrapper latency issues.
- **[Issue #131150](https://github.com/openclaw/openclaw/issues/131150)**: Multi-account Slack Socket Mode installations experiencing silently dropped DMs following frequent gateway restarts.

---

## Cross-Ecosystem Comparison

# AI Agent & Personal AI Assistant Open-Source Ecosystem Report
**Date:** November 2, 2026

---

## 1. Ecosystem Overview
The open-source AI agent and personal assistant ecosystem is experiencing intense, hyper-velocity development, driven by the operational maturation of autonomous gateways, multi-client synchronization, and enterprise-grade sandboxing. Across the board, projects are transitioning from simple chat wrappers to multi-tenant runtime platforms capable of executing complex background workflows, cron tasks, and cross-channel message routing. However, this architectural expansion has introduced systemic friction around session state recovery, file-locking contention on Windows hosts, and dependency-resolution bottlenecks during cold boots.

---

## 2. Activity Comparison

| Project | Recent Issue Activity | Recent PR Activity | Release Status | Ecosystem Health & Stability Score |
| :--- | :--- | :--- | :--- | :--- |
| **OpenClaw** | 500 updated (269 closed) | 500 updated (205 merged/closed) | No new release (Stabilizing on 2026.9.x) | ⚠️ **High Activity / Stressed** (Plagued by startup stalls and deep state-leak bugs) |
| **Hermes Agent** | 50 updated | 50 updated | No new release (v0.22.x branch) | 🟡 **Active / Iterating** (Stabilizing Unified Gateway architecture) |
| **IronClaw** | 0 updated | 0 updated (Dependabot only) | No new release | ❄️ **Dormant / Maintenance-Only** (Zero core PR activity; dependency updates only) |
| **QwenPaw** | 10 updated | 33 updated | No new release (Pre-v2.2.0 Hub staging) | 🟢 **Healthy / Modularizing** (Strong throughput, preparing multi-tenant Hub) |
| **ZeroClaw** | 11 updated | 50 updated | No new release (v0.9.0 stable) | 🟢 **Robust / Security-Focused** (Heavy focus on OIDC, RPC denials, and architecture) |

---

## 3. OpenClaw's Position
* **Advantages vs Peers:** OpenClaw maintains massive scale and community mindshare, acting as the de-facto core reference implementation for local AI gateways. Its breadth of channel integrations, raw velocity of contributions, and advanced recovery tools (such as offline workspace owner recovery) outpace most competitors.
* **Technical Approach Differences:** Unlike Hermes Agent (which relies on a Unified Gateway emphasizing cross-device mobile/desktop parity) or IronClaw (which heavily leverages Wasm/Rust isolation), OpenClaw operates as an expansive, feature-rich gateway ecosystem. However, this sprawling plugin architecture and large external dependency tree expose it to systemic scaling bottlenecks, such as startup gateway stalls during dependency captures.
* **Community Size Comparison:** OpenClaw dwarfs its peers in raw issue and pull request velocity (500+ updates per 24 hours), operating at an order of magnitude higher throughput than Hermes, QwenPaw, or ZeroClaw.

---

## 4. Shared Technical Focus Areas
* **Windows File Locking & Concurrency:** Both **OpenClaw** (Windows state recovery / path casing variations) and **Hermes Agent** (PR #147485 fixing `ERROR_ACCESS_DENIED` and `ERROR_SHARING_VIOLATION` on `jobs.json` reads) are battling atomic write collisions and file-locking edge cases on Windows environments.
* **Multi-Tenant & Multi-Surface Session Synchronization:** **OpenClaw** (account identity merging via underscore prefixes), **Hermes Agent** (mobile-to-desktop session resume failures), and **QwenPaw** (QwenPaw Hub multi-tenant architecture) are all grappling with the complexities of mapping sessions across disparate client surfaces and accounts.
* **Startup Performance & Lazy-Loading:** **OpenClaw** (gateway startup blocks due to external plugin dependency trees) and **QwenPaw** (PR #7546 fixing console startup latency by lazy-loading heavy channel SDKs) reflect a shared industry awakening to the need for optimized cold-boot performance.

---

## 5. Differentiation Analysis
* **OpenClaw:** Built as the ubiquitous, highly extensible multi-channel gateway, prioritizing broad platform reach and deep cron/vector-memory automation at the cost of occasional startup and memory lifecycle friction.
* **Hermes Agent:** Focuses heavily on multi-client synchronization (CLI, Desktop, mobile web) and rich plugin ecosystems (e.g., HermesFord virtual village dashboards), targeting seamless user experiences across form factors.
* **IronClaw:** A safety- and modularity-first implementation built heavily in Rust, leveraging Wasmtime for strict execution sandboxing, though currently paused in maintenance mode.
* **QwenPaw:** Evolving rapidly from a personal tool into a team-scale workspace, concentrating on multi-tenant enterprise editions (QwenPaw Hub), modular skill-pool management, and restrictive NAS sandboxing (e.g., fnOS).
* **ZeroClaw:** Strongly anchored in security hardening, RPC authorization structures, and structured file intake pipelines (RFC #9488), appealing to security-conscious operators and advanced developers.

---

## 6. Community Momentum & Maturity
* **Rapidly Iterating & Stabilizing:** **Hermes Agent**, **QwenPaw**, and **ZeroClaw** show healthy, targeted iteration cycles. Hermes is actively ironed out post-merge Unified Gateway issues; QwenPaw is modularizing codebases to support its upcoming multi-tenant Hub; ZeroClaw is systematically hardening RPC security and file intake architectures.
* **Stressed by Scale:** **OpenClaw** is showing classic signs of hyper-growth friction. While its contribution velocity is unmatched, it suffers from critical P0/P1 startup stalls, plugin-discovery latency, and session-state leaks that demand heavy maintainer triage.
* **Stalled:** **IronClaw** exhibits zero active core feature development, relying entirely on automated dependency upkeep.

---

## 7. Trend Signals for AI Agent Developers
1. **The Multi-Client Synchronization Tax:** Moving from single-client CLI/TUI setups to unified gateways (desktop + mobile web + chat channels) consistently introduces session-resume failures and account mapping desyncs. Architectures must implement robust, source-agnostic session ID resolution early.
2. **Cold-Boot & Dependency Bloat Penalties:** As personal assistants integrate dozens of channel SDKs and external tools, cold-boot latency explodes. Lazy-loading channel runtimes and isolating dependency discovery trees are no longer optional polish—they are core architectural requirements.
3. **Enterprise & Sandboxed Deployment Realities:** Deployments on locked-down environments (such as NAS apps or restricted container spaces) expose brittle assumptions regarding home directory permissions (`pwd.getpwuid` vs `$HOME`). Autonomous agents must gracefully handle read-only system paths and restricted user spaces.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest (2026-11-02)

## 1. Today's Overview
The Hermes Agent repository remains extremely active, with 50 updated issues and 50 updated pull requests over the past 24 hours. Development focus centers heavily on stabilizing the newly deployed **Unified Gateway** architecture (`#106742`), fixing multi-client session cross-compatibility (Desktop, mobile web, CLI), and expanding migration tooling. Overall project health remains high, with rapid turnaround on critical cross-platform rendering and permissions issues, though multi-surface synchronization continues to generate edge-case bug reports.

## 2. Releases
*No new releases were published in the last 24 hours.* (Latest stable versions remain on the v0.22.x branch).

## 3. Project Progress
Notable pull requests merged or active today advanced core compatibility and migrations:
* **Migration Expanders:** PR [#147724](https://github.com/NousResearch/hermes-agent/PR/147724) and [#147799](https://github.com/NousResearch/hermes-agent/PR/147799) (Merged) added support for migrating from Grok Bot and OpenBot via `hermes migrate` and setup routines using the `agent-importers` plugin.
* **Cron & State Reliability:** PR [#147485](https://github.com/NousResearch/hermes-agent/PR/147485) (Closed) resolved Windows `ERROR_ACCESS_DENIED` and `ERROR_SHARING_VIOLATION` issues by adding retry logic to `jobs.json` reads during concurrent atomic writes.
* **Localization & UI Fixes:** PR [#147515](https://github.com/NousResearch/hermes-agent/PR/147515) (Closed) fixed language pack loading on cold gateway boots for non-English locales (such as Korean) on Hermes Desktop.

## 4. Community Hot Topics
The community's most heavily discussed and reacted items highlight friction points in multi-surface integration:
* **[#143547 Unified Gateway Post-Merge Problems](https://github.com/NousResearch/hermes-agent/Issue/143547):** Continuing fallout from moving all local conversation threads into a single gateway process, attracting 35 comments across TUI, CLI, desktop, and cron integrations.
* **[#139135 Discord Async Child Completion Bug](https://github.com/NousResearch/hermes-agent/Issue/139135):** Investigated and closed bug where native background tasks on Discord threads completed, but durable result status stayed pending and parents failed to resume.
* **[#144814 Session Resume Failures for Mobile-Created Chats](https://github.com/NousResearch/hermes-agent/Issue/144814):** Discussed extensively (11 comments) regarding `session.resume 4001 not_found` errors when users attempt to open chats initiated from `hermes-mobile` inside the native Desktop client.

## 5. Bugs & Stability
* **Critical (Windows File Locking/Locks):** [#127975](https://github.com/NousResearch/hermes-agent/Issue/127975) reports Windows file logging halts its rollover mechanism due to unregistered `pywin32` DLLs in `System32`.
* **High (Security / Secrets Exposure):** [#147512](https://github.com/NousResearch/hermes-agent/PR/147512) addresses a security flaw where config backups (`backup_config()`) inherited source permissions instead of forcing owner-only `0600` flags.
* **Medium (Session/Auth Desync):** [#143839](https://github.com/NousResearch/hermes-agent/Issue/143839) highlights that Desktop v0.22.5 cannot archive, delete, or resume its own new-style chats due to `permission_denied` errors on unrouted source rows.

## 6. Feature Requests & Roadmap Signals
* **[#147477 Script-Facing Configured Model Inference (`hermes infer`)](https://github.com/NousResearch/hermes-agent/PR/147477):** Adds a direct CLI command for scripts requiring a Hermes-configured model response without spawning a full session or plugin.
* **[#55287 Configurable Chat Width in Appearance Settings](https://github.com/NousResearch/hermes-agent/Issue/55287):** Popular UX request allowing users to adjust the maximum width (`--composer-width`) of conversation content in the Desktop app.
* **[#147509 HermesFord Plugin Catalog Addition](https://github.com/NousResearch/hermes-agent/PR/147509):** Introduces a pixel-art village dashboard plugin where active chat sessions correlate to autonomous virtual villagers moving around a map.

## 7. User Feedback Summary
* **Mobile-to-Desktop Friction:** Users expressing frustration that sessions started via mobile web dashboard clients or third-party wrappers cannot be easily resumed or managed within native desktop clients due to source ID mapping misses (`LOCAL_SESSION_SOURCE_IDS`).
* **Linux Desktop Quirks:** Users running Linux report translucent rendering windows without an opt-out toggle in settings due to hardcoded platform flags (`TRANSLUCENCY_SUPPORTED = false`) (`#145183`).

## 8. Backlog Watch
* **[#38369 Desktop Remote Gateway Execution Target Clarification](https://github.com/NousResearch/hermes-agent/Issue/38369):** Long-standing (June 2026) open issue pointing out that when Hermes Desktop is tied to a Remote Gateway, the built-in Terminal and File Explorer surfaces still mistakenly execute actions against the local machine.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

Here is the IronClaw project digest for November 2, 2026, based on recent repository activity.

---

### 1. Today's Overview
The IronClaw (`nearai/ironclaw`) repository experienced a quiet 24-hour cycle on November 2, 2026, with zero new issues or merged pull requests reported. Development activity is currently limited to maintenance-oriented dependency updates handled by Dependabot. While core feature development appears paused for the moment, the active upkeep of foundational libraries (such as Tokio, Wasmtime, and Serde) ensures the project's dependency tree remains secure and up-to-date.

### 2. Releases
*No new releases were published during this period.*

### 3. Project Progress
*No pull requests were merged or closed during this period.*

### 4. Community Hot Topics
*No active community discussions, comments, or reaction spikes occurred on the tracked PRs or issues during this period.*

### 5. Bugs & Stability
*No new bugs, crashes, or regressions were reported in the last 24 hours. General system stability is maintained by ongoing dependency patching across the Rust and GitHub Actions ecosystems.*

### 6. Feature Requests & Roadmap Signals
*No new feature requests were logged during this period.*

### 7. User Feedback Summary
*No user feedback or sentiment data was recorded during this timeframe.*

### 8. Backlog Watch
While no new issues are currently open, several long-standing dependency and maintenance pull requests remain open and await review and merging from the maintainers:
*   **[PR #8160](https://github.com/nearai/ironclaw/pull/8160)**: Dependabot bump of the "everything-else" group across 1 directory, featuring 43 updates including `thiserror` and `uuid`.
*   **[PR #8159](https://github.com/nearai/ironclaw/pull/8159)**: Dependabot bump for GitHub Actions workflows, including `anthropics/claude-code-action` and `actions/setup-python`.
*   **[PR #8141](https://github.com/nearai/ironclaw/pull/8141)**: Tokio ecosystem dependency updates (Tokio v1.53.3, `tokio-test`, and `tokio-util`).
*   **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)**: Medium-risk, size-L WASM group update involving `wasmtime`, `wasmtime-wasi`, and related tools (open since August 2026).
*   **[PR #8140](https://github.com/nearai/ironclaw/pull/8140)**: Serialization group update bumping `serde_json` to v1.0.154.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest (2026-11-02)

## 1. Today's Overview
The QwenPaw repository continues to see robust developer activity, with 10 active issues and 33 pull requests updated over the past 24 hours. Core contributors are heavily focused on performance optimization (such as lazy-loading built-in channels), enterprise/restricted deployment robustness (resolving sandbox home directory issues), and session persistence refinements. While no new official GitHub releases dropped today, the heavy throughput of pull requests indicates that the project is actively stabilizing major features ahead of a new version cycle.

---

## 2. Releases
*No new releases were published in the last 24 hours.*

---

## 3. Project Progress
Several key pull requests were merged or advanced today, addressing long-standing performance bottlenecks and integration bugs:
* **Lazy-Loading Built-in Channels ([#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546)):** Successfully resolved a major startup latency issue where console-only environments unnecessarily imported all 18 channel SDKs (such as heavy packages like `lark_oapi`), cutting startup times down significantly.
* **DingTalk Open API Fallback ([#8453](https://github.com/agentscope-ai/QwenPaw/pull/8453)):** Fixed an issue where expired `sessionWebhook` tokens resulted in silently dropped final replies, implementing a fallback to ensure message delivery.

---

## 4. Community Hot Topics
* **[#7318 QwenPaw Hub, the multi-tenant edition, released in 2.2.0: what should we build next?](https://github.com/agentscope-ai/QwenPaw/issue/7318)** *(36 comments, 4 reactions)*: This discussion thread remains the primary focal point for community direction. Users and contributors are actively brainstorming how to extend QwenPaw Hub's multi-tenant capabilities, admin-managed skills, and team-oriented access controls.
* **[#8126 Feature: Make skill-pool download a cancellable background job](https://github.com/agentscope-ai/QwenPaw/issue/8126)** *(7 comments)*: A heavily discussed review follow-up addressing synchronous client timeouts (30s) when downloading large skill pools over HTTP, driving the transition to background worker jobs with explicit progress reporting and cancellation.

---

## 5. Bugs & Stability
* **High Priority / Critical:**
  * **[#8515 / #8527 Sandbox Startup Crash](https://github.com/agentscope-ai/QwenPaw/issue/8515):** In restricted environments like fnOS NAS application sandboxes, `dependency_maintenance` attempts to resolve lock directories via `pwd.getpwuid().pw_dir`, bypassing `$HOME` and failing on read-only system paths with a `PermissionError`. A corresponding fix PR ([#8527](https://github.com/agentscope-ai/QwenPaw/pull/8527)) has been submitted.
  * **[#8533 Codex/Qoder Scheduled Task Failure](https://github.com/agentscope-ai/QwenPaw/issue/8533):** Non-empty text requests for third-party `codex` agent scheduled tasks are incorrectly rejected with a `ValueError: Third-party agent requests require text or attachments`.
* **Medium Priority:**
  * **[#8521 UI Response Delays and Copy Issues](https://github.com/agentscope-ai/QwenPaw/issue/8521):** Users report sluggish overall UI reactivity in recent versions, coupled with intermittent clipboard failure (`Ctrl+C` requiring multiple attempts) and occasional empty replies during agent chat turns.
  * **[#8528 Markdown Preview Relative Path 404s](https://github.com/agentscope-ai/QwenPaw/issue/8528):** Console file drawer Markdown previews incorrectly rewrite relative paths into absolute `/api/files/preview/...` URLs without contextual path resolution, causing images and links in subdirectories to return 404s.

---

## 6. Feature Requests & Roadmap Signals
* **[#8523 / #8525 Agent Task Scheduling & Daily Routines](https://github.com/agentscope-ai/QwenPaw/issue/8523):** Users are requesting a native task orchestration loop or scheduling registry (beyond simple one-off cron tasks) allowing agents to run sequential workflows (e.g., executing a multi-step daily task list, awaiting user sign-off via IM, and seamlessly transitioning to the next task). 
* **Roadmap Prediction:** Given the active PR [#7903](https://github.com/agentscope-ai/QwenPaw/pull/7903) (Community Integration & Inbox) and [#8532](https://github.com/agentscope-ai/QwenPaw/pull/8532) (Append-only session storage and turn forks), upcoming releases will heavily prioritize team collaboration hooks and robust session state recovery.

---

## 7. User Feedback Summary
* **Pain Points:** Deployment on locked-down NAS environments (fnOS) exposed brittle assumptions regarding home directory permissions. Users transitioning to newer UI versions noted a preference for the speed and compactness of older layouts, particularly citing awkward space usage when switching models.
* **Positive Signals:** Community excitement remains high around the architectural direction of QwenPaw Hub and the ongoing modularization of third-party backends into plugins, pointing to a healthy evolution from a personal toy to a team-scale workspace.

---

## 8. Backlog Watch
* **[#7903 feat(community): integrate QwenPaw community and inbox](https://github.com/agentscope-ai/QwenPaw/pull/7903):** This massive PR (opened late September) handles embedded community feeds and platform PKCE auth. It requires dedicated maintainer review to merge foundational social features into the core codebase.
* **[#8178 feat(skills): support nested (categorised) skill directories](https://github.com/agentscope-ai/QwenPaw/issue/8178):** A critical feature for power users looking to organize extensive skill repositories hierarchically rather than via a flat root folder.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-11-02

## 1. Today's Overview
The ZeroClaw repository remains intensely active, with 11 issue updates and 50 pull request updates recorded over the past 24 hours. Development continues to focus heavily on foundational runtime architecture, security enhancements (such as RPC denial reasons and OIDC dashboard authentication), and file management pipelines (#11013). While project velocity remains high across security, configuration, and channel integrations, maintainers are also addressing regressions in tool-calling behavior, platform-specific packaging issues, and edge-case panics.

---

## 2. Releases
*No new releases today.* (Latest stable version remains `v0.9.0` per recent configuration issues).

---

## 3. Project Progress
*Note: Across the 50 updated pull requests, several key enhancements and fixes were advanced today:*
- **Security & Permissions**: Progress continues on unified permission profiles, including cascading agent renames into permission selectors ([PR #11226](https://github.com/zeroclaw-labs/zeroclaw/pull/11226)) and hardening shell execution allowlists against high-risk commands ([PR #11061](https://github.com/zeroclaw-labs/zeroclaw/pull/11061)).
- **Channel & Provider Resilience**: Fixes were introduced to re-apply system prompt caps after per-turn skill refreshes ([PR #12070](https://github.com/zeroclaw-labs/zeroclaw/pull/12070)) and to fail fast on quota-exhausted 429 error types (`FreeUsageLimitError`) for reliable provider routing ([PR #11767](https://github.com/zeroclaw-labs/zeroclaw/pull/11767)).
- **CLI & Packaging Fixes**: Resolved musl Linux release archive detection during self-updates ([PR #12163](https://github.com/zeroclaw-labs/zeroclaw/pull/12163)) and ensured dash-leading lifecycle remedy paths are properly prefixed with `./` ([PR #12172](https://github.com/zeroclaw-labs/zeroclaw/pull/12172)).
- **Documentation & UI Copy**: Corrected the personality editor’s misleading copy regarding channel reload behavior ([PR #12182](https://github.com/zeroclaw-labs/zeroclaw/pull/12182)) and clarified `native_tools` scopes in provider documentation ([PR #11740](https://github.com/zeroclaw-labs/zeroclaw/pull/11740)).

---

## 4. Community Hot Topics
The most discussed and active items touch on RPC security hardening, architecture tracking, and dashboard access:
- [PR #11289 feat(rpc): stable denial reason identifiers and localized selector denials](https://github.com/zeroclaw-labs/zeroclaw/pull/11289): Centralizing RPC authorization denials into structured `RpcDenialReason` enums for better client error handling.
- [Issue #11013 [Tracker]: Unified file intake, resolver, and delivery implementation](https://github.com/zeroclaw-labs/zeroclaw/issue/11013): Driving the multi-phase implementation of RFC #9488 for consistent file handling across channels and runtime elements.
- [PR #11965 feat(gateway): opt-in OIDC dashboard sign-in](https://github.com/zeroclaw-labs/zeroclaw/pull/11965): Bringing identity provider sign-in options to the management dashboard alongside traditional pairing codes.
- [PR #11884 feat(rpc): expose Goal commands to RPC and ZeroCode clients [Goal V1 proposal 7/12]](https://github.com/zeroclaw-labs/zeroclaw/pull/11884): Continuing the monumental stacked proposal introducing Goal execution capabilities.

---

## 5. Bugs & Stability
Several stability issues and regressions were logged today, ranging from minor copy errors to high-risk configuration oversights:
- **SOP subsystem silent failure** ([Issue #9779](https://github.com/zeroclaw-labs/zeroclaw/issue/9779)) — **High Risk / Priority P1**: Documented defaults for `sops_dir` are not honored by the daemon, causing Standard Operating Procedures to silently fail to load without throwing errors or warnings.
- **Deferred MCP Tool List Hashmap Fluctuation** ([Issue #12176](https://github.com/zeroclaw-labs/zeroclaw/issue/12176)) — **Severity S2**: The `<available-deferred-tools>` block renders in non-deterministic HashMap order across sessions, inadvertently busting prompt caching.
- **Lark/Feishu Card Chunking Panic** ([Issue #12173](https://github.com/zeroclaw-labs/zeroclaw/issue/12173)) — **Severity S2**: Raw byte slicing lands inside multi-byte UTF-8 characters during markdown chunking, crashing the channel task.
- **Misleading Personality Editor Copy** ([Issue #12175](https://github.com/zeroclaw-labs/zeroclaw/issue/12175) / [PR #12182](https://github.com/zeroclaw-labs/zeroclaw/pull/12182)) — **Severity S3**: UI claimed personality changes take effect instantly without daemon reloads on channels, causing operator confusion. (Fix already submitted via PR #12182).
- **`deliver_file` URI Description Bug** ([Issue #12178](https://github.com/zeroclaw-labs/zeroclaw/issue/12178)) — **Severity Low**: Misleads the model regarding attachment URI citation formatting.

---

## 6. Feature Requests & Roadmap Signals
- **Managed Document Uploads via Web** ([Issue #12181](https://github.com/zeroclaw-labs/zeroclaw/issue/12181)): First phase implementation of RFC #9488 allowing web dashboard chat users to attach documents stored under `<data_dir>/attachments`.
- **Configurable Daemon Session Quotas** ([Issue #12130](https://github.com/zeroclaw-labs/zeroclaw/issue/12130)): Operator-requested controls to partition RPC session capacities across transports, establishing local operator reserves outside standard connection pools.
- **Shared Execution Permissions and Credential Renewal** ([Issue #12131](https://github.com/zeroclaw-labs/zeroclaw/issue/12131)): RFC exploring identity continuation and credential lifecycles for child tasks outliving originating connections.

---

## 7. User Feedback Summary
Operators are currently navigating friction around authentication boundaries (balancing pairing codes versus upcoming OIDC sign-ins) and expect seamless handling of configuration directories. The surfacing of silent failures (such as the SOP directory bug [#9779](https://github.com/zeroclaw-labs/zeroclaw/issue/9779)) highlights a recurring user pain point: diagnostics and log visibility need strengthening when configuration fallback paths fail.

---

## 8. Backlog Watch
- [PR #9826 fix(cli): refuse to run when an agent's shell spawned the process](https://github.com/zeroclaw-labs/zeroclaw/pull/9826): A critical security PR blocked and awaiting maintainer alignment regarding agent privilege escalation vectors through shell execution.
- [Issue #9597 [Feature]: make peer-agent turns durable and attributable](https://github.com/zeroclaw-labs/zeroclaw/issue/9597): An in-progress architectural enhancement to turn detached inter-agent messaging into trackable runtime tasks.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/bddt3006-dot/agents-radar-master).*
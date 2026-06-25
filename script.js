const questions = [
  {
    key: "age",
    title: "你现在的人生等级是？",
    hint: "每个等级都有自己的主线任务，系统需要先确认你站在哪一章。",
    options: ["22-25", "26-30", "31-35", "36-40", "41+"],
    descriptions: ["新手村刚出门，地图很大", "主线展开，开始有代价", "装备成型，也背上负重", "资源更稳，转向更贵", "老玩家视角，少走弯路"],
  },
  {
    key: "city",
    title: "你现在所在的城市层级是？",
    hint: "不用精确到城市名。系统只读取机会密度、生活成本和转身难度。",
    options: ["一线城市", "新一线城市", "二线城市", "三四线城市", "县城/小城", "海外/流动中"],
    descriptions: ["如北上广深：机会密，消耗也高", "如杭州/成都/南京：上升通道多，节奏分化", "省会或强区域城市：稳定与机会并存", "熟人网络更强，转换成本更低", "生活半径小，安全感和天花板同时存在", "坐标不固定，人生地图正在重绘"],
  },
  {
    key: "industry",
    title: "你的主要工作场域更接近哪类？",
    hint: "选最像你日常的那一类，不需要完全准确。系统会用它判断增长速度和抗风险方式。",
    options: ["互联网/AI/产品技术", "金融/咨询/专业服务", "消费/品牌/运营销售", "制造/供应链/工程", "教育/医疗/公共服务", "内容/设计/自由职业", "体制内/国企/稳定组织", "其他/复合职业"],
    descriptions: ["变化快，技能迭代压力明显", "结果导向强，资源和人脉权重高", "靠市场嗅觉、表达和执行吃饭", "重流程、重经验、重长期积累", "责任感强，节奏更受制度影响", "自由度更高，收入波动也更真实", "稳定性更强，突破常在边界之外", "身份不止一种，系统按复合路径读取"],
  },
  {
    key: "position",
    title: "你在队伍里更像什么位置？",
    hint: "系统会根据你当前站位，判断是升级装备、换地图，还是重开流派。",
    options: ["初级", "中级", "高级", "管理", "独立经营"],
    descriptions: ["还在攒经验值", "开始承担关键任务", "有技能树，也有天花板", "带队通关，消耗更大", "自己开局，自己结算"],
  },
  {
    key: "income",
    title: "你的金币池大概在哪一档？",
    hint: "金币不是人生分数，但会影响你能不能从容试错。",
    options: ["<10w", "10-30w", "30-50w", "50-100w", "100w+"],
    descriptions: ["生存关卡优先", "有缓冲，但不厚", "开始有选择权", "能买到时间", "高阶资源位"],
  },
  {
    key: "state",
    title: "最近你的角色状态栏显示什么？",
    hint: "别急着解释它，先让系统读到真实的体感。",
    options: ["稳定但无聊", "忙但有成长", "焦虑但不敢动", "想改变但犹豫", "正在转型", "半躺平"],
    descriptions: ["血量稳，灵魂缺蓝", "疲惫，但经验在涨", "警报响了，脚还没动", "站在传送门前", "旧身份正在卸载", "进入低功耗模式"],
  },
  {
    key: "troubles",
    title: "最近最耗你的，是哪几类人生噪音？",
    hint: "多选一到三项就好。系统会把它们压缩成当前主线冲突。",
    multi: true,
    compact: true,
    options: ["职业去留", "方向重选", "自己做事", "钱不够稳", "意义感变低", "关系消耗", "未来看不清"],
    descriptions: ["例：要不要跳槽、换团队、离开现在的位置", "例：转行、读书、换赛道，担心重来太贵", "例：创业、副业、接项目，想自己开一局", "例：收入、房贷、存款、现金流一直报警", "例：做得下去，但越来越不知道为了什么", "例：同事、客户、家庭沟通让你持续掉血", "例：不是没路，是每条路都像有雾"],
  },
  {
    key: "family",
    title: "你的羁绊系统现在如何？",
    hint: "羁绊会给人护盾，也会占用背包格。这里没有评判，只有读取。",
    options: ["单身/无孩", "恋爱中", "已婚", "已婚有娃", "离异/重启中"],
    descriptions: ["单人行动，机动性高", "双人剧情开启", "共同账户与共同天气", "护盾更厚，责任也更重", "旧剧情结算，新章节待开"],
  },
  {
    key: "resources",
    title: "如果你想试错，手里有哪些缓冲？",
    hint: "这里读的是安全垫，不是评判。选最接近你现在真实情况的一项。",
    options: ["几乎没缓冲", "能撑1-3个月", "能撑3-6个月", "有副业/项目收入", "家人能托底", "现金流比较稳"],
    descriptions: ["例：存款少，断收入会立刻紧张", "例：短期空窗可以扛，但不能拖太久", "例：能认真试一轮，但需要计划", "例：主业外已有一点收入或客户线索", "例：必要时家里能帮一把或住回去", "例：存款/收入足够给选择留余地"],
  },
  {
    key: "riskScenario",
    title: "现在有个机会摆在你面前，你会怎么处理？",
    hint: "例：一个更高薪但不确定的 offer、一个副业机会、一次转岗邀请。系统会从你的反应推断行动流派。",
    options: ["先不动，查清楚再说", "先小范围试一下", "设好底线后认真冲", "看当下感觉决定"],
    descriptions: ["例：问清薪资、团队、风险，没有把握不换", "例：先面试/兼职/试合作，给自己留退路", "例：定好存款底线和截止日期，然后全力推进", "例：相信直觉和时机，状态对了就上"],
  },
];

const state = { step: 0, answers: {} };

const $ = (selector) => document.querySelector(selector);
const opening = $("#opening");
const home = $("#home");
const mode = $("#mode");
const oracle = $("#oracle");
const simulator = $("#simulator");
const loading = $("#loading");
const result = $("#result");
const panel = $("[data-question-panel]");
const progress = $("[data-progress]");
const stepCount = $("[data-step-count]");
let latestResult = null;
let liveStats = { total: 100, generated: 0, events: [] };

const fateLibrary = [
  { sign: "风起未定", tag: "巽风之象", symbol: "△", oracle: "风先到，路还没有完全显形。适合听信号，不适合急着拍板。" },
  { sign: "山行有阻", tag: "艮山之象", symbol: "◇", oracle: "山挡在前面，不是让你退回去，而是让你确认装备够不够。" },
  { sign: "三岔之局", tag: "择路之象", symbol: "✦", oracle: "你站在岔口太久了，真正耗你的不是路少，而是每条路都有代价。" },
  { sign: "灯下见门", tag: "震雷之象", symbol: "◎", oracle: "门已经出现，但还需要一次小动作把它推开。" },
  { sign: "水面藏桥", tag: "坎水之象", symbol: "◌", oracle: "表面像没路，其实桥在水下。先降噪，路会浮出来。" },
  { sign: "地势回声", tag: "坤地之象", symbol: "□", oracle: "你需要的不是更猛，而是把地基垫厚，让下一步站得住。" },
  { sign: "火照旧卷", tag: "离火之象", symbol: "✧", oracle: "旧问题被照亮了。你不是第一次遇见它，只是这次看得更清楚。" },
  { sign: "雷在远处", tag: "震动之象", symbol: "☉", oracle: "变化还没落地，但声音已经传来。准备比冲刺更重要。" },
  { sign: "泽边新盟", tag: "兑泽之象", symbol: "◈", oracle: "有人的一句话、一个邀请，可能成为你下一段路的开端。" },
  { sign: "天光压顶", tag: "乾天之象", symbol: "✶", oracle: "上限正在召唤你，但别让野心把呼吸感挤没。" },
  { sign: "雾里留灯", tag: "守灯之象", symbol: "◍", oracle: "不确定不是失败。你现在最该保住的是那一点还没灭的光。" },
  { sign: "星落背包", tag: "蓄资之象", symbol: "✹", oracle: "先清点手里的筹码。真正能让你转身的，是可用资源。" },
];

window.addEventListener("DOMContentLoaded", () => {
  initLiveStats();
  setTimeout(() => {
    opening.classList.add("opening-done");
    opening.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      opening.style.display = "none";
    }, 950);
  }, 6200);
});

document.addEventListener("click", (event) => {
  const modeEntry = event.target.closest("[data-mode-entry]");
  const modeChoice = event.target.closest("[data-mode-choice]");
  const homeBack = event.target.closest("[data-home-back]");
  const back = event.target.closest("[data-back]");
  const restart = event.target.closest("[data-restart]");
  const copy = event.target.closest("[data-copy]");
  const exportCard = event.target.closest("[data-export-card]");
  const oraclePreset = event.target.closest("[data-oracle-preset]");
  const oracleBack = event.target.closest("[data-oracle-back]");
  const oracleCast = event.target.closest("[data-oracle-cast]");
  const fateToggle = event.target.closest("[data-fate-toggle]");

  if (modeEntry) showModeSelect();
  if (modeChoice) chooseMode(modeChoice.dataset.modeChoice);
  if (homeBack) showHome();
  if (back) previousStep();
  if (restart) restartFlow();
  if (copy) copyShareText();
  if (exportCard) exportShareCard();
  if (oraclePreset) chooseOraclePreset(oraclePreset);
  if (oracleBack) showModeSelect();
  if (oracleCast) castOracleOnly();
  if (fateToggle) toggleFateDetail(fateToggle);
});

function showHome() {
  mode.classList.add("hidden");
  oracle.classList.add("hidden");
  simulator.classList.add("hidden");
  result.classList.add("hidden");
  home.classList.remove("hidden");
}

function showModeSelect() {
  home.classList.add("hidden");
  oracle.classList.add("hidden");
  simulator.classList.add("hidden");
  result.classList.add("hidden");
  mode.classList.remove("hidden");
}

function chooseMode(choice) {
  state.answers.mode = choice || "双模式融合";
  if (state.answers.mode === "命运模式") {
    showOracleScreen();
    return;
  }
  startFlow();
}

function showOracleScreen() {
  mode.classList.add("hidden");
  home.classList.add("hidden");
  oracle.classList.remove("hidden");
  setTimeout(() => $("[data-oracle-question]")?.focus(), 120);
}

function chooseOraclePreset(button) {
  document.querySelectorAll("[data-oracle-preset]").forEach((node) => node.classList.remove("selected"));
  button.classList.add("selected");
  $("[data-oracle-question]").value = button.dataset.oraclePreset || "";
}

function castOracleOnly() {
  const question = ($("[data-oracle-question]").value || "").trim();
  if (!question) {
    showToast("先写下心中所求，哪怕只是一句话");
    return;
  }
  state.answers = {
    mode: "命运模式",
    oracleQuestion: question,
    troubles: [question.slice(0, 12)],
    state: "想改变但犹豫",
    age: "26-30",
    city: "流动中",
    industry: "其他/复合职业",
    position: "独立经营",
    income: "10-30w",
    family: "单身/无孩",
    resources: "能撑1-3个月",
    riskScenario: "先小范围试一下",
  };
  oracle.classList.add("hidden");
  runSimulation("oracle");
}

function startFlow() {
  mode.classList.add("hidden");
  oracle.classList.add("hidden");
  home.classList.add("hidden");
  simulator.classList.remove("hidden");
  state.step = 0;
  renderQuestion();
}

function previousStep() {
  if (state.step === 0) {
    simulator.classList.add("hidden");
    mode.classList.remove("hidden");
    return;
  }
  state.step -= 1;
  renderQuestion();
}

function restartFlow() {
  state.step = 0;
  state.answers = { mode: state.answers.mode || "双模式融合" };
  result.classList.add("hidden");
  mode.classList.remove("hidden");
}

function renderQuestion() {
  const q = questions[state.step];
  const selected = state.answers[q.key] || (q.multi ? [] : "");
  const canContinue = !q.multi || selected.length > 0;
  const current = String(state.step + 1).padStart(2, "0");
  const total = String(questions.length).padStart(2, "0");
  stepCount.textContent = `${current}/${total}`;
  progress.style.width = `${((state.step + 1) / questions.length) * 100}%`;

  panel.classList.toggle("compact", Boolean(q.compact));
  panel.classList.remove("reveal");
  void panel.offsetWidth;
  panel.classList.add("reveal");

  const cards = q.options.map((option, index) => {
    const isSelected = Array.isArray(selected) ? selected.includes(option) : selected === option;
    const desc = q.descriptions?.[index] || getOptionDescription(q.key, option);
    return `
      <button class="option-card ${isSelected ? "selected" : ""}" type="button" data-option="${option}">
        <strong>${option}</strong>
        <span>${desc}</span>
      </button>
    `;
  }).join("");

  panel.innerHTML = `
    <p class="system-kicker">ARCHIVE NODE ${current}</p>
    <h2>${q.title}</h2>
    <p>${q.hint}</p>
    <div class="option-grid">${cards}</div>
    ${q.multi ? `<div class="multi-actions"><button class="primary-action" type="button" data-next ${canContinue ? "" : "disabled"}>继续读取</button></div>` : ""}
  `;

  panel.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => selectOption(q, button.dataset.option));
  });
  panel.querySelector("[data-next]")?.addEventListener("click", () => {
    if (!state.answers[q.key]?.length) {
      showToast("先选至少一个最近最耗你的事情");
      return;
    }
    nextStep();
  });
}

function selectOption(q, option) {
  if (q.multi) {
    const current = new Set(state.answers[q.key] || []);
    current.has(option) ? current.delete(option) : current.add(option);
    state.answers[q.key] = [...current];
    panel.querySelectorAll("[data-option]").forEach((button) => {
      button.classList.toggle("selected", current.has(button.dataset.option));
    });
    const nextButton = panel.querySelector("[data-next]");
    if (nextButton) nextButton.disabled = current.size === 0;
    return;
  }
  state.answers[q.key] = option;
  setTimeout(nextStep, 160);
}

function nextStep() {
  if (state.step < questions.length - 1) {
    state.step += 1;
    renderQuestion();
    return;
  }
  runSimulation();
}

function runSimulation(flow = "simulation") {
  simulator.classList.add("hidden");
  loading.classList.remove("hidden");
  const modeName = state.answers.mode || "双模式融合";
  const castTime = new Date();
  state.answers.castTime = castTime.toISOString();
  const oracleOnly = flow === "oracle" || modeName === "命运模式";
  $("#loading .system-kicker").textContent = oracleOnly ? "TIME HEXAGRAM CASTING" : "SIMULATION RUNNING";
  $("#loading h2").textContent = oracleOnly ? `正在以 ${formatCastTime(castTime)} 起卦` : `雾中沙盘正在显影`;
  setTimeout(() => {
    const data = generateResult(state.answers);
    renderResult(data, { oracleOnly });
    postLiveEvent(`第 ${Math.max(Number(liveStats.total || 100) + 1, 101).toLocaleString("zh-CN")} 位求索者读到「${data.fate.sign}」`);
    loading.classList.add("hidden");
    result.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1400);
}

function generateResult(a) {
  const riskMap = { "稳健型": 34, "平衡型": 56, "冒险型": 78, "随机型": 66 };
  const incomeMap = { "<10w": 28, "10-30w": 46, "30-50w": 62, "50-100w": 76, "100w+": 88 };
  const ageLevel = Number((a.age || "26-30").match(/\d+/)?.[0] || 28);
  const stressBase = ["焦虑但不敢动", "想改变但犹豫", "正在转型"].includes(a.state) ? 76 : 48;
  const growthBase = ["忙但有成长", "正在转型", "想改变但犹豫"].includes(a.state) ? 74 : 52;
  const resourceBoost = ["家人能托底", "现金流比较稳", "有副业/项目收入", "能撑3-6个月"].includes(a.resources) ? 12 : -4;
  const riskType = inferRiskType(a.riskScenario);
  const risk = riskMap[riskType] ?? 56;
  const wealth = clamp((incomeMap[a.income] ?? 48) + resourceBoost, 18, 92);
  const growth = clamp(growthBase + (risk > 70 ? 8 : 0), 24, 92);
  const stability = clamp(92 - risk + (a.family === "已婚有娃" ? 8 : 0), 28, 88);
  const pressure = clamp(stressBase + (a.family === "已婚有娃" ? 10 : 0) - (wealth > 70 ? 8 : 0), 24, 92);
  const playerType = getPlayerType(a, risk, growth, riskType);
  const fate = getFate(a, risk, pressure);
  const city = a.city || "流动中";

  const paths = buildPaths(a, { risk, wealth, growth, stability, pressure });

  const events = pickEvents(a, risk);
  const saveId = `LV${ageLevel} · ${city} · ${playerType}`;
  const narrative = getResultNarrative(a, playerType, fate, pressure);
  const persona = getPlayerPersona(playerType);
  const shareStory = getShareStory(a, playerType, fate, pressure);
  const shareLine = pressure > 70 ? "你不是没有路，只是雾太大，先把火把点亮。" : "人生不是选择题，是一局可以读档的长线游戏。";

  return {
    title: a.mode === "命运模式" ? "此刻卦象已落定" : "你的人生存档已生成",
    subtitle: a.mode === "命运模式" ? `问事 · ${fate.sign} · ${fate.cast.time}` : saveId,
    riskType,
    playerType,
    persona,
    playerCopy: getPlayerCopy(playerType),
    stats: { 财富: wealth, 风险: risk, 成长: growth, 稳定: stability, 压力: pressure },
    fate,
    paths,
    events,
    narrative,
    shareStory,
    shareLine,
    shareText: makeShareText(a, playerType, fate, paths, shareLine, riskType),
  };
}

function renderResult(data, options = {}) {
  latestResult = data;
  const oracleOnly = Boolean(options.oracleOnly || state.answers.mode === "命运模式");
  result.classList.toggle("oracle-result", oracleOnly);
  result.classList.remove("result-casting");
  void result.offsetWidth;
  if (oracleOnly) result.classList.add("result-casting");
  $("[data-result-title]").textContent = data.title;
  $("[data-result-subtitle]").textContent = data.subtitle;
  $("[data-export-card]").textContent = oracleOnly ? "生成卦象分享图" : "生成人生存档图";
  $("[data-copy]").textContent = oracleOnly ? "复制卦象解读" : "复制分享咒语";
  $("[data-restart]").textContent = oracleOnly ? "重新起卦" : "重开沙盘";
  $("[data-player-type]").textContent = data.playerType;
  $("[data-player-copy]").textContent = data.playerCopy;
  const rpgPanel = $(".rpg-panel");
  if (rpgPanel) {
    rpgPanel.className = `rpg-panel reveal ${data.persona.className}`;
    const avatar = rpgPanel.querySelector(".avatar-core span");
    if (avatar) avatar.textContent = data.persona.mark;
  }
  $("[data-fate-sign]").textContent = data.fate.sign;
  $("[data-fate-symbol]").textContent = data.fate.symbol;
  $("[data-fate-cast]").innerHTML = `
    <div><span>起卦时间</span><strong>${data.fate.cast.time}</strong></div>
    <div class="hexagram-lines" aria-label="时间卦象">
      ${data.fate.cast.lines.map((isYang) => `<i class="${isYang ? "yang" : "yin"}"><b></b><b></b></i>`).reverse().join("")}
    </div>
  `;
  $("[data-share-title]").textContent = data.title;
  $("[data-share-sign]").textContent = `「${data.fate.sign} · ${data.fate.tag}」`;
  $("[data-share-line]").textContent = data.shareLine;
  $("[data-share-story]").textContent = data.shareStory;
  $("[data-share-text]").value = data.shareText;
  $("[data-result-narrative]").innerHTML = oracleOnly
    ? renderOracleNarrative(state.answers, data.fate)
    : renderResultNarrative(data.narrative);
  $("[data-share-portrait]").innerHTML = `
    <span>你的画像</span>
    <strong>${data.playerType}</strong>
    <em>${data.riskType} · ${data.fate.sign}</em>
  `;

  $("[data-stats]").innerHTML = Object.entries(data.stats).map(([name, value]) => `
    <div class="stat-row">
      <span>${name}</span>
      <div class="stat-bar"><span style="width:${value}%"></span></div>
      <b>${value}</b>
    </div>
  `).join("");

  $("[data-fate-meaning]").innerHTML = data.fate.meaning.map((row) => `
    <div class="meaning-row"><strong>${row.label}</strong>${row.text}</div>
  `).join("");
  const detail = getFateDetail(state.answers, data.fate, data.playerType);
  $("[data-fate-detail]").innerHTML = `
    <div class="fate-story-block">
      <span>启发小故事</span>
      <p>${detail.story}</p>
    </div>
    <div class="fate-signal-grid">
      ${detail.signals.map((item) => `<div><strong>${item.title}</strong><p>${item.copy}</p></div>`).join("")}
    </div>
    <div class="fate-action"><strong>今日小动作</strong><p>${detail.action}</p></div>
  `;
  const toggle = $("[data-fate-toggle]");
  const detailPanel = $("[data-fate-detail]");
  if (toggle && detailPanel) {
    toggle.textContent = "展开卦象故事";
    toggle.setAttribute("aria-expanded", "false");
    detailPanel.hidden = true;
  }

  $("[data-paths]").innerHTML = data.paths.map((path) => `
    <article class="path-card ${path.tone}">
      <h4>${path.name}</h4>
      <p>${path.summary}</p>
      <div class="path-years">
        ${path.years.map((year) => `<div><span>${year.year}</span><strong>${year.title}</strong><p>${year.copy}</p></div>`).join("")}
      </div>
      <div class="path-insight"><span>${path.income}</span><b>${path.risk}</b></div>
    </article>
  `).join("");

  $("[data-share-paths]").innerHTML = data.paths.map((path) => `
    <div class="share-mini"><span>${path.short}</span><b>${path.income}</b></div>
  `).join("");

  $("[data-events]").innerHTML = data.events.map((event) => `
    <div class="event-pill ${event.tone}">
      <span>${event.probability}%</span>
      <p>${event.text}</p>
      <i style="width:${event.probability}%"></i>
    </div>
  `).join("");
}

function toggleFateDetail(button) {
  const detail = $("[data-fate-detail]");
  if (!detail) return;
  const willOpen = detail.hidden;
  detail.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  button.textContent = willOpen ? "收起卦象故事" : "展开卦象故事";
}

async function initLiveStats() {
  const hasVisited = sessionStorage.getItem("lifeSandboxVisited") === "1";
  if (!hasVisited) sessionStorage.setItem("lifeSandboxVisited", "1");
  await refreshLiveStats();
  setInterval(refreshLiveStats, 12000);
}

async function refreshLiveStats() {
  try {
    const response = await fetch("/api/stats", { cache: "no-store" });
    if (!response.ok) throw new Error("stats unavailable");
    liveStats = await response.json();
  } catch {
    const fallbackTotal = Math.max(Number(localStorage.getItem("lifeSandboxTotal") || 100), 100);
    liveStats = {
      total: fallbackTotal,
      generated: Number(localStorage.getItem("lifeSandboxGenerated") || 0),
      events: [{ text: `已有 ${fallbackTotal.toLocaleString("zh-CN")} 位求索者读到自己的人生沙盘`, ts: Date.now() }],
    };
  }
  renderLiveStats();
}

async function postLiveEvent(label) {
  try {
    const response = await fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label }),
    });
    if (!response.ok) throw new Error("event unavailable");
    liveStats = await response.json();
  } catch {
    liveStats.total = Math.max((liveStats.total || 100) + 1, 100);
    liveStats.generated = (liveStats.generated || 0) + 1;
    liveStats.events = [{ text: label, ts: Date.now() }, ...(liveStats.events || [])].slice(0, 5);
    localStorage.setItem("lifeSandboxTotal", String(liveStats.total));
    localStorage.setItem("lifeSandboxGenerated", String(liveStats.generated));
  }
  renderLiveStats();
}

function renderLiveStats() {
  const total = Math.max(Number(liveStats.total || 100), 100).toLocaleString("zh-CN");
  const latest = liveStats.events?.[0]?.text || `已有 ${total} 位求索者读到自己的人生沙盘`;
  document.querySelectorAll("[data-live-count], [data-live-count-result]").forEach((node) => {
    node.textContent = total;
  });
  $("[data-live-action]").textContent = "位求索者已读到自己的沙盘";
  $("[data-live-feed]").textContent = latest;
}

function getOptionDescription(key, option) {
  const map = {
    age: "读取章节编号",
    city: "定位你的主城",
    industry: "扫描副本天气",
    position: "确认队伍站位",
    income: "校准金币池",
    state: "读取状态栏",
    troubles: "捕捉弹窗念头",
    family: "解析羁绊系统",
    resources: "清点背包补给",
    riskScenario: "推断行动流派",
  };
  return map[key] || option;
}

function inferRiskType(choice = "") {
  if (choice.includes("先不动")) return "稳健型";
  if (choice.includes("小范围")) return "平衡型";
  if (choice.includes("认真冲")) return "冒险型";
  if (choice.includes("感觉")) return "随机型";
  return "平衡型";
}

function getPlayerType(a, risk, growth, riskType) {
  if (risk >= 72) return "风险开拓者";
  if (growth >= 70 && ["正在转型", "想改变但犹豫"].includes(a.state)) return "转型探索者";
  if (risk <= 42) return "稳健执行者";
  if (riskType === "随机型") return "观察型玩家";
  return "平衡型玩家";
}

function getPlayerCopy(type) {
  return {
    "风险开拓者": "你会被高上限吸引，但需要给现金流设置护栏。",
    "转型探索者": "旧身份正在松动，新身份还没完全显形。你适合用小实验替自己点灯。",
    "稳健执行者": "你擅长把日子修成堡垒，但也需要定期打开一扇新窗。",
    "观察型玩家": "你能听见风向变化，适合先收集信号，再选择下一次落子。",
    "平衡型玩家": "你不是不敢赌，而是更适合带着回城卷轴穿过雾区。",
  }[type];
}

function getPlayerPersona(type) {
  return {
    "风险开拓者": { className: "persona-opener", mark: "星", name: "星图开路者" },
    "转型探索者": { className: "persona-key", mark: "钥", name: "门钥持有者" },
    "稳健执行者": { className: "persona-keeper", mark: "灯", name: "守灯人" },
    "观察型玩家": { className: "persona-record", mark: "录", name: "雾中记录者" },
    "平衡型玩家": { className: "persona-balance", mark: "衡", name: "双灯旅人" },
  }[type] || { className: "persona-balance", mark: "衡", name: "双灯旅人" };
}

function buildPaths(a, score) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const industryLens = getIndustryLens(a.industry);
  const stateLens = getStateLens(a.state);
  const resourceLens = getResourceLens(a.resources);
  const stableIncome = score.wealth > 68 ? pickBySeed("stable-rich", a, ["收入像城墙一样慢慢加厚", "金币池稳中抬升", "现金流开始出现余裕"]) : pickBySeed("stable-low", a, ["金币池缓慢修复", "收入小幅爬坡", "先把漏水的桶补上"]);
  const optimizeIncome = score.growth > 68 ? pickBySeed("opt-growth", a, ["有阶梯式抬升机会", "技能变现窗口变亮", "会出现更好的议价点"]) : pickBySeed("opt-calm", a, ["温和抬升，代价可控", "先换节奏，再换价格", "小幅试错更容易成局"]);
  const rebuildIncome = score.risk > 70 ? pickBySeed("rebuild-high", a, ["上限高，波动像潮汐", "可能打开新天花板", "前期乱流大，后期空间大"]) : pickBySeed("rebuild-low", a, ["前期大概率先交学费", "需要先储备半年火把", "回撤明显，但认知会升级"]);

  return [
    {
      tone: "green",
      name: "A线 · 稳定路径",
      short: "稳定线",
      summary: `如果先守住当前章节，你会把「${trouble}」压到后台运行。${industryLens.stable}${stateLens.stable}${resourceLens.stable}`,
      income: stableIncome,
      risk: pickBySeed("stable-risk", a, ["暗线：热情被日常慢慢磨钝", "暗线：习惯会伪装成安全", "暗线：机会可能从旁边经过"]),
      years: [
        { year: "第1年", title: "先稳住基本盘", copy: "收入和生活节奏更可控，适合补现金流、补技能短板。" },
        { year: "第2年", title: "信用继续复利", copy: "人脉、经验和组织信任会变厚，但新鲜感下降。" },
        { year: "第3年", title: "看见稳定的价格", copy: "你会更安全，也更容易意识到哪些愿望被搁置了。" },
      ],
    },
    {
      tone: "blue",
      name: "B线 · 优化路径",
      short: "优化线",
      summary: `如果开启一条可控支线，系统建议先做小型试炼。${industryLens.optimize}${stateLens.optimize}${resourceLens.optimize}`,
      income: optimizeIncome,
      risk: pickBySeed("opt-risk", a, ["通关条件：把技能筹码摆上桌面", "通关条件：给试错设置截止日", "通关条件：先拿到真实反馈"]),
      years: [
        { year: "第1年", title: "开一条低风险支线", copy: "用面试、项目、副业或转岗试水，不急着把桌子掀翻。" },
        { year: "第2年", title: "把反馈变成筹码", copy: "如果市场回应不错，你会拿到更清楚的议价点。" },
        { year: "第3年", title: "形成新站位", copy: "适合从“想改变”走到“有证据地改变”。" },
      ],
    },
    {
      tone: "red",
      name: "C线 · 重构路径",
      short: "重构线",
      summary: `如果选择重构，这不是简单换工作，而像换一套角色职业。${industryLens.rebuild}${stateLens.rebuild}${resourceLens.rebuild}`,
      income: rebuildIncome,
      risk: pickBySeed("rebuild-risk", a, ["雾区等级：高", "代价：安全感会先被扣血", "提醒：先画止损线再进雾"]),
      years: [
        { year: "第1年", title: "进入雾区", copy: "不确定性会先变大，最容易怀疑自己选错了。" },
        { year: "第2年", title: "重建技能和信用", copy: "开始知道新地图的规则，也会为旧经验重新定价。" },
        { year: "第3年", title: "上限打开或止损回城", copy: "它不是最舒服的线，但最可能改写身份叙事。" },
      ],
    },
  ];
}

function getIndustryLens(industry = "") {
  if (industry.includes("互联网") || industry.includes("AI")) return { stable: "技术和产品周期会继续推着你更新技能。", optimize: "最适合用作品、项目或新岗位验证身价。", rebuild: "跨到新赛道前，先确认你的核心能力能不能迁移。" };
  if (industry.includes("金融") || industry.includes("咨询")) return { stable: "资源、人脉和专业信用会继续复利。", optimize: "更适合争取更高质量的项目与客户。", rebuild: "离开原体系会损失背书，但也可能换来独立定价权。" };
  if (industry.includes("消费") || industry.includes("品牌")) return { stable: "市场嗅觉会继续积累，但节奏容易被外部波动牵着走。", optimize: "把表达、渠道和转化能力打包，会出现新筹码。", rebuild: "新局需要你直接面对市场，而不是只完成组织任务。" };
  if (industry.includes("体制") || industry.includes("国企")) return { stable: "稳定护盾厚，但成长窗口更依赖边界外的主动探索。", optimize: "可以先在低风险范围内增加第二技能。", rebuild: "真正的难点不是离开，而是离开后如何重新定价。" };
  return { stable: "你当前地图仍有可用资源，只是需要重新识别它们。", optimize: "先做一个低成本实验，会比空想更快照亮路。", rebuild: "重构会带来身份重写，也会要求你重新建立信用。" };
}

function getStateLens(current = "") {
  if (current.includes("焦虑")) return { stable: "短期会更稳，但心里的警报不会自动静音。", optimize: "先把焦虑拆成一个可执行动作，胜率会上升。", rebuild: "如果只靠情绪冲出去，容易把旧问题带进新地图。" };
  if (current.includes("转型")) return { stable: "旧身份还能供电，但新身份会持续闪烁。", optimize: "这条线最像给新身份搭脚手架。", rebuild: "你已经在门边，差的是资源和节奏的编排。" };
  if (current.includes("躺平")) return { stable: "低功耗能回血，但也会降低你对机会的敏感度。", optimize: "先恢复能量，再恢复野心。", rebuild: "不建议用大动作证明自己，先找回持续行动感。" };
  return { stable: "它能让生活更安静，但未必让问题消失。", optimize: "它像把灯调亮一格，不必立刻掀翻桌面。", rebuild: "它会带来大变化，也会放大每一个准备不足。" };
}

function getResourceLens(resources = "") {
  if (resources.includes("家人") || resources.includes("现金流")) return { stable: "你的安全垫较厚，可以把选择做得更从容。", optimize: "有缓冲就别浪费，适合认真跑一次支线。", rebuild: "托底不是免死牌，但能帮你穿过前期黑夜。" };
  if (resources.includes("几乎")) return { stable: "先修现金流，会比立刻换地图更现实。", optimize: "支线必须轻量，别让试错变成断粮。", rebuild: "除非有确定入口，否则重构成本会非常刺眼。" };
  return { stable: "安全垫不算薄，但还需要精算消耗。", optimize: "适合做三个月以内能验证的试验。", rebuild: "先准备退路，才有资格谈魄力。" };
}

function pickBySeed(label, a, list) {
  return list[Math.abs(hash(`${label}-${JSON.stringify(a)}`)) % list.length];
}

function getResultNarrative(a, playerType, fate, pressure) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来不确定";
  const pressureLine = pressure > 70 ? "先不要把短期焦虑误读成长期命令。" : "你现在适合让直觉和证据一起上桌。";
  return {
    seen: `沙盘先读到「${trouble}」，再读到你停在「${a.state || "当前章节"}」。这说明问题不是简单逃离，而是你需要重新确认哪条路还值得投入。`,
    key: `重点：你更像${playerType}。真正要判断的不是“敢不敢变”，而是“用多大成本换多大可能”。`,
    action: `下一步：把${trouble}拆成一个 7 天内可验证的小动作。${pressureLine}`,
    sign: `签面「${fate.sign}」的提醒：${fate.oracle}`,
  };
}

function renderResultNarrative(narrative) {
  return `
    <span>魔法师批注</span>
    <div class="narrative-points">
      <p><b>看见</b>${narrative.seen}</p>
      <p><b>重点</b>${narrative.key}</p>
      <p><b>可做</b>${narrative.action}</p>
      <p><b>签面</b>${narrative.sign}</p>
    </div>
  `;
}

function renderOracleNarrative(a, fate) {
  const question = a.oracleQuestion || "心中所求";
  const cast = fate.cast;
  const tendency = cast.yangCount >= 4 ? "动象偏强，事情会先动后定" : cast.yangCount <= 2 ? "静象偏重，宜先蓄力再启程" : "动静相持，关键在于分辨哪一步该先落下";
  return `
    <span>时间卦解</span>
    <div class="narrative-points oracle-points">
      <p><b>所问</b>「${question}」</p>
      <p><b>卦面</b>此刻落卦为「${fate.sign}」，${cast.yangCount}阳${6 - cast.yangCount}阴，${tendency}。</p>
      <p><b>暗线</b>${fate.oracle}</p>
      <p><b>启发</b>先不要急着求一个绝对答案。把这件事拆成“现在能看见的信号”和“还没出现的证据”，再决定下一步。</p>
    </div>
  `;
}

function getOracleOnlyNarrative(a, fate) {
  const question = a.oracleQuestion || "心中所求";
  const cast = fate.cast;
  const tendency = cast.yangCount >= 4 ? "动象偏强，事情会先动后定" : cast.yangCount <= 2 ? "静象偏重，宜先蓄力再启程" : "动静相持，关键在于分辨哪一步该先落下";
  return `你问的是：「${question}」。此刻落卦为「${fate.sign}」，${cast.yangCount}阳${6 - cast.yangCount}阴，${tendency}。这不是替你断未来，而是把此刻的气口摊开：先看卦面，再看暗线，再决定要不要点下一盏灯。`;
}

function getFateDetail(a, fate, playerType) {
  const question = a.oracleQuestion || (Array.isArray(a.troubles) && a.troubles[0]) || "眼前这件事";
  const moving = fate.cast.yangCount >= 4;
  const quiet = fate.cast.yangCount <= 2;
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : question;
  const storyOpen = moving
    ? "一个旅人夜里背着行囊赶路，远处已经有灯，但脚下的桥还没完全露出来。"
    : quiet
      ? "一个旅人坐在门口擦亮旧钥匙，外面风很大，可真正要开的门还在屋内。"
      : "一个旅人把地图摊在桌上，一半被烛光照亮，一半还留在阴影里。";
  const story = `${storyOpen}他问的不是“我会不会赢”，而是“我现在该把哪件东西放进背包”。这支「${fate.sign}」落在「${question}」上，提醒你先别急着给人生下结论：${fate.oracle}`;
  return {
    story,
    signals: [
      {
        title: "外部信号",
        copy: moving ? "如果最近出现邀约、面试、合作或新机会，可以先接近观察，不必马上承诺。" : "如果外部迟迟没有明确反馈，先别硬推，信息不足本身也是卦面的一部分。",
      },
      {
        title: "内心信号",
        copy: quiet ? "你现在更需要恢复判断力，而不是用一个大动作证明自己还在前进。" : `真正耗你的可能不是「${trouble}」，而是你一直没有把代价写清楚。`,
      },
      {
        title: "资源信号",
        copy: playerType.includes("开拓") ? "野心可以保留，但现金流、时间和退路要先画出来。" : "先清点手里已有的能力、人脉和缓冲，很多门不是靠冲开，而是靠筹码打开。",
      },
    ],
    action: moving ? "今天只做一件事：向一个真实的人打听这个方向的真实成本。" : quiet ? "今天只做一件事：写下你最怕失去的三样东西，再判断它们是否真的会失去。" : "今天只做一件事：把这个问题拆成“可试一天、可试一周、可试一月”三个版本。",
  };
}

function getShareStory(a, playerType, fate, pressure) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const opening = pressure > 70 ? "夜里，你把一个反复弹出的念头放进沙盘。" : "你把当前章节摊开，像把一张旧地图压在桌面。";
  return `${opening}第一盏灯照到「${trouble}」，第二盏灯照出你是${playerType}。签面落下：「${fate.sign}」，它没有替你选路，只提醒你先看清雾从哪里来。`;
}

function getFate(a, risk, pressure) {
  const salt = JSON.stringify({
    age: a.age,
    city: a.city,
    industry: a.industry,
    state: a.state,
    troubles: a.troubles,
    riskScenario: a.riskScenario,
  });
  const cast = castTimeHexagram(a.castTime, salt);
  const index = cast.seed % fateLibrary.length;
  const base = fateLibrary[index];
  return {
    ...base,
    cast,
    meaning: a.mode === "命运模式" ? [
      { label: "卦面", text: `以当前时间落出 ${cast.yangCount} 阳 ${6 - cast.yangCount} 阴。阳多则动，阴多则蓄；此卦偏「${cast.yangCount >= 4 ? "先动后定" : cast.yangCount <= 2 ? "先蓄后动" : "动静相持"}」。${base.oracle}` },
      { label: "象意", text: pressure > 70 ? "气口急，心火旺。此时最怕把一时的烦躁当作天命。" : "卦气不散，说明你已经看见一部分答案，只是还缺最后一盏灯。" },
      { label: "启示", text: risk > 70 ? "可向前，但先设结界：边界、期限、退路都要写清。" : "宜先观兆，再落小步。让时间替你筛掉一部分雾。" },
    ] : [
      { label: "卦面", text: `以当前时间落出 ${cast.yangCount} 阳 ${6 - cast.yangCount} 阴。阳多则动，阴多则蓄；你的盘面更偏「${cast.yangCount >= 4 ? "先动后定" : cast.yangCount <= 2 ? "先蓄后动" : "动静相持"}」。${base.oracle}` },
      { label: "现实层", text: pressure > 70 ? "当前压力噪音偏高，容易把短期情绪误判成长期趋势。" : "你已经拥有部分信息，但真正关键的变量还没有完全显形。" },
      { label: "行动层", text: risk > 70 ? "可以靠近高塔，但先把止损线画在地上，让野心有边界。" : "先点一盏小灯，观察、试点、换角度，比一次性掀桌更容易看清路。" },
    ],
  };
}

function castTimeHexagram(iso, salt = "") {
  const date = iso ? new Date(iso) : new Date();
  const parts = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds(), salt];
  const seed = Math.abs(hash(parts.join("-")));
  const lines = Array.from({ length: 6 }, (_, index) => ((seed >> index) & 1) === 1);
  return {
    seed,
    time: formatCastTime(date),
    lines,
    yangCount: lines.filter(Boolean).length,
  };
}

function formatCastTime(date) {
  return date.toLocaleString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function pickEvents(a, risk) {
  const pool = [
    { text: "一次关键谈话改变你看路的角度", base: 42, tone: "warm" },
    { text: "当前行业出现一次明显转向", base: 36, tone: "blue" },
    { text: "副业或项目机会在夜里亮起", base: 31, tone: "gold" },
    { text: "家庭或关系议题临时加重", base: 28, tone: "red" },
    { text: "旧技能碰到透明天花板", base: 47, tone: "red" },
    { text: "熟人递来一张新地图入场券", base: 24, tone: "gold" },
    { text: "现金流提醒你暂时放慢脚步", base: 40, tone: "warm" },
    { text: "一个被你低估的能力开始变值钱", base: 34, tone: "blue" },
  ];
  const offset = Math.abs(hash(`${a.state}${a.resources}${risk}`)) % pool.length;
  return [0, 1, 2, 3].map((i) => {
    const item = pool[(offset + i) % pool.length];
    const drift = Math.abs(hash(`${item.text}-${JSON.stringify(a)}-${i}`)) % 23;
    const riskBoost = risk > 70 && ["gold", "red"].includes(item.tone) ? 10 : 0;
    return { ...item, probability: clamp(item.base + drift + riskBoost, 18, 82) };
  });
}

function makeShareText(a, playerType, fate, paths, line, riskType) {
  return `我的人生沙盘说明书生成了：\n\n玩家类型：${playerType}\n行动流派：${riskType}\n时间卦象：「${fate.sign} · ${fate.tag}」\n起卦时间：${fate.cast.time}\n\n三条路径：\n1. ${paths[0].short}：${paths[0].income}\n2. ${paths[1].short}：${paths[1].income}\n3. ${paths[2].short}：${paths[2].income}\n\n当前章节：${a.state || "未知"}\n主线冲突：${Array.isArray(a.troubles) ? a.troubles.join(" / ") : "未来不确定"}\n\n${line}\n#人生沙盘 #人生说明书 #人生存档 #时间起卦`;
}

async function copyShareText() {
  const text = latestResult?.shareText || $("[data-share-text]").value;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const fallback = document.createElement("textarea");
    fallback.value = text;
    fallback.style.position = "fixed";
    fallback.style.left = "-9999px";
    document.body.appendChild(fallback);
    fallback.select();
    document.execCommand("copy");
    fallback.remove();
  }
  showToast("分享咒语已复制");
}

async function exportShareCard() {
  if (!window.qrcode) {
    showToast("二维码组件还没加载好，请稍后再试");
    return;
  }
  const canvas = document.createElement("canvas");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = 900;
  const height = 1200;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const data = latestResult;
  const oracleOnly = state.answers.mode === "命运模式";
  const title = data?.title || $("[data-share-title]").textContent;
  const sign = data ? `「${data.fate.sign} · ${data.fate.tag}」` : $("[data-share-sign]").textContent;
  const line = data?.shareLine || $("[data-share-line]").textContent;
  const player = data?.playerType || $("[data-player-type]").textContent;
  const riskType = data?.riskType || "行动流派";
  const story = data?.shareStory || $("[data-share-story]").textContent;
  const paths = data?.paths || [];

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#090b16");
  gradient.addColorStop(0.48, "#1a1333");
  gradient.addColorStop(1, "#080b12");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 140; i += 1) {
    const x = Math.abs(hash(`star-x-${i}-${sign}`)) % width;
    const y = Math.abs(hash(`star-y-${i}-${player}`)) % height;
    const alpha = 0.14 + (Math.abs(hash(`star-a-${i}`)) % 38) / 100;
    ctx.fillStyle = `rgba(245,197,66,${alpha})`;
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  ctx.save();
  ctx.strokeStyle = "rgba(245,197,66,0.34)";
  ctx.lineWidth = 2;
  roundRect(ctx, 50, 50, 800, 1100, 10);
  ctx.stroke();
  ctx.strokeStyle = "rgba(77,163,255,0.18)";
  roundRect(ctx, 74, 74, 752, 1052, 8);
  ctx.stroke();
  ctx.restore();

  drawMagicCircle(ctx, 450, 278, 174);
  drawMageSilhouette(ctx, 450, 292, 1.12);

  ctx.textAlign = "center";
  ctx.fillStyle = "#f5c542";
  ctx.font = "900 20px sans-serif";
  ctx.fillText("LIFE SANDBOX · ORACLE MANUAL", 450, 118);

  ctx.fillStyle = "#f3f0ff";
  ctx.font = "900 46px sans-serif";
  wrapCanvasText(ctx, oracleOnly ? "此刻卦象分享" : title, 450, 505, 680, 56, 2);

  ctx.fillStyle = "rgba(255,255,255,0.07)";
  roundRect(ctx, 106, 595, 688, 176, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(245,197,66,0.26)";
  ctx.stroke();

  ctx.fillStyle = "#9da3b2";
  ctx.font = "700 18px sans-serif";
  ctx.fillText(oracleOnly ? "所问之事" : "你的画像", 450, 635);

  ctx.fillStyle = "#f5c542";
  ctx.font = oracleOnly ? "900 30px sans-serif" : "900 48px sans-serif";
  wrapCanvasText(ctx, oracleOnly ? (state.answers.oracleQuestion || "心中所求") : player, 450, 690, 560, 42, 2);

  ctx.fillStyle = "#d7d9e3";
  ctx.font = "600 24px sans-serif";
  ctx.fillText(oracleOnly ? `${data.fate.cast.time} · ${sign}` : `${riskType} · ${sign}`, 450, 755);

  ctx.fillStyle = "#f3f0ff";
  ctx.font = "900 24px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(oracleOnly ? "卦象小传" : "沙盘小传", 120, 825);
  ctx.fillStyle = "#d7d9e3";
  ctx.font = "500 24px sans-serif";
  const posterStory = oracleOnly ? getFateDetail(state.answers, data.fate, data.playerType).story : story;
  wrapCanvasText(ctx, posterStory, 120, 865, 660, 36, oracleOnly ? 4 : 3);

  const cardY = 982;
  if (oracleOnly) {
    data.fate.cast.lines.slice().reverse().forEach((isYang, index) => {
      const y = cardY + index * 19;
      ctx.strokeStyle = "rgba(245,197,66,0.76)";
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      if (isYang) {
        ctx.beginPath();
        ctx.moveTo(120, y);
        ctx.lineTo(292, y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(120, y);
        ctx.lineTo(190, y);
        ctx.moveTo(222, y);
        ctx.lineTo(292, y);
        ctx.stroke();
      }
    });
    ctx.fillStyle = "#d7d9e3";
    ctx.font = "700 20px sans-serif";
    wrapCanvasText(ctx, data.fate.oracle, 330, 980, 340, 30, 3);
  } else {
    paths.slice(0, 3).forEach((path, index) => {
    const x = 110 + index * 214;
    ctx.fillStyle = "rgba(255,255,255,0.055)";
    roundRect(ctx, x, cardY, 194, 88, 8);
    ctx.fill();
    ctx.strokeStyle = index === 0 ? "rgba(57,217,138,0.38)" : index === 1 ? "rgba(77,163,255,0.38)" : "rgba(255,77,79,0.34)";
    ctx.stroke();
    ctx.textAlign = "left";
    ctx.fillStyle = "#f5c542";
    ctx.font = "900 18px sans-serif";
    ctx.fillText(path.short, x + 16, cardY + 32);
    ctx.fillStyle = "#d7d9e3";
    ctx.font = "600 17px sans-serif";
    wrapCanvasText(ctx, path.income, x + 16, cardY + 60, 160, 22, 2);
    });
  }

  ctx.fillStyle = "#f3f0ff";
  ctx.font = "800 22px sans-serif";
  ctx.textAlign = "left";
  wrapCanvasText(ctx, line, 110, 1118, 520, 28, 2);

  const pageUrl = location.href.split("#")[0].split("?")[0];
  await drawQr(ctx, pageUrl, 672, 1036, 136);
  ctx.fillStyle = "#9da3b2";
  ctx.font = "600 16px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(oracleOnly ? "扫码进入法阵" : "扫码重开沙盘", 740, 1188);

  const link = document.createElement("a");
  link.download = oracleOnly ? "life-sandbox-oracle.png" : "life-sandbox-manual.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast(oracleOnly ? "卦象分享图已生成" : "分享图已生成");
}

function drawMagicCircle(ctx, cx, cy, radius) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = "rgba(245,197,66,0.5)";
  ctx.lineWidth = 2;
  [radius, radius * 0.78, radius * 0.48].forEach((r) => {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.strokeStyle = "rgba(77,163,255,0.24)";
  for (let i = 0; i < 12; i += 1) {
    const angle = (Math.PI * 2 * i) / 12;
    const inner = radius * 0.52;
    const outer = radius * 0.95;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * inner, Math.sin(angle) * inner);
    ctx.lineTo(Math.cos(angle) * outer, Math.sin(angle) * outer);
    ctx.stroke();
  }
  ctx.rotate(Math.PI / 4);
  ctx.strokeStyle = "rgba(245,197,66,0.38)";
  ctx.strokeRect(-radius * 0.52, -radius * 0.52, radius * 1.04, radius * 1.04);
  ctx.restore();
}

function drawMageSilhouette(ctx, cx, cy, scale = 1) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  const glow = ctx.createRadialGradient(0, -10, 20, 0, -10, 145);
  glow.addColorStop(0, "rgba(245,197,66,0.34)");
  glow.addColorStop(1, "rgba(245,197,66,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, -10, 145, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(8,11,18,0.9)";
  ctx.beginPath();
  ctx.moveTo(0, -132);
  ctx.quadraticCurveTo(-64, -42, -68, 76);
  ctx.quadraticCurveTo(-30, 104, 0, 110);
  ctx.quadraticCurveTo(30, 104, 68, 76);
  ctx.quadraticCurveTo(64, -42, 0, -132);
  ctx.fill();
  ctx.fillStyle = "rgba(245,197,66,0.82)";
  ctx.beginPath();
  ctx.arc(0, -30, 28, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(8,11,18,0.95)";
  ctx.beginPath();
  ctx.arc(0, -24, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function drawQr(ctx, url, x, y, size) {
  const qr = window.qrcode(0, "H");
  qr.addData(url);
  qr.make();
  const moduleCount = qr.getModuleCount();
  const quietZone = 4;
  const totalModules = moduleCount + quietZone * 2;
  const moduleSize = Math.floor(size / totalModules);
  const qrSize = moduleSize * totalModules;
  const offset = Math.floor((size - qrSize) / 2);

  ctx.save();
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, x - 12, y - 12, size + 24, size + 24, 8);
  ctx.fill();
  ctx.fillStyle = "#080b12";
  for (let row = 0; row < moduleCount; row += 1) {
    for (let col = 0; col < moduleCount; col += 1) {
      if (qr.isDark(row, col)) {
        ctx.fillRect(
          x + offset + (col + quietZone) * moduleSize,
          y + offset + (row + quietZone) * moduleSize,
          moduleSize,
          moduleSize,
        );
      }
    }
  }
  ctx.restore();
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  let line = "";
  const chars = [...text];
  let lines = 0;
  for (const char of chars) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      if (lines >= maxLines - 1) {
        ctx.fillText(`${line.slice(0, Math.max(0, line.length - 1))}…`, x, y);
        return y + lineHeight;
      }
      ctx.fillText(line, x, y);
      line = char;
      y += lineHeight;
      lines += 1;
    } else {
      line = test;
    }
  }
  if (line) ctx.fillText(line, x, y);
  return y + lineHeight;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function showToast(text) {
  const toast = $("[data-toast]");
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1600);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function hash(value) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = Math.imul(31, h) + value.charCodeAt(i) | 0;
  return h;
}

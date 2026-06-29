const questions = [
  {
    key: "age",
    title: "你现在大概处在哪个阶段？",
    hint: "选当前阶段就好。不会展示年龄，只用来判断选择成本。",
    options: ["22-25", "26-30", "31-35", "36-40", "41+"],
    descriptions: ["刚开始积累", "机会和压力一起变多", "能力成型，责任也变多", "更需要算清成本", "更看重稳和准"],
  },
  {
    key: "city",
    title: "你现在所在的城市层级是？",
    hint: "不用填城市名，只看机会密度和生活成本。",
    compact: true,
    options: ["一线城市", "新一线城市", "二线城市", "三四线城市", "县城/小城", "海外/流动中"],
    descriptions: ["机会多，成本高", "机会不少，节奏差异大", "稳定和机会都有", "熟人关系更重要", "生活稳，机会入口少", "地点还在变化"],
  },
  {
    key: "industry",
    title: "你的工作更接近哪类？",
    hint: "选最像你日常的一类。只用来判断机会、压力和可迁移能力。",
    compact: true,
    options: ["产品/技术", "金融/咨询", "运营/销售", "制造/工程", "教育/医疗", "内容/设计", "体制/国企", "其他/复合"],
    descriptions: ["产品、研发、数据、AI", "投研、审计、顾问", "品牌、渠道、商务、客服", "供应链、硬件、项目", "老师、医生、公共服务", "设计、写作、自媒体、自由职业", "机关、事业单位、国企", "多种身份混合"],
  },
  {
    key: "position",
    title: "你在队伍里更像什么位置？",
    hint: "用来判断你适合升级、换岗，还是重开方向。",
    options: ["初级", "中级", "高级", "管理", "独立经营"],
    descriptions: ["还在积累经验", "开始负责关键事", "能独立解决问题", "带人，也扛结果", "收入和风险都自己担"],
  },
  {
    key: "income",
    title: "你的存款缓冲大概在哪一档？",
    hint: "只看缓冲，不代表人生分数。",
    options: ["<10w", "10-30w", "30-50w", "50-100w", "100w+"],
    descriptions: ["先保证不断档", "有一点余地", "能认真试一小段", "能给自己买时间", "选择余地更大"],
  },
  {
    key: "state",
    title: "最近你的状态更像哪一种？",
    hint: "选最接近最近一个月的体感。",
    options: ["稳定但没劲", "忙但有收获", "焦虑但没动", "想改变但犹豫", "正在转型", "先恢复精力"],
    descriptions: ["能过，但不太想继续", "累，但还学得到东西", "担心很多，还没行动", "想变，又怕代价", "已经开始调整", "先把状态养回来"],
  },
  {
    key: "troubles",
    title: "最近最让你烦的，是哪几件事？",
    hint: "最多选三项。选中后卡片会变亮并出现勾选。",
    multi: true,
    max: 3,
    compact: true,
    options: ["职业去留", "方向重选", "自己做事", "钱不够稳", "意义感变低", "关系消耗", "未来看不清"],
    descriptions: ["跳槽、离职、要不要留下", "转行、换岗位、换赛道", "副业、创业、独立接单", "收入、房贷、存款压力", "能做事，但没动力", "家人、伴侣、同事让你累", "不知道先处理哪件事"],
  },
  {
    key: "family",
    title: "你的家庭/关系责任现在如何？",
    hint: "这里没有评判，只看责任和支持系统。",
    options: ["单身/无孩", "恋爱中", "已婚", "已婚有娃", "离异/重启中"],
    descriptions: ["机动性更高", "关系正在推进", "共同承担更多", "责任更重，支持也更多", "上一段结束，下一段待开"],
  },
  {
    key: "resources",
    title: "如果你想做改变，手里有哪些缓冲？",
    hint: "选最接近的安全垫。用来判断能不能承受空窗期。",
    compact: true,
    options: ["几乎没缓冲", "能撑1-3个月", "能撑3-6个月", "有副业/项目收入", "家人能托底", "现金流比较稳"],
    descriptions: ["断收入会很紧张", "能扛短期空窗", "能撑一次计划调整", "已有一点额外收入", "必要时有人能帮", "收入和存款较稳"],
  },
  {
    key: "riskScenario",
    title: "遇到一个新机会，你通常会怎么做？",
    hint: "比如高薪 offer、副业机会、转岗邀请。选最像你的反应。",
    options: ["先查清楚", "先确认一下", "设好底线再推进", "看状态再决定"],
    descriptions: ["先问清风险再动", "先面试、兼职或聊合作", "定好存款线和截止日期", "状态好才往前走"],
  },
];

const state = { step: 0, answers: {} };

const oracleLenses = {
  work: {
    label: "工作去留",
    trouble: "职业去留",
    state: "想改变但犹豫",
    question: "该不该换工作",
    issue: "你真正要判断的不是“想不想走”，而是现在这份工作还有没有继续换资源的价值。",
    moving: "可以开始看机会。先投 3 个岗位或约 1 次聊聊，看看外面的薪资、团队和要求是不是比现在更好。",
    quiet: "先不要冲动裸辞。把现在工作的痛点写出来，再补一份简历或作品集，准备好再动。",
    mixed: "先骑驴找马。保住现有收入，同时用面试看清外面的薪资和要求，不要只靠情绪判断。",
    avoid: "不要因为一天很烦就离职，也不要因为害怕变化一直拖。用真实 offer 和现金流说话。",
    story: "这卦像你下班后站在电梯口：一边是熟悉但疲惫的楼层，一边是还没亮灯的新楼。先别急着按辞职键，先看看新楼有没有门牌。",
  },
  direction: {
    label: "方向重选",
    trouble: "方向重选",
    state: "正在转型",
    question: "要不要换方向",
    issue: "你不是没方向，而是担心重来太贵。重点是看新方向有没有岗位、客户或作品入口。",
    moving: "可以推进转向。先做一份能展示的作品、接一个项目，或找 2 个业内人聊入行要求。",
    quiet: "先别急着宣布转行。用 7 天整理技能清单，找出能迁移的经验，再决定从哪一步切入。",
    mixed: "先保留原收入，新方向先试一个月，看你是不是真的愿意持续做。",
    avoid: "不要把“讨厌现在”误认为“适合新方向”。先确认有人愿意看你的作品、聊机会、给合作。",
    story: "这卦像你想换方向前，先约了一个业内人聊真实情况。聊完你会知道：新方向需要什么能力、已有经验能不能接上、值不值得继续试。",
  },
  side: {
    label: "副业创业",
    trouble: "自己做事",
    state: "想改变但犹豫",
    question: "副业能不能做",
    issue: "这件事的关键不是灵感够不够，而是有没有人愿意为它付钱、付时间或付信任。",
    moving: "可以试，但先做一次最小售卖：发一个报价、做一个样品、问 5 个潜在用户。",
    quiet: "先别辞职创业。把产品、客户、价格和交付写成一页纸，再去问 5 个可能买的人。",
    mixed: "先把成本压低。只投入你亏得起的钱和时间，有订单再继续投。",
    avoid: "不要先买设备、租场地、囤货或大额投流。先确认有人要。",
    story: "这卦像夜里亮起的小摊灯。灯可以先点，但别一上来就租整条街。先卖出第一份，再决定要不要开成店。",
  },
  money: {
    label: "收入金钱",
    trouble: "钱不够稳",
    state: "焦虑但不敢动",
    question: "钱什么时候稳一点",
    issue: "你现在最需要的不是一个暴富答案，而是先把现金流、固定支出和可控收入看清楚。",
    moving: "可以主动开口争取钱：谈涨薪、报价、接单、清账，先让一个入口动起来。",
    quiet: "先做账。列出未来 3 个月必须花的钱，再砍掉一个不必要支出或补一个稳定收入来源。",
    mixed: "一边守住固定收入，一边测试一个小增量。不要为了快钱把安全垫打穿。",
    avoid: "不要借钱投资、冲动消费或把全部希望押在一个不确定机会。",
    story: "这卦像一只漏水的钱袋。先别问什么时候装满，先把洞找出来。洞补住了，进来的钱才留得住。",
  },
  romance: {
    label: "婚恋关系",
    trouble: "关系选择",
    state: "想改变但犹豫",
    question: "这段关系要不要继续",
    issue: "这段关系的重点不是谁输谁赢，而是你们还能不能好好沟通、互相尊重、一起解决问题。",
    moving: "适合谈一次清楚的沟通。把你最在意的 1 个问题说出来，也听对方真实回应。",
    quiet: "先别急着分手或承诺。观察对方是否愿意改变行动，而不是只听一句好听的话。",
    mixed: "先给一次明确沟通和观察期。说清边界，约定时间，看行动有没有变化。",
    avoid: "不要用冷战、反复试探或追责解决问题。也不要只因为舍不得就忽略长期消耗。",
    story: "这卦像两个人隔着一盏快灭的灯。不是马上吹灭，也不是假装还亮着。先加一次油，看两个人是不是都愿意伸手。",
  },
  "new-love": {
    label: "新的感情",
    trouble: "新的关系",
    state: "想改变但犹豫",
    question: "适不适合开始新关系",
    issue: "现在要看的不是心动真假，而是这个人靠近你之后，你是否更安定、更清醒、更像自己。",
    moving: "可以靠近一点。先多见一次、多聊一次现实问题，不要太快把期待拉满。",
    quiet: "先慢一点。确认对方状态、边界和诚意，再决定要不要投入。",
    mixed: "适合轻轻推进。保留节奏，不急着定义关系，也不要一直暧昧不落地。",
    avoid: "不要因为孤独就把对方理想化，也不要一开始就查岗、控制或过度付出。",
    story: "这卦像远处递来的一盏灯。可以接近看看光暖不暖，但不要还没看清人，就把整晚交出去。",
  },
  family: {
    label: "家庭沟通",
    trouble: "家庭压力",
    state: "焦虑但不敢动",
    question: "要不要和家人摊牌",
    issue: "你要解决的不是一次吵赢，而是让对方知道你的底线、压力和真实计划。",
    moving: "可以谈，但先准备好三句话：我现在的压力、我希望你怎么支持、我暂时不能接受什么。",
    quiet: "先别在情绪最高时谈。把要说的话写下来，等大家都能听进去时再开口。",
    mixed: "先谈一小段，不要一次说完所有问题。先解决最影响你的一个点。",
    avoid: "不要用指责开场，也不要为了维持表面和平一直吞下去。",
    story: "这卦像一张饭桌，大家都坐着，却没人说真正的话。先别掀桌，先把你最需要被听见的那句话放到桌面上。",
  },
  people: {
    label: "人际消耗",
    trouble: "关系消耗",
    state: "焦虑但不敢动",
    question: "这段人际是不是消耗我",
    issue: "你要看的不是对方好不好，而是这段关系长期让你更有力量，还是一直让你自我怀疑。",
    moving: "可以拉开一点距离。减少一次无效回应，把精力放回自己真正重要的事。",
    quiet: "先观察两周。记录每次互动后你的状态，是轻松、内疚、愤怒，还是被消耗。",
    mixed: "先设一个小边界。少解释一点，少答应一点，看关系会不会因此变轻。",
    avoid: "不要靠讨好换和平，也不要突然爆发后又内疚回头。边界要稳定。",
    story: "这卦像一根看不见的线，一头拴在你手腕上。你不一定要剪断，但至少要知道是谁一直在拉。",
  },
  study: {
    label: "学习成长",
    trouble: "能力升级",
    state: "忙但有成长",
    question: "要不要继续学习投入",
    issue: "学习值不值，关键看它能不能改变你的机会、收入、作品或选择权。",
    moving: "可以投入，但先选一个能产出结果的学习目标：证书、作品、面试题或项目。",
    quiet: "先别报太贵的课。用免费资料试学 7 天，确认自己能坚持再付费。",
    mixed: "先小额投入。每周固定 3 次，能产出东西再继续学。",
    avoid: "不要用买课代替行动，也不要把学习变成逃避现实选择的理由。",
    story: "这卦像书页里夹着一把钥匙。钥匙有用，但只有插进现实的门里，才知道它能不能开锁。",
  },
  city: {
    label: "城市迁移",
    trouble: "城市选择",
    state: "想改变但犹豫",
    question: "要不要换城市",
    issue: "换城市不是换心情，重点是新城市能不能给你更好的工作、关系、成本或生活节奏。",
    moving: "可以开始探路。先投递新城市岗位、算租房成本、找当地朋友问真实生活。",
    quiet: "先别为了逃离而搬。把工作、住处、现金流和支持系统先算清楚。",
    mixed: "先短住或远程体验。用一次实地停留看清真实生活，而不是靠想象决定。",
    avoid: "不要只看城市滤镜，也不要忽略搬迁成本和孤独成本。",
    story: "这卦像一张车票放在桌上。车可以坐，但先看目的地有没有落脚点，不要只因为原地太闷就上车。",
  },
  general: {
    label: "眼前这件事",
    trouble: "未来看不清",
    state: "想改变但犹豫",
    question: "眼前这件事该怎么办",
    issue: "你现在需要先把问题变小：它到底是钱的问题、人的问题、方向的问题，还是时间点的问题。",
    moving: "可以先做一件具体的事：问清一个条件、发出一条消息，或完成一次沟通。",
    quiet: "先整理信息和底线。别在信息最少、情绪最满的时候拍板。",
    mixed: "先完成一个能验证方向的步骤，不要马上做不可逆决定。",
    avoid: "不要把所有焦虑揉成一个大问题。拆小以后才有答案。",
    story: "这卦像一团线放在掌心。别急着剪，先找到线头。线头找到了，后面才解得开。",
  },
};

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
let referenceInsights = null;

const fateLibrary = [
  {
    sign: "风起未定",
    tag: "巽风之象",
    symbol: "△",
    oracle: "风先到，路还没有完全显形。适合听信号，不适合急着拍板。",
    story: "山谷里先起了一阵风，草叶倒向同一边，但远处的路牌还没露出来。守夜人没有立刻启程，他把灯举高，等第二阵风吹过：如果两次风向一致，才说明这不是错觉。",
    reading: "这卦像一个早到的消息：你已经感觉到变化，但信息还不够。现在最有价值的不是勇敢宣布决定，而是连续观察几个信号是否指向同一处。",
    action: "接下来三天，只记录真实信号：谁邀请你、哪个机会反复出现、哪件事让你身体先紧起来。不要只听脑内辩论。",
    warning: "忌把一时兴奋当成答案，也忌因为还没看清就假装什么都没发生。",
  },
  {
    sign: "山行有阻",
    tag: "艮山之象",
    symbol: "◇",
    oracle: "山挡在前面，不是让你退回去，而是让你确认装备够不够。",
    story: "一行人走到山腰，雾忽然压下来，前路只剩半截石阶。急的人想硬闯，老向导却先蹲下检查鞋底和水囊。他知道，山不是在拒绝人，山只是在筛掉没准备好的人。",
    reading: "这卦不是坏兆头，它更像一道门槛。你遇到的阻力未必说明方向错了，可能是在提醒：资源、技能、体力或退路还差一块。",
    action: "先补一件装备：钱、作品、证明、联系人或睡眠。补齐之后再看这座山是不是还那么高。",
    warning: "忌用蛮力证明自己，也忌把所有阻碍都解释成命不好。",
  },
  {
    sign: "三岔之局",
    tag: "择路之象",
    symbol: "✦",
    oracle: "你站在岔口太久了，真正耗你的不是路少，而是每条路都有代价。",
    story: "夜市散去后，路口剩下三盏灯：一盏通向熟悉的城，一盏通向有声音的新门，一盏通向没人保证的荒地。占卦的人发现，自己不是不知道路，而是不愿承认每盏灯都会拿走一样东西。",
    reading: "这卦点破的是选择成本。你需要的不是更多选项，而是承认哪一种代价你更愿意付：慢一点、累一点，还是不确定一点。",
    action: "把三个选项各写一句最真实的代价。能接受代价的那条路，才有资格进入下一轮。",
    warning: "忌继续收集选项来拖延，也忌因为怕后悔就把决定交给别人。",
  },
  {
    sign: "灯下见门",
    tag: "震雷之象",
    symbol: "◎",
    oracle: "门已经出现，先用一次具体回应判断它能不能打开。",
    story: "书房里有一面墙，白天看只是墙。夜里烛火偏了一寸，墙缝里露出铜色门环。它没有给承诺，只是提醒你：可以先伸手试一下。",
    reading: "这卦主显现。你可能已经拥有入口，只是把它当成普通线索忽略了。一次聊天、一次投递、一个作品，都可能是门环。",
    action: "先推一扇小门：发出一条消息、投一次简历、约一次沟通，目标不是成功，是确认有没有回应。",
    warning: "忌等到万事俱备才行动；门会先开一条缝，不会先给你完整地图。",
  },
  {
    sign: "水面藏桥",
    tag: "坎水之象",
    symbol: "◌",
    oracle: "现在不是没路，是信息太乱。先把问题写具体，路会清楚很多。",
    story: "一个人站在渡口，以为只能等船。旁边的老人让他先把水面照亮，才看见水下有一排石墩。很多时候不是没有办法，是问题还没被照清楚。",
    reading: "这卦说的是隐藏条件。你以为自己没有选择，可能是因为钱、时间、关系和外部机会还混在一起。先分开看，答案会更具体。",
    action: "先把问题写成一句能查清的话：要问谁、查什么、下一步能做什么。",
    warning: "忌在恐慌里做决定。水浑的时候，最贵的动作就是猛跳。",
  },
  {
    sign: "地势回声",
    tag: "坤地之象",
    symbol: "□",
    oracle: "你需要的不是更猛，而是把地基垫厚，让下一步站得住。",
    story: "一个人想在雨季盖塔，木料、图纸、旗帜都准备好了，唯独地基还湿。泥土没有说“不许”，它只是每踩一步都回一声闷响：先压实我，再谈高度。",
    reading: "这卦重地基。眼下不适合靠激情冲高，更适合把现金流、节奏、身体、基本能力补稳。慢不是退，是让未来不塌。",
    action: "先完成一个基础修复：整理账本、固定作息、补核心技能、清理一个长期拖着的责任。",
    warning: "忌嫌基础动作不够酷。很多转机不是从高光开始，是从不再漏水开始。",
  },
  {
    sign: "火照前因",
    tag: "离火之象",
    symbol: "✧",
    oracle: "同一个问题被照亮了。你不是第一次遇见它，只是这次看得更清楚。",
    story: "火光落在一卷纸上，纸边已经发黄。占卦的人才看见，自己以为的新困境，三年前就写过一遍，只是那时用的是别的名字。火不是烧毁它，火是让字迹显形。",
    reading: "这卦主复现。现在困扰你的事，可能不是偶发，而是一种反复出现的模式：讨好、拖延、害怕失去、或总在临门一脚撤退。",
    action: "回看过去三次相似情境：你每次在哪里退缩，在哪里硬撑，在哪里没有说真话。答案藏在重复里。",
    warning: "忌只怪外部环境。同一个问题重现，是因为有一段内在脚本还没改写。",
  },
  {
    sign: "雷在远处",
    tag: "震动之象",
    symbol: "☉",
    oracle: "变化还没落地，但声音已经传来。准备比冲刺更重要。",
    story: "远山后滚来第一声雷，城里的人还在晾衣服。懂天气的人不会马上逃跑，也不会继续装作晴天，他先收衣、关窗、备灯。雷声给的不是恐吓，是提前量。",
    reading: "这卦主预兆。变化未必马上发生，但行业、关系、收入或内心已经有声音。你现在要做的是预备，不是表演镇定。",
    action: "列一张预备清单：如果三个月内真的变化，你最先需要哪三样东西？先准备第一样。",
    warning: "忌等雷劈到门口才相信天气变了。也忌听见雷声就把房子拆掉。",
  },
  {
    sign: "泽边新盟",
    tag: "兑泽之象",
    symbol: "◈",
    oracle: "有人的一句话、一个邀请，可能成为你下一段路的开端。",
    story: "泽边有两个人交换火种，一个人以为自己只是借了火，后来才发现那晚的谈话改了路线。真正的机会不总是像公告，它有时像一句随口的“要不要一起试试”。",
    reading: "这卦重人和。你当前的突破口可能不在独自苦想，而在新的连接、已有关系的新用法，或一次高质量对话。",
    action: "找一个能说实话的人，不求安慰，只问：如果是你，会先做哪一步？",
    warning: "忌只找认同你的人。真正有用的盟友，会温和但准确地指出盲点。",
  },
  {
    sign: "天光压顶",
    tag: "乾天之象",
    symbol: "✶",
    oracle: "你有机会往上走，但别把自己逼到喘不过气。",
    story: "高塔顶端有光，年轻的法师一路往上跑，跑到胸口发紧才发现：光不是奖杯，是考题。越接近高处，越要知道自己为什么上去，否则塔会把人变成影子。",
    reading: "这卦主上限与压力同来。你可能正在被更大的舞台吸引，但也容易把价值感全部押在结果上。野心可以有，呼吸也要有。",
    action: "给野心写边界：你愿意为它投入什么，不愿意牺牲什么。没有边界的上升，会变成消耗。",
    warning: "忌用更高目标惩罚现在的自己。上限不是绞索，是方向。",
  },
  {
    sign: "夜航留灯",
    tag: "守灯之象",
    symbol: "◍",
    oracle: "看不清不代表走错。先保住精力和判断力。",
    story: "雾夜里，灯塔的光并不能照完整片海，只能一圈一圈扫过去。船长没有因此骂灯太小，他知道，只要光还在，船就不会把恐惧误认成方向。",
    reading: "这卦很温柔，也很清醒。你现在也许看不远，但不代表走错。先保住让你还愿意继续的东西，判断力会慢慢回来。",
    action: "别急着定终局。先做一件能恢复能量的小事，再处理一个能减少混乱的小决定。",
    warning: "忌在低能量时给人生下重判。雾天不适合审判自己，适合守灯。",
  },
  {
    sign: "星落背包",
    tag: "蓄资之象",
    symbol: "✹",
    oracle: "先清点手里的资源。真正能让你转身的，是已经能用上的东西。",
    story: "流星落进旅人的背包，他以为会看到一句预言，打开一看，却是一枚很实用的指南针。很多时候答案不在远处，先看自己手里已经有什么。",
    reading: "这卦主资源盘点。与其问能不能赢，不如先问：我现在有什么钱、技能、人脉、时间、退路？答案不在天上，在背包里。",
    action: "先列出五样资源：可用存款、可迁移技能、能请教的人、可展示作品、最坏情况下的退路。",
    warning: "忌空手谈重启。真正的转身不是热血，是资源摆清楚之后的从容。",
  },
];

const hexagramLibrary = `
乾为天|乾|天行刚健|天上有天，光从高处压下来。它问的不是你敢不敢，而是你有没有足够清醒地驾驭上升。|适合主动推进、争取资源、承担更大责任；先把目标写成可执行的三步。|忌只凭一口气硬冲，越是上升期越要留出休息和复盘。
坤为地|坤|厚土承载|大地不催人，它只要求根扎稳。事情要成，先看承载力够不够。|先补地基：现金流、身体、基本功、稳定关系；让下一步站得住。|忌嫌慢，地基没干就盖高楼，后面每一步都会晃。
水雷屯|屯|草木初生|雷在水下，芽在土中，开局混乱不是坏事，是新局正在挤出来。|把大事拆小，从第一个真实结果开始；先活下来，再谈漂亮。|忌一开始就要求顺利，初生之局最怕急着证明自己。
山水蒙|蒙|初学问路|山下有水，方向还不清。你不是没答案，是还缺一位老师或一组事实。|去问懂行的人，补最关键的一课；把不知道的地方诚实列出来。|忌装懂，也忌把迷茫包装成注定如此。
水天需|需|云上等雨|云在天上，雨还没落。等待不是停滞，是给条件成熟留位置。|先备粮、备信息、备选项；等窗口出现时能马上行动。|忌在焦虑里提前消耗，也忌什么都不准备地等。
天水讼|讼|言语成刃|天与水相背，局里有争执、误会或利益边界。先分清问题再开口。|把诉求写清楚，用事实而不是情绪沟通；必要时请第三方校准。|忌争输赢忘了目标，也忌忍到最后一次爆发。
地水师|师|众人列阵|地下有水，队伍在暗处集结。此局重组织、纪律和可依靠的人。|找盟友，定规则，分任务；不要一个人扛完整场仗。|忌没有章法地动员，也忌把所有人都当成救命绳。
水地比|比|近水结盟|水贴着地流，靠近能滋养，也会暴露边界。关系是资源也是考题。|选择可靠的人同行，明确彼此能给什么、不能给什么。|忌为了被接纳而失去判断，也忌独自硬撑。
风天小畜|小畜|风收云气|风在天上聚云，还没到大雨。小积累正在形成，但火候未足。|先攒作品、案例、存款或信息；让积累连续出现。|忌刚有苗头就全押，云还没厚到能下雨。
天泽履|履|踏薄冰|天在上，泽在下，脚下很亮也很滑。礼数、边界、顺序比勇气更重要。|按规则先走一步；关键沟通留痕。|忌踩线、越级、赌对方会懂你的潜台词。
地天泰|泰|天地相交|天地交泰，上下通气。事情有顺流感，适合把积累推出去。|抓住顺势窗口，主动发起合作、面试、发布或谈判。|忌舒服到忘记升级，顺风也要掌舵。
天地否|否|门窗闭合|天地不交，话到不了、人也不动。堵住的局要先找通气口。|先换沟通对象或信息渠道；别在同一扇不开的门前耗尽自己。|忌把暂时不通解释成自己不行。
天火同人|同人|火下聚众|火在天光下，人因共同目标聚到一起。此局利同行、社群、共同创作。|把你的目标说出来，找到同频的人共做一件小事。|忌为了合群稀释自己的核心判断。
火天大有|大有|光照仓廪|火在天上，仓库被照亮。你手里其实有可用资源，只是还没整理成牌。|盘点资源，把作品、经历、关系重新包装成可交换价值。|忌只盯缺的，忽略已经在手里的。
地山谦|谦|山藏地下|高山藏在地里，实力不必喧哗。低姿态能换到更长的路。|用请教、协作、复盘打开局面；把锋芒用在作品里。|忌自我贬低，谦不是缩小自己。
雷地豫|豫|雷出地上|雷声出地，心先动起来。兴奋有用，但需要节奏承接。|趁有能量先启动小项目，别把热情全花在宣布上。|忌只追即时爽感，三天热度不是长期动力。
泽雷随|随|泽中听雷|雷在泽下，外界信号会牵动你。跟随可以，但要知道跟谁、为何。|观察趋势，选择一个值得跟进的样本或导师。|忌盲目追热点，别人的路不是你的命盘。
山风蛊|蛊|器中生虫|山下有风，原系统里有虫。不是换个外壳就能好，要清理根部。|修积压问题、惯性、关系模式；先处理腐坏处。|忌只做表面改版，真正的问题会换个名字回来。
地泽临|临|岸边将近|地临泽上，机会靠近了。你需要靠前一点，而不是远远观望。|主动靠近机会，发消息、约面谈、试一次真实合作。|忌明明门开了还继续等待完美时机。
风地观|观|登台观象|风行地上，适合站高一点看全局。先观察格局，再决定站位。|做一次行业/关系/现金流全景图，找出真正牵动全局的点。|忌只盯眼前一件烦心事。
火雷噬嗑|噬嗑|咬开硬结|火与雷同来，局里有硬结，必须咬开才会通。|处理一个拖很久的冲突或决定，明确规则和代价。|忌绕开核心问题，越绕越耗。
山火贲|贲|山中有光|山里有火，外观开始重要。表达、包装、作品呈现会改变别人看你的方式。|整理简历、作品集、主页或提案，让价值被看见。|忌只做漂亮表面，光下面仍要有山。
山地剥|剥|墙皮剥落|山附地上，保护层正在脱落。失去一些东西，反而露出真实结构。|减少消耗，保核心资产；该断舍离的先断。|忌在剥落期还拼命维持体面。
地雷复|复|一阳来复|雷藏地下，微小的生机回来了。它不大，但是真的。|抓住一个能恢复行动感的小习惯或小机会。|忌嫌起点太小，复苏本来就从一线开始。
天雷无妄|无妄|不妄自求|天上有雷，意外会来，但不是所有意外都该追。守正比投机重要。|回到事实和初心，按正道做该做的事。|忌把偶然当答案，也忌用幻想替代准备。
山天大畜|大畜|山中蓄力|山蓄天光，大能量被收住。不是不能动，是先蓄够。|沉淀硬技能、资金、作品或资历；准备一次更大的跃迁。|忌急着释放，蓄力不足会让好机会变成消耗。
山雷颐|颐|养口养心|山下有雷，先养自己，才有力气处理外界。输入质量决定输出质量。|调整作息、信息源和学习内容；少看消耗你的内容，多补真正有用的信息。|忌用垃圾信息喂养焦虑。
泽风大过|大过|梁木将弯|泽灭木，梁承重过大。你扛得太多，结构已经变形。|减负、求助、重排优先级；先救承重梁。|忌继续硬扛来证明价值。
坎为水|坎|重水险行|水上加水，险处有险。不是不能过，而是要一格一格踩稳。|先识别风险源，做预案和止损线；小步过水。|忌在恐惧中猛跳，也忌假装水不深。
离为火|离|双火照明|火上加火，事情被照得很亮。适合看清，也容易灼伤。|把事实摆出来，做清晰表达；让模糊处显形。|忌过度曝光或情绪上头。
泽山咸|咸|心有所感|泽在山上，感应先于决定。有人、某件事或某条路正在触动你。|承认触动，再用事实校验；别压掉第一反应。|忌只凭心动做终局决定。
雷风恒|恒|风雷长行|雷风相随，贵在持续。真正改变来自稳定重复，而不是戏剧性一跳。|建立一套能坚持四周的小系统。|忌三天换方向，恒心不是麻木，是有节奏。
天山遁|遁|高处退身|天在山上，退不是输，是保全判断力。此局宜暂避锋芒。|先离开消耗场，保留资源和体面，再谋下一步。|忌把撤退当失败，也忌逃避该面对的账。
雷天大壮|大壮|雷行天上|力量很足，声势也大。适合推进，但要有度。|把能量用在关键突破口，不要四处开战。|忌有力就乱撞，壮大最怕失控。
火地晋|晋|日出地上|太阳升起，能见度提升。适合展示、晋级、争取更高位置。|把成果拿出来，主动争取评价、晋升或曝光。|忌躲在幕后等别人自动看见。
地火明夷|明夷|光入地下|光被压在地里，外部环境不一定友善。先护住内在火种。|低调保存实力，减少正面冲突，等环境转向。|忌在不合适的场域证明自己。
风火家人|家人|火在风中|家与团队是系统，不只是情绪。边界清楚，关系才有温度。|重新约定分工、期待和边界。|忌用沉默让别人猜你的需要。
火泽睽|睽|火泽相背|火向上，泽向下，双方看法不合。分歧不是灾，是提醒你换角度。|先确认目标是否一致，再谈方法；允许不同立场存在。|忌为了统一而压扁真实差异。
水山蹇|蹇|雪路难行|水在山上，路难走。此局不宜硬冲，宜借力和绕行。|找辅助路线：请教、合作、延后、减负。|忌把艰难误认为自己无能。
雷水解|解|雷雨初散|雷动水上，结开始松。解决不是一刀切，是一点点解绑。|处理最容易解开的那个结，先让系统恢复流动。|忌把所有问题捆成一个巨兽。
山泽损|损|有所减损|山下有泽，少一点反而清楚。减法会带来空间。|砍掉一个消耗项，把精力让给真正重要的事。|忌什么都想保留，背包太满就走不远。
风雷益|益|风雷相助|风雷互助，增益来自行动和流动。越动越有资源。|主动输出、连接、交换，让资源在流动中变多。|忌闭门等好运，益卦怕停。
泽天夬|夬|决口将开|泽上于天，水快溢出。该决断的事不能再拖。|说清决定，划出边界，给事情一个明确出口。|忌继续模糊，模糊会变成更大的决裂。
天风姤|姤|偶遇来风|天下有风，偶遇带来变量。机会突然出现，但要辨别质量。|接触新机会，但先验真伪、看代价。|忌被新鲜感牵走全部判断。
泽地萃|萃|人群聚集|泽在地上，人和资源聚到一起。此局利集结、活动、社群。|去到人群里，让别人知道你在做什么。|忌只围观不表达，资源不会自动认出你。
地风升|升|木从地起|风木自地下升。上升是渐进的，不靠一夜翻盘。|选一条可持续上升曲线，坚持打磨和递进。|忌看不起慢增长，很多高处是一步步长出来的。
泽水困|困|泽中无水|泽里缺水，外表还在，内里已耗。先承认困，再找出口。|减少承诺，补能量，找能给你水的人和事。|忌在枯竭时继续扮演丰盛。
水风井|井|古井有泉|水在木上，井还在，只是需要修。已有资源可再用。|回到长期资产：专业、人脉、作品、信用，重新打井。|忌嫌已有资源普通，井水靠维护不是靠惊艳。
泽火革|革|火炼外壳|泽中有火，外壳要换。变革会痛，但也会让形态更新。|选一个必须改的制度、身份或习惯，设定过渡期。|忌只喊改变，不设计承接结构。
火风鼎|鼎|新器成形|火在风上，鼎成。适合把散乱材料炼成新作品、新身份。|整理方法论，做一个可展示的成果。|忌一直准备食材，却不真正开火。
震为雷|震|雷声惊醒|雷上雷下，惊动很强。先稳住，再行动。|把突发消息转成清单：事实、影响、下一步。|忌被第一声雷吓到乱跑。
艮为山|艮|止于其所|山上有山，止是智慧。该停的地方要停。|暂停无效消耗，守住边界，给判断力回血。|忌把停止误会成失败，止住才能看清。
风山渐|渐|雁行渐进|风过山，雁一程一程飞。此局宜循序渐进。|给目标排阶段，不求一步到位。|忌拿别人的速度惩罚自己的节奏。
雷泽归妹|归妹|仓促成约|雷动泽上，关系或合作来得快。心动之外要看结构。|看清角色、资源、责任，再决定是否进入。|忌因气氛热烈就答应长期绑定。
雷火丰|丰|雷火盛大|雷火同明，局面很盛，信息也很满。适合收获，也要防过载。|抓关键成果，不要同时接太多舞台。|忌高峰期贪多，丰盛也会压垮人。
火山旅|旅|旅人借宿|火在山上，人在途中。此局重临时性、适应力和边界。|把自己当旅人：轻装、观察、借力，不急着定居。|忌在临时局里投入永久成本。
巽为风|巽|风入缝隙|风上风下，柔而能入。持续渗透比硬碰更有效。|用沟通、作品、长期出现一点点打开局。|忌太急着要结果，风靠持续不靠蛮力。
兑为泽|兑|泽上有悦|泽上泽下，喜悦和表达能开局。轻松不是浅，真实的愉悦有方向。|找回让你愿意表达的事情，用对话打开机会。|忌用讨好换愉快，真正的悦不该透支自己。
风水涣|涣|风散水面|风行水上，散开卡住的结。适合破冰、换气、重新流动。|先把卡住的事说开或拆开，让系统恢复流动。|忌继续憋着，水面不动会发闷。
水泽节|节|水有堤岸|水在泽上，节制带来自由。边界不是限制，是让水不泛滥。|设预算、时间盒、沟通边界和截止日期。|忌把自由理解成无限消耗。
风泽中孚|中孚|风过泽心|风在泽上，诚意能抵达人心。此局重信任和真实表达。|说真话，给清楚信息，建立可信关系。|忌包装过度，别人会先感到不真。
雷山小过|小过|小鸟过山|雷在山上，小事可以过，大事宜慎。先拿一个小结果，不求大翻盘。|从一条消息、一次沟通、一个作品开始。|忌小题大做，也忌大事草率。
水火既济|既济|水火已交|水火相济，阶段性完成。完成之后更要维护。|复盘成果，修补漏洞，别马上开新战场。|忌以为完成就永远安全，已济之后仍会变。
火水未济|未济|火水未交|火在水上，最后一段还没合上。未完成不是失败，是提醒你补最后一环。|找出离完成最近的缺口，补上一个关键动作。|忌临门一脚分心，最末段最考验稳定。
`.trim().split("\n").map((line, index) => {
  const [sign, tag, image, oracle, action, warning] = line.split("|");
  return { sign, tag, image, oracle, action, warning, symbol: ["☰", "☷", "☵", "☲", "☳", "☶", "☴", "☱"][index % 8] };
});

window.addEventListener("DOMContentLoaded", () => {
  loadReferenceInsights();
  initLiveStats();
  setTimeout(() => {
    opening.classList.add("opening-done");
    opening.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      opening.style.display = "none";
    }, 950);
  }, 6200);
});

async function loadReferenceInsights() {
  try {
    const response = await fetch("./data/reference-insights.json", { cache: "no-store" });
    if (!response.ok) throw new Error("reference unavailable");
    referenceInsights = await response.json();
  } catch {
    referenceInsights = null;
  }
}

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
}

function chooseOraclePreset(button) {
  document.querySelectorAll("[data-oracle-preset]").forEach((node) => node.classList.remove("selected"));
  button.classList.add("selected");
  oracle.dataset.selectedKind = button.dataset.oracleKind || "general";
  oracle.dataset.selectedQuestion = button.dataset.oraclePreset || button.dataset.oracleTitle || "";
  const input = $("[data-oracle-question]");
  if (input && !input.value.trim()) {
    input.placeholder = `可选：补一句背景。例如：${button.dataset.oracleTitle || "这件事"}为什么让你犹豫？`;
  }
}

function castOracleOnly() {
  const note = ($("[data-oracle-question]").value || "").trim();
  const selectedQuestion = oracle.dataset.selectedQuestion || "";
  const question = selectedQuestion || note;
  const kind = oracle.dataset.selectedKind || inferOracleKind(question);
  const lens = oracleLenses[kind] || oracleLenses.general;
  if (!question) {
    showToast("先选一张问题牌，或补一句你想问的事");
    return;
  }
  state.answers = {
    mode: "命运模式",
    oracleQuestion: question,
    oracleKind: kind,
    oracleLabel: lens.label,
    oraclePreset: selectedQuestion || lens.question,
    oracleNote: note,
    troubles: [lens.trouble],
    state: lens.state,
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

function inferOracleKind(text) {
  const value = (text || "").toLowerCase();
  const checks = [
    ["romance", ["恋", "爱", "感情", "分手", "复合", "结婚", "婚", "对象", "男友", "女友", "伴侣", "暧昧"]],
    ["work", ["工作", "跳槽", "offer", "领导", "同事", "公司", "离职", "岗位", "职场"]],
    ["direction", ["转行", "方向", "赛道", "行业", "迷茫", "重选", "读研"]],
    ["side", ["副业", "创业", "项目", "客户", "接单", "开店", "自己做"]],
    ["money", ["钱", "收入", "工资", "涨薪", "存款", "现金", "房贷", "负债", "投资"]],
    ["family", ["父母", "家人", "家庭", "孩子", "婆", "妈", "爸", "亲戚"]],
    ["people", ["朋友", "人际", "合作", "关系", "消耗", "客户"]],
    ["study", ["学习", "考证", "考试", "进修", "课程", "技能", "证书"]],
    ["city", ["城市", "搬家", "迁移", "离开", "去外地", "回老家"]],
  ];
  const hit = checks.find(([, words]) => words.some((word) => value.includes(word)));
  return hit ? hit[0] : "general";
}

function getOracleLens(a) {
  return oracleLenses[a.oracleKind] || oracleLenses[inferOracleKind(a.oracleQuestion)] || oracleLenses.general;
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
  const selectedCount = Array.isArray(selected) ? selected.length : selected ? 1 : 0;
  const maxText = q.max ? ` / 最多 ${q.max} 项` : "";
  const current = String(state.step + 1).padStart(2, "0");
  const total = String(questions.length).padStart(2, "0");
  stepCount.textContent = `${current}/${total}`;
  progress.style.width = `${((state.step + 1) / questions.length) * 100}%`;

  panel.classList.toggle("compact", Boolean(q.compact));
  panel.className = `question-panel reveal question-key-${q.key}${q.compact ? " compact" : ""}${q.multi ? " multi-question" : ""}`;
  panel.classList.remove("reveal");
  void panel.offsetWidth;
  panel.classList.add("reveal");

  const cards = q.options.map((option, index) => {
    const isSelected = Array.isArray(selected) ? selected.includes(option) : selected === option;
    const desc = q.descriptions?.[index] || getOptionDescription(q.key, option);
    return `
      <button class="option-card ${isSelected ? "selected" : ""}" type="button" data-option="${escapeAttr(option)}" aria-pressed="${isSelected ? "true" : "false"}">
        <i class="option-check" aria-hidden="true"></i>
        <small class="selected-label">已选</small>
        <strong>${escapeHtml(option)}</strong>
        <span>${escapeHtml(desc)}</span>
      </button>
    `;
  }).join("");

  panel.innerHTML = `
    <p class="system-kicker">ARCHIVE NODE ${current}</p>
    <h2>${escapeHtml(q.title)}</h2>
    <p>${escapeHtml(q.hint)}</p>
    <div class="option-grid option-count-${q.options.length}">${cards}</div>
    ${q.multi ? `<div class="selected-summary" data-selected-summary>${selectedCount ? `<b>已选</b>${selected.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}` : "<em>点上面的卡片选择</em>"}</div><div class="multi-actions"><span class="multi-status" data-multi-status>${selectedCount ? `已选 ${selectedCount} 项${maxText}` : `至少选 1 项${maxText}`}</span><button class="primary-action" type="button" data-next ${canContinue ? "" : "disabled"}>继续读取</button></div>` : ""}
  `;

  panel.querySelectorAll("[data-option]").forEach((button) => {
    button.addEventListener("click", () => selectOption(q, button.dataset.option));
  });
  panel.querySelector("[data-next]")?.addEventListener("click", () => {
    if (!state.answers[q.key]?.length) {
      showToast("先选至少一个最近最烦你的事");
      return;
    }
    nextStep();
  });
}

function selectOption(q, option) {
  if (q.multi) {
    const current = new Set(state.answers[q.key] || []);
    const max = q.max || Infinity;
    if (current.has(option)) {
      current.delete(option);
    } else if (current.size >= max) {
      showToast(`最多选 ${max} 项，先取消一个再选`);
      return;
    } else {
      current.add(option);
    }
    state.answers[q.key] = [...current];
    panel.querySelectorAll("[data-option]").forEach((button) => {
      const isSelected = current.has(button.dataset.option);
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    const status = panel.querySelector("[data-multi-status]");
    if (status) status.textContent = current.size ? `已选 ${current.size} 项${q.max ? ` / 最多 ${q.max} 项` : ""}` : `至少选 1 项${q.max ? ` / 最多 ${q.max} 项` : ""}`;
    const summary = panel.querySelector("[data-selected-summary]");
    if (summary) {
      const items = [...current];
      summary.innerHTML = items.length ? `<b>已选</b>${items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}` : "<em>点上面的卡片选择</em>";
    }
    const nextButton = panel.querySelector("[data-next]");
    if (nextButton) nextButton.disabled = current.size === 0;
    return;
  }
  state.answers[q.key] = option;
  panel.querySelectorAll("[data-option]").forEach((button) => {
    const isSelected = button.dataset.option === option;
    button.classList.toggle("selected", isSelected);
    button.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
  setTimeout(nextStep, 360);
}

function nextStep() {
  if (state.step < questions.length - 1) {
    state.step += 1;
    renderQuestion();
    return;
  }
  runSimulation();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runSimulation(flow = "simulation") {
  simulator.classList.add("hidden");
  loading.classList.remove("hidden");
  const modeName = state.answers.mode || "双模式融合";
  const castTime = new Date();
  state.answers.castTime = castTime.toISOString();
  const oracleOnly = flow === "oracle" || modeName === "命运模式";
  $("#loading .system-kicker").textContent = oracleOnly ? "TIME HEXAGRAM CASTING" : "SIMULATION RUNNING";
  $("#loading h2").textContent = oracleOnly ? `正在以 ${formatCastTime(castTime)} 起卦` : "正在整理你的三条路径";
  await sleep(oracleOnly ? 1800 : 1400);
  const data = generateResult(state.answers);
  if (oracleOnly) {
    await enrichOracleReading(data, state.answers);
  }
  renderResult(data, { oracleOnly });
  postLiveEvent(`第 ${Math.max(Number(liveStats.total || 100) + 1, 101).toLocaleString("zh-CN")} 位求索者读到「${data.fate.sign}」`);
  loading.classList.add("hidden");
  result.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function generateResult(a) {
  const riskMap = { "谨慎行动": 34, "小步确认": 56, "主动推进": 78, "看状态再定": 62 };
  const incomeMap = { "<10w": 28, "10-30w": 46, "30-50w": 62, "50-100w": 76, "100w+": 88 };
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
  const reference = getReferenceProfile(a);

  const paths = buildPaths(a, { risk, wealth, growth, stability, pressure }, reference);

  const events = pickEvents(a, risk);
  const saveId = `${city} · ${playerType}`;
  const narrative = getResultNarrative(a, playerType, fate, pressure, reference, { risk, wealth, growth, stability, paths });
  const persona = getPlayerPersona(playerType);
  const shareStory = getShareStory(a, playerType, fate, pressure);
  const isOracleOnly = a.mode === "命运模式";
  const shareLine = isOracleOnly
    ? "时间卦只给此刻的提醒，真正的决定仍要看你的现实处境。"
    : pressure > 70 ? "压力高的时候先保住收入和精力，决定可以晚一点做。" : "先做一件能看到结果的事，再判断要不要继续。";

  return {
    title: isOracleOnly ? "此刻卦象已落定" : "你的沙盘结论已生成",
    subtitle: isOracleOnly ? `问事 · ${fate.sign} · ${fate.cast.time}` : saveId,
    riskType,
    playerType,
    persona,
    playerCopy: getPlayerCopy(playerType),
    stats: { 财富: wealth, 风险: risk, 成长: growth, 稳定: stability, 压力: pressure },
    fate,
    paths,
    events,
    reference,
    narrative,
    shareStory,
    shareLine,
    oracleReading: null,
    shareText: makeShareText(a, playerType, fate, paths, shareLine, riskType, null),
  };
}

async function enrichOracleReading(data, a) {
  const fallback = buildOracleReading(a, data.fate);
  data.oracleReading = fallback;
  data.shareStory = fallback.detail;
  data.shareLine = fallback.advice;
  data.shareText = makeShareText(a, data.playerType, data.fate, data.paths, data.shareLine, data.riskType, fallback);
  try {
    const response = await fetch("/api/oracle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: getOracleQuestionDisplay(a),
        note: a.oracleNote || "",
        kind: a.oracleKind || inferOracleKind(a.oracleQuestion),
        lensLabel: getOracleLens(a).label,
        hexagram: {
          sign: data.fate.sign,
          tag: data.fate.tag,
          oracle: data.fate.oracle,
          action: data.fate.action,
          warning: data.fate.warning,
          cast: data.fate.cast,
        },
      }),
    });
    if (!response.ok) return;
    const payload = await response.json();
    if (!payload || !payload.reading) return;
    const merged = sanitizeOracleReading(payload.reading, fallback);
    data.oracleReading = merged;
    data.shareStory = merged.detail;
    data.shareLine = merged.advice;
    data.shareText = makeShareText(a, data.playerType, data.fate, data.paths, data.shareLine, data.riskType, merged);
  } catch {
    // Local fallback keeps the static site usable without an API key.
  }
}

function sanitizeOracleReading(reading, fallback) {
  const clean = (value, backup, limit) => {
    const text = String(value || backup || "").replace(/说人话版|AI|人工智能/g, "").trim();
    return text.length > limit ? `${text.slice(0, limit - 1)}。` : text;
  };
  return {
    title: clean(reading.title, fallback.title, 18),
    summary: clean(reading.summary, fallback.summary, 100),
    why: clean(reading.why, fallback.why, 90),
    advice: clean(reading.advice, fallback.advice, 90),
    avoid: clean(reading.avoid, fallback.avoid, 80),
    detail: clean(reading.detail, fallback.detail, 140),
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
  $("[data-export-card]").textContent = oracleOnly ? "生成卦象分享图" : "生成结论分享图";
  $("[data-copy]").textContent = oracleOnly ? "复制卦象解读" : "复制结论";
  $("[data-restart]").textContent = oracleOnly ? "重新起卦" : "重开沙盘";
  const resultGrid = $(".result-grid");
  const rpgPanel = $(".rpg-panel");
  const pathsSection = $(".paths-section");
  const eventSection = $(".event-section");
  [rpgPanel, pathsSection, eventSection].forEach((node) => {
    if (node) node.hidden = oracleOnly;
  });
  if (resultGrid) resultGrid.classList.toggle("oracle-only-grid", oracleOnly);
  $("[data-player-type]").textContent = data.playerType;
  $("[data-player-copy]").textContent = data.playerCopy;
  if (rpgPanel) {
    rpgPanel.className = `rpg-panel reveal ${data.persona.className}`;
    const avatar = rpgPanel.querySelector(".avatar-core");
    if (avatar) {
      avatar.innerHTML = `<i></i><b></b><em></em><span></span>`;
      avatar.setAttribute("data-persona", data.persona.className.replace("persona-", ""));
    }
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
    ? renderOracleNarrative(state.answers, data.fate, data.oracleReading)
    : renderResultNarrative(data.narrative);
  $("[data-share-portrait]").innerHTML = `
    <span>${oracleOnly ? "本次卦象" : "你的画像"}</span>
    <strong>${oracleOnly ? data.fate.sign : data.playerType}</strong>
    <em>${oracleOnly ? `${getOracleLens(state.answers).label} · ${data.fate.cast.time}` : `${data.riskType} · ${data.fate.sign}`}</em>
  `;

  $("[data-stats]").innerHTML = Object.entries(data.stats).map(([name, value]) => `
    <div class="stat-row">
      <span>${name}</span>
      <div class="stat-bar"><span style="width:${value}%"></span></div>
      <b>${value}</b>
    </div>
  `).join("");

  const fateMeaning = $("[data-fate-meaning]");
  const meaningRows = oracleOnly && data.oracleReading ? [
    { label: "卦象提醒", text: data.oracleReading.summary },
    { label: "此刻重点", text: data.oracleReading.advice },
  ] : data.fate.meaning;
  fateMeaning.innerHTML = meaningRows.map((row) => `
    <div class="meaning-row"><strong>${row.label}</strong>${escapeHtml(row.text)}</div>
  `).join("");
  const detail = getFateDetail(state.answers, data.fate, data.playerType, data.oracleReading);
  $("[data-fate-detail]").innerHTML = `
    <div class="fate-story-block">
      <span>${oracleOnly ? "详细解释" : "这卦在提醒什么"}</span>
      <p>${escapeHtml(detail.story)}</p>
    </div>
    <div class="fate-signal-grid">
      ${detail.signals.map((item) => `<div><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.copy)}</p></div>`).join("")}
    </div>
    <div class="fate-action"><strong>不要这样做</strong><p>${escapeHtml(detail.action)}</p></div>
  `;
  const toggle = $("[data-fate-toggle]");
  const detailPanel = $("[data-fate-detail]");
  if (toggle && detailPanel) {
    toggle.textContent = oracleOnly ? "展开详细解释" : "展开更多解释";
    toggle.setAttribute("aria-expanded", "false");
    detailPanel.hidden = true;
  }

  if (!oracleOnly) {
    const orderedPaths = [...data.paths].sort((a, b) => Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)));
    $("[data-paths]").innerHTML = orderedPaths.map((path) => `
      <article class="path-card ${path.tone}${path.recommended ? " recommended" : ""}">
        ${path.recommended ? `<div class="path-recommend-badge">优先看这条</div>` : `<span class="path-verdict">${escapeHtml(path.verdict)}</span>`}
        <div class="path-title-row"><h4>${escapeHtml(path.name)}</h4></div>
        <p>${escapeHtml(path.summary)}</p>
        <small><b>${path.recommended ? "具体做法" : "注意"}</b>${escapeHtml(path.recommended ? (path.next || data.narrative.actionShort || "这周先完成一件能看到结果的事。") : path.risk)}</small>
      </article>
    `).join("");

    $("[data-share-paths]").innerHTML = data.paths.map((path) => `
      <div class="share-mini"><span>${escapeHtml(path.short)}</span><b>${escapeHtml(path.income)}</b></div>
    `).join("");

    $("[data-events]").innerHTML = data.events.map((event) => `
      <div class="event-pill ${event.tone}">
        <div class="event-mark ${event.iconClass}" aria-hidden="true"><span>${event.icon}</span></div>
        <div class="event-copy">
          <span class="event-prob">最近可能出现 · ${event.probability}%</span>
          <p>${escapeHtml(event.text)}</p>
        </div>
        <i style="width:${event.probability}%"></i>
      </div>
    `).join("");
  } else {
    $("[data-share-paths]").innerHTML = "";
    $("[data-events]").innerHTML = "";
  }
}

function renderMobileConclusion(data) {
  const situation = data.narrative?.mobileSituation || data.narrative?.plainSituation || data.narrative?.tension;
  const next = data.narrative?.mobileNext || data.narrative?.plainNext || data.narrative?.firstMove || data.narrative?.actionShort || `先把「${data.fate.sign}」对应的问题写成一个能处理的小任务。`;
  const guardText = data.narrative?.mobileGuard || data.narrative?.guard || "别在情绪最满的时候做不可逆决定。";
  return `
    <div class="mobile-conclusion" data-mobile-conclusion>
      <div class="mobile-conclusion-sigil" aria-hidden="true"><span></span></div>
      <div class="mobile-conclusion-main">
        <span>本次建议</span>
        <strong>${escapeHtml(data.narrative.plainTitle)}</strong>
        <p>${escapeHtml(data.narrative.plainAdvice || situation)}</p>
      </div>
      <div class="mobile-conclusion-rows">
        <p><span>先做</span><em>${escapeHtml(next.replace(/^下一步：/, ""))}</em></p>
        <p><span>别做</span><em>${escapeHtml(guardText)}</em></p>
      </div>
    </div>
  `;
}

function toggleFateDetail(button) {
  const detail = $("[data-fate-detail]");
  if (!detail) return;
  const willOpen = detail.hidden;
  detail.hidden = !willOpen;
  button.setAttribute("aria-expanded", String(willOpen));
  button.textContent = willOpen ? "收起解释" : "展开更多解释";
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
  const latest = liveStats.events?.[0]?.text || `${total} 位求索者已经读到自己的沙盘`;
  document.querySelectorAll("[data-live-count], [data-live-count-result]").forEach((node) => {
    node.textContent = total;
  });
  $("[data-live-action]").textContent = "位求索者读过沙盘";
  $("[data-live-feed]").textContent = latest;
}

function getOptionDescription(key, option) {
  const map = {
    age: "判断选择成本",
    city: "判断机会和生活成本",
    industry: "判断工作环境",
    position: "确认队伍站位",
    income: "确认存款缓冲",
    state: "判断近期状态",
    troubles: "确认主要问题",
    family: "读取责任和支持",
    resources: "确认安全垫",
    riskScenario: "判断行动方式",
  };
  return map[key] || option;
}

function inferRiskType(choice = "") {
  if (choice.includes("先查") || choice.includes("先不动") || choice.includes("查清楚")) return "谨慎行动";
  if (choice.includes("小范围") || choice.includes("先确认") || choice.includes("聊合作")) return "小步确认";
  if (choice.includes("底线") || choice.includes("推进")) return "主动推进";
  if (choice.includes("状态") || choice.includes("感觉")) return "看状态再定";
  return "小步确认";
}

function getPlayerType(a, risk, growth, riskType) {
  if (risk >= 72) return "进攻型";
  if (growth >= 70 && ["正在转型", "想改变但犹豫"].includes(a.state)) return "转向型";
  if (risk <= 42) return "稳住型";
  if (riskType === "看状态再定") return "看信号型";
  return "确认型";
}

function getPlayerCopy(type) {
  return {
    "进攻型": "你行动快，适合先写清能亏多少，再往前推。",
    "转向型": "你想换方向，先找两位业内人聊清门槛和日常。",
    "稳住型": "你重视稳定，先把钱和退路算清。",
    "看信号型": "你容易受状态影响，先看岗位、客户或对方行动。",
    "确认型": "你适合先做一件具体的事，再决定投入多少。",
  }[type];
}

function getPlayerPersona(type) {
  return {
    "进攻型": { className: "persona-opener", mark: "进", name: "进攻型" },
    "转向型": { className: "persona-key", mark: "转", name: "转向型" },
    "稳住型": { className: "persona-keeper", mark: "稳", name: "稳住型" },
    "看信号型": { className: "persona-record", mark: "看", name: "看信号型" },
    "确认型": { className: "persona-balance", mark: "确", name: "确认型" },
  }[type] || { className: "persona-balance", mark: "确", name: "确认型" };
}

function buildPaths(a, score, reference = getReferenceProfile(a)) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const allTroubles = Array.isArray(a.troubles) && a.troubles.length ? a.troubles : [trouble];
  const sideTroubles = allTroubles.filter((item) => item !== trouble).slice(0, 2);
  const pathContext = {
    "职业去留": {
      a: "先留下，但别停止找机会。",
      b: "先面试几次，看外面是否更好。",
      c: "拿到更好的 offer 后再走。",
      next: "改简历，投 3 个岗位，问 1 个同行：现在外面的薪资和要求怎么样。",
      notA: "只能保底，不能一直拖着不看机会。",
      notC: "没有下家就离职，钱的压力会马上变大。",
    },
    "方向重选": {
      a: "先保住收入，不要马上推翻。",
      b: "先做一个作品，拿给懂行的人看。",
      c: "有人愿意聊机会后再投入。",
      next: "选一个新方向，7 天内做一份能展示的作品，发给 2 个懂行的人看。",
      notA: "安全，但不能帮你判断新方向。",
      notC: "没人回应就重来，成本会很高。",
    },
    "自己做事": {
      a: "先别辞职，先写清楚卖什么。",
      b: "先卖出一单，看是否有人付费。",
      c: "有客户和交付后再做大。",
      next: "写一条报价：解决什么问题、多少钱、多久交付，然后问 5 个可能买的人。",
      notA: "适合整理想法，但不能一直停在想。",
      notC: "没有第一单就投入大钱，风险太高。",
    },
    "钱不够稳": {
      a: "先算清每月必须花多少钱。",
      b: "先找一个能增加收入的入口。",
      c: "收入稳定后，再做更大的改变。",
      next: "列出未来 3 个月固定支出，再找一个能增加收入的入口。",
      notA: "能止血，但收入问题还要处理。",
      notC: "钱没稳就大改，会更焦虑。",
    },
    "意义感变低": {
      a: "先找出最消耗你的一件事。",
      b: "先做完一件有反馈的事。",
      c: "确认新目标更适合你，再调整。",
      next: "选一件 2 小时内能完成的任务，做完后发给一个懂你的人。",
      notA: "只忍着不会变好，但能先降压。",
      notC: "没找到原因就重来，可能还是累。",
    },
    "关系消耗": {
      a: "先少答应一次让你很累的事。",
      b: "说清一个边界，看对方是否尊重。",
      c: "边界反复被踩，就拉开距离。",
      next: "下次被临时要求时，直接说：我现在处理不了。",
      notA: "只躲不开口，问题会回来。",
      notC: "先别翻脸，先看对方是否尊重边界。",
    },
    "未来看不清": {
      a: "先把担心写成具体问题。",
      b: "先查清影响最大的一个问题。",
      c: "信息够了，再做决定。",
      next: "把最担心的事写成一句问题：我现在缺钱、缺能力，还是缺机会？",
      notA: "只写不查，焦虑还会在。",
      notC: "信息太少就定，容易后悔。",
    },
  };
  const copy = pathContext[trouble] || pathContext["未来看不清"];

  const names = {
    "职业去留": ["A 先留下", "B 先看机会", "C 拿到 offer 再走"],
    "方向重选": ["A 先保留现有方向", "B 先做作品", "C 有回应再换"],
    "自己做事": ["A 先不辞职", "B 先卖一次", "C 有客户再做大"],
    "钱不够稳": ["A 先算账", "B 先增加收入", "C 稳了再改"],
    "意义感变低": ["A 先找消耗点", "B 先做成一件事", "C 看清再换"],
    "关系消耗": ["A 先少答应", "B 先设边界", "C 不尊重就拉开"],
    "未来看不清": ["A 先写清问题", "B 先查清一件事", "C 看清再决定"],
  }[trouble] || ["A 先保底", "B 先查清", "C 看清再改"];

  return [
    {
      tone: "guard",
      name: names[0],
      short: "保守",
      summary: copy.a,
      verdict: "保底",
      mobile: copy.a,
      income: "保住现有收入",
      risk: sideTroubles.length ? `你还选了「${sideTroubles.join("、")}」，所以这条路只能临时保底。` : copy.notA,
    },
    {
      tone: "chosen",
      name: names[1],
      short: "推荐",
      recommended: true,
      summary: copy.b,
      verdict: "建议优先",
      mobile: copy.b,
      next: copy.next,
      income: "看清下一步",
      risk: "给自己 7 天。到期看结果，不靠情绪拖延。",
    },
    {
      tone: "bold",
      name: names[2],
      short: "激进",
      summary: copy.c,
      verdict: "慎选",
      mobile: copy.c,
      income: "变化最大",
      risk: copy.notC,
    },
  ];
}

function getDecisionLens(a, score, reference = getReferenceProfile(a)) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "这件事";
  const stableWhen = score.pressure > 70 ? "压力很高、容易冲动的时候" : "还能继续积累、但不想一直拖的时候";
  const firstRepair = score.wealth < 46 ? "现金流" : score.pressure > 70 ? "睡眠和精力" : (reference.trouble?.label || trouble);
  const smallSteps = {
    "职业去留": "找两位同行聊岗位薪资、团队氛围和加班情况。",
    "方向重选": "列出新方向需要的作品、证书、经验和联系人。",
    "自己做事": "先卖一个服务或产品，不急着注册公司。",
    "钱不够稳": "把未来三个月固定支出写出来，先算能承受多大波动。",
    "意义感变低": "记录一周里让你有能量的任务，别只记录让你耗尽的任务。",
    "关系消耗": "先划出一个不解释的边界，看看对方如何反应。",
    "未来看不清": "把最担心的三件事写成能查清的问题。",
  };
  return { stableWhen, firstRepair, smallStep: reference.trouble?.next || smallSteps[trouble] || "先找一个能马上处理的场景，不要只在脑子里绕。" };
}

function getReferenceProfile(a) {
  const db = referenceInsights || {};
  const troubleKey = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const ageKey = normalizeReferenceKey("age", a.age);
  const cityKey = normalizeReferenceKey("city", a.city);
  const industryKey = normalizeReferenceKey("industry", a.industry);
  const age = db.age?.[ageKey] || fallbackReference("age", a.age);
  const city = db.city?.[cityKey] || fallbackReference("city", a.city);
  const industry = db.industry?.[industryKey] || fallbackReference("industry", a.industry);
  const trouble = db.troubles?.[troubleKey] || fallbackReference("trouble", troubleKey);
  const resource = db.resources?.[a.resources] || fallbackReference("resource", a.resources);
  return {
    age,
    city,
    industry,
    trouble,
    resource,
    benchmark: `同阶段参考：${age.sample}${city.signal ? ` 你所在的${city.label}还会放大这一点：${city.signal}` : ""}`,
    guardrail: `${resource.guardrail || "先确认安全垫，再决定能不能承受空窗期。"} ${trouble.metric || "把问题写成能查清的条件。"}`,
    next: trouble.next || resource.experiment || "先完成一个有反馈的步骤，再决定要不要继续。",
  };
}

function normalizeReferenceKey(type, value = "") {
  const map = {
    city: {
      "流动中": "海外/流动中",
      "海外": "海外/流动中",
    },
    industry: {
      "产品/技术": "互联网/AI/产品技术",
      "金融/咨询": "金融/咨询/专业服务",
      "运营/销售": "消费/品牌/运营销售",
      "制造/工程": "制造/供应链/工程",
      "教育/医疗": "教育/医疗/公共服务",
      "内容/设计": "内容/设计/自由职业",
      "体制/国企": "体制内/国企/稳定组织",
      "其他": "其他/复合职业",
      "其他/复合": "其他/复合职业",
      "其他/复合职业": "其他/复合职业",
    },
  };
  return map[type]?.[value] || value;
}

function fallbackReference(type, value = "") {
  const common = {
    age: { label: value || "当前阶段", sample: "常见卡点是想改变，但信息还不够。", window: "适合先拿一个反馈，再决定要不要做大。" },
    city: { label: value || "当前环境", signal: "机会和生活成本会同时影响你的判断。", cost: "需要把现实成本写清楚。" },
    industry: { label: value || "当前行业", asset: "可迁移能力、作品和人脉是关键。", risk: "最大风险是只在脑子里想，不去问岗位、客户或懂行的人。" },
    trouble: { label: value || "当前问题", metric: "重点看它是钱不够、能力不够、机会不够，还是精力不够。", next: "把它拆成一个 7 天内能完成的具体步骤。" },
    resource: { label: value || "当前缓冲", guardrail: "先确认安全垫，再决定能不能承受空窗期。", experiment: "适合选一个花费少、能得到回应的步骤。" },
  };
  return common[type];
}

function getIndustryLens(industry = "") {
  if (industry.includes("互联网") || industry.includes("AI")) return { stable: "技术和产品周期会继续推着你更新技能。", optimize: "最适合用作品、项目或新岗位看清身价。", rebuild: "跨到新赛道前，先确认你的核心能力能不能迁移。" };
  if (industry.includes("金融") || industry.includes("咨询")) return { stable: "专业信用和客户关系会继续积累。", optimize: "更适合争取更高质量的项目与客户。", rebuild: "离开原体系会少一层背书，但也可能换来独立定价权。" };
  if (industry.includes("消费") || industry.includes("品牌")) return { stable: "市场嗅觉会继续积累，但节奏容易被外部波动牵着走。", optimize: "把表达、渠道和转化能力打包，会出现新机会。", rebuild: "新局需要你直接面对市场，而不是只完成组织任务。" };
  if (industry.includes("体制") || industry.includes("国企")) return { stable: "稳定性强，但成长窗口更依赖边界外的主动探索。", optimize: "可以先在低风险范围内增加第二技能。", rebuild: "真正的难点不是离开，而是离开后如何重新定价。" };
  return { stable: "你当前环境里仍有可用资源，只是需要重新识别它们。", optimize: "先拿一个具体结果，会比空想更快看清方向。", rebuild: "大转向会要求你重新建立信用。" };
}

function getStateLens(current = "") {
  if (current.includes("焦虑")) return { stable: "短期会更稳，但心里的警报不会自动消失。", optimize: "先把焦虑拆成一件能做的事，会更容易判断。", rebuild: "如果只靠情绪冲出去，容易把同一个问题带进新环境。" };
  if (current.includes("转型")) return { stable: "原来的路径还能继续支撑你一段时间，但新方向也需要外部回应。", optimize: "这条线最适合给新方向搭一个台阶。", rebuild: "你已经靠近变化，差的是资源和节奏。" };
  if (current.includes("躺平")) return { stable: "先休息能恢复精力，但也要避免长期停住。", optimize: "先恢复能量，再恢复行动感。", rebuild: "不建议用大动作证明自己，先找回持续行动感。" };
  return { stable: "它能让生活更安静，但未必让问题消失。", optimize: "它能让你先看清一点，不必立刻推翻全部。", rebuild: "它会带来大变化，也会放大每一个准备不足。" };
}

function getResourceLens(resources = "") {
  if (resources.includes("家人") || resources.includes("现金流")) return { stable: "你的安全垫较厚，可以把选择做得更从容。", optimize: "有缓冲就别浪费，适合认真完成一个能看到反馈的步骤。", rebuild: "托底不是保证成功，但能帮你穿过前期不确定。" };
  if (resources.includes("几乎")) return { stable: "先修现金流，会比立刻换环境更现实。", optimize: "投入必须轻，别影响基本生活。", rebuild: "除非有确定入口，否则大转向成本会非常刺眼。" };
  return { stable: "安全垫不算薄，但还需要精算消耗。", optimize: "适合用三个月看清一个方向。", rebuild: "先准备退路，才有资格谈魄力。" };
}

function pickBySeed(label, a, list) {
  return list[Math.abs(hash(`${label}-${JSON.stringify(a)}`)) % list.length];
}

function getPracticalConclusion(trouble, flags) {
  const base = {
    "职业去留": {
      headline: "先确认外面是不是真的更好",
      title: "先面试，再决定要不要走",
      situation: "你烦的可能不是工作本身，而是不确定留下来还有没有回报。",
      advice: "先别裸辞。用几个岗位对比薪资、团队、通勤和成长空间。",
      next: "本周改简历，投 3 个岗位，约 1 个同行聊 20 分钟。",
      guard: "没有更好的 offer 前，不要先断收入。",
      reason: "换工作要解决问题，不只是离开坏心情。",
      firstMoveTitle: "看外部机会",
      adviceTitle: "先骑驴找马",
    },
    "方向重选": {
      headline: "先看新方向有没有明确入口",
      title: "先做一个作品，再谈转向",
      situation: "你想换方向，但现在还不知道别人会不会认可你的能力。",
      advice: "先做一个能展示的作品或案例。有人愿意认真聊，再继续投入。",
      next: "7 天内做一个作品：一页方案、一个案例、一个 demo 都可以。",
      guard: "没人回应前，先别砍掉现有收入。",
      reason: "转方向不能只靠想象。作品和聊天结果会告诉你这条路能不能走。",
      firstMoveTitle: "做作品",
      adviceTitle: "先看新方向",
    },
    "自己做事": {
      headline: "先拿到第一笔付费",
      title: "先卖一单，再谈做大",
      situation: "你有想法，但还缺一个愿意付钱的人。",
      advice: "先把卖什么、多少钱、多久交付写清楚，再去问客户。",
      next: "今天写一条报价，发给 5 个可能需要的人。",
      guard: "没有第一单前，别辞职，也别投大钱。",
      reason: "有人付钱，才说明这件事有机会变成生意。",
      firstMoveTitle: "找第一单",
      adviceTitle: "先看能否付费",
    },
    "钱不够稳": {
      headline: "先把钱算清楚",
      title: "先算钱，再谈改变",
      situation: "钱没算清时，你会很难判断什么选择能承受。",
      advice: "先知道自己能撑几个月，再决定能不能跳槽、转向或做副业。",
      next: "列出未来 3 个月必须花的钱，写下最低存款线。",
      guard: "低于最低存款线时，不做会断收入的大决定。",
      reason: "安全垫越清楚，你越不容易被焦虑牵着走。",
      firstMoveTitle: "算安全垫",
      adviceTitle: "先稳现金流",
    },
    "意义感变低": {
      headline: "先找出最消耗你的事",
      title: "先找原因，再换做法",
      situation: "你不是突然变懒，可能是最近做的事很少让你看到结果。",
      advice: "先找出最消耗你的那件事，再完成一个能得到反馈的任务。",
      next: "今天选一件 2 小时内能完成的任务，做完后发给一个懂你的人。",
      guard: "状态低的时候，别急着推翻全部选择。",
      reason: "人需要得到反馈，才会重新相信自己做的事有用。",
      firstMoveTitle: "拿回回应",
      adviceTitle: "先做成一件事",
    },
    "关系消耗": {
      headline: "先设一个边界，看对方反应",
      title: "先把边界说清楚",
      situation: "让你累的不是一次小事，而是对方反复占用你的时间和情绪。",
      advice: "先说清一个边界。对方尊重，就继续调整；不尊重，就拉开距离。",
      next: "下一次被临时要求时，只回答一句：这件事我现在处理不了。",
      guard: "边界反复被踩，就不要继续靠解释换理解。",
      reason: "一段关系值不值得继续，要看你说“不”以后，对方怎么对你。",
      firstMoveTitle: "设边界",
      adviceTitle: "先少答应",
    },
    "未来看不清": {
      headline: "先把担心拆开",
      title: "先弄清你到底怕什么",
      situation: "你不是完全没有路，而是钱、能力、机会混在一起了。",
      advice: "先把担心拆开。找到最影响你的那一个，再处理。",
      next: "写下最担心的 3 件事，每件后面加一句：我需要查什么？",
      guard: "问题没写清前，不要逼自己立刻选一条路。",
      reason: "大问题会吓人。拆小以后，才知道该补钱、补信息，还是补机会。",
      firstMoveTitle: "写清问题",
      adviceTitle: "先拆问题",
    },
  };
  const copy = base[trouble] || base["未来看不清"];
  if (flags.wealthLow) {
    return {
      ...copy,
      headline: copy.headline.includes("现金流") ? copy.headline : "先保证收入不断档",
      title: "钱紧时，先别断收入",
      advice: `${copy.advice} 这次先把钱放在第一位：别裸辞，别一次投入太多。`,
      guard: "至少留出 3 个月生活费，再做大动作。",
      reason: copy.reason || "钱紧时，退路比勇气更重要。先让收入不断档。",
      firstMoveTitle: "先算钱",
      adviceTitle: "别断收入",
    };
  }
  if (flags.pressureHigh) {
    return {
      ...copy,
      title: "压力高时，先查清信息",
      advice: `${copy.advice} 压力高时，只先收集信息，不急着拍板。`,
      guard: "情绪很满时，只收集信息，不做不可逆决定。",
      reason: copy.reason || "压力高的时候，人的判断会变窄。先查清信息，再做选择。",
    };
  }
  return copy;
}

function getResultNarrative(a, playerType, fate, pressure, reference = getReferenceProfile(a), score = {}) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const allTroubles = Array.isArray(a.troubles) && a.troubles.length ? a.troubles : [trouble];
  const secondary = allTroubles.filter((item) => item !== trouble).slice(0, 2);
  const state = a.state || "当前状态";
  const pressureLine = pressure > 70 ? "先把信息补齐，别在最焦虑的时候拍板。" : "先完成下一步，再决定要不要继续投入。";
  const decisionLens = getDecisionLens(a, { pressure, wealth: score.wealth ?? 50 }, reference);
  const wealthLow = (score.wealth ?? 50) < 48;
  const growthHigh = (score.growth ?? 50) > 68;
  const riskHigh = (score.risk ?? 50) > 70;
  const actionShort = decisionLens.smallStep;
  const practical = getPracticalConclusion(trouble, { wealthLow, pressureHigh: pressure > 70, riskHigh, growthHigh, actionShort });
  const firstMoveTitle = practical.firstMoveTitle;
  const adviceTitle = practical.adviceTitle;
  const headline = practical.headline;
  const contextTail = secondary.length ? ` 你还同时担心「${secondary.join("、")}」，所以这次先抓主问题，不要把所有事混在一起。` : "";
  const tension = `${practical.situation}${contextTail}`;
  const decision = practical.advice;
  const firstMove = practical.next;
  const window = "先完成一个能得到反馈的步骤。";
  const guard = practical.guard || reference.guardrail || (riskHigh ? "先写清止损线，再谈上限。" : "先确认安全垫，再决定能不能承受空窗期。");
  const mobileGuard = practical.guard;
  const plainTitle = practical.title;
  const plainSituation = tension;
  const plainAdvice = practical.advice;
  const plainReason = practical.reason || reference.guardrail || "先看见结果，再决定要不要继续。";
  const plainNext = practical.next;
  const mobileSituation = tension;
  const mobileAdvice = practical.advice;
  const mobileNext = practical.next;
  const practicalKey = wealthLow
    ? "钱的压力偏高，所以先保收入。"
    : riskHigh
      ? "你能推进，但要先写清底线。"
      : growthHigh
        ? "你适合先拿到一个反馈，再判断值不值得继续。"
        : "先拿到一个反馈，再决定下一步。";
  return {
    headline,
    tension,
    decision,
    firstMoveTitle,
    firstMove,
    window,
    guard,
    adviceTitle,
    plainTitle,
    plainSituation,
    plainAdvice,
    plainReason,
    plainNext,
    mobileSituation,
    mobileAdvice,
    mobileNext,
    mobileGuard,
    reference: practicalKey,
    seen: `你现在主要卡在「${trouble}」，状态是「${state}」。`,
    key: `你的行动风格偏「${playerType}」。适合先得到反馈，再决定投入多少。`,
    action: `${actionShort} ${pressureLine}`,
    actionShort,
    sign: `签面「${fate.sign}」的意思很简单：${fate.oracle}`,
  };
}

function renderResultNarrative(narrative) {
  const guard = narrative.mobileGuard || narrative.guard;
  return `
    <span>本次结论</span>
    <h3>${escapeHtml(narrative.plainTitle || "先把关键问题查清楚")}</h3>
    <p class="narrative-lead">${escapeHtml(narrative.plainSituation || narrative.tension)}</p>
    <div class="narrative-points">
      <div class="narrative-card focus"><b>结论</b><p>${escapeHtml(narrative.plainAdvice || narrative.decision)}</p></div>
      <div class="narrative-card"><b>理由</b><p>${escapeHtml(narrative.plainReason || narrative.reference)}</p></div>
      <div class="narrative-card detail-card"><b>行动</b><p>${escapeHtml(narrative.plainNext || narrative.firstMove)}</p><small>${escapeHtml(guard)}</small></div>
    </div>
  `;
}

function renderOracleNarrative(a, fate, reading = null) {
  const question = getOracleQuestionDisplay(a);
  const note = (a.oracleNote || "").trim().replace(/[。！？!?.,，、；;\s]+$/, "");
  const lens = getOracleLens(a);
  const finalReading = reading || buildOracleReading(a, fate);
  const noteLine = shouldShowOracleNote(question, note) ? `补充：${escapeHtml(note)}。` : "";
  return `
    <span>时间起卦 · ${escapeHtml(lens.label)}</span>
    <h3>${escapeHtml(finalReading.title)}</h3>
    <p class="narrative-lead">你问的是「${escapeHtml(question)}」。${noteLine}${escapeHtml(finalReading.summary)}</p>
    <div class="narrative-points oracle-points">
      <div class="narrative-card focus"><b>判断</b><p>${escapeHtml(finalReading.summary)}</p></div>
      <div class="narrative-card"><b>卦怎么看</b><p>${escapeHtml(finalReading.why)}</p></div>
      <div class="narrative-card detail-card"><b>现在怎么处理</b><p>${escapeHtml(finalReading.advice)}</p><small>${escapeHtml(finalReading.avoid)}</small></div>
    </div>
  `;
}

function buildOracleReading(a, fate) {
  const question = getOracleQuestionDisplay(a);
  const lens = getOracleLens(a);
  const kind = a.oracleKind || inferOracleKind(question);
  const moving = fate.cast.yangCount >= 4;
  const quiet = fate.cast.yangCount <= 2;
  const tone = moving ? "动" : quiet ? "静" : "缓";
  const base = {
    work: {
      title: moving ? "可以看机会" : quiet ? "先别急着走" : "边做边看",
      summary: moving ? "这卦偏动，适合开始看外部机会，但不要先辞职。" : quiet ? "这卦偏收，说明现在更适合补准备，不适合裸辞。" : "这卦不让你马上定去留，先用面试和沟通确认外面是否更好。",
      why: `「${fate.sign}」落在工作问题上，看的是机会是否接得住你。${tone}象说明节奏要跟现实条件一起看。`,
      advice: "先更新简历，再找 2 到 3 个真实机会聊一聊，比较薪资、团队和成长空间。",
      avoid: "不要因为某一天很烦就辞职，也不要在没有现金缓冲时硬扛。",
      detail: "像站在公司楼下看另一栋楼的灯。灯亮不代表一定要搬过去，但你该走近看看门牌和楼层。",
    },
    direction: {
      title: moving ? "能试新方向" : quiet ? "先补底子" : "先小范围试",
      summary: moving ? "可以开始接触新方向，但先用一个具体成果验证。" : quiet ? "现在不适合突然重来，先弄清新方向需要什么能力。" : "先试一小段，不要急着把原来的路全断掉。",
      why: `「${fate.sign}」提醒你先看入口。新方向不是靠想象判断，要看有没有人愿意看见你的能力。`,
      advice: "找 2 个正在做这行的人聊一次，再做一个能展示能力的小成果。",
      avoid: "不要把讨厌现状等同于适合新方向。",
      detail: "像换船前先踩一下码头。脚下稳不稳，比远处的灯好不好看更重要。",
    },
    side: {
      title: moving ? "可以先卖一次" : quiet ? "先别重投" : "低成本试",
      summary: moving ? "副业可以启动，但先看有没有人愿意付钱。" : quiet ? "这卦不支持一上来重投入，先把产品和客户想清楚。" : "可以做小实验，成本越低越好。",
      why: `「${fate.sign}」落在副业上，重点是需求，不是热情。先有付款或明确需求，再谈扩大。`,
      advice: "写清楚你卖什么、多少钱、多久交付，然后问 5 个可能购买的人。",
      avoid: "不要先囤货、租场地、买设备或大额投流。",
      detail: "像夜里点起一盏小摊灯。先卖出第一份，再决定要不要把摊位开大。",
    },
    money: {
      title: moving ? "先打开收入" : quiet ? "先看清账" : "先堵漏",
      summary: moving ? "可以主动谈钱，但要先选一个最可能见效的入口。" : quiet ? "先把账摊开，这卦不适合靠冲动解决钱的问题。" : "钱的问题要先止血，再找增量。",
      why: `「${fate.sign}」在钱上提醒你先看现金流。收入、支出、债务和缓冲要一起算。`,
      advice: "列出未来 3 个月必花的钱，再决定是谈涨薪、接单、清账还是减少支出。",
      avoid: "不要借钱投资，也不要为了焦虑去买不懂的东西。",
      detail: "像一只钱袋先漏了线。先把洞找出来，进来的钱才留得住。",
    },
    romance: {
      title: moving ? "需要认真谈" : quiet ? "先看行动" : "给观察期",
      summary: moving ? "这段关系需要一次认真沟通，别继续靠猜。" : quiet ? "先不要急着分开或承诺，重点看对方后续行动。" : "适合给一段观察期，把边界和期待说清楚。",
      why: `「${fate.sign}」落在关系上，看的是两个人是否还愿意一起处理问题，不是谁赢谁输。`,
      advice: "找一个平静时间，只谈一个最影响你们的问题，说清你的感受和底线。",
      avoid: "不要冷战、试探、翻旧账，也不要只因为舍不得就忽略长期消耗。",
      detail: "像两个人坐在一盏快暗的灯旁。不是马上吹灭，也不是装作还亮着，先看两个人愿不愿意一起添油。",
    },
    "new-love": {
      title: moving ? "可以靠近" : quiet ? "先慢一点" : "看相处感",
      summary: moving ? "可以继续接触，但别太快投入全部期待。" : quiet ? "这卦建议慢一点，先看对方是否稳定、真诚。" : "先多相处几次，看你是不是更安心。",
      why: `「${fate.sign}」看的是靠近之后的状态。好的开始会让你放松，不会让你一直猜。`,
      advice: "多见一次，聊一个现实问题，比如时间安排、关系期待或边界。",
      avoid: "不要因为孤独把对方理想化，也不要一开始就过度付出。",
      detail: "像远处递来一盏灯。可以走近看光暖不暖，但别还没看清人，就把整晚交出去。",
    },
    family: {
      title: moving ? "可以开口谈" : quiet ? "先整理边界" : "先谈一个点",
      summary: moving ? "可以谈，但要把话说具体，不要变成吵架。" : quiet ? "先整理你真正想表达什么，再找合适时间说。" : "不要一次谈完所有矛盾，先处理最影响你的一个点。",
      why: `「${fate.sign}」在家庭问题上，提醒你要让对方听懂你的压力和底线。`,
      advice: "准备三句话：我现在难在哪里、希望你怎么支持、哪些事我暂时做不到。",
      avoid: "不要用指责开场，也不要为了表面和平一直忍。",
      detail: "像一张饭桌，大家都坐着，却没人说真正的话。先把最需要被听见的一句放到桌面上。",
    },
    people: {
      title: moving ? "先立边界" : quiet ? "减少消耗" : "观察回应",
      summary: moving ? "这段关系需要边界，不能再靠你一直让步。" : quiet ? "先少回应一点，看消耗是否下降。" : "先观察对方是否尊重你的拒绝。",
      why: `「${fate.sign}」看的是关系有没有让你变轻。一直内耗，就要调距离。`,
      advice: "下一次不想答应时，直接说一次不方便，不解释太多。",
      avoid: "不要靠讨好换和平，也不要突然爆发后又自责。",
      detail: "像手腕上有一根细线。你不一定马上剪断，但要知道是谁一直在拉。",
    },
    study: {
      title: moving ? "学到能用" : quiet ? "先别冲动报名" : "试学一周",
      summary: moving ? "可以投入学习，但目标要能变成成果。" : quiet ? "别急着买课，先确认这件事真的用得上。" : "先低成本试一周，看自己能不能坚持。",
      why: `「${fate.sign}」在学习上，提醒你不要只获得安慰，要获得能力变化。`,
      advice: "把学习目标写成一个结果：证书、作品、考试分数、面试机会或项目。",
      avoid: "不要用买课代替行动，也不要用学习逃避选择。",
      detail: "像书页里夹着一把钥匙。钥匙有用，但要插进现实的门里，才知道能不能开。",
    },
    city: {
      title: moving ? "先去探路" : quiet ? "先别急搬" : "算清成本",
      summary: moving ? "可以开始看新城市，但先查工作、住处和生活成本。" : quiet ? "不建议为了逃离而搬，先把落脚点准备好。" : "先短住或实地看看，再决定要不要换城市。",
      why: `「${fate.sign}」看的是新地方能不能接住你，不只是你想不想离开。`,
      advice: "先算租房、通勤、收入机会和能求助的人，再做决定。",
      avoid: "不要只看城市滤镜，忽略搬迁成本和孤独成本。",
      detail: "像车票已经放在桌上。车可以坐，但先确认目的地有没有落脚处。",
    },
    general: {
      title: moving ? "先确认一步" : quiet ? "先别急定" : "先问清楚",
      summary: "这卦不替你一次定完，而是提醒你先把眼前这件事问清楚。",
      why: `「${fate.sign}」说明问题还需要一点信息。先看真实反应，再判断。`,
      advice: "把问题写成一句能回答的话，再找一个最相关的人或信息源确认。",
      avoid: "不要把很多焦虑揉成一个大问题，也不要在情绪最高时拍板。",
      detail: "像一团线放在掌心。别急着剪，先找到线头。线头找到了，后面才解得开。",
    },
  };
  return base[kind] || base.general;
}

function getOracleTendency(a, cast) {
  const kind = a.oracleKind || inferOracleKind(a.oracleQuestion);
  const moving = cast.yangCount >= 4;
  const quiet = cast.yangCount <= 2;
  const map = {
    work: moving ? "先看外面是否更好" : quiet ? "先别裸辞" : "先边工作边看机会",
    direction: moving ? "可以开始了解新方向" : quiet ? "先补准备" : "先观察一个月",
    side: moving ? "先卖一次" : quiet ? "先别砸钱" : "先把成本压低",
    money: moving ? "先开收入口" : quiet ? "先算清现金流" : "先堵一个漏点",
    romance: moving ? "认真谈一次" : quiet ? "先看行动" : "先给观察期",
    "new-love": moving ? "可以靠近看看" : quiet ? "先慢一点" : "先看相处感",
    family: moving ? "把话说清楚" : quiet ? "先整理边界" : "先谈一个点",
    people: moving ? "先设边界" : quiet ? "少消耗自己" : "先减少一次答应",
    study: moving ? "先学到能用出来" : quiet ? "先别冲动报名" : "先体验一周",
    city: moving ? "先查落脚点" : quiet ? "先别急着搬" : "先算成本",
  };
  return map[kind] || (moving ? "先往前推进一件事" : quiet ? "先准备清楚" : "先完成一个小步骤");
}

function getOracleQuestionDisplay(a) {
  const preset = (a.oraclePreset || "").replace(/^我想知道/, "").trim();
  const question = (a.oracleQuestion || "").trim();
  if (preset) return preset;
  return question || "心中所求";
}

function shouldShowOracleNote(question, note) {
  const normalize = (value) => String(value || "")
    .replace(/^我想知道/, "")
    .replace(/[\s。！？!?.,，、；;：:「」“”]/g, "")
    .trim();
  const q = normalize(question);
  const n = normalize(note);
  if (!n) return false;
  if (!q) return true;
  return !q.includes(n) && !n.includes(q);
}

function getOracleOnlyNarrative(a, fate, reading = null) {
  const question = a.oracleQuestion || "心中所求";
  const lens = getOracleLens(a);
  const cast = fate.cast;
  const finalReading = reading || buildOracleReading(a, fate);
  return `你问的是：「${question}」。这次按「${lens.label}」解。卦象是「${fate.sign}」，${cast.yangCount}阳${6 - cast.yangCount}阴。${finalReading.summary}${finalReading.advice}`;
}

function getFateDetail(a, fate, playerType, reading = null) {
  const question = a.oracleQuestion || (Array.isArray(a.troubles) && a.troubles[0]) || "眼前这件事";
  const lens = getOracleLens(a);
  const moving = fate.cast.yangCount >= 4;
  const quiet = fate.cast.yangCount <= 2;
  if (a.mode === "命运模式") {
    const finalReading = reading || buildOracleReading(a, fate);
    return {
      story: finalReading.detail,
      signals: [
        { title: "卦面", copy: finalReading.why },
        { title: "建议", copy: finalReading.advice },
      ],
      action: finalReading.avoid,
    };
  }
  const story = getOracleStory(a, fate, lens, moving, quiet);
  return {
    story,
    signals: [
      {
        title: "卦面",
        copy: moving ? `可以往前走一点，但不要一下子压太重。${lens.issue}` : quiet ? `先缓一缓，把准备补齐。${lens.issue}` : `先看对方、市场或家人的真实反应，再决定。${lens.issue}`,
      },
      {
        title: "重点",
        copy: getOracleStuckPoint(a, lens, question),
      },
      {
        title: "下一步",
        copy: fate.plainAction,
      },
    ],
    action: fate.plainAvoid,
  };
}

function getOracleStory(a, fate, lens, moving, quiet) {
  const kind = a.oracleKind || inferOracleKind(a.oracleQuestion);
  const motion = moving ? "这次可以往前走一点，但不要把话说死。" : quiet ? "这次先放慢，把该确认的事确认完。" : "这次先看一次真实反应，再判断。";
  const stories = {
    work: `如果你问工作，这卦看的是“下一份是否更好”，不是“现在烦不烦”。先拿 3 个岗位比较薪资、团队和成长。外面没有明显变好，就先别急着走。${motion}`,
    direction: `如果你问方向，这卦看的是新方向有没有入口。先找 2 个已经在做的人聊清楚：怎么入门、收入怎样、代价是什么。聊完还想去，再继续。${motion}`,
    side: `如果你问副业创业，这卦看的是有没有人付钱。先写清楚卖什么、多少钱、多久交付，再问 5 个可能买的人。有人付钱，再谈做大。${motion}`,
    money: `如果你问钱，这卦先看现金流。把每月固定支出、存款能撑多久、能多赚哪一笔写出来。账清楚了，害怕会少很多。${motion}`,
    romance: `如果你问一段关系，这卦看的是对方会不会一起解决问题。找个平静时间，只谈一个具体矛盾。看后续行动，不只听承诺。${motion}`,
    "new-love": `如果你问新的感情，这卦提醒你慢一点看相处。多见一次，多聊现实问题。你更放松、更像自己，才适合继续靠近。${motion}`,
    family: `如果你问家人，这卦不是让你吵赢，而是把话说具体：我难在哪里、希望你怎么帮、哪些事我现在做不到。${motion}`,
    people: `如果你问人际，这卦看的是消耗有没有被看见。先少答应一次，观察对方是否尊重。尊重边界，关系才有调整空间。${motion}`,
    study: `如果你问学习投入，这卦看它能不能带来作品、证书、面试机会或收入提升。说不清用途，就先体验一周。${motion}`,
    city: `如果你问换城市，这卦先看落脚点。新地方要有工作、住处、生活成本和能求助的人。否则只是把压力搬到另一处。${motion}`,
    general: `这卦先看下一步，不替你把整件事一次定死。先问一个人、查一个条件、定一个底线。做完这一步，再判断。${motion}`,
  };
  return stories[kind] || stories.general;
}

function getOracleStuckPoint(a, lens, question) {
  const kind = a.oracleKind || inferOracleKind(question);
  const points = {
    work: "关键是外面是否真的更好。先看岗位和 offer，不要只凭烦躁判断。",
    direction: "关键是新方向能不能接住你的经验。先问清门槛、收入和日常状态，再判断。",
    side: "关键是有没有付费客户。没有报价、订单或试用前，先别投大钱。",
    money: "关键是现金流。收入、固定支出、债务和应急钱要先摊开。",
    romance: "关键是对方有没有行动变化。承诺好听不够，要看问题出现后怎么做。",
    "new-love": "关键是节奏。先多相处几次，看你是否更安心、更像自己。",
    family: "关键是边界。把你做不到的事说清楚，比一直忍着更有用。",
    people: "关键是消耗有没有停止。少答应一次，看对方是否尊重。",
    study: "关键是学习能不能换来作品、证书、机会或收入提升。",
    city: "关键是落脚点。工作、住处、生活成本和求助对象都要先看清。",
    general: `关键是把「${question}」拆成一个能查清、能沟通、能承担的问题。`,
  };
  return points[kind] || lens.issue;
}

function getShareStory(a, playerType, fate, pressure) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const pressureText = pressure > 70 ? "最近压力偏高，不适合马上做大决定。" : "现在还有空间把下一步做扎实。";
  return `这次主要看「${trouble}」。你更像${playerType}：${pressureText}卦象「${fate.sign}」给出的提醒是：${fate.plainAction}`;
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
  const base = hexagramLibrary[cast.seed % hexagramLibrary.length] || fateLibrary[cast.seed % fateLibrary.length];
  const enriched = composeHexagram(base, a, cast, risk, pressure);
  return {
    ...enriched,
    cast,
    meaning: a.mode === "命运模式" ? [
      { label: "提醒", text: enriched.plainMeaning },
      { label: "卡点", text: enriched.plainProblem },
      { label: "先做", text: enriched.plainAction },
    ] : [
      { label: "提醒", text: enriched.plainMeaning },
      { label: "卡点", text: enriched.plainProblem },
      { label: "先做", text: risk > 70 ? `${enriched.plainAction} 但先把止损线写清楚。` : enriched.plainAction },
    ],
  };
}

function composeHexagram(base, a, cast, risk, pressure) {
  const question = a.oracleQuestion || (Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "眼前这件事");
  const state = a.state || "当前状态";
  const lens = getOracleLens(a);
  const moving = cast.yangCount >= 4;
  const quiet = cast.yangCount <= 2;
  const rhythm = moving ? "事情更容易被推动" : quiet ? "现在更适合先准备" : "一半要动，一半要守";
  const pressureHint = pressure > 70
    ? "你现在压力偏高，先别把焦虑当成答案。"
    : "你还有余地慢慢判断，不必一次做完决定。";
  const riskHint = risk > 70
    ? "你可以走快一点，但要先留退路。"
    : risk < 45
      ? "你适合稳一点推进，不必用大动作证明自己。"
      : "你适合边做边看，不要一开始就押太满。";
  const storyOpeners = [lens.story, `这卦提醒你：先别追最终答案，先确认下一步能做什么。`, `你现在处在「${state}」。先把钱、时间和代价写清楚，再决定投入多少。`];
  const story = pickBySeed(`hex-story-${base.sign}`, a, storyOpeners);
  const reading = `这卦落在「${question}」上。${rhythm}。${pressureHint}`;
  const action = `${base.action} ${riskHint}`;
  const warning = `${base.warning} 先看清代价和边界，再决定投入多少。`;
  const plainMeaning = moving ? `现在可以推进，但要留退路。` : quiet ? `现在先准备，别急着做大动作。` : `先得到一个反馈，再决定要不要继续。`;
  const plainProblem = pressure > 70 ? `${lens.issue} 但你现在情绪偏满，先别在最焦虑的时候拍板。` : lens.issue;
  const plainAction = moving ? lens.moving : quiet ? lens.quiet : lens.mixed;
  const plainAvoid = risk > 70 ? `${lens.avoid} 尤其不要一上头就全押。` : lens.avoid;
  return {
    sign: base.sign,
    tag: base.tag,
    symbol: base.symbol,
    oracle: base.oracle,
    story,
    reading,
    action,
    warning,
    plainMeaning,
    plainProblem,
    plainAction,
    plainAvoid,
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
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const pools = {
    "职业去留": [
      ["聊", "event-chat", "有人提到岗位机会。先问薪资、团队、加班和成长。", 46],
      ["面", "event-chat", "一次面试让你看清外面的机会是否真的更好。", 42],
      ["历", "event-archive", "你会想改简历。重点补一段能证明结果的项目经历。", 38],
      ["停", "event-rest", "你会很想辞职。先睡一觉，别当天拍板。", 34],
    ],
    "方向重选": [
      ["课", "event-skill", "你会看到新课程。先试听一节，别当天报名。", 40],
      ["作", "event-skill", "适合做一个能展示的作品。做完再判断喜不喜欢。", 44],
      ["问", "event-route", "找业内人聊 20 分钟，通常比自己想很久更有用。", 36],
      ["门", "event-door", "新方向会露出入口。先看门槛和收入。", 32],
    ],
    "自己做事": [
      ["问", "event-side", "冒出新点子时，先问 5 个人愿不愿意付钱。", 42],
      ["钱", "event-money", "有人问价格时，别太快免费。先报一个小价。", 34],
      ["门", "event-door", "熟人可能递来小单。先说清价格和交付时间。", 38],
      ["停", "event-rest", "别急着砸钱做大。先卖出第一单。", 36],
    ],
    "钱不够稳": [
      ["钱", "event-money", "一笔支出会提醒你算账。先看存款能撑几个月。", 48],
      ["聊", "event-chat", "适合谈一次涨薪或报价。先准备你做出的结果。", 35],
      ["单", "event-side", "可以接一个小项目补现金流，但别一开始做太大。", 32],
      ["停", "event-rest", "想花钱缓解焦虑时，先等 24 小时。", 39],
    ],
    "关系消耗": [
      ["界", "event-home", "会有一次边界被碰到。少解释，直接说你做不到。", 43],
      ["聊", "event-chat", "一次沟通能看清对方愿不愿意调整。看行动。", 37],
      ["停", "event-rest", "你会想躲开所有人。先减少一件消耗。", 34],
      ["问", "event-route", "一次互动后如果更累，就先拉开一点距离。", 40],
    ],
  };
  const rawPool = pools[trouble] || [
    ["问", "event-route", `你会再次想到「${trouble}」。把它写成一个能回答的问题。`, 38],
    ["聊", "event-chat", "一次聊天会给你新信息。重点听事实，不只听安慰。", 34],
    ["看", "event-side", "一个小机会会出现。先看成本和回报，别一开始投太多。", 36],
    ["停", "event-rest", "状态很乱时，先停一下，等情绪过去再决定。", 32],
  ];
  const pool = rawPool.map(([icon, iconClass, text, base]) => ({ text, base, tone: "signal", icon, iconClass }));
  const offset = Math.abs(hash(`${a.state}${a.resources}${risk}`)) % pool.length;
  return [0, 1, 2, 3].map((i) => {
    const item = pool[(offset + i) % pool.length];
    const drift = Math.abs(hash(`${item.text}-${JSON.stringify(a)}-${i}`)) % 23;
    const riskBoost = risk > 70 && ["家", "技", "压"].includes(item.icon) ? 10 : 0;
    return { ...item, probability: clamp(item.base + drift + riskBoost, 18, 82) };
  });
}

function getShareUrl() {
  const fallback = "https://life-sandbox.vercel.app/";
  if (!location || location.protocol === "file:") return fallback;
  const host = location.hostname;
  if (["localhost", "127.0.0.1", "0.0.0.0", ""].includes(host)) return fallback;
  return `${location.origin}${location.pathname}`;
}

function makeShareText(a, playerType, fate, paths, line, riskType, reading = null) {
  const url = getShareUrl();
  if (a.mode === "命运模式") {
    const question = getOracleQuestionDisplay(a);
    const finalReading = reading || buildOracleReading(a, fate);
    return `我的时间卦：${fate.sign}\n\n所问：${question}\n判断：${finalReading.summary}\n卦面：${finalReading.why}\n建议：${finalReading.advice}\n避开：${finalReading.avoid}\n\n${url}\n#时间起卦 #人生沙盘`;
  }
  const recommended = paths.find((path) => path.recommended) || paths[1] || paths[0];
  return `我的人生沙盘结论：\n\n当前状态：${a.state || "未知"}\n主要困扰：${Array.isArray(a.troubles) ? a.troubles.join(" / ") : "未来不确定"}\n行动类型：${playerType}（${riskType}）\n\n建议先走：${recommended?.name || "先把关键问题查清"}\n理由：${recommended?.summary || "先得到反馈，再决定下一步。"}\n下一步：${recommended?.next || fate.plainAction}\n\n卦象提醒：${fate.sign}，${fate.plainMeaning}\n${line}\n\n${url}\n#人生沙盘 #时间起卦 #选择建议`;
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
  showToast("结论已复制");
}

async function exportShareCard() {
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
  const pageUrl = getShareUrl();
  const reading = data?.oracleReading || null;

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#090b16");
  gradient.addColorStop(0.48, "#17130e");
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
  ctx.strokeStyle = "rgba(245,221,146,0.16)";
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
  ctx.fillText(oracleOnly ? "本次卦解" : "结论摘要", 120, 825);
  ctx.fillStyle = "#d7d9e3";
  ctx.font = "500 24px sans-serif";
  const posterStory = oracleOnly
    ? [reading?.summary, reading?.advice].filter(Boolean).join(" ") || getFateDetail(state.answers, data.fate, data.playerType, reading).story
    : story;
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
      ctx.fillStyle = path.recommended ? "rgba(245,197,66,0.12)" : "rgba(255,255,255,0.055)";
      roundRect(ctx, x, cardY, 194, 88, 8);
      ctx.fill();
      ctx.strokeStyle = path.recommended ? "rgba(245,197,66,0.56)" : "rgba(245,197,66,0.2)";
      ctx.stroke();
      ctx.textAlign = "left";
      ctx.fillStyle = path.recommended ? "#f8d879" : "#f5c542";
      ctx.font = "900 18px sans-serif";
      ctx.fillText(path.short, x + 16, cardY + 32);
      ctx.fillStyle = "#d7d9e3";
      ctx.font = "600 17px sans-serif";
      wrapCanvasText(ctx, path.verdict || path.income, x + 16, cardY + 60, 160, 22, 2);
    });
  }

  ctx.fillStyle = "#f3f0ff";
  ctx.font = "800 22px sans-serif";
  ctx.textAlign = "left";
  wrapCanvasText(ctx, line, 110, 1100, 520, 28, 2);

  ctx.fillStyle = "rgba(255,255,255,0.065)";
  roundRect(ctx, 610, 1030, 190, 122, 8);
  ctx.fill();
  ctx.strokeStyle = "rgba(245,197,66,0.22)";
  ctx.stroke();
  ctx.fillStyle = "#f5c542";
  ctx.font = "900 18px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("访问链接", 632, 1064);
  ctx.fillStyle = "#d7d9e3";
  ctx.font = "600 17px sans-serif";
  wrapCanvasText(ctx, pageUrl, 632, 1095, 146, 24, 3);

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
  ctx.strokeStyle = "rgba(245,221,146,0.22)";
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

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = Infinity) {
  let line = "";
  const chars = [...text];
  let lines = 0;
  for (const char of chars) {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line) {
      if (lines >= maxLines - 1) {
        ctx.fillText(line.slice(0, Math.max(0, line.length - 1)), x, y);
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

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"]/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  }[char]));
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/'/g, "&#39;");
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

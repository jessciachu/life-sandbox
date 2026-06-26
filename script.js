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
    compact: true,
    options: ["一线城市", "新一线城市", "二线城市", "三四线城市", "县城/小城", "海外/流动中"],
    descriptions: ["如北上广深：机会密，消耗也高", "如杭州/成都/南京：上升通道多，节奏分化", "省会或强区域城市：稳定与机会并存", "熟人网络更强，转换成本更低", "生活半径小，安全感和天花板同时存在", "坐标不固定，人生地图正在重绘"],
  },
  {
    key: "industry",
    title: "你的主要工作场域更接近哪类？",
    hint: "选最像你日常的那一类，不需要完全准确。系统会用它判断增长速度和抗风险方式。",
    compact: true,
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
    compact: true,
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
let referenceInsights = null;

const fateLibrary = [
  {
    sign: "风起未定",
    tag: "巽风之象",
    symbol: "△",
    oracle: "风先到，路还没有完全显形。适合听信号，不适合急着拍板。",
    story: "山谷里先起了一阵风，草叶倒向同一边，但远处的路牌还没露出来。守夜人没有立刻启程，他把灯举高，等第二阵风吹过：如果两次风向一致，才说明这不是错觉。",
    reading: "这卦像一个早到的消息：你已经感觉到变化，但证据还不够厚。现在最有价值的不是勇敢宣布决定，而是连续观察几个信号是否指向同一处。",
    action: "接下来三天，只记录真实信号：谁邀请你、哪个机会反复出现、哪件事让你身体先紧起来。不要只听脑内辩论。",
    warning: "忌把一时兴奋当成天命，也忌因为还没看清就假装什么都没发生。",
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
    oracle: "门已经出现，但还需要一次小动作把它推开。",
    story: "旧书房里有一面墙，白天看只是墙。夜里烛火偏了一寸，墙缝里露出铜色门环。它并不轰鸣，也不召唤，只安静地等一个人伸手试一下。",
    reading: "这卦主显现。你可能已经拥有入口，只是把它当成普通线索忽略了。一次聊天、一次投递、一个小项目，都可能是门环。",
    action: "今天推一扇小门：发出一条消息、投一次简历、约一次沟通，目标不是成功，是确认门后有没有回声。",
    warning: "忌等到万事俱备才行动；门会先开一条缝，不会先给你完整地图。",
  },
  {
    sign: "水面藏桥",
    tag: "坎水之象",
    symbol: "◌",
    oracle: "表面像没路，其实桥在水下。先降噪，路会浮出来。",
    story: "渡口没有船，水面也没有桥。少年急着喊人，老人却把灯放低，照见水下排列整齐的石墩。桥一直在，只是水声太响，人心太急。",
    reading: "这卦说的是隐藏通道。你以为自己没有路，可能只是信息太吵、情绪太满，导致看不见已经存在的资源。",
    action: "先做一次降噪：删掉最吵的假问题，只保留一个真正要验证的事实。桥会从事实里浮出来。",
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
    sign: "火照旧卷",
    tag: "离火之象",
    symbol: "✧",
    oracle: "旧问题被照亮了。你不是第一次遇见它，只是这次看得更清楚。",
    story: "火光落在一卷旧纸上，纸边已经发黄。占卦的人才看见，自己以为的新困境，三年前就写过一遍，只是那时用的是别的名字。火不是烧毁它，火是让字迹显形。",
    reading: "这卦主复现。现在困扰你的事，可能不是偶发，而是一种反复出现的模式：讨好、拖延、害怕失去、或总在临门一脚撤退。",
    action: "回看过去三次相似情境：你每次在哪里退缩，在哪里硬撑，在哪里没有说真话。答案藏在重复里。",
    warning: "忌只怪外部环境。旧卷重现，是因为有一段内在脚本还没改写。",
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
    reading: "这卦重人和。你当前的突破口可能不在独自苦想，而在新的连接、旧关系的新用法，或一次高质量对话。",
    action: "找一个能给真实反馈的人，不求安慰，只问：如果是你，会先验证哪一步？",
    warning: "忌只找认同你的人。真正有用的盟友，会温和但准确地指出盲点。",
  },
  {
    sign: "天光压顶",
    tag: "乾天之象",
    symbol: "✶",
    oracle: "上限正在召唤你，但别让野心把呼吸感挤没。",
    story: "高塔顶端有光，年轻的法师一路往上跑，跑到胸口发紧才发现：光不是奖杯，是考题。越接近高处，越要知道自己为什么上去，否则塔会把人变成影子。",
    reading: "这卦主上限与压力同来。你可能正在被更大的舞台吸引，但也容易把价值感全部押在结果上。野心可以有，呼吸也要有。",
    action: "给野心写边界：你愿意为它投入什么，不愿意牺牲什么。没有边界的上升，会变成消耗。",
    warning: "忌用更高目标惩罚现在的自己。上限不是绞索，是方向。",
  },
  {
    sign: "雾里留灯",
    tag: "守灯之象",
    symbol: "◍",
    oracle: "不确定不是失败。你现在最该保住的是那一点还没灭的光。",
    story: "雾夜里，灯塔的光并不能照完整片海，只能一圈一圈扫过去。船长没有因此骂灯太小，他知道，只要光还在，船就不会把恐惧误认成方向。",
    reading: "这卦很温柔，也很清醒。你现在也许看不远，但不代表走错。先保住让你还愿意继续的东西，判断力会慢慢回来。",
    action: "别急着定终局。先做一件能恢复能量的小事，再处理一个能减少混乱的小决定。",
    warning: "忌在低能量时给人生下重判。雾天不适合审判自己，适合守灯。",
  },
  {
    sign: "星落背包",
    tag: "蓄资之象",
    symbol: "✹",
    oracle: "先清点手里的筹码。真正能让你转身的，是可用资源。",
    story: "流星落进旅人的背包，他以为那是神谕，打开一看，却是一枚很实用的指南针。命运有时不直接给答案，只提醒你：先看看自己已经带了什么。",
    reading: "这卦主资源盘点。与其问能不能赢，不如先问：我现在有什么钱、技能、人脉、时间、退路？答案不在天上，在背包里。",
    action: "今晚列出五个筹码：可用存款、可迁移技能、能请教的人、可展示作品、最坏情况下的退路。",
    warning: "忌空手谈重启。真正的转身不是热血，是筹码摆齐之后的从容。",
  },
];

const hexagramLibrary = `
乾为天|乾|天行刚健|天上有天，光从高处压下来。它问的不是你敢不敢，而是你有没有足够清醒地驾驭上升。|适合主动推进、争取资源、承担更大责任；先把目标写成可执行的三步。|忌只凭一口气硬冲，越是上升期越要留出休息和复盘。
坤为地|坤|厚土承载|大地不催人，它只要求根扎稳。事情要成，先看承载力够不够。|先补地基：现金流、身体、基本功、稳定关系；让下一步站得住。|忌嫌慢，地基没干就盖高楼，后面每一步都会晃。
水雷屯|屯|草木初生|雷在水下，芽在土中，开局混乱不是坏事，是新局正在挤出来。|把大事拆小，从第一个真实反馈开始；先活下来，再谈漂亮。|忌一开始就要求顺利，初生之局最怕急着证明自己。
山水蒙|蒙|雾中启蒙|山下有水，雾气绕路。你不是没答案，是还缺一位老师或一组事实。|去问懂行的人，补最关键的一课；把不知道的地方诚实列出来。|忌装懂，也忌把迷茫包装成命运。
水天需|需|云上等雨|云在天上，雨还没落。等待不是停滞，是给条件成熟留位置。|先备粮、备证据、备选项；等窗口出现时能马上行动。|忌在焦虑里提前消耗，也忌什么都不准备地等。
天水讼|讼|言语成刃|天与水相背，局里有争执、误会或利益边界。先分清问题再开口。|把诉求写清楚，用事实而不是情绪沟通；必要时请第三方校准。|忌争输赢忘了目标，也忌忍到最后一次爆发。
地水师|师|众人列阵|地下有水，队伍在暗处集结。此局重组织、纪律和可依靠的人。|找盟友，定规则，分任务；不要一个人扛完整场仗。|忌没有章法地动员，也忌把所有人都当成救命绳。
水地比|比|近水结盟|水贴着地流，靠近能滋养，也会暴露边界。关系是资源也是考题。|选择可靠的人同行，明确彼此能给什么、不能给什么。|忌为了被接纳而失去判断，也忌独自硬撑。
风天小畜|小畜|风收云气|风在天上聚云，还没到大雨。小积累正在形成，但火候未足。|先攒作品、案例、存款或证据；让小筹码连续出现。|忌刚有苗头就全押，云还没厚到能下雨。
天泽履|履|踏薄冰|天在上，泽在下，脚下很亮也很滑。礼数、边界、顺序比勇气更重要。|按规则试探，先走一步看一步；关键沟通留痕。|忌踩线、越级、赌对方会懂你的潜台词。
地天泰|泰|天地相交|天地交泰，上下通气。事情有顺流感，适合把积累推出去。|抓住顺势窗口，主动发起合作、面试、发布或谈判。|忌舒服到忘记升级，顺风也要掌舵。
天地否|否|门窗闭合|天地不交，话到不了、人也不动。堵住的局要先找通气口。|先换沟通对象或信息渠道；别在同一扇不开的门前耗尽自己。|忌把暂时不通解释成自己不行。
天火同人|同人|火下聚众|火在天光下，人因共同目标聚到一起。此局利同行、社群、共同创作。|把你的目标说出来，找到同频的人共做一件小事。|忌为了合群稀释自己的核心判断。
火天大有|大有|光照仓廪|火在天上，仓库被照亮。你手里其实有可用筹码，只是还没整理成牌。|盘点资源，把作品、经历、关系重新包装成可交换价值。|忌只盯缺的，忽略已经在手里的。
地山谦|谦|山藏地下|高山藏在地里，实力不必喧哗。低姿态能换到更长的路。|用请教、协作、复盘打开局面；把锋芒用在作品里。|忌自我贬低，谦不是缩小自己。
雷地豫|豫|雷出地上|雷声出地，心先动起来。兴奋有用，但需要节奏承接。|趁有能量先启动小项目，别把热情全花在宣布上。|忌只追即时爽感，三天热度不是长期动力。
泽雷随|随|泽中听雷|雷在泽下，外界信号会牵动你。跟随可以，但要知道跟谁、为何。|观察趋势，选择一个值得跟进的样本或导师。|忌盲目追热点，别人的路不是你的命盘。
山风蛊|蛊|旧器生虫|山下有风，旧系统里有虫。不是换个外壳就能好，要清理根部。|修旧账、旧习惯、旧关系模式；先处理腐坏处。|忌只做表面改版，真正的问题会换个名字回来。
地泽临|临|岸边将近|地临泽上，机会靠近了。你需要靠前一点，而不是远远观望。|主动靠近机会，发消息、约面谈、试一次真实合作。|忌明明门开了还继续等待完美时机。
风地观|观|登台观象|风行地上，适合站高一点看全局。先观察格局，再决定站位。|做一次行业/关系/现金流全景图，找出真正牵动全局的点。|忌只盯眼前一件烦心事。
火雷噬嗑|噬嗑|咬开硬结|火与雷同来，局里有硬结，必须咬开才会通。|处理一个拖很久的冲突或决定，明确规则和代价。|忌绕开核心问题，越绕越耗。
山火贲|贲|山中有光|山里有火，外观开始重要。表达、包装、作品呈现会改变别人看你的方式。|整理简历、作品集、主页或提案，让价值被看见。|忌只做漂亮表面，光下面仍要有山。
山地剥|剥|墙皮剥落|山附地上，旧保护层正在脱落。失去一些东西，反而露出真实结构。|减少消耗，保核心资产；该断舍离的先断。|忌在剥落期还拼命维持体面。
地雷复|复|一阳来复|雷藏地下，微小的生机回来了。它不大，但是真的。|抓住一个能恢复行动感的小习惯或小机会。|忌嫌起点太小，复苏本来就从一线开始。
天雷无妄|无妄|不妄自求|天上有雷，意外会来，但不是所有意外都该追。守正比投机重要。|回到事实和初心，按正道做该做的事。|忌把偶然当神谕，也忌用幻想替代准备。
山天大畜|大畜|山中蓄力|山蓄天光，大能量被收住。不是不能动，是先蓄够。|沉淀硬技能、资金、作品或资历；准备一次更大的跃迁。|忌急着释放，蓄力不足会让好机会变成消耗。
山雷颐|颐|养口养心|山下有雷，先养自己，才有力气处理外界。输入质量决定输出质量。|调整作息、信息源和学习内容；少吃噪音，多补营养。|忌用垃圾信息喂养焦虑。
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
水风井|井|古井有泉|水在木上，井还在，只是需要修。旧资源可再用。|回到长期资产：专业、人脉、作品、信用，重新打井。|忌嫌旧资源普通，井水靠维护不是靠惊艳。
泽火革|革|火炼旧皮|泽中有火，旧皮要换。变革会痛，但也会让形态更新。|选一个必须改的制度、身份或习惯，设定过渡期。|忌只喊改变，不设计承接结构。
火风鼎|鼎|新器成形|火在风上，鼎成。适合把散乱材料炼成新作品、新身份。|整理方法论，做一个可展示的成果。|忌一直准备食材，却不真正开火。
震为雷|震|雷声惊醒|雷上雷下，惊动很强。先稳住，再行动。|把突发消息转成清单：事实、影响、下一步。|忌被第一声雷吓到乱跑。
艮为山|艮|止于其所|山上有山，止是智慧。该停的地方要停。|暂停无效消耗，守住边界，给判断力回血。|忌把停止误会成失败，止住才能看清。
风山渐|渐|雁行渐进|风过山，雁一程一程飞。此局宜循序渐进。|给目标排阶段，不求一步到位。|忌拿别人的速度惩罚自己的节奏。
雷泽归妹|归妹|仓促成约|雷动泽上，关系或合作来得快。心动之外要看结构。|看清角色、资源、责任，再决定是否进入。|忌因气氛热烈就答应长期绑定。
雷火丰|丰|雷火盛大|雷火同明，局面很盛，信息也很满。适合收获，也要防过载。|抓关键成果，不要同时接太多舞台。|忌高峰期贪多，丰盛也会压垮人。
火山旅|旅|旅人借宿|火在山上，人在途中。此局重临时性、适应力和边界。|把自己当旅人：轻装、观察、借力，不急着定居。|忌在临时局里投入永久成本。
巽为风|巽|风入缝隙|风上风下，柔而能入。持续渗透比硬碰更有效。|用沟通、作品、长期出现一点点打开局。|忌太急着要结果，风靠持续不靠蛮力。
兑为泽|兑|泽上有悦|泽上泽下，喜悦和表达能开局。轻松不是浅，真实的愉悦有方向。|找回让你愿意表达的事情，用对话打开机会。|忌用讨好换愉快，真正的悦不该透支自己。
风水涣|涣|风散水面|风行水上，散开旧结。适合破冰、换气、重新流动。|先把卡住的事说开或拆开，让系统恢复流动。|忌继续憋着，水面不动会发闷。
水泽节|节|水有堤岸|水在泽上，节制带来自由。边界不是限制，是让水不泛滥。|设预算、时间盒、沟通边界和试错期限。|忌把自由理解成无限消耗。
风泽中孚|中孚|风过泽心|风在泽上，诚意能抵达人心。此局重信任和真实表达。|说真话，给证据，建立可信关系。|忌包装过度，别人会先感到不真。
雷山小过|小过|小鸟过山|雷在山上，小事可以过，大事宜慎。先做小通过，不求大翻盘。|从小动作、小承诺、小验证开始。|忌小题大做，也忌大事草率。
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
  const reference = getReferenceProfile(a);

  const paths = buildPaths(a, { risk, wealth, growth, stability, pressure }, reference);

  const events = pickEvents(a, risk);
  const saveId = `LV${ageLevel} · ${city} · ${playerType}`;
  const narrative = getResultNarrative(a, playerType, fate, pressure, reference, { risk, wealth, growth, stability, paths });
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
    reference,
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
  document.querySelector("[data-mobile-conclusion]")?.remove();
  $("[data-result-narrative]").insertAdjacentHTML("beforebegin", oracleOnly ? "" : renderMobileConclusion(data));
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
    toggle.textContent = "展开白话解读";
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

function renderMobileConclusion(data) {
  const next = data.narrative?.plainNext || data.narrative?.firstMove || data.narrative?.actionShort || `先把「${data.fate.sign}」对应的问题拆成一个小动作。`;
  const situation = data.narrative?.plainSituation || data.narrative?.tension;
  const advice = data.narrative?.plainAdvice || data.narrative?.decision;
  return `
    <div class="mobile-conclusion" data-mobile-conclusion>
      <div class="mobile-conclusion-main">
        <span>你现在的情况</span>
        <strong>${data.narrative.plainTitle}</strong>
        <p>${situation}</p>
      </div>
      <div>
        <span>建议怎么做</span>
        <strong>先别做大决定</strong>
        <p>${advice}</p>
      </div>
      <div>
        <span>今天先做什么</span>
        <strong>${data.narrative.firstMoveTitle}</strong>
        <p>${next.replace(/^下一步：/, "")}</p>
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
  button.textContent = willOpen ? "收起白话解读" : "展开白话解读";
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

function buildPaths(a, score, reference = getReferenceProfile(a)) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const decision = getDecisionLens(a, score, reference);
  const stableIncome = score.wealth > 68 ? "收入大概率稳中小涨" : "收入先求稳定，小幅改善";
  const optimizeIncome = score.growth > 68 ? "有机会换到更高收入" : "收入可能小涨，重点是验证方向";
  const rebuildIncome = score.risk > 70 ? "上限更高，但波动也更大" : "前期收入可能下降，需要准备缓冲";

  return [
    {
      tone: "green",
      name: "A线 · 继续现在",
      short: "继续现在",
      summary: `适合你还没准备好大改变的时候。先保住当前收入和生活节奏，把「${trouble}」带来的压力降下来。它的好处是稳，坏处是问题可能过一阵还会回来。`,
      mobile: `先保住收入和节奏，再观察「${trouble}」是不是反复出现。`,
      income: stableIncome,
      risk: "风险：容易拖久了又开始焦虑",
      years: [
        { year: "现在", title: "先稳住", copy: `先处理最影响你的事：${decision.firstRepair}。` },
        { year: "1-3个月", title: "补筹码", copy: "存一点钱，整理简历/作品，找人聊真实情况。" },
        { year: "3个月后", title: "再判断", copy: "如果问题还反复出现，就说明不能只靠忍。" },
      ],
    },
    {
      tone: "blue",
      name: "B线 · 小幅调整",
      short: "小幅调整",
      summary: `这是最建议先试的一条路。你不用马上辞职或重来，而是先做一个小测试：聊岗位、投简历、接项目、谈内部机会。它能帮你知道外面到底有没有路。`,
      mobile: `先做一个小测试，比一直想更快知道有没有机会。`,
      income: optimizeIncome,
      risk: "风险：测试不能无限拖，要设截止日",
      years: [
        { year: "7天", title: "先问/先试", copy: decision.smallStep },
        { year: "30天", title: "看反馈", copy: "至少完成一次面试、沟通、试稿、报价或合作尝试。" },
        { year: "90天", title: "决定加码", copy: "有反馈就继续，没反馈就换方法，不要只靠感觉。" },
      ],
    },
    {
      tone: "red",
      name: "C线 · 大幅改变",
      short: "大幅改变",
      summary: `这是换工作、转行、创业或换城市这种大动作。不是不能做，但要先算清钱、时间和退路。否则它看起来像改变，实际可能只是被压力推着逃走。`,
      mobile: `可以大改，但先算清钱、时间和退路。`,
      income: rebuildIncome,
      risk: "风险：前期不稳定，容易后悔或收入回撤",
      years: [
        { year: "前3个月", title: "最不稳", copy: "会有不适应和反复怀疑，所以一定要留退路。" },
        { year: "3-12个月", title: "重新证明", copy: "你要把旧经验变成新方向能看懂的能力。" },
        { year: "1年后", title: "看是否跑通", copy: "跑通就继续加码，没跑通也要及时止损。" },
      ],
    },
  ];
}

function getDecisionLens(a, score, reference = getReferenceProfile(a)) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "这件事";
  const stableWhen = score.pressure > 70 ? "压力很高、判断力被噪音占满的时候" : "仍能积累资源、但需要保留选择权的时候";
  const firstRepair = score.wealth < 46 ? "现金流" : score.pressure > 70 ? "睡眠和精力" : (reference.trouble?.label || trouble);
  const smallSteps = {
    "职业去留": "找两位同行聊真实岗位，不只看招聘 JD。",
    "方向重选": "列出新方向最小入场券：课程、作品、证书或人脉。",
    "自己做事": "先卖一个很小的服务或产品，不急着注册一家公司。",
    "钱不够稳": "把未来三个月固定支出写出来，先算能承受多大波动。",
    "意义感变低": "记录一周里让你有能量的任务，别只记录让你耗尽的任务。",
    "关系消耗": "先划出一个不解释的边界，看看对方如何反应。",
    "未来看不清": "把最担心的三件事写成可验证问题，而不是抽象恐惧。",
  };
  return { stableWhen, firstRepair, smallStep: reference.trouble?.next || smallSteps[trouble] || "找一个真实场景试一下，不要只在脑内推演。" };
}

function getReferenceProfile(a) {
  const db = referenceInsights || {};
  const troubleKey = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const age = db.age?.[a.age] || fallbackReference("age", a.age);
  const city = db.city?.[a.city] || fallbackReference("city", a.city);
  const industry = db.industry?.[a.industry] || fallbackReference("industry", a.industry);
  const trouble = db.troubles?.[troubleKey] || fallbackReference("trouble", troubleKey);
  const resource = db.resources?.[a.resources] || fallbackReference("resource", a.resources);
  return {
    age,
    city,
    industry,
    trouble,
    resource,
    benchmark: `同阶段参考：${age.sample}${city.signal ? ` 你所在的${city.label}还会放大这一点：${city.signal}` : ""}`,
    guardrail: `${resource.guardrail || "先确认安全垫，再决定动作大小。"} ${trouble.metric || "把问题写成可验证条件。"}`,
    next: trouble.next || resource.experiment || "先做一次低成本验证。",
  };
}

function fallbackReference(type, value = "") {
  const common = {
    age: { label: value || "当前阶段", sample: "常见卡点是想要改变，但缺少足够真实的反馈。", window: "适合先做小实验，再决定是否加码。" },
    city: { label: value || "当前地图", signal: "机会和消耗会同时影响你的判断。", cost: "需要把现实成本写清楚。" },
    industry: { label: value || "当前行业", asset: "可迁移能力、真实作品和人脉反馈是核心筹码。", risk: "最大风险是只在脑内推演，不去拿市场反馈。" },
    trouble: { label: value || "当前问题", metric: "重点看它是信息不足、资源不足，还是精力不足。", next: "把它拆成一个 7 天内能验证的小动作。" },
    resource: { label: value || "当前缓冲", guardrail: "先确认安全垫，再决定动作大小。", experiment: "适合做轻量、短周期的验证。" },
  };
  return common[type];
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

function getResultNarrative(a, playerType, fate, pressure, reference = getReferenceProfile(a), score = {}) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来不确定";
  const secondTrouble = Array.isArray(a.troubles) && a.troubles[1] ? a.troubles[1] : "选择成本";
  const state = a.state || "当前章节";
  const pressureLine = pressure > 70 ? "你现在压力偏高，先别在情绪最满的时候做大决定。" : "你可以开始试探，但要用真实反馈校准。";
  const decisionLens = getDecisionLens(a, { pressure, wealth: score.wealth ?? 50 }, reference);
  const wealthLow = (score.wealth ?? 50) < 48;
  const growthHigh = (score.growth ?? 50) > 68;
  const riskHigh = (score.risk ?? 50) > 70;
  const firstMoveTitle = wealthLow ? "先稳住钱" : pressure > 70 ? "先降压力" : growthHigh ? "先拿反馈" : "先小步试";
  const headline = pickBySeed("headline", a, [
    `先别急着推翻生活，先找一条能试的小路`,
    `你现在需要的不是答案，是一次真实验证`,
    `别把人生当单选题，先做一个可承受的试验`,
    `方向还没完全亮，但可以先点第一盏灯`,
  ]);
  const tension = pickBySeed("tension", a, [
    `你纠结的表面是「${trouble}」，真正卡住你的多半是「${secondTrouble}」和安全感的拉扯。`,
    `你现在像处在「${state}」：还能撑，但已经不想只靠忍耐往前走。`,
    `这不是简单想逃离现状，更像是在问：我继续投入，还值不值？`,
    `你不是完全没行动力，而是还没看清每条路要付什么代价。`,
  ]);
  const actionShort = decisionLens.smallStep;
  const decision = wealthLow
    ? `先别急着换工作、转行或创业。先把现金流稳住，让自己至少能承受一次小试错。`
    : riskHigh
      ? `你可以往外冲，但要先写清止损线：最多投入多少时间、多少钱，失败后怎么退回来。`
      : growthHigh
        ? `更值得先走优化线：用一次面试、一个项目或一次合作，看外面到底有没有机会。`
        : `不要急着做终局选择。先用低成本动作试一下，哪条路有反馈，再继续加码。`;
  const firstMove = wealthLow
    ? `先列出未来 3 个月必须花的钱，再决定自己能试多大。`
    : pressure > 70
      ? `先解决一个最吵的问题：睡眠、沟通、现金流，先救一个就好。`
      : actionShort;
  const window = pickBySeed("window", a, [
    `接下来 7 天适合做一次验证，30 天后再判断要不要继续。`,
    `短期不要追求彻底翻盘，先追求一次看得见的反馈。`,
    `机会不是等来的，是你把它拆成一个能做的动作之后才会出现。`,
  ]);
  const guard = reference.guardrail || (riskHigh ? "先画止损线，再谈上限。" : "先确认安全垫，再决定动作大小。");
  const plainReference = `${reference.age.label}、${reference.city.label}、${reference.industry.label}这几个条件放在一起，最该先看的不是“要不要立刻改变”，而是改变的成本你能不能扛住。`;
  const plainTitle = wealthLow
    ? "先把钱稳住，再谈改变"
    : pressure > 70
      ? "你需要先降压力，再做选择"
      : growthHigh
        ? "可以试试新机会，但别一把梭"
        : "先小步试，不要空想太久";
  const plainSituation = wealthLow
    ? `你现在最容易被「${trouble}」牵着走，但真正要先处理的是安全感。钱和退路不稳时，大改变会让压力更大。`
    : pressure > 70
      ? `你现在不是没想法，而是压力太满。这个状态下做决定，很容易把一时焦虑当成真正答案。`
      : `你不是必须马上选一条路。现在更适合先做一个小测试，看看外面有没有真实机会。`;
  const plainAdvice = wealthLow
    ? "先不要急着裸辞、转行或创业。先把现金流和退路准备好，再做下一步。"
    : riskHigh
      ? "可以往前冲，但先写清楚最多投入多少时间和钱，失败了怎么退回来。"
      : growthHigh
        ? "先用一次面试、一个项目或一次合作测试机会，不要只在脑子里想。"
        : "先用低成本方式试一下，有反馈再加码，没反馈就及时调整。";
  const plainNext = wealthLow
    ? "把未来 3 个月必须花的钱列出来，算清自己能承受多大的试错。"
    : pressure > 70
      ? "今天只处理一个最吵的问题：睡眠、沟通、现金流，先救一个。"
      : actionShort;
  return {
    headline,
    tension,
    decision,
    firstMoveTitle,
    firstMove,
    window,
    guard,
    plainTitle,
    plainSituation,
    plainAdvice,
    plainNext,
    reference: `${plainReference}${reference.guardrail ? ` ${reference.guardrail}` : ""}`,
    seen: `沙盘先读到「${trouble}」，再读到你停在「${state}」。这说明你要处理的不是一个选择，而是选择背后的压力。`,
    key: `你更像${playerType}。重点不是敢不敢变，而是能不能用可承受的成本换到真实反馈。`,
    action: `把「${trouble}」拆成一个 7 天内能完成的小动作：${actionShort}${pressureLine}`,
    actionShort,
    sign: `签面「${fate.sign}」的意思很简单：${fate.oracle}`,
  };
}

function renderResultNarrative(narrative) {
  return `
    <span>沙盘解读 · 先看这三句</span>
    <h3>${narrative.headline}</h3>
    <p class="narrative-lead">${narrative.tension}</p>
    <div class="narrative-points">
      <div class="narrative-card focus"><b>结论</b><p>${narrative.decision}</p></div>
      <div class="narrative-card"><b>理由</b><p>${narrative.reference}</p></div>
      <div class="narrative-card"><b>下一步</b><p>${narrative.firstMove}</p></div>
    </div>
  `;
}

function renderOracleNarrative(a, fate) {
  const question = a.oracleQuestion || "心中所求";
  const cast = fate.cast;
  const tendency = cast.yangCount >= 4 ? "事情会先动起来，再慢慢定下来" : cast.yangCount <= 2 ? "现在不宜硬推，先把准备补齐" : "有的部分该动，有的部分要先守住";
  return `
    <span>时间卦解 · 说人话版</span>
    <h3>${fate.sign}：这件事先别急着定输赢</h3>
    <p class="narrative-lead">你问的是「${question}」。这一卦的提示是：${tendency}。</p>
    <div class="narrative-points oracle-points">
      <p><b>现在卡点</b>${fate.reading}</p>
      <p><b>可以先做</b>${fate.action}</p>
      <p><b>别踩的坑</b>${fate.warning}</p>
    </div>
  `;
}

function getOracleOnlyNarrative(a, fate) {
  const question = a.oracleQuestion || "心中所求";
  const cast = fate.cast;
  const tendency = cast.yangCount >= 4 ? "事情会先动起来，再慢慢定下来" : cast.yangCount <= 2 ? "现在不宜硬推，先把准备补齐" : "有的部分该动，有的部分要先守住";
  return `你问的是：「${question}」。此刻落卦为「${fate.sign}」，${cast.yangCount}阳${6 - cast.yangCount}阴。简单说：${tendency}。${fate.reading} ${fate.action}`;
}

function getFateDetail(a, fate, playerType) {
  const question = a.oracleQuestion || (Array.isArray(a.troubles) && a.troubles[0]) || "眼前这件事";
  const moving = fate.cast.yangCount >= 4;
  const quiet = fate.cast.yangCount <= 2;
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : question;
  const story = `可以把这卦理解成一个提醒：你现在问的不是“会不会成功”，而是“下一步要不要马上动”。「${fate.sign}」给出的方向是：先把问题拆小，别让它一直停在脑子里。`;
  return {
    story,
    signals: [
      {
        title: moving ? "适合先动一下" : quiet ? "适合先准备" : "先动一小步",
        copy: moving ? "可以先联系一个人、投一次简历、问一次报价，但不要一下子把退路断掉。" : quiet ? "现在先补信息、补钱、补精力。准备不够时，硬冲只会更慌。" : "不要直接做大决定，先做一个小动作，看有没有真实反馈。",
      },
      {
        title: "真正卡住的点",
        copy: quiet ? "你不是没有答案，是现在状态太紧，判断力被消耗了。" : `真正耗你的可能不是「${trouble}」本身，而是它太大、太模糊，所以你一直不知道从哪下手。`,
      },
      {
        title: "最小动作",
        copy: playerType.includes("开拓") ? `${fate.action} 可以有野心，但先留退路。` : fate.action,
      },
    ],
    action: fate.warning,
  };
}

function getShareStory(a, playerType, fate, pressure) {
  const trouble = Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "未来看不清";
  const opening = pressure > 70 ? "你把一个反复发烫的问题放进沙盘。" : "你把当前章节摊开，等法阵落下一盏灯。";
  return `${opening}灯照到「${trouble}」，也照出你更像${playerType}。签面是「${fate.sign}」：${fate.reading}`;
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
      { label: "卦面", text: `以当前时间落出 ${cast.yangCount} 阳 ${6 - cast.yangCount} 阴。阳多则动，阴多则蓄；此卦偏「${cast.yangCount >= 4 ? "先动后定" : cast.yangCount <= 2 ? "先蓄后动" : "动静相持"}」。` },
      { label: "象意", text: enriched.reading },
      { label: "启示", text: enriched.action },
    ] : [
      { label: "卦面", text: `以当前时间落出 ${cast.yangCount} 阳 ${6 - cast.yangCount} 阴。你的盘面更偏「${cast.yangCount >= 4 ? "先动后定" : cast.yangCount <= 2 ? "先蓄后动" : "动静相持"}」。` },
      { label: "现实层", text: pressure > 70 ? `${enriched.reading} 当前压力噪音偏高，别把短期情绪误判成长期趋势。` : enriched.reading },
      { label: "行动层", text: risk > 70 ? `${enriched.action} 但先把止损线画在地上，让野心有边界。` : enriched.action },
    ],
  };
}

function composeHexagram(base, a, cast, risk, pressure) {
  const question = a.oracleQuestion || (Array.isArray(a.troubles) && a.troubles.length ? a.troubles[0] : "眼前这件事");
  const state = a.state || "当前章节";
  const moving = cast.yangCount >= 4;
  const quiet = cast.yangCount <= 2;
  const rhythm = moving ? "事情更容易被推动" : quiet ? "现在更适合先准备" : "一半要动，一半要守";
  const pressureHint = pressure > 70
    ? "你现在压力偏高，先别把焦虑当成答案。"
    : "你还有余地慢慢判断，不必一次做完决定。";
  const riskHint = risk > 70
    ? "你可以走快一点，但要先留退路。"
    : risk < 45
      ? "你适合稳一点试，不必用大动作证明自己。"
      : "你适合边试边看，不要一开始就押太满。";
  const storyOpeners = [
    `你可以把「${base.sign}」理解成一个现实场景：一个人站在岔路口，手里有想法，但还没把钱、时间和退路算清。`,
    `这卦像是在提醒你：先别问最后会怎样，先问今天能不能做一个小验证，让「${question}」从想法变成事实。`,
    `如果把「${state}」当成当前章节，这一卦不是让你立刻改命，而是让你先看清下一步的成本。`,
  ];
  const story = pickBySeed(`hex-story-${base.sign}`, a, storyOpeners);
  const reading = `这卦落在「${question}」上，意思是：${base.oracle} 简单说，${rhythm}。${pressureHint}`;
  const action = `${base.action} ${riskHint}`;
  const warning = `${base.warning} 不要把卦象当命令，它只是提醒你先看清代价和边界。`;
  return {
    sign: base.sign,
    tag: base.tag,
    symbol: base.symbol,
    oracle: base.oracle,
    story,
    reading,
    action,
    warning,
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
    { text: "有人把一个真实机会递到你面前，但它不会包装得很完美", base: 42, tone: "warm" },
    { text: "行业风向有一次小转弯，旧经验需要换一种说法", base: 36, tone: "blue" },
    { text: "副业或项目线索出现，适合先试卖一次，不适合立刻豪赌", base: 31, tone: "gold" },
    { text: "家庭或关系议题临时加重，影响你做决定的速度", base: 28, tone: "red" },
    { text: "旧技能撞到天花板，逼你补一个新筹码", base: 47, tone: "red" },
    { text: "熟人带来一张入场券，但真正的门槛在后面", base: 24, tone: "gold" },
    { text: "现金流提醒你放慢脚步，先算能承受几个月波动", base: 40, tone: "warm" },
    { text: "一个被你低估的能力开始变值钱，值得重新包装", base: 34, tone: "blue" },
    { text: "一次面试或聊天让你意识到，外面的标价和想象不同", base: 38, tone: "blue" },
    { text: "你会突然厌倦原来的叙事，但这未必等于必须离开", base: 33, tone: "warm" },
    { text: "某个长期搁置的技能开始召唤你，像旧抽屉里亮起的符号", base: 29, tone: "gold" },
    { text: "压力在某个普通工作日集中爆发，提醒你该修系统了", base: 44, tone: "red" },
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

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function trimText(value, limit) {
  return String(value || "").replace(/说人话版|AI|人工智能/g, "").trim().slice(0, limit);
}

function normalizeReading(raw) {
  return {
    title: trimText(raw.title, 18),
    summary: trimText(raw.summary, 100),
    why: trimText(raw.why, 90),
    advice: trimText(raw.advice, 90),
    avoid: trimText(raw.avoid, 80),
    detail: trimText(raw.detail, 140),
  };
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { error: "method_not_allowed" });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    json(res, 503, { error: "missing_openai_key" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const question = trimText(body.question, 80) || "心中所求";
    const note = trimText(body.note, 160);
    const lensLabel = trimText(body.lensLabel, 24) || "一般问题";
    const hexagram = body.hexagram || {};
    const cast = hexagram.cast || {};
    const yangCount = Number(cast.yangCount || 0);
    const yinCount = Math.max(0, 6 - yangCount);
    const prompt = `你是一个会解读时间卦的中文占问助手。不要装神弄鬼，不要说“我是AI”，不要说“说人话版”。

用户问题：${question}
补充背景：${note || "无"}
问题类别：${lensLabel}
起卦时间：${cast.time || "未知"}
卦象：${hexagram.sign || "未定"}（${hexagram.tag || ""}）
卦面说明：${hexagram.oracle || ""}
阴阳：${yangCount}阳${yinCount}阴

请结合“用户具体问题”和“卦象”输出 JSON，不要输出 Markdown：
{
  "title": "不超过12字的判断",
  "summary": "不超过80字，直接回应用户问题",
  "why": "不超过70字，解释卦象为什么这样看",
  "advice": "不超过70字，给一个现在能做的具体建议",
  "avoid": "不超过60字，提醒不要做什么",
  "detail": "不超过120字，有画面感但讲清楚"
}
要求：不要泛泛而谈；婚恋问题不要讲岗位、作品、收入；工作问题不要讲感情，除非用户明确问；不确定时给观察和沟通方法，不要断言未来。`;

    const response = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.72,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "你只返回可解析 JSON。" },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      json(res, response.status, { error: "openai_request_failed" });
      return;
    }

    const payload = await response.json();
    const content = payload?.choices?.[0]?.message?.content || "{}";
    const reading = normalizeReading(JSON.parse(content));
    json(res, 200, { reading });
  } catch (error) {
    json(res, 500, { error: "oracle_failed" });
  }
};

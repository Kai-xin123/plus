// Cloudflare Pages Function —— /api/data
// KV namespace 绑定名：plus，数据整体存在 key "all"

const KV_KEY = "all";

function json(s, status = 200) {
  return new Response(s, {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
function err(msg) {
  return json(JSON.stringify({ error: msg }), 500);
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    if (!env.plus) return err("未找到 KV 绑定 plus，当前绑定：" + Object.keys(env).join(","));
    const raw = await env.plus.get(KV_KEY);
    return json(raw || "{}");
  } catch (e) {
    return err("KV读取异常：" + e.message);
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  try {
    if (!env.plus) return err("未找到 KV 绑定 plus，当前绑定：" + Object.keys(env).join(","));
    const body = await request.text();
    await env.plus.put(KV_KEY, body);
    return json(JSON.stringify({ ok: true }));
  } catch (e) {
    return err("KV写入异常：" + e.message);
  }
}

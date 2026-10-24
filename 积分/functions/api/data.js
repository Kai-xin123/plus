// Cloudflare Pages Function —— /api/data
// KV namespace 绑定名：plus（在 Pages 项目 Bindings 里配置）
// 数据整体存在 KV 的 key "all"

const KV_KEY = "all";

export async function onRequestGet(context) {
  const { env } = context;
  const raw = await env.plus.get(KV_KEY);
  return new Response(raw || "{}", {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

export async function onRequestPost(context) {
  const { env, request } = context;
  const body = await request.text();
  await env.plus.put(KV_KEY, body);
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

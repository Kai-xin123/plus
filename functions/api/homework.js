// Cloudflare Pages Function —— /api/homework
// KV namespace 绑定名：plus，作业单独存在 key "homework"

const KV_KEY = "homework";

export async function onRequestGet(context) {
  const { env } = context;
  const raw = await env.plus.get(KV_KEY);
  return new Response(raw || JSON.stringify({ text: "" }), {
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

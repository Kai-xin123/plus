export async function onRequestGet(context) {
  const ip = context.request.headers.get("CF-Connecting-IP") || "unknown";
  return new Response(JSON.stringify({ ip }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}

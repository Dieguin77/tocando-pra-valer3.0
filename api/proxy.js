// Vercel Serverless Function — proxy server-side para as APIs de letras.
// Resolve o problema de CORS em produção: a requisição sai do servidor da
// Vercel (não do navegador), então não há bloqueio de CORS.
//
// Uso: /api/proxy?url=<URL-alvo-codificada>
// Por segurança (evitar SSRF / open proxy), só permite hosts da lista.

const ALLOWED_HOSTS = ["api.lyrics.ovh", "api.vagalume.com.br"];

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método não permitido." });
  }

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Parâmetro 'url' é obrigatório." });
  }

  let target;
  try {
    target = new URL(url);
  } catch {
    return res.status(400).json({ error: "URL inválida." });
  }

  if (target.protocol !== "https:" || !ALLOWED_HOSTS.includes(target.hostname)) {
    return res.status(403).json({ error: "Host não permitido." });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const upstream = await fetch(target.toString(), {
      headers: { "User-Agent": "tocando-pra-valer/1.0", Accept: "*/*" },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const body = await upstream.text();

    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "text/plain; charset=utf-8"
    );
    res.setHeader("Vary", "Accept-Encoding");
    // Cache na borda da Vercel para aliviar as APIs de origem
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(upstream.status).send(body);
  } catch (e) {
    const aborted = e?.name === "AbortError";
    return res.status(aborted ? 504 : 502).json({
      error: aborted ? "Tempo limite excedido." : "Falha ao acessar a API de origem.",
    });
  }
}

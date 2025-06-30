const PROXY_BASE = '/api'; // Ruta base a las funciones serverless (Vercel)

export async function getMarcas() {
  const res = await fetch(`${PROXY_BASE}/proxy-marcas`);
  const data = await res.json();
  return data.result || [];
}

export async function getModelos(marcaId) {
  const res = await fetch(`${PROXY_BASE}/proxy-modelos?marca=${encodeURIComponent(marcaId)}`);
  const data = await res.json();
  return data.result || [];
}

export async function getAnios(marcaId) {
  const res = await fetch(`${PROXY_BASE}/proxy-anios?marca=${encodeURIComponent(marcaId)}`);
  const data = await res.json();
  return data.result || [];
}

export async function cotizar(data) {
  const res = await fetch(`${PROXY_BASE}/proxy-cotizacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, recaptcha_response: 'sin-captcha' }),
  });
  return await res.json();
}
//       cotizacion: {
//         marca: marcaId,
//         modelo: modeloId,
//         anio: anioId,
//       },
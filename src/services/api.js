
const BASE_URL = 'https://webpack.wokan.com.ar/api/v1/autos';

export async function getMarcas() {
  const res = await fetch(`${BASE_URL}/marcas`);
  return res.json().then(d => d.result);
}

export async function getModelos(marcaId) {
  const res = await fetch(`${BASE_URL}/modelos/${marcaId}`);
  return res.json().then(d => d.result);
}

export async function getAnios(modeloId) {
  const res = await fetch(`${BASE_URL}/anios/${modeloId}`);
  return res.json().then(d => d.result);
}

export async function cotizar(data) {
  const res = await fetch(`${BASE_URL}/cotizacion`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, recaptcha_response: 'sin-captcha' }),
  });
  return res.json();
}

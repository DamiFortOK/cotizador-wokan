export default async function handler(req, res) {
  const { marca } = req.query;
  if (!marca) return res.status(400).json({ error: 'Falta el parámetro marca' });

  try {
    const url = `https://webpack.wokan.com.ar/api/v1/autos/anios?filter[marca]=${encodeURIComponent(marca)}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer 4d8ac3d6de870c56fd6d33f6d5648b79',
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error al obtener años:', err);
    return res.status(500).json({ error: 'Error interno al contactar la API' });
  }
}

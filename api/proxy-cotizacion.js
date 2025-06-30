export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const payload = req.body;
    const response = await fetch('https://webpack.wokan.com.ar/api/v1/autos/cotizacion', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 4d8ac3d6de870c56fd6d33f6d5648b79',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Error al obtener cotización:', error);
    return res.status(500).json({ error: 'Error interno al contactar la API' });
  }
}

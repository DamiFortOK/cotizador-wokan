export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const response = await fetch('https://webpack.wokan.com.ar/api/v1/autos/marcas', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 4d8ac3d6de870c56fd6d33f6d5648b79',
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error al obtener marcas:', error);
    return res.status(500).json({ error: 'Error interno al contactar la API' });
  }
}

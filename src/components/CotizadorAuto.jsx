import React, { useEffect, useState } from 'react';

const TOKEN = '4d8ac3d6de870c56fd6d33f6d5648b79';

export default function CotizadorAuto() {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anios, setAnios] = useState([]);
  const [marcaId, setMarcaId] = useState('');
  const [modeloId, setModeloId] = useState('');
  const [anioSeleccionado, setAnioSeleccionado] = useState('');
  const [cotizaciones, setCotizaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  fetch('/api/proxy-marcas')
    .then(res => res.json())
    .then(data => setMarcas(data.result));
}, []);

  useEffect(() => {
  if (!marcaId) return;
  fetch(`/api/proxy-modelos?marca=${marcaId}`)
    .then(res => res.json())
    .then(data => setModelos(data.result));
}, [marcaId]);

  useEffect(() => {
  if (!modeloId) return;
  fetch(`/api/proxy-anios?marca=${marcaId}`)
    .then(res => res.json())
    .then(data => setAnios(data.result));
}, [modeloId]);

  const handleCotizar = async () => {
  setLoading(true);
  try {
    const res = await fetch('/api/proxy-cotizacion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: "Pedro Gomez",
        email: "PedroG0m3zz11@yopmail.com",
        telefono: "1135604789",
        codigo_postal: 1759,
        anio: anioSeleccionado,
        data_auto_id: modeloId,
        es_cero: false,
        estado_civil: "soltero",
        fecha_nacimiento: "1995-01-01",
        sexo: "m",
        tiene_gnc: false,
        tiene_rastreador: false,
        recaptcha_response: "sin-captcha"
      }),
    });

    const data = await res.json();
    setCotizaciones(data.aseguradoras || []);
  } catch (err) {
    console.error('Error al cotizar:', err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Cotizador de Auto</h2>

      <div className="mb-4">
        <label className="block mb-1">Marca:</label>
        <select className="w-full border px-2 py-1" onChange={(e) => setMarcaId(e.target.value)} value={marcaId}>
          <option value="">Seleccionar Marca</option>
          {marcas.map((marca) => (
            <option key={marca.id} value={marca.id}>{marca.descripcion}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Modelo:</label>
        <select className="w-full border px-2 py-1" onChange={(e) => setModeloId(e.target.value)} value={modeloId} disabled={!marcaId}>
          <option value="">Seleccionar Modelo</option>
          {modelos.map((modelo) => (
            <option key={modelo.id} value={modelo.id}>{modelo.descripcion}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Año:</label>
        <select className="w-full border px-2 py-1" onChange={(e) => setAnioSeleccionado(e.target.value)} value={anioSeleccionado} disabled={!modeloId}>
          <option value="">Seleccionar Año</option>
          {anios.map((anio) => (
            <option key={anio.id} value={anio.descripcion}>{anio.descripcion}</option>
          ))}
        </select>
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={!anioSeleccionado || loading}
        onClick={handleCotizar}
      >
        {loading ? 'Cotizando...' : 'Cotizar'}
      </button>

      {cotizaciones.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Cotizaciones:</h3>
                <ul className="space-y-4">
        {cotizaciones.map((item, idx) => (
          <li key={idx} className="border rounded p-4 bg-gray-50">
            <p className="font-bold text-lg mb-2">{item.aseguradora.nombre}</p>
            <p className="text-sm mb-2">Estado: {item.cotizador.estado}</p>

            {item.cotizador.coberturas?.length > 0 ? (
              <div className="space-y-2">
                {item.cotizador.coberturas.map((cobertura, i) => (
                  <div key={i} className="border-t pt-2 text-sm">
                    <p><strong>{cobertura.nombre}</strong></p>
                    <p>{cobertura.descripcion}</p>
                    <p>Prima: ${cobertura.prima}</p>
                    <p>Suma asegurada: {cobertura.suma_asegurada}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">Aún no hay coberturas disponibles.</p>
            )}
          </li>
        ))}
        </ul>
        </div>
      )}
    </div>
  );
}

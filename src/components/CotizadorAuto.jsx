import React, { useEffect, useState } from 'react';
import { getMarcas, getModelos, getAnios, cotizar } from '../services/api';

const CotizadorAuto = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    codigo_postal: '',
    fecha_nacimiento: '',
    sexo: 'm',
    estado_civil: 'soltero',
    tiene_gnc: 0,
    tiene_rastreador: 0,
    es_cero: 0,
  });

  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [anios, setAnios] = useState([]);
  const [seleccion, setSeleccion] = useState({
    marca: '',
    modelo: '',
    anio: '',
    data_auto_id: '',
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { getMarcas().then(setMarcas); }, []);

  useEffect(() => {
    if (seleccion.marca) {
      getModelos(seleccion.marca).then(setModelos);
      setAnios([]);
      setSeleccion((prev) => ({ ...prev, modelo: '', anio: '', data_auto_id: '' }));
    }
  }, [seleccion.marca]);

  useEffect(() => {
    if (seleccion.modelo) {
      getAnios(seleccion.modelo).then(setAnios);
      setSeleccion((prev) => ({ ...prev, anio: '', data_auto_id: '' }));
    }
  }, [seleccion.modelo]);

  useEffect(() => {
    if (seleccion.anio) {
      setSeleccion((prev) => ({ ...prev, data_auto_id: seleccion.anio }));
    }
  }, [seleccion.anio]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? (checked ? 1 : 0) : value;
    setForm({ ...form, [name]: val });
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setSeleccion({ ...seleccion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!seleccion.data_auto_id) return alert('Faltan datos del vehículo');
    setLoading(true);
    setResultado(null);

    const payload = {
      ...form,
      anio: new Date(seleccion.anio).getFullYear(),
      data_auto_id: seleccion.data_auto_id,
    };

    try {
      const res = await cotizar(payload);
      setResultado(res);
    } catch (error) {
      setResultado({ error: 'Error al consultar la API' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">Cotizá tu Seguro</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Datos personales */}
        <input name="nombre" placeholder="Nombre completo" onChange={handleFormChange} required className="input" />
        <input name="email" type="email" placeholder="Email" onChange={handleFormChange} required className="input" />
        <input name="telefono" placeholder="Teléfono" onChange={handleFormChange} required className="input" />
        <input name="codigo_postal" placeholder="Código Postal" onChange={handleFormChange} required className="input" />
        <input name="fecha_nacimiento" type="date" onChange={handleFormChange} required className="input" />

        {/* Selects dinámicos */}
        <select name="marca" onChange={handleSelectChange} required className="input">
          <option value="">Seleccioná marca</option>
          {marcas.map(m => <option key={m.id} value={m.id}>{m.descripcion}</option>)}
        </select>

        {modelos.length > 0 && (
          <select name="modelo" onChange={handleSelectChange} required className="input">
            <option value="">Seleccioná modelo</option>
            {modelos.map(m => <option key={m.id} value={m.id}>{m.descripcion}</option>)}
          </select>
        )}

        {anios.length > 0 && (
          <select name="anio" onChange={handleSelectChange} required className="input">
            <option value="">Seleccioná año</option>
            {anios.map(a => <option key={a.id} value={a.id}>{a.descripcion}</option>)}
          </select>
        )}

        {/* Datos adicionales */}
        <select name="sexo" onChange={handleFormChange} className="input">
          <option value="m">Masculino</option>
          <option value="f">Femenino</option>
        </select>

        <select name="estado_civil" onChange={handleFormChange} className="input">
          <option value="soltero">Soltero</option>
          <option value="casado">Casado</option>
        </select>

        <div className="col-span-2 flex flex-wrap gap-4 mt-2">
          <label className="checkbox"><input type="checkbox" name="tiene_gnc" onChange={handleFormChange} /> GNC</label>
          <label className="checkbox"><input type="checkbox" name="tiene_rastreador" onChange={handleFormChange} /> Rastreador</label>
          <label className="checkbox"><input type="checkbox" name="es_cero" onChange={handleFormChange} /> 0km</label>
        </div>

        <div className="col-span-2 mt-4">
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold rounded-lg transition-all">
            {loading ? 'Consultando...' : 'Cotizar Seguro'}
          </button>
        </div>
      </form>

      {resultado && (
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-semibold text-lg mb-2">Resultado:</h3>
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CotizadorAuto;

// El componente CotizadorAuto.jsx estará definido a continuación en otro paso por espacio

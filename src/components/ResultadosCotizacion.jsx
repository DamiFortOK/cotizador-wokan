
import React from 'react';

// Mapa editable de logos por ID de aseguradora
const logos = {
  sancor: '/logos/sancor.svg',
  allianz: '/logos/allianz.svg',
  atm: '/logos/atm.svg',
  experta: '/logos/experta.svg',
  cristobal: '/logos/cristobal.svg',
  rio_uruguay: '/logos/rus.svg',
  mercantil: '/logos/mercantil.svg',
  providencia: '/logos/providencia.svg',
};

const ResultadosCotizacion = ({ aseguradoras }) => {
  if (!aseguradoras || aseguradoras.length === 0) {
    return <p className="text-gray-500 mt-4">No se encontraron aseguradoras disponibles.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {aseguradoras.map((item) => (
        <div
          key={item.aseguradora.id}
          className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            {logos[item.aseguradora.id] && (
              <img src={logos[item.aseguradora.id]} alt={item.aseguradora.nombre} className="w-10 h-10 object-contain" />
            )}
            <h4 className="text-xl font-semibold text-blue-700">{item.aseguradora.nombre}</h4>
          </div>

          {item.cotizador.coberturas?.length > 0 ? (
            <ul className="space-y-2 mt-2 text-sm">
              {item.cotizador.coberturas.map((cob, i) => (
                <li key={i} className="border border-gray-200 p-2 rounded-md">
                  <div className="font-medium">{cob.nombre}</div>
                  <div className="text-blue-600 font-bold">$ {cob.precio_total.toLocaleString()}</div>
                  {cob.detalle && <p className="text-xs text-gray-500">{cob.detalle}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Estado: {item.cotizador.estado}</p>
          )}

          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium"
            onClick={() => alert(`Cotizar con ${item.aseguradora.nombre}`)}
          >
            Ver cotización
          </button>
        </div>
      ))}
    </div>
  );
};

export default ResultadosCotizacion;

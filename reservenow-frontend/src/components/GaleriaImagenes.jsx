// src/components/GaleriaImagenes.jsx
import React from 'react'
import './GaleriaImagenes.css'

const GaleriaImagenes = ({ imagenes }) => {
  if (!imagenes || imagenes.length === 0) return null

  const principal = imagenes[0]
  const secundarias = imagenes.slice(1, 5)

  return (
    <div className="galeria-container row g-2 mb-4">
      <div className="col-md-6">
        <img
          src={principal}
          alt="Principal"
          className="img-fluid galeria-principal"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Imagen+no+disponible'
          }}
        />
      </div>

      <div className="col-md-6">
        <div className="row g-2">
          {secundarias.map((img, idx) => (
            <div key={idx} className="col-6">
              <img
                src={img}
                alt={`Miniatura ${idx + 1}`}
                className="img-fluid galeria-miniatura"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible'
                }}
              />
            </div>
          ))}
        </div>
   
      </div>
    </div>
  )
}

export default GaleriaImagenes

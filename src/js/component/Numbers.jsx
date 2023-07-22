import React from 'react'
import '../../styles/index.css'

const Numbers = ({ id, addClass, funcion }) => {
  return (
    <div id={id} className={`col-3 ${addClass} d-flex justify-content-center align-items-center m-2 py-5 simbolos`} onClick={funcion} style={{ width: "250px", height: "250px" }}>
    </div>
  )
}

export default Numbers
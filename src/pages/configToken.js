import React, { useState, useRef, useContext }from 'react'
import { InputText } from 'primereact/inputtext';
import { ContextRegister } from '../storeData/context';


function ConfigToken ({setToken}) {

const {endPoint, token } = useContext(ContextRegister);

const nameForm = useRef("")

const handleSetToken = () => {
    let endPoint = nameForm.current.elements['endPoint'].value
    let token = nameForm.current.elements['token'].value
    setToken({endPoint, token})
}

return (
    <div>
      <h2>REGISTRO HORAS NEXTRET</h2>
      <form ref={nameForm}>
        <label>EndPoint</label>
        <InputText className="allBody" name={'endPoint'} onChange={handleSetToken} value={endPoint}/>
        <label>Token</label>
        <InputText className="allBody" name={'token'} onChange={handleSetToken} value={token} />
      </form >
    </div>
  )
}

export default ConfigToken;


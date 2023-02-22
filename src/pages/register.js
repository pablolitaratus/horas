import React, { Component, useRef, useState, useContext } from 'react'
import CalendarDemo from '../components/calendar'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import {DataTableRegister} from '../components/tableResult';
import { ProgressSpinner } from 'primereact/progressspinner';
import {ContextRegister} from '../storeData/context';
import moment from 'moment';
import 'moment-timezone';

 function Register () {

 const [dates, setDates] = useState([])

 const [checked, setChecked] = useState(true);

 const [register, setRegister] = useState([]);

 const [spinner, setSpinner] = useState(false)

 const {endPoint, token } = useContext(ContextRegister);

 const calendarData = (calendar) => setDates([...calendar])

 const nameForm = useRef("")

 const handleClickEvent = () => {

    const formInputs = [...nameForm.current.elements]
    let objectSend = {checked, endPoint, token};
    formInputs.forEach( input => objectSend = {...objectSend, [input.name]:input.value})
    saveRetister(objectSend, dates)                                           
}

const saveRetister = (objectSend, dates) => {
    let { endPoint,
          token,
          BeginDateMorning,
          EndDateMorning,
          BeginDateFood,
          EndDateFood,
          BeginDateafternoon,
          EndDateafternoon,
          BeginDateFriday,
          EndDateFriday,
          checked } = objectSend;

          console.log(objectSend)

    let preparedObject = [];

    dates.forEach( (item, index) => {
      
      if(new Date(item).getDay() != 5 || !checked ){
           preparedObject.push({BeginDate: formatDate( item, BeginDateMorning ),
                             EndDate: formatDate( item, EndDateMorning),
                             Date: formatDate( item, null),
                             TypeID: "2",
                             Type: "Trabajo",
                             Remarks: null,
                             Background: index % 2 == 0 ? 'green' : 'blue'}) 
          preparedObject.push({BeginDate: formatDate( item, BeginDateFood ),
                             EndDate: formatDate( item, EndDateFood),
                             Date: formatDate( item, null),
                             TypeID: "3",
                             Type: "Comida",
                             Remarks: null,
                             Background: index % 2 == 0 ? 'green' : 'blue'}) 
         preparedObject.push({BeginDate: formatDate( item, BeginDateafternoon ),
                             EndDate: formatDate( item, EndDateafternoon),
                             Date: formatDate( item, null),
                             TypeID: "2",
                             Type: "Trabajo",
                             Remarks: null,
                             Background: index % 2 == 0 ? 'green' : 'blue'}) 
      } else {

         preparedObject.push({BeginDate: formatDate( item, BeginDateFriday ),
                              EndDate: formatDate( item, EndDateFriday),
                              Date: formatDate( item, null),
                              TypeID: "2",
                              Type: "Trabajo",
                              Remarks: null,
                              Background: index % 2 == 0 ? 'green' : 'blue' }) 

      }

     
                
    })

    save(preparedObject,  endPoint, token)

}

async function save (preparedObject, endPoint, token ) {
    let arrayRegisters = [];
    setSpinner(true)
    for (const object of preparedObject) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', authorization: token },
            body: JSON.stringify(object)
        };

        
     let response =  await fetch(endPoint, requestOptions)
     const date = await response.json();
     console.log(date)
     arrayRegisters.push({ save: date.ActionsHistory ? true : false, tipo: object.Type , 
                           fecha: moment(object.BeginDate).format("DD-MM-YYYY"),
                           horaIncio:moment(object.BeginDate).subtract(1, 'h').format('HH:mm'),
                           horaFinal: moment(object.EndDate).subtract(1, 'h').format('HH:mm'),
                           error: date?.title,
                           Background: object.Background})
    
    

   
      await delay(3000);
    }

setRegister( [...register, ...arrayRegisters])
setSpinner(false)

}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));


const formatDate = (date, time) => {
    
    let year = new Date(date).getFullYear();
    let month = new Date(date).getMonth();
    let day = new Date(date).getDate();
    if(!time) time = '00:00'
    let formatDate = new Date(year, month, day );
    const start = moment(formatDate).format("YYYY-MM-DD");
    return `${start}T${time}:00.000Z`
}

return (
    <div>
      <form ref={nameForm}>

       <h2 className="margin-top-50">Configuración horarios</h2>
       <label>Horario mañana</label>
       <InputText className="middleBody" name={'BeginDateMorning'} type="time" value="09:00"/>
       <InputText className="middleBody" name={'EndDateMorning'}  type="time" value="14:00"/>
       <label>Horario comida</label>
       <InputText className="middleBody" name={'BeginDateFood'} type="time" value="14:00"/>
       <InputText className="middleBody" name={'EndDateFood'} type="time" value="15:00"/>
       <label>Horario tarde</label>
       <InputText className="middleBody" name={'BeginDateafternoon'} type="time" value="15:00"/>
       <InputText className="middleBody" name={'EndDateafternoon'} type="time" value="18:30"/>
       <div className="margin-top-5">
       <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />  Seleccionar si los viernes aplica otro horario
       </div> 
       <label>Horario viernes</label>
       <InputText className="middleBody" name={'BeginDateFriday'} type="time" value="09:00"/>
       <InputText className="middleBody" name={'EndDateFriday'} type="time" value="15:00"/>
       <h2 className="margin-top-50">Seleccionar días</h2>
       <CalendarDemo calendarData={calendarData} dates={dates}/>
      </form>
      <Button label="Enviar registro" onClick={handleClickEvent} />
      <div>
        <DataTableRegister data={register}/>
      </div>
      { spinner && <div style={{'position': 'fixed', top: 0, right: 0, bottom: 0, left: 0, background: '#1d1d2047' }}>
        <ProgressSpinner/>
      </div>}

    </div>
  )
}

export default Register;


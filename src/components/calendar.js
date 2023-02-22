import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { addLocale, locale } from 'primereact/api';

function CalendarDemo({calendarData, dates}) {

    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Limpiar'
    });

    locale('es');

    return (     
        <div className="field col-12 md:col-6">
            <Calendar id="multiple" value={dates} onChange={(e) => calendarData(e.value)} selectionMode="multiple" readOnlyInput />
        </div> 
    );
}

export default CalendarDemo;
                 

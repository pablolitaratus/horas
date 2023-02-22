import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const DataTableRegister = ({data}) => {

    const statusBodyTemplate = (rowData) => {
        if (rowData.save){
            return <span style={{'color': 'green', fontWeight: 'bold'}}><i className="pi pi-check" style={{'fontSize': '18px', 'color': 'green', marginRight: '5px', fontWeight: 'bold'}}></i>Guardado</span>;
        } else{
            return <span style={{'color': 'red', fontWeight: 'bold'}}><i className="pi pi-times" style={{'fontSize': '18px', 'color': 'red', marginRight: '5px', fontWeight: 'bold'}}></i>Error</span>;
        } 
        
    }

    const rowClass = (data) => {

        if (!data.save && data.Background == 'green'){
            return {'red-dark': true};
        }

        if (!data.save && data.Background == 'blue'){
            return {'red-ligth': true};
        }
       
        return {
            [data.Background]: true
        }
    }


    return (
        <div className="margin-top-50">
            <div className="card">
                <DataTable value={data} responsiveLayout="scroll" rowClassName={rowClass}>
                    <Column  header="Guardado" body={statusBodyTemplate}></Column>
                    <Column  field="tipo" header="Tipo"></Column>
                    <Column  field="fecha" header="Fecha"></Column>
                    <Column  field="horaIncio" header="Hora inicio"></Column>
                    <Column  field="horaFinal" header="Hora final"></Column>
                    <Column  field="error" header="Error"></Column>
                </DataTable>
            </div>
        </div>
    );
}
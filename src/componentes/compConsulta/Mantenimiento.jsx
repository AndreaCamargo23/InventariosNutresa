import React, { useEffect, useState } from 'react';

export default function Mantenimiento(props){
    return(
        <>
            <h1>Esta pagina se encuentra en mantenimiento...más adelante sera habilitada {props.intento}</h1>
        </>
    );
}
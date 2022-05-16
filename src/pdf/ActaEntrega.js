import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, Table, StyleSheet, Image } from "@react-pdf/renderer";
import iconprestamo from '../img/imgNutresa.jpg';


const ActaEntrega = (props) => {

    const styles = StyleSheet.create({
        page: { padding: 60 },
        box: { width: '100%', borderRadius: 5, paddingTop: 2, paddingBottom: 2},
        pageNumbers: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: 'center'
        },
    });


    useEffect(() => {
        nombre();
    }, [])

    const nombre = () => {
    
    }

return (
    <Document>
    <Page style={styles.page} size="A4" wrap>
    <View>
        <Text style={[{textAlign: 'center', fontSize:'14'}]}>ACTA DE ENTREGA Y DEVOLUCION DE EQUIPOS</Text>
    </View>
    <View style={[styles.box, { height: 18, backgroundColor: 'black'}]}>
        <Text style={[{color: 'white', textAlign: 'center', fontSize:'12'}]}>Información del usuario quién recibe el equipo</Text>
    </View>
    <Image src={iconprestamo} style={[{width: 130,height: 100, position: 'absolute', top: 100, left: 370}]}></Image>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width:170}]}>Número de acta: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>1222222222</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 170}]}>Nombres y apellidos:</Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.usuario.nombre}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 170}]}>Empresa: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.usuario.compania}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 170}]}>Cargo responsable del equipo: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.usuario.cargo}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 170}]}>Sede: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.usuario.regional}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 170}]}>Teléfono y extensión: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.usuario.contacto} - {props.usuario.extension}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 170}]}>Usario de red: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.usuario.ADS}</Text>
    </View>

    <View style={[styles.box, { height: 18, backgroundColor: 'black'}]}>
        <Text style={[{color: 'white', textAlign: 'center', fontSize:'12'}]}>Información del equipo a entregar</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 210}]}>Tipo de equipo: {props.equipo.tipo}</Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Serial de Mouse: {props.prestamo.List_mouse}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 210}]}>Marca de equipo: {props.equipo.marca}</Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Serial Cargador: {props.prestamo.List_cargador}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 210}]}>Modelo del equipo: {props.equipo.modelo}</Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Guaya: {props.prestamo.guaya}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 210}]}>Service TAG: {props.equipo.servicetag}</Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Morral: {props.prestamo.morral}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12', width: 210}]}>Serial Monitor: {props.prestamo.List_monitor}</Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Serial Teclado: {props.prestamo.List_teclados}</Text>
    </View>
    <View style={[styles.box, { height: 18, flexDirection: 'row'}]}>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Otros: </Text>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.prestamo.descripcion}</Text>
    </View>
    <View style={[styles.box, { height: 18, backgroundColor: 'black'}]}>
        <Text style={[{color: 'white', textAlign: 'center', fontSize:'12'}]}>Información de conformidad al recibir el equipo el empleado</Text>
    </View>
    <Text style={[{textAlign: 'left', fontSize:'9'}]}>
        Este equipo ha sido configurado con los programas estándar que se manejan en la Compañía y se encuentran legalmente licenciados.  Por esta razón se deben abstener de instalar cualquier software adicional sin haber coordinado antes con el área de Soporte Técnico.
		Para habilitar la compatibilidad con lectores de pantalla, pulsa Ctrl+Alt+Z. Para obtener información acerca de las combinaciones de teclas, pulsa Ctrl+barra diagonal.</Text>
    <View>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Software Adicional:</Text>
        <View style={[styles.box, { height: 30, backgroundColor: 'white',border:1, borderStyle: 'dotted' }]}>
            <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.prestamo.List_software}</Text>         
        </View>
    </View>
    <View>
        <Text style={[{textAlign: 'left', fontSize:'12'}]}>Observaciones:</Text>
        <View style={[styles.box, { height: 80, backgroundColor: 'white',border:1, borderStyle: 'dotted' }]}>
            <Text style={[{textAlign: 'left', fontSize:'12'}]}>{props.prestamo.observaciones}</Text>
        </View>
    </View>

    <View>
        <Text style={[{textAlign: 'justify', fontSize:'8'}]}>
          EL EMPLEADO hace constar que ha recibido de EL EMPLEADOR, 
          en perfecto estado y únicamente para el desarrollo de las labores 
          a su cargo, los activos antes relacionados, obligándose a realizar 
          una administración y custodia idónea de los mismos; lo cual permita la conservación y restitución de los activos en buen estado, salvo su deterioro natural y obvio.
        </Text>
    </View>
    <View>
        <Text style={[{textAlign: 'justify', fontSize:'8'}]}>
          Acepta EL EMPLEADO que es su responsabilidad el salvaguardar 
          los activos y no darles un uso diverso al establecido por la 
          Empresa; así como no exponerlo de manera negligente a situaciones 
          de posible hurto o perdida. EL EMPLEADO se compromete a informar 
          oportunamente al área de TI cualquier perdida o hurto y a formular 
          de inmediato la respectiva denuncia ante las autoridades competentes, 
          así como a entregarle a EL EMPLEADOR 
          copia de dicho documento para con él gestionar lo pertinente.
        </Text>
    </View>
    <View>
        <Text style={[{textAlign: 'justify', fontSize:'8'}]}>
        AUTORIZACIÓN DE DESCUENTOS POR DAÑOS, PERDIDA Y HURTOS.
          En caso de pérdida, hurto o daño de los activos relacionados 
          por negligencia, falta de control o incumplimiento de los 
          instructivos y reglamentos definidos para la conservación y custodia 
          de los mismos por parte del EMPLEADO previamente comprobada, 
          éste autoriza expresamente a EL EMPLEADOR para que del valor de 
          sus salarios le sea descontada la cantidad necesaria para reparar 
          o restituir el o los activos que le fueron entregados, asimismo 
          faculta a EL EMPLEADOR, para que compense, una vez terminado su 
          contrato de trabajo, el saldo insoluto con cualquier suma de dinero 
          que le corresponda en su liquidación final de prestaciones, salarios 
          e indemnizaciones, de conformidad con lo dispuesto para tal evento en los artículos 59, numeral 1o. y 149, inciso 1o., del Código 
          Sustantivo del Trabajo, todo ello, bajo los parámetros de ley"
        </Text>
    </View>

    <View style={{flexDirection: 'row'}}>
        <Text style={[{textAlign: 'justify', fontSize:'12', paddingTop: 25, width: 300}]}>______________________</Text>
        <Text style={[{textAlign: 'right', fontSize:'12', paddingTop: 25}]}>______________________</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
        <Text style={[{textAlign: 'justify', fontSize:'12', width: 300}]}>Recibido Por</Text>
        <Text style={[{textAlign: 'right', fontSize:'12'}]}>Entregado por</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
        <Text style={[{textAlign: 'justify', fontSize:'12',width: 300}]}>{props.usuario.nombre}</Text>
        <Text style={[{textAlign: 'right', fontSize:'12'}]}>Nombre Analista</Text>
    </View>
    <View style={{flexDirection: 'row'}}>
        <Text style={[{textAlign: 'justify', fontSize:'12',width: 300}]}>{props.usuario.id}</Text>
        <Text style={[{textAlign: 'right', fontSize:'12'}]}>{props.prestamo.fecha}</Text>
    </View>
    </Page>
    </Document>
);
};


export default ActaEntrega;
import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AddDispositivo from './addDispositivo';
import Admindatos from './adminDatos';
import FrmOrdeninterna from './orden_interna';
import AddPrestamo from './addPrestamo';
import { Switch, Route } from 'react-router-dom';
import AddUserDispo from './addUserDispo';
import { useHistory } from 'react-router-dom';
import Buscarserial from './busquedaSerial';
import Form_SearchEquipo from './formBuscar';
import Mantenimiento from './compConsulta/Mantenimiento';
import Garantia from './compGarantia/addGarantia';
import Leasing from './compLeasing/addLeasing';
import Dashboard from './informes/informes';


/**
 * En este componente, se realiza la navegabilidad del toolbar
 * Esta toolbar solo la puede observar el administrador.
 * Es un componente funcional tipo flecha, NAVEGAVILIDAD
 */

const WindowsMain = (props) => {
    const history = useHistory();
    useEffect(()=>{
        history.push("/");
    },[]);

    //Contastes del programa
    const [viewteclado, setViewteclado] = useState('none');
    const [viewmouse, setViewmouse] = useState('none');
    const [viewcargador, setViewcargador] = useState('none');
    const [viewpantalla, setViewpantalla] = useState('none');

    //Aux ordenen y costo
    const [ordenint, setordenint] = useState('');
    const [cencosto, setcencosto] = useState('');

    //Estilos de la página.
    const styles = makeStyles(theme => ({
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
            width: `calc(100% - ${310}px)`,
            marginLeft: 260,
            marginTop: theme.spacing(6),
            textAlign: 'left',
            //display: 'flex'
        },
        contentaux: {
            display: 'flex',

        },
        containerT: {
            display: viewteclado
        },
        containerM: {
            display: viewmouse
        },
        containerC: {
            display: viewcargador
        },
        containerP: {
            display: viewpantalla
        },
        veradmindatos: {
            display: props.viewAdmindatos
        },
        veraddequipos: {
            display: props.viewAddequipo
        },
    }))

    //Asignar el valor de orden interna y de centro de costo
    const valueOrdenintandcentrocosto = (orden,costo) =>{
        setordenint(orden);
        setcencosto(costo);
    }

    const classes = styles(); //Esta constante tiene los estilos que se hicieron anteriormente

    return (//Retorna html para ver en pantalla
        <div className={classes.content}>
            <Switch>
                <Route path="/addispo">
                    <FrmOrdeninterna funOndeint={(orden,costo)=>{
                        valueOrdenintandcentrocosto(orden,costo);
                    }}/>
                </Route>
                <Route path="/admindatos">
                    <Admindatos/>
                </Route>
                <Route path="/addprestamos">
                    <AddPrestamo/>
                </Route>
                    <Route path="/adddevolucion">
                    <Form_SearchEquipo/>
                </Route>
                <Route path="/adddispo/frmRegEquipo">
                    <div className={classes.addEquipos}>
                        <AddDispositivo
                            valueordenanint= {()=>{
                                return ordenint;
                            }}
                            valuecentralcosto= {()=>{
                                return cencosto;
                            }}
                            fucionviewT={(estadoT) => {
                                setViewteclado(estadoT)
                            }
                            }
                            fucionviewM={(estadoM) => {
                                setViewmouse(estadoM)
                            }}
                            fucionviewC={(estadoC) => {
                                setViewcargador(estadoC)
                            }}
                            fucionviewP={(estadoP) => {
                                setViewpantalla(estadoP)
                            }}
                        ></AddDispositivo>
                    </div>
                </Route>
                <Route path="/addUserComany">
                    <AddUserDispo></AddUserDispo>
                </Route>
                <Route path="/searchSerial">
                    <Buscarserial></Buscarserial>
                </Route>
                <Route path="/formMantenimiento">
                    <Mantenimiento intento="Si entan funcionando las props"></Mantenimiento>
                </Route>
                <Route path="/formLeasing">
                    <Leasing></Leasing>
                </Route>
                <Route path="/formGarantias">
                    <Garantia></Garantia>
                </Route>
                <Route path="/">
                    <Dashboard></Dashboard>
                </Route>
                
            </Switch>

        </div>
    )
}

export default WindowsMain;
import React, { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import Paper from '@material-ui/core/Paper';
import { DataGrid} from '@mui/x-data-grid';
import { Button, InputLabel, makeStyles, MenuItem, Select, TextField,TextareaAutosize, Typography } from '@material-ui/core';
import { Grid, Divider, Modal, Box, TableContainer, Table, TableHead, TableBody, TableRow} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {DataTable} from './dataTableLeasing.js';
import IconDevolucion from '../../img/icons/caja.png';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';


export default function FormLeasing(props){

    const dataSet = [
        [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
        [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    ];

    const useStyle = makeStyles((theme) => ({ //Estilos de la interface
        paper: {
            padding: '6px 16px 6px',
        },
        btnvalidar: {
            margin: theme.spacing(3, 0, 0, 0),
            width: '40%',
            align: 'center',
        },
        griditem: {
            margin: theme.spacing(0, 1, 0, 1),
        }, 
        contenedormain: {
            margin: theme.spacing(1, 1, 2, 1)
        },
        paperinfo: {
            margin: theme.spacing(3,0,0,0)
        },
        texto: {
            margin: theme.spacing(1,1,1,1)
        },
        btnGestionar: {
            margin: theme.spacing(2, 0, 2, 0),
            width: '100%',
            align: 'center',
        },
        img: {
            margin: theme.spacing(2, 1, 1, 1),
            height: '50px'
        },
        select: {
            margin: theme.spacing(2, 1, 1, 1),
        },
        btnIcon: {
            margin: theme.spacing(3,1, 0, 2),
            //Top, right, down, left
            width: '30%',
        },
        modal: {
            position:'absolute',
            width: 380,
            height: 300,
            boxShadow: 24,
            padding: '16px 32px 24px',
            top: '20%',
            left: '30%',
        },
        textArea: {
            margin: theme.spacing(1,0,0,0),
            width: 370,
        }
    }))

    //Constantes
    const classes = useStyle();

    const columns2 = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'contrato', headerName: 'Contrato', width: 100 },
        { field: 'serial', headerName: 'Serial', width: 120 },
        { field: 'fechaInicio', headerName: 'Fecha Inicio', width: 150 },
        { field: 'fechaFin', headerName: 'Fecha Fin', width: 100 },
        { field: 'compania', headerName: 'Compañia', width: 159,},
        { field: 'control', headerName: 'Descripción', width: 300 },
        {headerName:'Acciones'}
    ];

    //Const interface
    const [arraySerial, setArraySerial]=useState([]);
    const [open,setOpen]=useState(false);
    const [arrayCompanias,setArrayCompanias]=useState([]);
    const [arrayRows,setArrayRows]=useState([]);
    const [arrayContratos,setArrayContratos]=useState([]);
    const [tabla, setTabla]=useState(false);

    //Datos Devolución Leasign
    const [serial,setSerial]=useState('');
    const [fechaInicial,setFechaInicial]=useState('');
    const [fechaFinal, setFechaFinal]=useState('');
    const [compania,setCompania]=useState('');
    const [descripcion,setDescripcion]=useState('');
    const [contrato,setContrato]=useState('');


    //Funciones
    const llenadoSerial= async (contra)=>{
        setContrato(contra);
        await db.collection('Equipos').onSnapshot((objE) => {
            const Equipos = [];
            objE.forEach((obj) => {
                if(obj.data().estado!='Devolución leasing'&& obj.data().Contrato==contra){
                    obj = {
                        Serial: obj.data().Serial,
                        Contrato: obj.data().Contrato,
                        id: obj.id,
                    }
                    Equipos.push(obj);
                }
            });
            setArraySerial(Equipos);
        });
    }

    const abrirModal = () =>{
        if(serial!==undefined&&serial!==''){
            setOpen(!open);
        }else{
            alert('Debe seleccionar un serial');
        }
        
    }

    const llenadoCompanias=async()=>{
        await db.collection('Companias').onSnapshot((objE) => {
            const companias = [];
            objE.forEach((obj) => {
                obj = {
                    nombre: obj.data().nombre,
                    ciudad:obj.data().ciudad
                }
                companias.push(obj);
            });
            setArrayCompanias(companias);
        });
    }

    const llenadoContratos= async()=>{
        var fecha = new Date();
        var fechaActual=fecha.getFullYear()+'/'+(fecha.getMonth()+1)+'/'+fecha.getDate();
        await db.collection('Contrato').onSnapshot((objC)=>{
            const compa=[];
            objC.forEach((obj)=>{
                if(obj.data().fechafin <= fechaActual){
                    compa.push(obj.data().contrato);
                }
            });
            setArrayContratos(compa);
            llenadoSerial();
        });
    }

    const consultaLeasing= async()=>{
        await db.collection('DevolucionLeasing').onSnapshot((dl)=>{
            const row=[];
            var cont=0;
            dl.forEach((objL)=>{
                const nuevo = {
                    id:cont,
                    contrato: objL.data().Contrato,
                    serial: objL.data().Serial,
                    fechaInicio: objL.data().FechaInicio,
                    fechaFin: objL.data().FechaFin,
                    compania: objL.data().Compania,
                    control: objL.data().Control
                }
                row.push(nuevo);
                cont++;
            });
            console.log(row);
            setArrayRows(row);
            setTabla(true);
        });
    }

    const cambiarEstadoEquipo= async()=>{
        arraySerial.map((obj)=>{
            if(obj.Serial==serial){
                const aux2 = db.collection('Equipos').doc(obj.id);
                const estado={
                    estado: 'Devolución leasing',
                };
                aux2.update(estado);
            }
        })
    }

    const añadirDevLeasing=async()=>{
        const devolucion={
            Compania: compania,
            Contrato: contrato,
            Control: descripcion,
            FechaFin: fechaFinal,
            FechaInicio: fechaInicial,
            Serial: serial
        }
        await db.collection('DevolucionLeasing').doc().set(devolucion);
        setSerial('');
        setContrato('');
        setTabla(false);
        abrirModal();
        setTabla(true);
        alert('Devolución registrada correctamente!');
    }

    useEffect(() => {
        consultaLeasing();
        llenadoContratos();
        llenadoCompanias();
    }, []);

    return(
        <div>
            <TimelineOppositeContent>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot>
                    <img width='45px' src={IconDevolucion}></img>
                </TimelineDot>
            </TimelineSeparator>
            <Paper className={classes.paper}>
                    <Typography variant="h6" component="inherit" className={classes.texto}>
                        Gestión leasing
                    </Typography>
                    <Divider></Divider>
                <Grid container className={classes.contenedormain}>
                <Grid item xs={3} className={classes.griditem}>
                    <InputLabel id="demo-simple-select-filled-label" >Contrato</InputLabel>
                        <Select 
                        fullWidth
                        displayEmpty
                        variant='outlined'
                        value={contrato}
                        onClick={(ev)=>llenadoSerial(ev.target.value)}  
                        >
                            {
                                arrayContratos.map((contrato)=>{
                                    if(contrato!=undefined){
                                        return <MenuItem value={contrato}>{contrato}</MenuItem>
                                    }                             
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={3} className={classes.griditem}>
                    <InputLabel id="demo-simple-select-filled-label" >Serial</InputLabel>
                        <Select 
                        fullWidth
                        displayEmpty
                        variant='outlined'
                        value={serial}
                        onClick={(ev)=>setSerial(ev.target.value)}  
                        >
                            {
                                arraySerial.map((equipo)=>{
                                    if(equipo.Serial!=undefined){
                                        return <MenuItem value={equipo.Serial}>{equipo.Serial}</MenuItem>
                                    }                             
                                })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={2} className={classes.griditem}>
                        <Button
                                className={classes.btnIcon}
                                color="secondary"
                                startIcon={<ManageSearchIcon />}
                                variant="contained"
                                loadingPosition="start"
                                onClick={(ev)=>abrirModal(ev.target.value)}
                                >
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                open={open}
                onClose={(ev)=>abrirModal(ev.target.value)}
            >
                <Paper className={classes.modal} align='center' >
                    <Grid container className={classes.contenedormain}>
                        <Grid item xs={12} className={classes.griditem}>
                            <Typography variant="h6" component="inherit" className={classes.texto}>
                                Generar devolución leasing
                            </Typography>
                            <Divider></Divider>
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='Fecha Inicial'
                                name='dateIni'
                                value={fechaInicial}
                                type={'date'}
                                onChange={(e) => setFechaInicial(e.target.value)}
                                requiered={true}                                   
                            />
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='Fecha Final'
                                name='dateFin'
                                value={fechaFinal}
                                type={'date'}
                                onChange={(e) => setFechaFinal(e.target.value)}
                                requiered={true}                                   
                            />
                        </Grid>
                        <Grid item xs={8} className={classes.griditem}>
                            <InputLabel id="demo-simple-select-filled-label" >Compañia</InputLabel>
                            <Select
                            fullWidth
                            displayEmpty
                            variant='outlined'
                            value={compania}
                            onClick={(ev)=>setCompania(ev.target.value)}  
                            >
                                {
                                    arrayCompanias.map((compania)=>{
                                        if(compania.nombre!=undefined){
                                            return <MenuItem value={compania.nombre}>{compania.nombre}-{compania.ciudad}</MenuItem>
                                        }
                                    })
                                }
                            </Select>
                        </Grid>
                        <Grid xs={7} className={classes.griditem}>
                            <TextareaAutosize
                            className={classes.textArea}
                            minRows={4}
                            value={descripcion}
                            onChange={(ev)=>setDescripcion(ev.target.value)}
                            placeholder="Control de Devolución" />
                        </Grid>
                        <Divider></Divider>
                        <Grid xs={5} className={classes.griditem}>
                            <Button
                                color="#9e9e9e"
                                startIcon={<HighlightOffIcon />}
                                variant="outlined"
                                loadingPosition="start"
                                onClick={(ev)=>abrirModal(ev.target.value)}
                                className={classes.btnEditar}
                                >
                                    Cancelar
                                </Button>
                        </Grid>
                        <Grid xs={5} className={classes.griditem}>
                                <Button
                                color="secondary"
                                startIcon={<AddBoxIcon />}
                                variant="contained"
                                loadingPosition="start"
                                onClick={(ev)=>añadirDevLeasing(ev.target.value)}
                                className={classes.btnEditar}
                                >
                                    Añadir
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
            <Paper>
                {tabla?
                <DataTable data={arrayRows}></DataTable>
                :<h1></h1>}
            </Paper>
        </div>
    );
}
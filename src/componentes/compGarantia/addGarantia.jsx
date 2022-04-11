import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Button, InputLabel, makeStyles, MenuItem, Select, TextField, Grid, TextareaAutosize } from '@material-ui/core';
import { db } from '../firebase-config';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineDot from '@material-ui/lab/TimelineDot';
import LoadingButton from '@mui/lab/LoadingButton';
import garantia from '../../img/garantia.png';
import Typography from '@material-ui/core/Typography';
import Divider from '@mui/material/Divider';
import iconAgregar from '../../img/icons/agregarParte.png';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Save from '@mui/icons-material/Save';
import Close from '@mui/icons-material/Close';


//Diseño en CSS
export default function FormGarantias(props){

    //Diseño en Css
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
        btnGuardar: {
            margin: theme.spacing(2, 0, 2, 0),
            width: '100%',
        },
        btnEditar: {
            margin: theme.spacing(2, 0, 2, 0),
            width: '100%',
        }
    }))


    //Constantes

    
    const [equipoSeleccionado, setEquipoSeleccionado]= useState({});

    //Interface boolean
    const [mostrarInfo,setMostrarInfo]= useState(false);
    const [agregar,setModal]= useState(false);
    const [estadoGarantia,setEstadoGarantia]= useState(false);
    const [tieneGaratia,setTieneGaratia]= useState(true);
    const [clickEditar,setClickEditar]= useState(false);
    const [control,setControl]= useState(false);

    //Datos de la garantia
    const [serialReg,setSerialReg]= useState('');
    const [centroCostos, setCentroCostos]= useState('');
    const [fechaActual,setFechaActual]= useState('');
    const [fechavisita,setFechavisita]= useState('');
    const [Funcionario, setFuncionario]= useState('');
    const [fechaCierre, setFechaCierre]= useState('');
    const [consecutivo,setConsecutivo]= useState('');
    const [numerocaso,setNumerocaso]= useState('');
    const [estado, setEstado]= useState('');
    const [comentario, setComentario]= useState('');
    
    //Llenado de listas
    const [arrayAnalista, setArrayAnalista]= useState([]);
    const [Analista, setAnalista]= useState('');
    const [ArrayParte,setArrayParte]= useState([]);
    const [parte,setParte]= useState(false);

    //Almacenar e imprimir partes
    const [contarPartes,setContarPartes]= useState([]);
    const [PartesSelec,setPartesSelec]= useState([]);
    const [cantidad,setCantidad]= useState(0);   

    //Declaración de variable de estilos
    const classes = useStyle();

    //Consulta de garantias
    const [arrayGarantias,setArrayGarantias]= useState([]);

    //Editar Garantia
    const [id,setId]= useState('');

    const llenadoPartes = async () => {
        await db.collection('TipoParte').onSnapshot((objP) => {
        const TipoParte = [];
        objP.forEach((obj) => {
            obj = {
                nombre: obj.data().nombre,
            }
            TipoParte.push(obj);
        });
        setArrayParte(TipoParte);
        });
    }

    const cancelar=()=>{
        setModal(false);
        setClickEditar(false);
            setNumerocaso('');
            setFechavisita('');
            setFuncionario('');
            setFechaCierre('');
            setConsecutivo('');
            setAnalista('');
            setEstado(''); 
            setCantidad(0);
            setComentario('');
            setContarPartes([]);
            setPartesSelec([]);
            setFechaActual('');
            setParte(false);
            setControl(false);
    }

    const abrirEditar=(garantia)=>{
        setClickEditar(true);
        if(garantia != null && garantia != undefined){
            setNumerocaso(garantia.Caso);
            setFechavisita(garantia.fechaVisita);
            setFuncionario(garantia.Funcionario);
            setFechaCierre(garantia.fechaCierre);
            setConsecutivo(garantia.consecutivo);
            setAnalista(garantia.Analista);
            setEstado(garantia.estado); 
            setCantidad(garantia.partes.length);
            setComentario(garantia.observacion);
            setContarPartes(garantia.partes);
            setPartesSelec(garantia.partes);
            setFechaActual(garantia.fechaSolicitud);
            setId(garantia.id);
            setParte(true);
            setControl(true);
            setModal(true);
            //partes

        }
    }

    const llenadoAnalista = async () =>{
        await db.collection('Analistas').onSnapshot((objA)=>{
            var analista=[];
            objA.forEach((obj)=>{
                obj={
                    nombre: obj.data().nombre,
                }
                analista.push(obj);
            });
            setArrayAnalista(analista);
        });
    }

    const abrirCerrarModal = () =>{   
        if(!clickEditar){
            setModal(!agregar);
        }else{
            alert('No puede agregar una garantia si esta editando otra');
        }  
        
    }

    const contarSelect=()=>{ //Cantidad de select a imprimir.
        if(cantidad==0){
            alert('No ingreso la cantidad de partes');
        }else{
            setParte(true);
            setContarPartes([]);
            const aux = [];
            for (let i = 0; i < cantidad; i++) {
            aux.push(i);
            }
            setContarPartes(aux);
        }
        
    }

    const addParte=(value)=>{
        PartesSelec.push(value);
    }

    const validarGarantia=async()=>{
        if(serialReg!=undefined && serialReg!=''){
            var array=[];
            var contador =0;
        await db.collection('Garantia').onSnapshot((objG)=>{
                objG.forEach((garantia)=>{
                    if(garantia.data().Serial==serialReg){
                        const objGarantia={
                            posicion: 0,
                            Caso: garantia.data().Caso,
                            id: garantia.id,
                            Funcionario: garantia.data().Funcionario,
                            observacion: garantia.data().Observacion,
                            centroCostos: garantia.data().centroCosto,
                            consecutivo: garantia.data().consecutivo,
                            estado: garantia.data().estado,
                            fechaCierre: garantia.data().fechaCierre,
                            fechaSolicitud: garantia.data().fechaGarantia,
                            fechaVisita: garantia.data().fechaVisita,
                            Analista: garantia.data().Analista,
                            partes: garantia.data().partes,
                        };
                        objGarantia.posicion=contador++;
                        if(objGarantia !=undefined){
                            array.push(objGarantia);
                            setTieneGaratia(true);
                        }
                        
                    }
                })
            });
            setArrayGarantias(array);
        }else{
            alert('Estado de garantia Falso');
        }          
    }

    const insertarGarantia = async ()=>{
        if(centroCostos !='' && fechavisita !='' && Funcionario!='' && fechaCierre!='' && estado!='' && consecutivo!='' && numerocaso !='' && comentario!=''){
            //Datos Garantia
            const objG = {
                Serial: equipoSeleccionado.Serial,
                inconveniente: 'Daño',
                centroCostos: centroCostos,
                fechaGarantia: fechaActual,
                fechaVisita: fechavisita,
                Funcionario: Funcionario,
                fechaCierre: fechaCierre,
                estado: estado,
                consecutivo: consecutivo,
                Caso: numerocaso,
                Observacion: comentario,
                Analista: Analista,
                partes: PartesSelec,
            };
            await db.collection('Garantia').doc().set(objG);
            setParte(false);
            setModal(false);
            alert('Garantia registrada satisfactoriamente');
        }else{
            alert('No lleno todos los campos');
        }        
    }

    const editar= async () =>{
        await db.collection('Garantia').onSnapshot((objG)=>{
            objG.forEach((obj)=>{
                if(obj.id==id){
                    const obGA = {
                        fechaCierre: fechaCierre,
                        estado: estado,
                        Observacion: comentario,
                    };
                    try{
                        const aux2 = db.collection('Garantia').doc(id);
                        aux2.update(obGA);
                    }catch(e){
                        alert(e.mensaje);
                    }    
                }
            });
        });
        //Vaciar datos y cerrar la ventana
        setModal(false); //Cerrar la ventana de agregar o editar
        setClickEditar(false); //Habilitar botones y cajas de texto
        alert('Se edito la Garantia con exito');
            setNumerocaso('');
            setFechavisita('');
            setFuncionario('');
            setFechaCierre('');
            setConsecutivo('');
            setAnalista('');
            setEstado(''); 
            setCantidad(0);
            setComentario('');
            setContarPartes([]);
            setPartesSelec([]);
            setFechaActual('');
            setParte(false); //Quitar las partes agregadas
            setControl(false); //Habilitar todo
    }

    const gestionarGarantia = () =>{
        if(clickEditar){
            editar();
        }else{
            insertarGarantia();
        }
    }

    //Funciones flecha
    const informacionEquipo =async(serial) =>{
        setArrayGarantias([]);
        await db.collection('Equipos').onSnapshot((objReg)=>{
            const cont = 0;
            objReg.forEach((objE)=>{
                if(objE.data().Serial==serial){
                    const equipo ={
                        CentralCostos: objE.data().CentralCosto,
                        Contrato: objE.data().Contrato,
                        Sede: objE.data().Sede,
                        Serial: objE.data().Serial,
                        Estado: objE.data().estado,
                    }
                    setCentroCostos(equipo.CentralCostos);
                    setEquipoSeleccionado(equipo);
                    setMostrarInfo(true);
                    if(equipo.Estado=='Leasing'){
                        setEstadoGarantia(true);
                        var objF = new Date();
                        setFechaActual(objF.getDate()+'/'+(objF.getMonth()+1)+'/'+objF.getFullYear());
                        validarGarantia();
                    }
                }
            });
        });
    }

    useEffect(() => {
        llenadoAnalista();
        llenadoPartes();
    }, []);

    return(
        <div>
            <TimelineOppositeContent>
                Garantia del equipo
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot>
                    <img width='45px' src={garantia}></img>
                </TimelineDot>
            </TimelineSeparator>
            <Paper elevation={20} className={classes.paper}>
                <Typography variant="h5" component="inherit">
                    Gestion de garantia del equipo
                </Typography>
                <Divider></Divider>
                <Grid container className={classes.contenedormain}>            
                    <Grid item xs={4} className={classes.griditem}>
                        <TextField
                                        fullWidth
                                        margin='normal'
                                        variant='outlined'
                                        label='ServiceTAG del equipo'
                                        name='serial'
                                        value={serialReg}
                                        type={'text'}
                                        onChange={(e) => setSerialReg(e.target.value)}
                                        requiered={true}                                   
                                    />
                    </Grid>
                    <Grid item xs={3} className={classes.griditem}>
                    <Button
                                fullWidth
                                variant='contained'
                                color='secondary'
                                className={classes.btnvalidar}
                                onClick={(ev) => informacionEquipo(serialReg)}
                            >Consultar
                            </Button>
                        </Grid>
                </Grid>                           
            </Paper>
            {
                mostrarInfo?
            <Paper elevation={16} className={classes.paperinfo}>
                    <Typography variant="h6" component="inherit" className={classes.texto}>
                        Información del equipo
                    </Typography>
                    <Divider></Divider>                     
                    <Grid container className={classes.contenedormain}>
                        <Grid item xs={2} className={classes.griditem}>
                            <TextField
                                            fullWidth
                                            color='primary'
                                            margin='normal'
                                            variant='outlined'
                                            id='centroCostos'
                                            label='Centro de costos'
                                            name='tag'
                                            type='text'
                                            value={equipoSeleccionado.CentralCostos}
                                            className={classes.txt}
                                            disabled={true}                   
                                        />
                            </Grid>
                    
                        <Grid item xs={3} className={classes.griditem}>
                            <TextField
                                            fullWidth
                                            color='primary'
                                            margin='normal'
                                            variant='outlined'
                                            id='txtsede'
                                            label='Sede'
                                            name='tag'
                                            type='text'
                                            value={equipoSeleccionado.Sede}
                                            className={classes.txt}
                                            disabled={true}                   
                                        />
                            </Grid>
                            <Grid item xs={2} className={classes.griditem}>
                            <TextField
                                            fullWidth
                                            color='primary'
                                            margin='normal'
                                            variant='outlined'
                                            id='serviceTAG'
                                            label='Service Tag'
                                            name='tag'
                                            type='text'
                                            value={equipoSeleccionado.Serial}
                                            className={classes.txt}
                                            disabled={true}                   
                                        />
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                            <TextField
                                            fullWidth
                                            color='primary'
                                            margin='normal'
                                            variant='outlined'
                                            id='txtEstadoEquipo'
                                            label='Estado'
                                            name='tag'
                                            type='text'
                                            value={equipoSeleccionado.Estado}
                                            className={classes.txt}
                                            disabled={true}                   
                                        />
                            </Grid>
                            {
                                estadoGarantia?
                                <Grid item xs={3} className={classes.griditem}>
                                    <Button
                                        fullWidth
                                        variant='contained'
                                        color='secondary'
                                        name="btnGestionar"
                                        className={classes.btnGestionar}
                                        onClick={()=>abrirCerrarModal()}
                                    >Gestionar garantia
                                    </Button>
                                </Grid>
                        : <h1></h1>
                        }
                    </Grid>
            </Paper>
            : <h1></h1>
            }            

            {agregar?//INTERFACE GESTIONAR GARANTIA
                <Paper elevation={16} className={classes.paperinfo}>                        
                    <TimelineOppositeContent>
                        {fechaActual}
                    </TimelineOppositeContent>
                    <Grid container className={classes.contenedormain}>            
                        <Grid item xs={2} className={classes.griditem}>
                            <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtIncoveniente'
                                    label='Inconveniente'
                                    name='tag'
                                    type='text'
                                    value='Daño'
                                    className={classes.txt}
                                    disabled={true}                 
                                    />
                        </Grid>
                        <Grid item xs={3} className={classes.griditem}>
                                <TextField
                                fullWidth
                                color='primary'
                                margin='normal'
                                variant='outlined'
                                id='txtCaso'
                                label='Número caso'
                                name='tag'
                                type='text'
                                value={numerocaso}
                                onChange={(ev)=>{setNumerocaso(ev.target.value)}}
                                disabled={control}    
                                />
                        </Grid>
                        <Grid item xs={2.5} className={classes.griditem}>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtFecha'
                                    label='Fecha de visita'
                                    name='tag'
                                    type='date'
                                    value={fechavisita}                                                
                                    onChange={(ev)=>{setFechavisita(ev.target.value)}}  
                                    className={classes.txt}
                                    disabled={control} 
                                    />
                        </Grid>
                        <Grid item xs={3} className={classes.griditem}>
                            <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtFuncionario'
                                    label='Funcionario'
                                    name='tag'
                                    type='text'
                                    value={Funcionario}                                               
                                    onChange={(ev)=>{setFuncionario(ev.target.value)}}  
                                    className={classes.txt}
                                    disabled={control}          
                                    />
                        </Grid>
                        <Grid item xs={2.5} className={classes.griditem}>
                            <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtFecha'
                                    label='Fecha de cierre'
                                    name='tag'
                                    type='date'
                                    value={fechaCierre}                                               
                                    onChange={(ev)=>{setFechaCierre(ev.target.value)}}
                                    className={classes.txt}     
                                    />
                        </Grid>
                        <Grid item xs={3} className={classes.griditem}>
                            <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtFecha'
                                    label='Consecutivo contacto'
                                    name='tag'
                                    type='text'
                                    value={consecutivo}                                               
                                    onChange={(ev)=>{setConsecutivo(ev.target.value)}}  
                                    className={classes.txt}
                                    disabled={control}
                                    />
                        </Grid>
                        <Grid item xs={3} className={classes.griditem}>
                            <InputLabel id="demo-simple-select-filled-label" >Quien registra</InputLabel>
                                <Select
                                //Analista
                                fullWidth
                                displayEmpty
                                variant='outlined'
                                value={Analista}
                                onClick={(ev)=>setAnalista(ev.target.value)}
                                disabled={control}                               
                                >
                                {
                                    arrayAnalista.map((obj)=>{
                                        if(obj.nombre != 'undefined'){
                                            return <MenuItem key={obj.nombre} value={obj.nombre}>{obj.nombre}</MenuItem>
                                        }
                                    })
                                }
                                </Select>
                        </Grid>
                        <Grid item xs={2} className={classes.griditem}>
                            <InputLabel id="demo-simple-select-filled-label" >Estado</InputLabel>
                                <Select
                                 //Estado
                                fullWidth
                                displayEmpty
                                variant='outlined'
                                value={estado}
                                onClick={(ev)=>setEstado(ev.target.value)}                                
                                >
                                    <MenuItem value='Abierto'>Abierto</MenuItem>
                                    <MenuItem value='Cerrado'>Cerrado</MenuItem>
                                    <MenuItem value='Cancelado'>Cancelado</MenuItem>                                    
                                </Select>
                        </Grid>
                        <Grid item xs={1} className={classes.griditem}>
                            <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtCantidad'
                                    label='Cantidad'
                                    name='tag'
                                    type='number'
                                    value={cantidad}
                                    disabled={control}
                                    onChange={(ev)=>{setCantidad(ev.target.value)}} 
                                    className={classes.txt}    
                                    />
                        </Grid>
                        <Grid item xs={1} className={classes.griditem}>
                                <Button onClick={contarSelect} disabled={control}><img src={iconAgregar}/></Button>
                        </Grid>
                            {parte?
                            contarPartes.map((ind)=>{
                                return <Grid item xs={3} className={classes.griditem}>
                                    <Select
                                        //Tipo de parte
                                        fullWidth
                                        displayEmpty
                                        variant='outlined'
                                        onClick={(ev)=>addParte(ev.target.value)}
                                        value={ind}
                                        disabled={control}             
                                        >
                                            {
                                                ArrayParte.map((objP)=>{
                                                    if(objP.nombre != 'undefined'){
                                                        return <MenuItem value={objP.nombre}>{objP.nombre}</MenuItem>
                                                    }
                                                })
                                            }
                                    </Select>
                                </Grid>
                            })
                            
                                : <h6> </h6>
                            }
                        <Grid item xs={1} className={classes.griditem}>
                                <InputLabel >Comentarios</InputLabel>
                                <TextareaAutosize
                                    aria-label="minimum height"
                                    minRows={3}
                                    placeholder="Ingrese comentarios"
                                    onChange={(ev)=>(setComentario(ev.target.value))}
                                    value={comentario}
                                    style={{ width: 200, height: 90 }}
                                    />
                        </Grid>                        
                    </Grid>
                    <Grid container className={classes.contenedormain} >
                        <Grid item xs={4} className={classes.griditem} style={{align: 'right'}}>
                            <LoadingButton
                                color="secondary"
                                onClick={(ev) => cancelar()}
                                startIcon={<Close />}
                                variant="contained"
                                className={classes.btnEditar}
                                loadingPosition="end"
                                >
                                Cancelar
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={4} className={classes.griditem} style={{align: 'right'}}>
                            <LoadingButton
                                color="secondary"
                                onClick={(ev) => gestionarGarantia()}
                                startIcon={<Save />}
                                variant="contained"
                                className={classes.btnEditar}
                                loadingPosition="end"
                                >
                                Guardar
                            </LoadingButton>
                        </Grid>
                        <br></br>
                    </Grid>                    
                </Paper>
                    :<h1></h1>
                }

                {tieneGaratia?
                    arrayGarantias.map((objG)=>{
                        return <div>
                            <br></br>
                            <Paper elevation={24} className={classes.paper}>
                                <Typography variant="h6" component="inherit">
                                            Garantia N° {objG.posicion+1} 
                                </Typography>
                                <Grid container className={classes.contenedormain}>
                                    <Grid item xs={2} className={classes.griditem}>
                                        <TextField
                                        fullWidth
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        id='txtCs'
                                        label='Caso'
                                        name='tag'
                                        type='text'
                                        value={objG.Caso}
                                        className={classes.txt}
                                        disabled={true}             
                                        />
                                    </Grid>
                                    <Grid item xs={2} className={classes.griditem}>
                                        <TextField
                                        fullWidth
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        id='txtConsecutivp'
                                        label='Consecutivo'
                                        name='tag'
                                        type='text'
                                        value={objG.consecutivo}
                                        className={classes.txt}
                                        disabled={true}                 
                                        />
                                    </Grid>
                                    <Grid item xs={2} className={classes.griditem}>
                                        <TextField
                                        fullWidth
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        id='txtFuncionario'
                                        label='Funcionario'
                                        name='tag'
                                        type='text'
                                        value={objG.Funcionario}
                                        className={classes.txt}
                                        disabled={true}                 
                                        />
                                    </Grid>
                                    <Grid item xs={2.5} className={classes.griditem}>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtFechaV'
                                    label='Fecha de visita'
                                    name='tag'
                                    type='date'
                                    value={objG.fechaVisita}
                                    className={classes.txt}
                                    disabled={true}         
                                    />
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtCentroCosto'
                                    label='Centro de Costo'
                                    name='tag'
                                    type='number'
                                    value={objG.centroCostos}
                                    className={classes.txt}
                                    disabled={true}           
                                    />
                            </Grid>
                            <Grid item xs={2.5} className={classes.griditem}>
                                <TextField
                                    fullWidth
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    id='txtFecha'
                                    label='Fecha de cierre'
                                    name='tag'
                                    type='date'
                                    value={objG.fechaCierre}
                                    className={classes.txt}
                                    disabled={true}        
                                    />
                            </Grid>
                            <Grid item xs={3} className={classes.griditem}>
                            <InputLabel id="demo-simple-select-filled-label" >Analista</InputLabel>
                                <Select
                                //Analista
                                fullWidth
                                displayEmpty
                                variant='outlined'
                                value={objG.Analista}
                                disabled={true}                            
                                >
                                {
                                    arrayAnalista.map((obj)=>{
                                        if(obj.nombre != 'undefined'){
                                            return <MenuItem key={obj.nombre} value={obj.nombre}>{obj.nombre}</MenuItem>
                                        }
                                    })
                                }            
                                </Select>
                            </Grid>
                            <Grid item xs={2} className={classes.griditem}>
                            <InputLabel id="demo-simple-select-filled-label" >Estado</InputLabel>
                                <Select
                                 //Estado
                                fullWidth
                                displayEmpty
                                variant='outlined'
                                value={objG.estado}
                                disabled={true}                               
                                >
                                    <MenuItem value='Abierto'>Abierto</MenuItem>
                                    <MenuItem value='Cerrado'>Cerrado</MenuItem>
                                    <MenuItem value='Cancelado'>Cancelado</MenuItem>                                    
                                </Select>
                            </Grid>
                                <Grid item xs={2} className={classes.griditem}>
                                    <TextField
                                        fullWidth
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        id='txtCantidad'
                                        label='Cantidad de partes'
                                        name='tag'
                                        type='number'
                                        value={objG.partes.length}
                                        className={classes.txt}
                                        disabled={true}        
                                        />
                                </Grid>
                                {
                                    objG.partes.map((parte)=>{
                                        return <Grid item xs={3} className={classes.griditem}>
                                    <Select
                                        //Tipo de parte
                                        fullWidth
                                        displayEmpty
                                        variant='outlined'
                                        value={parte}
                                        disabled={true}     
                                        >
                                            {
                                                ArrayParte.map((objP)=>{
                                                    if(objP.nombre != 'undefined'){
                                                        return <MenuItem value={objP.nombre}>{objP.nombre}</MenuItem>
                                                    }
                                                })
                                            }
                                    </Select>
                                </Grid>
                                    })
                                }
                                <Grid item xs={2} className={classes.griditem}></Grid>
                                <Grid container className={classes.gridcontainer}>
                                    <Grid item xs={1} className={classes.griditem} >
                                        <LoadingButton
                                            color="secondary"
                                            loadingPosition="start"
                                            name="btnEditar"
                                            startIcon={<ModeEditIcon />}
                                            variant="contained"
                                            className={classes.btnEditar}
                                            disabled={clickEditar}
                                            onClick={(ev)=>{abrirEditar(objG)}}
                                        >
                                        </LoadingButton>
                                    </Grid>                                    
                                </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    })
                    :<h1></h1>
                }
        </div>
    );
}
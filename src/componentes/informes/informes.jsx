/**
 * Informes de la pagina principal
 */
import React, { useEffect, useState }  from 'react';
import {Box,Paper, Typography, Table, TableBody, TableCell, TableContainer,TableHead,TableRow, Button, Modal, Divider,TextField} from '@mui/material/';
import { TimelineDot, TimelineConnector, TimelineSeparator, Timeline, TimelineItem, TimelineOppositeContent,TimelineContent } from '@mui/lab';
import {makeStyles, Grid } from '@material-ui/core';
import IconInforme from '../../img/icons/informe.png';
import { db } from '../firebase-config';
//Iconos
import AddBoxIcon from '@mui/icons-material/AddBox';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const HomeAdmin =()=>{

  const useStyle = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        margin: theme.spacing(3,0,0,0),
    },
    griditem: {
        margin: theme.spacing(0, 1, 0, 1),
    },
    timeLinea: {
      margin:  theme.spacing(0, 3, 0, 50),
    },
    letras: {
      fontFamily: "Times New Roman",
    },
    paperInforme: {
      margin: theme.spacing(0, 0, 0, 0),
      padding: '3px 16px',
      height: '100px'
  },
  paperEquipo: {
    margin: theme.spacing(0, 0, 0, 1),
    padding: '6px 16px',
    height: '100px'
}
}))

  const [arrayContratos,setArrayContratos]= useState([]);
  const [cPortatiles, setCPortatiles]= useState([]);
  const [cEscritorio, setCEscritorio]= useState([]);
  const [cBodega, setCBodega]= useState([]);

  const [open, setOpen]= useState(false);
  const [validar,setValidar]= useState('');
  const [serial,setSerial]= useState('');

  const selectContratos = async ()=>{
    await db.collection('Contrato').onSnapshot((objContrato)=>{
      var arrayc=[];
      objContrato.forEach((objC)=>{
        const contrato = {
          Numero: objC.data().contrato,
          fechaVencemiento: objC.data().fechafin,
          Cantidad: objC.data().Cantidad
        }
        arrayc.push(contrato);
      });
      setArrayContratos(arrayc);
    })
  }

  const countEquipo = async() =>{
    await db.collection('Equipos').onSnapshot((objEquipo)=>{
      var cantidadPortatiles=0;
      var cantidadEscritorio=0;
      var cantidadBodega=0; 
      objEquipo.forEach((objE)=>{
        if(objE.data().Tipo==='Portátil'){
          cantidadPortatiles++;
        }else if(objE.data().Tipo==='Escritorio'){
          cantidadEscritorio++;
        }
        if(objE.data().Propiedad==='Bodega'){
          cantidadBodega++;
        }
      });
      setCBodega(cantidadBodega);
      setCEscritorio(cantidadEscritorio);
      setCPortatiles(cantidadPortatiles);
    });
  }

  useEffect(() => {
    selectContratos();
    countEquipo();
  });

  const abrirModal = () =>{
    setOpen(!open);
  }

  const reporte = ()=>{
  abrirModal('hola');
  alert('Proceso terminado con exito!');
  }

  function createData(name, calories, fat) {
    return { name, calories, fat };
  }

  const classes = useStyle();

    return(
        <div>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <img src={IconInforme}></img>
                 {/*<IconInforme />*/}
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
          <Grid container>
            <Grid item xs={5}>
              <Paper elevation={24} className={classes.paperInforme}>
              <TimelineContent sx={{ py: '13px', px: 2 }}>
                    <Typography variant="h6" component="span" className={classes.letras}>
                      Cantidad de equipos en Bodega
                    </Typography>
                    <Typography className={classes.letras} position="rigth">{cBodega}</Typography>
                  </TimelineContent>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={24} className={classes.paperEquipo}>
              <TimelineContent sx={{ py: '13px', px: 2 }}>
                    <Typography variant="h6" component="span" className={classes.letras}>
                      Portatiles
                    </Typography>
                    <Typography className={classes.letras} position="rigth">{cPortatiles}</Typography>
                  </TimelineContent>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper elevation={24} className={classes.paperEquipo}>
              <TimelineContent sx={{ py: '13px', px: 2 }}>
                    <Typography variant="h6" component="span" className={classes.letras}>
                      Equipos de escritorio
                    </Typography>
                    <Typography className={classes.letras} position="rigth">{cEscritorio}</Typography>
                  </TimelineContent>
              </Paper>
            </Grid>
          </Grid>
          
          <Grid container>
            <Grid item xs={9}>
            <Paper elevation={24} className={classes.paper}>
            <Typography variant="h6" component="span" className={classes.letras}>
              Registro de contratos
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Contrato</TableCell>
                    <TableCell align="right">Cantidad de equipos</TableCell>
                    <TableCell align="right">Fecha de vencimiento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {arrayContratos.map((row) => (
                    <TableRow
                      key={row.Numero}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.Numero}
                      </TableCell>
                      <TableCell align="right">{row.Cantidad}</TableCell>
                      <TableCell align="right">{row.fechaVencemiento}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper elevation={24} className={classes.paper}>
              <Button variant="contained"
              onClick={(ev)=>{abrirModal(ev.target.value)}}
              >Reportar equipo como robado</Button>
              <br></br><br></br>
              <Button variant="contained">Reportar perdida de equipos</Button>
              </Paper>
            </Grid>
          </Grid>
          

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
                                Reporte de equipo
                            </Typography>
                            <Divider></Divider>
                        </Grid>
                        <Grid item xs={6} className={classes.griditem}>
                            <TextField
                                fullWidth
                                margin='normal'
                                variant='outlined'
                                label='Service TAG'
                                name='serial'
                                value={serial}
                                type={'text'}
                                onChange={(e) => setSerial(e.target.value)}
                                requiered={true}                                 
                            />
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
                                onClick={(ev)=>reporte(ev.target.value)}
                                className={classes.btnEditar}
                                >
                                    Reportar
                                </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </div>
    );
}

export default HomeAdmin;
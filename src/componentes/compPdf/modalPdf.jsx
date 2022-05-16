import React, {useState, useEffect} from "react";
import { Modal, Box, Typography} from '@mui/material';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ActaEntrega from '../../pdf/ActaEntrega';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const useStyle = makeStyles((theme) => ({
    btn: {
        margin: theme.spacing(2, 1, 1, 0),
        width: '30%',
        align: 'center',
        backgroundColor: '#5c6bc0'
    },
    btnCancelar: {
        margin: theme.spacing(2, 1, 1, 0),
        width: '30%',
        align: 'center',
    }
}))

const ModalPrestamo = (props)=>{

    const classes = useStyle();
    const [openM,setOpenM]=useState(props.open);
    const [downloandPDF, setDownloandPDF]=useState(false);

    const cambiarEstado = ()=>{
        setOpenM(!openM);
    }

    return(
        <div>
            <Modal
            open={openM}
            onClose={openM}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                ¡Registro realizado correctamente!
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                ¿Como desea visualizar el acta de entrega?
                </Typography>
                <PDFDownloadLink document={
                    <ActaEntrega usuario={props.usuario} equipo={props.equipo} prestamo={props.prestamo}/>
                } fileName="actaEntrega.pdf">
                    <Button
                        variant='contained'
                        className={classes.btn}
                    >Descargar</Button>
                    </PDFDownloadLink>
                <Button
                    variant='contained'
                    className={classes.btn}
                >Visualizar</Button>
                <Button
                    variant="outlined"
                    className={classes.btnCancelar}
                    onClick={cambiarEstado}
                >Cancelar</Button>
                <br></br>
                <Typography variant="caption" display="block" gutterBottom>
                Nota: El acta de entrega fue enviada automaticamente a los correos electronicos seleccionados.
                </Typography>
            </Box>
            </Modal>
        </div>
    );
}

export default ModalPrestamo;

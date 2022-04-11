import '../../DataTables/Tables/css/jquery.dataTables.css';
import React, { Component } from 'react';
import {Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const $ = require('jquery');
$.DataTable = require( 'datatables.net');

export class DataTable extends Component {
    componentDidMount() {
        console.log(this.el);
        this.$el = $(this.el)
        this.$el.DataTable(
            {
                data:this.props.data,
                columns:[
                    { "data": "id" },
                    { "data": "contrato" },
                    { "data": "serial" },
                    { "data": "fechaInicio" },
                    { "data": "fechaFin" },
                    { "data": "compania" },
                    { "data": "control" },
                    {"defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-outline-success btn-sm btnEditar' title='Editar'><i class='fas fa-user-edit'></i></button><button class='btn btn-outline-warning btn-sm btnBorrar' data-toggle='Disponible' title='Servicios del ingreso'><i class='fas fa-search-location'></i></button></div></div>"}
                ]
            }
        )
    }
    componentWillUnmount () {

    }
    render() {
        return <div>
            <table className="display" width="100%" ref={el=>this.el=el}>
                <th>ID</th>
                <th>Contrato</th>
                <th>Serial</th>
                <th>Inicial</th>
                <th>Final</th>
                <th>Compania</th>
                <th>Descripción</th>
                <th>Accion</th>
            </table>
        </div>
    }
}
import React from 'react'; //Traer algo de la libreria de react
import Login from './componentes/Login'; 
import './App.css';
import Barraprincipal from './componentes/pagmain';
import Cajon from './componentes/cajon';
import {auth} from './componentes/firebase-config'
import WindowsMain from './componentes/windowsmain';
import { BrowserRouter as  Router} from 'react-router-dom';


/**
 * Inlcuye dentro otros componentes, viene ya predefinido. Es el componente padre de la aplicación
 */

class App extends React.Component { //Crear el componente
  constructor(props) {
    super(props);
    this.state = { 
      auten : false,
      valiadminDatos:'none',
      valiaddDispo:'none',
    }
     auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({auten:true})
      } else {
        this.setState({auten:false})
      }
    });
  }

  adminidatos= (value) =>{
    this.setState({valiadminDatos:value})
  }
  addDispositivo= (value) =>{
    this.setState({valiaddDispo:value})
  }

  render() { 
    return ( 
      <div>
      {this.state.auten //mirar si el estado esta vacio
      ?<div>
      <Router>
      <Barraprincipal adminidatos={this.adminidatos}></Barraprincipal>
      <Cajon addDispositivo={this.addDispositivo}></Cajon>
      <WindowsMain viewAdmindatos={this.state.valiadminDatos} viewAddequipo={this.state.valiaddDispo}></WindowsMain>
      </Router>
      </div>
      :<Login></Login>
      }
    </div>
    );
  }
}

export default App;

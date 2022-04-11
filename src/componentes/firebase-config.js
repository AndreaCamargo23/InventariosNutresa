//Configuración de la base de datos

import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB9JIPfkS-jBJVEwiw0raDzZBUsJT06C0A",
  authDomain: "nutresa-92991.firebaseapp.com",
  projectId: "nutresa-92991",
  storageBucket: "nutresa-92991.appspot.com",
  messagingSenderId: "204748183895",
  appId: "1:204748183895:web:6002dedae5bdf143238612",
  measurementId: "G-CKV7F24YYV"
};

app.initializeApp(firebaseConfig);//Inicialización de firebase

const db = app.firestore(); //acceso a firebase
const auth = app.auth(); //Autenticación


export {db, auth } //exportando el componente
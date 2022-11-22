import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta : string = 'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php';

  constructor(private http: HttpClient) { }

  //Crear usuario 
  createUser(correo, contrasena, nombre, apellido){
    let that = this;
    return new Promise(resolve =>{
      resolve(that.http.post(that.ruta,{
        nombreFuncion: 'UsuarioAlmacenar',
        parametros: [correo, contrasena, nombre, apellido]
      }).toPromise())
    })
  }

  //Iniciar sesion con las credenciales correspondientes  
  loginUser(correo, contrasena){
    let that = this;
    return new Promise(resolve =>{
      resolve(that.http.post(that.ruta,{
        nombreFuncion: 'UsuarioLogin',
        parametros: [correo, contrasena]
      }).toPromise())
    })
  }
  
  //Cambiar contraseña
  cambioPassword(correo, contrasenaNueva, contrasenaActual){
    let that = this;
    return new Promise(resolve =>{
      resolve(that.http.patch(that.ruta,{
        nombreFuncion: 'UsuarioModificarContrasena',
        parametros: [correo, contrasenaNueva, contrasenaActual]
      }).toPromise())
    })
  }
  
  //Recuperar los datos del usuario logeado
  datosUser(){
    let that = this;
    return new Promise(resolve => {
      resolve(that.http.get(that.ruta +'?nombreFuncion=UsuarioObtenerNombre&correo='+ localStorage.getItem('correo')).toPromise())
    });
  }

  asistencia(correo, id_clase){
    let that = this;
    return new Promise(resolve =>{
      resolve(that.http.post(that.ruta,{
        nombreFuncion: 'AsistenciaAlmacenar',
        parametros: [correo, id_clase]
      }).toPromise())
    })
  }

    //Eliminar datos de la asistencia registrada
    delAsistencia(){
      let that = this;
      return new Promise(resolve => {
        resolve(that.http.get(that.ruta +'?nombreFuncion=EliminarAsistencia&correo='+ localStorage.getItem('correo')).toPromise())
      });
    }
  
  }
  

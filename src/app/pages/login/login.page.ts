import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    //Variables para el registro de usuario.
    mdl_correoRegister: string = "";
    mdl_contrasenaRegister: string = "";
    mdl_nombre: string = "";
    mdl_apellido: string = "";

  //Variables para iniciar sesion.
  mdl_correo: string = "";
  mdl_contrasena: string = "";

  constructor(
    private router: Router, 
    private modal: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private api: ApiService,
    private dbService: DbService) { }

  ngOnInit() {
    localStorage.removeItem('correo');
    console.log(localStorage.getItem('correo'))
  }

    //Funcion cerrar modal\\
    cancel() {
      this.modal.dismiss(null, 'cancel');
    }
    
    //funcion registrar usuario.
    registroUser(){
      let that = this;
      this.loadingController.create({
        message: 'Registrando Usuario en el sistema...',
        spinner: 'lines'
      }).then(async data =>{
        data.present();
        try{
          let respuesta = await this.api.createUser(this.mdl_correoRegister, this.mdl_contrasenaRegister, this.mdl_nombre, this.mdl_apellido);
          if(respuesta['result'][0].RESPUESTA == 'OK'){
            that.presentToast('Cuenta creada exitosamente!')
            that.cancel();
            that.limpiar();
          }
        }catch(error){
          let respuesta = await this.api.createUser(this.mdl_correoRegister, this.mdl_contrasenaRegister, this.mdl_nombre, this.mdl_apellido);
          if(respuesta['result'][0].RESPUESTA =='ERR01'){
            that.presentToast('Usuario no registrado');
            that.limpiar();
          }
        }
        data.dismiss();
      });
    }
  
    //funcion iniciar sesion
    iniciarSesion(){
      let that = this;
      this.loadingController.create({
        message: 'Logeando....',
        spinner: 'lines'
      }).then(async data => {
        data.present();
        try{
          let respuesta = await this.api.loginUser(this.mdl_correo, this.mdl_contrasena);
          if(respuesta['result'] == 'LOGIN OK'){
            localStorage.setItem('ingresado', 'true')
            localStorage.setItem('correo', this.mdl_correo)
            this.router.navigate(['tabs/cuenta'])
            console.log(localStorage.getItem('correo'))
            that.limpiar();
            that.cancel();
          }else{
            that.presentToast('Usuario no se puedo logear');
          }
        }catch(error){
          let respuesta = await this.api.loginUser(this.mdl_correo, this.mdl_contrasena);
          if(respuesta['result'] =='LOGIN NOK'){
            that.presentToast('Error Login');
            that.limpiar();
          }
        }
        data.dismiss();
      });
    }
  
    //Linmpiar input de datos.
    limpiar(){
      this.mdl_correoRegister = '';
      this.mdl_contrasenaRegister = '';
      this.mdl_nombre = '';
      this.mdl_apellido = '';
      this.mdl_correo = '';
      this.mdl_contrasena = '';    
    }
  
    //Toast para mostrar mensaje
    async presentToast(mensaje){
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 1500,
        position: 'bottom'
      });
      await toast.present();
    }
  
    //Slider de la pagina principal\\
    slides = [
      {
        img: 'assets/img/alumnos.svg',
        titulo: 'Bienvenido a Presente!<br>Abre la camara, escanea y PRESENTE!🙋‍♂️🙋'
      },
      {
        img: 'assets/img/profesor.svg',
        titulo: 'Pronto tendremos nuevas<br>funciones 😉 '
      }
    ];

}

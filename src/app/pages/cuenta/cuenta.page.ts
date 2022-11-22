import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  mdl_contrasenaNueva : string = "";
  mdl_contrasenaActual : string = "";
  mdl_correo: string = '';

  constructor(private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private toastController: ToastController,
     ) { }

  ngOnInit() {
    this.mdl_correo = localStorage.getItem('correo');
    this.router.navigate(['tabs/principal'])
  }

  //Funcion cambio de contraseña
  cambioDeContrasena(){
    let that = this;
    this.loadingController.create({
      message: 'Cambiando Contraseña....',
      spinner: 'bubbles'
    }).then(async data => {
      data.present();
      try{
        let respuesta = await this.api.cambioPassword(this.mdl_correo, this.mdl_contrasenaNueva, this.mdl_contrasenaActual);
        if(respuesta['result'][0].RESPUESTA == 'OK'){ 
          that.presentToast('Contraseña Cambiada 👍');
          that.limpiar();
        }else{
          that.presentToast('No se pudo cambiar la contraseña tontito👎');
          console.log(respuesta)
          that.limpiar();
        }
      }catch(error){
        let respuesta = await this.api.cambioPassword(this.mdl_correo, this.mdl_contrasenaNueva, this.mdl_contrasenaActual);
        if(respuesta['result'] =='ERR02'){
          that.presentToast('Error Change Password');
          that.limpiar();
        }
      }
      data.dismiss();
    });
  }

  //Mensaje confirmacion o error
  async presentToast(mensaje){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  //Limpiar los input
  limpiar(){
    this.mdl_contrasenaActual = '';
    this.mdl_contrasenaNueva= '';
  }

}

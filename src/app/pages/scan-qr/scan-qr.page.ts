import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit{

  texto: string = '';
  separador = [];
  cod_clase: any;
  nom_clase: any;

  content_visibility = '';

  mdl_correo: string = ""

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private api: ApiService) { }

  ngOnInit() {
    this.mdl_correo = localStorage.getItem('correo');
  }

  async scanQR() {
    let that = this;
    that.texto = '';
    document.querySelector('body').classList.add('scanner-active');
    this.content_visibility = 'hidden';
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      setTimeout(function () {
        console.log(result.content);
        that.texto = result.content;
        that.separador = that.texto.split('|');

        that.cod_clase = that.separador[0];   //separado[0]
        that.nom_clase = that.separador[1];   //separado[1]
        that.validarQR();

        document.querySelector('body').classList.remove('scanner-active');
      }, 
      400);
      
      this.content_visibility = '';
    }
  }

  validarQR(){
    let that = this;
    this.loadingController.create({
      message: 'Registrando....',
      spinner: 'lines'
    }).then(async data => {
      data.present();
      try{
        let respuesta = await this.api.asistencia(that.mdl_correo, that.cod_clase);
        if(respuesta['result'][0].RESPUESTA == 'OK'){
          that.presentToast('Asistencia registrada en ' + that.nom_clase, 'checkmark-circle-outline', 'success');
        }else{
          that.presentToast('Usted ya se encuentra presente', 'close-circle-outline', 'warning');
        }
      }catch(error){
        let respuesta = await this.api.asistencia(that.mdl_correo, that.cod_clase);
        if(respuesta['result'][0].RESPUESTA =='ERR03'){
          that.presentToast('Error QR', 'close-circle-outline', 'danger');
        }
      }
      data.dismiss();
    });
  }

  borrar(){ 
    console.log(this.api.ruta + '?nombreFuncion=EliminarAsistencia&correo=' + localStorage.getItem('correo'))
    this.api.delAsistencia();
    this.presentToast('Datos eliminados', 'trash-outline', 'danger');
    this.cod_clase = "";
    this.nom_clase ="";
  }
  
    //Toast para mostrar mensaje
    async presentToast(mensaje, icon, color){
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 4000,
        position: 'bottom',
        icon: icon,
        color: color,
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancel'
          }
        ],
      });
      await toast.present();
    }
  
}

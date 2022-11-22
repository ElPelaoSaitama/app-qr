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

  //Toast para mostrar mensaje
  async presentToast(mensaje){
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
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
          that.presentToast('Asistencia registrada exitosamente!');
          that.presentToast('Presente en ' + that.nom_clase);
        }else{
          that.presentToast('Usted ya se encuentra presente');
        }
      }catch(error){
        let respuesta = await this.api.asistencia(that.mdl_correo, that.cod_clase);
        if(respuesta['result'][0].RESPUESTA =='ERR03'){
          that.presentToast('Error Login');
        }
      }
      data.dismiss();
    });
  }

  borrar(){ //debe ser un metodo get
    //this.api.ruta + '?nombreFuncion=EliminarAsistencia&correo=' + localStorage.getItem('correo');
    console.log(this.api.ruta + '?nombreFuncion=EliminarAsistencia&correo=' + localStorage.getItem('correo'))
    this.api.delAsistencia();
    this.presentToast('Datos eliminados');
  }
  
}

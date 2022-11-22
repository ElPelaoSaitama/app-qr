import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {

  usuarios = [];

  constructor(private alertController: AlertController,
    private router: Router,
    private api: ApiService,
    private http: HttpClient,
    private db: DbService) { }

  ngOnInit() {
    this.getUsuario();
  }

  async getUsuario() {
    let data = await this.api.datosUser();
    this.usuarios = data['result'];
}

  async salir(){
  const alert = await this.alertController.create({
    header: 'Salir',
    message: '¿Deberitas te quieres salir?',
    buttons:[
      {
        text: 'Mejor no',
        handler: () => {
        }
      },{
        text: 'Si',
        handler: () => {          
          //Remover los datos en el LocalStorage
          localStorage.removeItem('ingresado');
          localStorage.removeItem('correo');
          this.router.navigate(['login']);
        }
      }
    ]
  });
  await alert.present();
}

}

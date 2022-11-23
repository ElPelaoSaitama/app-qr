import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS SESION(ESTADO INTEGER)', []).then(() => {
        console.log('CONSOLE: TABLA CREADA OK');
      }).catch(e => {
        console.log('CONSOLE: TABLA NOK');
      })
    }).catch(e => {
      console.log('CONSOLE: BASE DE DATOS NOK');
    })
  }

  sesionActiva(){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO SESION (ESTADO) VALUES(1)', []).then(() => {
        console.log('CONSOLE: ESTADO CAMBIADO(1) OK');
      }).catch(e => {
        console.log('CONSOLE: ESTADO NO CAMBIADO');
      })
    }).catch(e => {
      console.log('CONSOLE: BASE DE DATOS NOK');
    })
  }

  sesionDesactivada(){
    this.sqlite.create({
      name: 'datos.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO SESION (ESTADO) VALUES(0)', []).then(() => {
        console.log('CONSOLE: ESTADO CAMBIADO (0) OK');
      }).catch(e => {
        console.log('CONSOLE: ESTADO NO CAMBIADO');
      })
    }).catch(e => {
      console.log('CONSOLE: BASE DE DATOS NOK');
    })
  }

}

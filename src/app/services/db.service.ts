import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite) { 
    
  }
}

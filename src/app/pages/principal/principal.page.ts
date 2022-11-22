import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  handleRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  };

      

  sismos = [];


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('https://api.gael.cloud/general/public/sismos').subscribe(res =>{
      console.log(res);
      this.sismos = res;
    })
  }

}

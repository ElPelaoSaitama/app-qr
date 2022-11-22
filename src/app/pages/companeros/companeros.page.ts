import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-companeros',
  templateUrl: './companeros.page.html',
  styleUrls: ['./companeros.page.scss'],
})
export class CompanerosPage implements OnInit {

  characters = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character').subscribe(res =>{
      console.log(res);
      this.characters = res.results;
    })
  }
}

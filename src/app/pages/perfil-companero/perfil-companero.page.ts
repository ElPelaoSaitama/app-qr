import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-companero',
  templateUrl: './perfil-companero.page.html',
  styleUrls: ['./perfil-companero.page.scss'],
})
export class PerfilCompaneroPage implements OnInit {

  profileId: string = "";
  character;

  constructor(private activatedRouter: ActivatedRoute,
    private http: HttpClient) { }

    ngOnInit() {
      this.profileId = this.activatedRouter.snapshot.paramMap.get('id')
      this.http.get('https://rickandmortyapi.com/api/character/' + this.profileId).subscribe(res =>{
        this.character = res;
      })
    }
  
  }

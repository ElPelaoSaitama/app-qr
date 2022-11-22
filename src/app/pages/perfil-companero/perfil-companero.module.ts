import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilCompaneroPageRoutingModule } from './perfil-companero-routing.module';

import { PerfilCompaneroPage } from './perfil-companero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilCompaneroPageRoutingModule
  ],
  declarations: [PerfilCompaneroPage]
})
export class PerfilCompaneroPageModule {}

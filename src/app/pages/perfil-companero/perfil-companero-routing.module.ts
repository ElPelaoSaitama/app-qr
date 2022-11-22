import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilCompaneroPage } from './perfil-companero.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilCompaneroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilCompaneroPageRoutingModule {}

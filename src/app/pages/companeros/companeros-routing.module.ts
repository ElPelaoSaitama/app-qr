import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanerosPage } from './companeros.page';

const routes: Routes = [
  {
    path: '',
    component: CompanerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanerosPageRoutingModule {}

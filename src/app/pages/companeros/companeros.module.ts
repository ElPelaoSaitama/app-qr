import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanerosPageRoutingModule } from './companeros-routing.module';

import { CompanerosPage } from './companeros.page';
import { NavComponent } from 'src/app/components/nav/nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanerosPageRoutingModule,
  ],
  declarations: [CompanerosPage, NavComponent]
})
export class CompanerosPageModule {}

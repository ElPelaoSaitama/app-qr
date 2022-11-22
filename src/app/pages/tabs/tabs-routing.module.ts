import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IngresadoGuard } from 'src/app/ingresado.guard';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'principal',
        loadChildren: () => import('../../pages/principal/principal.module').then( m => m.PrincipalPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'scan-qr',
        loadChildren: () => import('../../pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../../pages/cuenta/cuenta.module').then( m => m.CuentaPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'companeros',
        loadChildren: () => import('../../pages/companeros/companeros.module').then( m => m.CompanerosPageModule),
        canActivate: [IngresadoGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

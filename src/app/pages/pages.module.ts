import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PagesPage } from './pages.page';

const routes: Routes = [
  {
    path: ':id',
    component: PagesPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
      },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ],
  }
];
  
@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PagesPage]
})
export class PagesPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusComponent } from 'src/app/shared/modal/status/status.component';
import { CheckoutComponent } from './../../shared/modal/checkout/checkout.component';

import { ProductPage } from './product.page';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'status', component: StatusComponent },
  { path: ':id', component: ProductPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductPageRoutingModule {}

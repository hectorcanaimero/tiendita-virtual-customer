import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusComponent } from './status/status.component';
import { AddressComponent } from './address/address.component';
import { CheckoutComponent } from './checkout/checkout.component';


@NgModule({
  declarations: [
    StatusComponent,
    AddressComponent,
    CheckoutComponent,
  ],
  exports: [
    StatusComponent,
    AddressComponent,
    CheckoutComponent,
  ],
  entryComponents: [
    StatusComponent,
    AddressComponent,
    CheckoutComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ModalModule { }

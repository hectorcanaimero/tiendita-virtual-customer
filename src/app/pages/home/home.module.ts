import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { ModalModule } from './../../shared/modal/modal.module';
import { ComponentModule } from './../../shared/component/component.module';
import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    ModalModule,
    CommonModule,
    ComponentModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

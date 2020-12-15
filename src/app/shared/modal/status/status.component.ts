import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {

  cart$: any = [];

  constructor(
    private data$: DataService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.cart$ = this.data$.watchStorage('cart');
  }



  onClose = () => this.modalCtrl.dismiss();
}

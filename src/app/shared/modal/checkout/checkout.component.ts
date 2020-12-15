import { Cart } from './../../services/store';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { StatusComponent } from '../status/status.component';
import { AddressComponent } from './../address/address.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {

  cart$: any = [];
  subtotal: number = 0;
  store: any = []
  delivery: any = [];


  constructor(
    private data$: DataService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
  ) { }

  ngOnInit() {
    this.data$.watchStorage('shop').subscribe((res) => this.store = res);
    
    this.data$.watchStorage('delivery').subscribe((res) => this.delivery = res);
    this.data$.getStorage('cart').pipe(
      tap((res) => {
        console.log(res);
        const sum = res?.reduce((s: any, a: any) => s + a.total, 0);
        this.subtotal = sum;
      }),
      map<Cart, Cart>((res) => res)
    ).subscribe((res) => this.cart$ = res);
  }

  onEditItem = async (item: any, id: number) => {
    const actionSheet = await this.actionCtrl.create({
      header: `${item.cant} ${item.product.name}`,
      mode: 'ios',
      buttons: [
        {
          text: 'Editar Observación',
          handler: () => this._editObservation(item)
        }, {
          text: 'Remover Item',
          handler: () => {
            // this.cart$.splice(id, 1);
            // this.data$.setStorage('cart', this.cart$);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });
    await actionSheet.present();
  }

  onAdd = () => {
    this.onClose();
    this.navCtrl.navigateRoot(`store/${this.store.slug}/home`);
  }
  onClose = () => this.modalCtrl.dismiss();
  onAddress = async () => {
    const modal = await this.modalCtrl.create({component: AddressComponent});
    modal.present();
  }

  _editObservation = async (item: any) => {
    const alert = await this.alertCtrl.create({
      mode: 'ios',
      header: 'Editar Observacion',
      inputs: [
        {
          name: 'description',
          type: 'text',
          placeholder: 'Observación'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => blah
        }, {
          text: 'Salvar',
          handler: ({description}) => item.obs = description
        }
      ]
    });
    await alert.present();
  }
  onPaid = async () => {
    let orders: any = {};
    this.cart$.subscribe((res) => {
      delete this.store.created;
      orders = {
        store: this.store,
        products: res,
        customer: this.delivery,
        status: { id: 1, name: "proccess" },
        total: this.subtotal
      };
    });
    this.data$.setOrders(this.store.slug, orders)
    .then((res) => this.data$.setStorage('cart', orders))
    this._onSend();
  }

  _onSend = async () => {
    const modal = await this.modalCtrl.create({component: StatusComponent });
    modal.present();
  }
}

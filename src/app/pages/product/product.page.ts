import { CheckoutComponent } from './../../shared/modal/checkout/checkout.component';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit, AfterViewInit {

  id: string = '';
  cart: any = [];
  item$: Observable<any>;
  store$: any = [];
  count: number = 1;
  description: string = '';

  constructor(
    private data$: DataService,
    private active: ActivatedRoute,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.store$ = this.data$.watchStorage('shop').pipe(
      tap((data) => {
        const slug = this.active.paramMap.pipe(map(paramsMap => paramsMap.get('id')))
        slug.subscribe((res) => this.item$ = this.data$.getProductId( data.slug, res)); 
      })
    ).
    this.data$.getStorage('cart').subscribe((res) => this.cart);
  }
  
  ngAfterViewInit() {
    this.data$.watchStorage('cart').subscribe((res) => this.cart = res);
  }

  send = async (item: any) => {
    if (this.cart === undefined) this.cart = [];
    console.log(typeof(this.cart));
    let data: any = [];
    if (this.count === 0) return;
    data = {
      store: this.s
      product: item,
      cant: this.count,
      total: this.count * item.price,
      obs: this.description
    };
    this.cart.products.push(data);
    this.data$.setStorage('cart', this.cart);
    this.onCheckout();
  }

  add = () => this.count++;
  minus = () => {
    if (this.count < 1) this.count = 0;
    else this.count--;
  }

  onCheckout = async() => {
    const modal = await this.modalCtrl.create({ component: CheckoutComponent });
    modal.present();
  }
}

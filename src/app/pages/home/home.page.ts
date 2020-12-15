import { CheckoutComponent } from './../../shared/modal/checkout/checkout.component';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  store: any = [];
  cart: boolean = false;
  count: number=  0;
  price: any = [];
  categories$: Observable<any>;

  constructor(
    private data$: DataService,
    private modalCtrl: ModalController
    ) {}

  ngOnInit() {
    timer(200).subscribe(() => {
      this.data$.watchStorage('shop').subscribe((res) => {
        this.store = res;
        this.onCategories(res);
      });
    });
    this.data$.watchStorage('cart').subscribe((res) => {
      if (res) {
        this.cart = true;
        this.count = res.length;
        this.price = res.reduce((s: any, a: any) => s + a.total, 0);
      }
    });
  }


  onCategories = (item: any) => {
    this.categories$ = this.data$.getCategories(item.slug)
    .pipe(
      map(actions => {
        let data: any = [];
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    );
  }

  onCheckout = async() => {
    const modal = await this.modalCtrl.create({ component: CheckoutComponent });
    modal.present();
  }
  onAddress = () => console.log('on Address');
}

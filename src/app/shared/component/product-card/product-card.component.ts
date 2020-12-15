import { NavController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() store: string = '';
  @Input() category: any = [];

  items$: Observable<any>;
  options = {
    slidesPerView: 2.5,
    spaceBetween: 10,
    freeMode: true,
    zoom: { maxRatio: 5 },
    autoplay: { delay: 2000 },
    fadeEffect: { crossFade: true },
    breakpoints: {
      640: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
    }
  };

  constructor(
    private data$: DataService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    timer(300).subscribe(() => this.onProducts());
  }

  onProducts = () => {
    this.items$ = this.data$.getProductCategory(this.store, this.category.id)
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

  onLink = (item: string) => this.navCtrl.navigateForward(`${this.store}/product/${item}`);

}

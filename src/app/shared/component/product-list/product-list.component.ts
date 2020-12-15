import { Component, Input, OnInit, Output } from '@angular/core';

import { NavController } from '@ionic/angular';

import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})

export class ProductListComponent implements OnInit {

  @Input() store: string = '';
  @Input() category: any = [];
  @Output() count: number = 0;

  items$: Observable<any>;

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

  onLink = (item: string) => this.navCtrl.navigateForward(`store/${this.store}/product/${item}`);
}

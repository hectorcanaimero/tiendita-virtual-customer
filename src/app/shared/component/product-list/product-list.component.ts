import { DataService } from 'src/app/shared/services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { timer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

  @Input() store: string = '';
  @Input() category: any = [];

  items$: Observable<any>;

  constructor(
    private data$: DataService
  ) { }

  ngOnInit() {

    timer(300).subscribe(() => this.onProducts());
  }

  onProducts = () => {
    console.log(this.store);
    console.log(this.category.id);
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
    this.items$.subscribe(res => console.log(res));
  }

}

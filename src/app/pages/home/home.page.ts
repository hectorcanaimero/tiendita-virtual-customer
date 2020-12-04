import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  store$: Observable<any>;
  categories$: Observable<any>;

  constructor(
    private data$: DataService
  ) {}

    ngOnInit() {
      this.store$ = this.data$.getStore('yema-burguer')
      .pipe(tap((res) => this.onCategories(res.slug)));
    }


    onCategories = (slug: string) => this.categories$ = this.data$.getCategories(slug)
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


    onAddress = () => console.log('on Address');
}

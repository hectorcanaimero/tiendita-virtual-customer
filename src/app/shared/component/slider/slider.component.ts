import { Component, Input, OnInit } from '@angular/core';

import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() store: any = [];
  items$: Observable<any>;

  options = {
    slidesPerView: 1,
    freeMode: true,
    zoom: { maxRatio: 5 },
    autoplay: { delay: 2000 },
    fadeEffect: { crossFade: true },
    breakpoints: {
      640: {
        slidesPerView: 1,
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
  ) { }

  ngOnInit() {
    this.items$ = this.data$.getCarousel(this.store.slug).pipe(
      map(actions => {
        let data: any = [];
        return actions.map(a => {
            data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
        });
      })
    )
  }

}

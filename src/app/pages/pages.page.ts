import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs/operators';

import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-pages',
  template: '<ion-router-outlet></ion-router-outlet>'
})

export class PagesPage implements OnInit {
  
    constructor( 
        private data$: DataService,
        private active: ActivatedRoute,
    ) {}
  
    ngOnInit() {
        this.active.paramMap.pipe(map(paramsMap => paramsMap.get('id')))
        .subscribe((res) => this.data$.getStore(res).subscribe((store) => {
            delete store.token;
            delete store.uid;
            this.data$.setStorage('shop', store);
        })); 
    }
}

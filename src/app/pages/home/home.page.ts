import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  store$: Observable<any>;

  constructor(
    private data$: DataService
  ) {}

    ngOnInit() {
      this.store$ = this.data$.getStore('yema-burguer');
      this.store$.subscribe((res) => console.log(res));
    }

    onAddress = () => console.log('on Address');
}

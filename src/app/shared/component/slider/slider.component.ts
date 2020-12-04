import { Component, Input, OnInit } from '@angular/core';
import { ObservableInput, timer } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {

  @Input() store: any = [];
  items$: ObservableInput

  constructor(
    private data$: DataService,
  ) { }

  ngOnInit() {
    timer(200).subscribe(() => {
      console.log('');
    })
  }

}

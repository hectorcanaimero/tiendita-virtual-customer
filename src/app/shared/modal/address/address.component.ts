import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private data$: DataService,
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    this.onLoad();
    this.data$.watchStorage('delivery').subscribe((res) => {
      if (res) this.form.patchValue(res);
    })
  }

  onLoad = () => {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      identification: ['', [Validators.required, Validators.minLength(7)]],
      phone: ['', [Validators.required, Validators.minLength(11)]],
      email: [''],
      address: ['', [Validators.required, Validators.minLength(4)]]
    })
  }

  onSend = () => {
    if (this.form.invalid) return;
    this.data$.setStorage('delivery', this.form.value);
    this.onClose();
  }

  onClose = () => this.modalCtrl.dismiss();
}

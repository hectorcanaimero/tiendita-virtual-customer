import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirePerformance, trace } from '@angular/fire/performance';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore,
    private pf: AngularFirePerformance,
  ) { }

  getStore = (store: string) => this.db.collection('store').doc(store)
    .valueChanges().pipe(trace('getCustomerStore'));

  getCategories = (store: string) => this.db.collection('store').doc(store).collection('categories')
    .snapshotChanges().pipe(trace('getCustomerCategories'));

  getProductCategory = (store: string, category: string) => this.db.collection('store').doc(store)
    .collection('products', ref => ref.where('category.id', '==', category))
    .snapshotChanges().pipe(trace('getCustomerProductsCategories'));

  getCarousel = (store: string) => this.db.collection('store').doc(store).collection('carousel')
  .snapshotChanges().pipe(trace('getCustomerCarousel'));
}
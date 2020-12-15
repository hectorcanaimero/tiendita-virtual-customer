import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirePerformance, trace } from '@angular/fire/performance';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable } from 'rxjs';
import { Store } from './store';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(
    private db: AngularFirestore,
    private storageMap: StorageMap,
    private pf: AngularFirePerformance,
  ) { }

  getStore = (store: string): Observable<Store> => this.db.collection('store').doc(store)
    .valueChanges().pipe(trace('getCustomerStore'));

  getCategories = (store: string) => this.db.collection('store').doc(store).collection('categories', ref => ref.orderBy('order'))
    .snapshotChanges().pipe(trace('getCustomerCategories'));

  getProductCategory = (store: string, category: string) => this.db.collection('store').doc(store)
    .collection('products', ref => ref.where('category.id', '==', category))
    .snapshotChanges().pipe(trace('getCustomerProductsCategories'));

  getProductId = (store: string, id: string) => this.db.collection('store').doc(store)
    .collection('products').doc(id).valueChanges().pipe(trace('getCustomerProductId'));

  getCarousel = (store: string) => this.db.collection('store').doc(store).collection('carousel')
  .snapshotChanges().pipe(trace('getCustomerCarousel'));

  setOrders = (store: string, data: any) => this.db.collection('store').doc(store).collection('orders').add(data);
  
  // Storage Map
  setStorage = (name: string, data: any) => this.storageMap.set(name, data).subscribe(res => res);
  getStorage = (name: string): Observable<any> => this.storageMap.get(name);
  watchStorage = (name: string): Observable<any> => this.storageMap.watch(name);
  hasStorage = (name: string): Observable<any> => this.storageMap.has(name);
}
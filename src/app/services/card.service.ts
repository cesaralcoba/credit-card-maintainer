import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject } from 'rxjs';
import { CreditCard } from '../models/CreditCard';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private card$ = new Subject<any>();
  constructor(private firebase: AngularFirestore) { }

  saveCard(card: CreditCard): Promise<any> {
    return this.firebase.collection('tarjetas').add(card);
  }

  sortCards(): Observable<any> {
    return this.firebase.collection('tarjetas', ref => ref.orderBy('createdDate','asc')).snapshotChanges();
  }

  deleteCard(id: string): Promise<any> {
    return this.firebase.collection('tarjetas').doc(id).delete();
  }

  setEditCard(card: CreditCard){
    this.card$.next(card);
  }

  getEditCard(): Observable<CreditCard>{
    return this.card$.asObservable();
  }

  editCard(id: string, card: any): Promise<any> {
    return this.firebase.collection('tarjetas').doc(id).update(card);
  }



}

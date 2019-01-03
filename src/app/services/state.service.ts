import { Injectable } from '@angular/core';
import { IOrderResponse, IStore, ISearchFields as ISearchParams, IPOS } from '../interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  storesSub$ = new BehaviorSubject<IStore[]>([]);
  ordersSub$ = new BehaviorSubject<IOrderResponse[]>([]);
  currentSearchParams$ = new BehaviorSubject<ISearchParams>(null);
  
  constructor() { }


  updateCurrentSearchParams(params: ISearchParams) {
    this.currentSearchParams$.next(params);
  }

  getCurrentPosData() {
    const currentSearchParams = this.currentSearchParams$.getValue();
    const currStore = this.storesSub$.getValue().filter((store: IStore) => store.Name === currentSearchParams.storeName);
    const currPosData = currStore[0].POSList.filter(currPos => currPos.Name === currentSearchParams.pos)[0];
    return currPosData;
  }

}
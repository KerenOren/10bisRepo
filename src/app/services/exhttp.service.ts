import { StateService } from './state.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrdersPayload as IOrderPayload, IHttpGetParams, IStore, IOrdersResponse } from '../interfaces';
import { Observable } from 'rxjs';

const TOKEN = 'c30633f5-7bea-8af6-e49c-12e1e42ed0fe';
const URL = 'https://10.10.200.108:2121/API/';
const GET_ACTIONS = {
  STORES: 'GetStores',
  POS: 'GetPoses',
  ORDERS: 'GetOrders'
}


@Injectable({
  providedIn: 'root'
})
export class ExhttpService {
  
  constructor(private _http: HttpClient, private _state: StateService) { }
  
  createParams(actionName, additinalParams?): IHttpGetParams {
    let params: IHttpGetParams;
    params = { token: TOKEN };
    
    switch (actionName) {
      case GET_ACTIONS.STORES:
      return params;
      case GET_ACTIONS.POS:
      params.storeId = additinalParams.storeId;
      case GET_ACTIONS.ORDERS: 
      // params['posId'] = additinalParams.posId;
      params.posId = 12395;
      params.startDate = additinalParams.startDate;
      params.endDate = additinalParams.endDate;
      default:
    }
    return params;
  }
  getStores(): void {
    this._http.get(URL + GET_ACTIONS.STORES, {params : this.createParams(GET_ACTIONS.STORES) as {}})
    .subscribe((stores: IStore[]) => this._state.storesSub$.next(stores));
  }
  
  getPosList(storeId: string): Observable<any> {
    let params = this.createParams(GET_ACTIONS.POS, {'storeId': storeId});
    return this._http.get(URL + GET_ACTIONS.POS, { 
      params : params as {} 
    });
  }
  
  getOrders(payload: IOrderPayload): void {
    this._http.get(URL + GET_ACTIONS.ORDERS, { 
      params : this.createParams(GET_ACTIONS.ORDERS, payload) as {}
    }).subscribe((orders: IOrdersResponse) => this._state.ordersSub$.next(orders.Data));
  }
  
}
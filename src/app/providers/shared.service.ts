import { Injectable } from '@angular/core';
import { Coin } from '../models/coin';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private coin: Coin;

  constructor() {

    this.coin = new Coin();
   }

  setCoin(valor: Coin) {
      this.coin.id =  valor.id;
      this.coin.name = valor.name;
      this.coin.acronym =  valor.acronym;
  }

  getCoin() {
    return this.coin;
  }

}

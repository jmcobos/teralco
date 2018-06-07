import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
import { urlCurrency, urlCriptoCompare  } from './../config/urls.component';
import { Coin } from './../models/coin';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  public getCurrencies() {
    return this.http.get(urlCurrency, httpOptions);
  }

  public postCurrency(body: Coin) {
    body.id = 0;
    return this.http.post(urlCurrency, body, httpOptions);
  }
  public putCurrency(body: Coin) {
    return this.http.put(urlCurrency + '/' + body.id, body, httpOptions);
  }

  public deleteCurrency(id) {
    return this.http.delete(urlCurrency + '/' + id, httpOptions);
  }

  public getCoinsAvailables(acronym) {
    return this.http.get(urlCriptoCompare, httpOptions).pipe(
      map((coins: any) => {
        return Object.keys(coins.Data).filter(key => coins.Data[key].Name == acronym);
      })
    )
  }

}

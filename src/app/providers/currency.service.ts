import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';
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

  private urlBase: string;
  private urlCoins: string;

  constructor(private http: HttpClient) {
    this.urlBase = 'https://sheltered-cliffs-34052.herokuapp.com/api/';
    this.urlCoins = 'https://www.cryptocompare.com/api/data/coinlist/';
  }

  public getCurrencies() {
    return this.http.get(this.urlBase + 'currency', httpOptions);
  }

  public postCurrency(acronimo, nombre) {
    const body = {
      'id': null,
      'acronim': acronimo,
      'name': nombre
    };
    return this.http.post(this.urlBase + 'currency', body, httpOptions);
  }
  public putCurrency(currency, acronimo, nombre) {
    const body = {
      'id': currency.id,
      'acronym': acronimo,
      'name': nombre
    };
    return this.http.put(this.urlBase + 'currency/' + currency.id, body, httpOptions);
  }

  public deleteCurrency(currency) {
    return this.http.delete(this.urlBase + 'currency/' + currency.id, httpOptions);
  }

  public getCoinsAvailables() {
    return this.http.get(this.urlCoins, httpOptions).pipe(
      map((coins: any) => coins.Data)
    );
  }

}

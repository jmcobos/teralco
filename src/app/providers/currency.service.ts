import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { headersToString } from 'selenium-webdriver/http';

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

  constructor(private http: HttpClient) {
    this.urlBase = 'https://sheltered-cliffs-34052.herokuapp.com/api/';
  }

  public getCurrencies() {
    return this.http.get(this.urlBase + 'currency', httpOptions);
  }

  public putCurrency(currency, acronimo, nombre) {
    const body = {
      'id': currency.id,
      'acronym': acronimo,
      'name': nombre
    };
    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.put(this.urlBase + 'currency/' + currency.id, body, httpOptions2);
  }

  public deleteCurrency(currency) {
    /*let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');*/

    let headers3 = new HttpHeaders().set('Accept', '*/*');

        /*return this.http.post(this.url+'productos', params, {headers: headers});*/
    /*const httpOptions3 = {
      headers: new HttpHeaders({
        'Accept': '*',
        'Access-Control-Allow-Origin':
      })
};*/
  const url = this.urlBase + 'currency/' + currency.id;
debugger;

    return this.http.delete(url, { headers: headers3 });
  }

}

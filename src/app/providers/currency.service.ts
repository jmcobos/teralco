import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  public logearse (usuario: string, password: string) {
    const datos = JSON.stringify({ usuario: usuario, password: password });
    return this.http.post(this.urlBase + 'auth', datos, httpOptions);
  }

}

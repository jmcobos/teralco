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
export class PortfolioLinesService {

  private urlBase: string;
  private urlBasePortfolio: string;

  constructor(private http: HttpClient) {
    this.urlBase = 'https://sheltered-cliffs-34052.herokuapp.com/api/portfolioline';
    this.urlBasePortfolio = 'https://sheltered-cliffs-34052.herokuapp.com/api/portfolio';
  }

  public getPortfolioLines(id) {
    return this.http.get(this.urlBasePortfolio + '/' + id + '/lines', httpOptions);
  }

  public getCurrencyByLine(id) {
    return this.http.get(this.urlBase + '/' + id + '/currency', httpOptions);
  }

  public postPortfolioLine(id, nombre, currency, portfolio) {
    const body = {
      'id': null,
      'amount': nombre,
      'currency': currency,
      'portfolio': portfolio
    };
    return this.http.post(this.urlBase + '/' + id, body, httpOptions);
  }

  public putPortfolioLine(id, nombre, currency, portfolio) {
    const body = {
      'id': null,
      'amount': nombre,
      'currency': currency,
      'portfolio': portfolio
    };
    return this.http.put(this.urlBase + '/' + id, body, httpOptions);
  }

  public deletePortfolioLine(id) {
    return this.http.delete(this.urlBase + '/' + id, httpOptions);
  }
}

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

  getPortfolioLines(id) {
    return this.http.get(this.urlBasePortfolio + '/' + id + '/lines', httpOptions);
  }

  getCurrencyByLine(id) {
    return this.http.get(this.urlBase + '/' + id + '/currency', httpOptions);
  }
}

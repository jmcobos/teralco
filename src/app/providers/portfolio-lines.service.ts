import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { urlPortfolio, urlPortfolioLines } from './../config/urls.component';
import { Portfolioline } from './../models/portfolioline';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PortfolioLinesService {

  constructor(private http: HttpClient) { }

  public getPortfolioLines(id) {
    return this.http.get(urlPortfolio + '/' + id + '/lines', httpOptions);
  }

  public getCurrencyByLine(id) {
    return this.http.get(urlPortfolioLines + '/' + id + '/currency', httpOptions);
  }

  public postPortfolioLine(body: Portfolioline) {
    return this.http.post(urlPortfolioLines + '/' + body.id, body, httpOptions);
  }

  public putPortfolioLine(body: Portfolioline) {
    return this.http.put(urlPortfolioLines + '/' + body.id, body, httpOptions);
  }

  public deletePortfolioLine(id) {
    return this.http.delete(urlPortfolioLines + '/' + id, httpOptions);
  }
}

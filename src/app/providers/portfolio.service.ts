import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Portfolio } from './../models/portfolio';
import { urlPortfolio } from './../config/urls.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  public getPortfolios () {
    return this.http.get(urlPortfolio, httpOptions);
  }

  public postPortfolio(body: Portfolio) {
    return this.http.post(urlPortfolio, body, httpOptions);
  }
  
  public putPortfolio(body: Portfolio) {
    return this.http.put(urlPortfolio + '/' + body.id, body, httpOptions);
  }

  public deletePortfolio(id) {
    return this.http.delete(urlPortfolio + '/' + id, httpOptions);
  }

}

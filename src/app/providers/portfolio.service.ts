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
export class PortfolioService {

  private urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = 'https://sheltered-cliffs-34052.herokuapp.com/api/portfolio';
  }

  getPortfolios () {
    return this.http.get(this.urlBase, httpOptions);
  }

}

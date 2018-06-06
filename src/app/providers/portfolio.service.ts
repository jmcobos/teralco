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

  public getPortfolios () {
    return this.http.get(this.urlBase, httpOptions);
  }

  public postPortfolio(id, nombre) {
    const body = {
      'id': null,
      'name': nombre
    };
    return this.http.post(this.urlBase, body, httpOptions);
  }
  public putPortfolio(id, nombre) {
    const body = {
      'id': id,
      'name': nombre
    };
    return this.http.put(this.urlBase + '/' + id, body, httpOptions);
  }

  public deletePortfolio(id) {
    return this.http.delete(this.urlBase + '/' + id, httpOptions);
  }

}

import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../providers/currency.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currencies = [];
  ocultarDetalle = true;
  actualCurrency = {};
  acronimo: string;
  nombre: string;

  constructor(private currency: CurrencyService) { }

  ngOnInit() {
    this.currency.getCurrencies().subscribe(
      (response: any) => {
        debugger;
        this.currencies = response._embedded.currencies;
      },
      (error: any) => {
        console.log('Error: ' + error);
      }
    );
  }

  editarCurrency (currency) {
    this.acronimo = currency.acronym;
    this.nombre = currency.name;
    this.actualCurrency = currency;
    this.ocultarDetalle = false;
  }

  aceptar() {
    debugger;
    this.currency.putCurrency(this.actualCurrency, this.acronimo, this.nombre).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        debugger;
        console.log('Error: ' + error);
      }
    );
  }

  cancel() {
    this.acronimo = '';
    this.nombre = '';
    this.ocultarDetalle = true;
  }

  eliminarCurrency (currency) {
    this.currency.deleteCurrency(currency).subscribe(
      (response: any) => {
        debugger;
        console.log(response);
        this.cancel();
        this.currencies.forEach((element, index) => {
          if (element.id === currency.id) {
            this.currencies.splice(index, 1);
          }
        });
        alert(currency.name);
      },
      (error: any) => {
        debugger;
        console.log('Error: ' + JSON.stringify(error));
      }
    );
  }

}

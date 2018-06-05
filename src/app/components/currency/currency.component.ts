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
  mostrarEditar = true;
  actualCurrency = {};
  acronimo: string;
  nombre: string;

  constructor(private currency: CurrencyService) { }

  ngOnInit() {
    this.currency.getCurrencies().subscribe(
      (response: any) => {
        this.currencies = response._embedded.currencies;
      },
      (error: any) => {
        console.log('Error: ' + JSON.stringify(error));
      }
    );
  }

  editarCurrency (currency) {
    this.acronimo = currency.acronym;
    this.nombre = currency.name;
    this.actualCurrency = currency;
    this.mostrarEditar = !this.mostrarEditar;
  }

  eliminarCurrency (currency) {
    this.currency.deleteCurrency(currency).subscribe(
      (response: any) => {
        debugger;
        console.log(response);
        this.cancelarEditar();
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

  aceptarEditar() {
    debugger;
    this.currency.putCurrency(this.actualCurrency, this.acronimo, this.nombre).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        debugger;
        console.log('Error: ' + JSON.stringify(error));
      }
    );
  }

  cancelarEditar() {
    this.acronimo = '';
    this.nombre = '';
    this.mostrarEditar = !this.mostrarEditar;
  }

}

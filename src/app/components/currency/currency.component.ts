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

  crearCurrency() {
    /*this*/
  }

  editarCurrency(currency) {
    if (currency) {
      this.acronimo = currency.acronym;
      this.nombre = currency.name;
      this.actualCurrency = currency;
    }
    this.mostrarEditar = !this.mostrarEditar;
  }

  eliminarCurrency(currency) {
    this.currency.deleteCurrency(currency).subscribe(
      (response: any) => {
        this.cancelarEditar();
        this.currencies.forEach((element, index) => {
          if (element.id === currency.id) {
            this.currencies.splice(index, 1);
          }
        });
        alert(currency.name);
      },
      (error: any) => {
        console.log('Error: ' + JSON.stringify(error));
      }
    );
  }

  aceptarEditar() {
    this.currency.getCoinsAvailables().subscribe(
      (response: any) => {
        const coins = response;
        coins.forEach(element => {
          if (element.Name === this.acronimo) {
            this.currency.putCurrency(this.actualCurrency, this.acronimo, this.nombre).subscribe(
              (responsePut: any) => {
                console.log(responsePut);
              },
              (error) => {
                console.log('Error: ' + JSON.stringify(error));
              }
            );
          }
        });
      },
      (error) => {
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

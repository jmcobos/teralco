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
  acronimo: string;
  nombre: string;

  constructor(private currency: CurrencyService) { }

  ngOnInit() {
    this.currency.getCurrencies().subscribe( 
      (response: any) => {
        this.currencies = response._embedded.currencies;
      },
      (error: any) => {
        console.log('Error: ' + error);
      }
    )
  }

  editarCurrency (currency) {
    this.acronimo = currency.acronym;
    this.nombre = currency.name;
    this.ocultarDetalle = false;
  }
  
  eliminarCurrency (currency) {
    this.cancel();
    this.currencies.forEach((element, index) => {
      if (element.id === currency.id) {
        this.currencies.splice(index, 1);
      }
    });
    alert(currency.name);
  }

  cancel () {
    this.acronimo = "";
    this.nombre = "";
    this.ocultarDetalle = true;
  }

}

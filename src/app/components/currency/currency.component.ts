import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../providers/currency.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currencies = [];
  ocultarDetalle = true;

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
    )
  }

}

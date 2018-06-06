import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../providers/currency.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Coin } from '../../models/coin';
import swal from 'sweetalert2';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  currencies = [];
  coin = new Coin(0, '', '');
  mostrarEditar = true;

  constructor(private currency: CurrencyService) { }

  ngOnInit() {
    this.currency.getCurrencies().subscribe(
      (response: any) => {
        this.currencies = response._embedded.currencies;
      },
      (error: any) => {
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

  crearCurrency() {
    alert('hola');
  }

  editarCurrency(currency) {
    if (currency) {
      this.coin.id = currency.id;
      this.coin.acronym = currency.acronym;
      this.coin.name = currency.name;
      this.mostrarEditar = !this.mostrarEditar;
    } else {
      this.cancelarEditar();
    }
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
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

  aceptarEditar() {
    this.currency.getCoinsAvailables().subscribe(
      (response: any) => {
        const coins = response;
        coins.forEach(element => {
          if (element.Name === this.coin.acronym) {
            this.currency.putCurrency(this.coin.id, this.coin.acronym, this.coin.name).subscribe(
              (responsePut: any) => {
                console.log(responsePut);
              },
              (error) => {
                swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
              }
            );
          }
        });
      },
      (error) => {
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

  cancelarEditar() {
    this.coin.id = 0;
    this.coin.acronym = '';
    this.coin.name = '';
    this.mostrarEditar = !this.mostrarEditar;
  }

}

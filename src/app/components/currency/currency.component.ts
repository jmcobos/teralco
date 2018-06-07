import { Component, OnInit } from '@angular/core';
import { CurrencyService } from './../../providers/currency.service';
import { forEach } from '@angular/router/src/utils/collection';
import { SharedService } from './../../providers/shared.service';
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
  creando = false;
  cargado = false;

  constructor(private currency: CurrencyService, private shared: SharedService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  editarCurrency(currency) {
    if (currency) {
      this.creando = false;
      this.coin.id = currency.id;
      this.coin.acronym = currency.acronym;
      this.coin.name = currency.name;
      this.mostrarEditar = !this.mostrarEditar;
    } else {
      this.creando = true;
      this.cancelarEditar();
    }
  }

  eliminarCurrency(currency) {
    this.currency.deleteCurrency(currency.id).subscribe(
      (response: any) => {
        this.cancelarEditar();
        this.currencies.forEach((element, index) => {
          if (element.id === currency.id) {
            this.currencies.splice(index, 1);
            swal({ type: 'success', title: 'Success', text: 'Operation completed successfully!' });
          }
        });
      },
      (error: any) => {
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

  aceptarEditar(form) {
    this.shared.setCoin(this.coin);
    if (!this.creando) {
      this.currency.getCoinsAvailables(this.coin.acronym).subscribe(response => {
        if (response.length === 1) {
          this.currency.putCurrency(this.shared.getCoin()).subscribe(
            (responsePut: any) => {
              swal({ type: 'success', title: 'Success', text: 'Operation completed successfully!' });
              this.cancelarEditar();
              this.cargarDatos();
            },
            (error) => {
              swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
            }
          );
        } else {
          swal({ type: 'error', title: 'Oops...', text: 'This acronym doesn\'t exist!' });
        }
      });
    } else {
      this.currency.getCoinsAvailables(this.coin.acronym).subscribe(response => {
        if (response.length === 1) {
          this.currency.postCurrency(this.shared.getCoin()).subscribe(
            (responsePut: any) => {
              swal({ type: 'success', title: 'Success', text: 'Operation completed successfully!' });
              this.cancelarEditar();
              this.cargarDatos();
            },
            (error) => {
              swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
            }
          );
        } else {
          swal({ type: 'error', title: 'Oops...', text: 'This acronym doesn\'t exist!' });
        }
      });
    }
  }

  cancelarEditar() {
    this.coin.id = 0;
    this.coin.acronym = '';
    this.coin.name = '';
    this.mostrarEditar = !this.mostrarEditar;
  }

  cargarDatos() {
    this.currency.getCurrencies().subscribe(
      (response: any) => {
        this.currencies = response._embedded.currencies;
        this.cargado = true;
      },
      (error: any) => {
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

}

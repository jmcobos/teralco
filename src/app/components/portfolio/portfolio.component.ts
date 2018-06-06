import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../providers/portfolio.service';
import { PortfolioLinesService } from '../../providers/portfolio-lines.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Portfolio } from '../../models/portfolio';
import swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolios = [];
  portflo = new Portfolio(0, '');
  mostrarEditar = true;
  creando = false;
  cargado = false;

  constructor(private portfolio: PortfolioService, private lines: PortfolioLinesService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  desplegarDetalle(portfolio) {
    this.portfolios.forEach((element) => {
      if (element.id === portfolio.id) {
        element.mostrar = !element.mostrar;
      }
    });
  }

  editarPortfolio(portfolio) {
    if (portfolio) {
      this.creando = false;
      this.portflo.id = portfolio.id;
      this.portflo.name = portfolio.name;
      this.mostrarEditar = !this.mostrarEditar;
    } else {
      this.creando = true;
      this.cancelarEditar();
    }
  }

  cancelarEditar() {
    this.portflo.id = 0;
    this.portflo.name = '';
    this.mostrarEditar = !this.mostrarEditar;
  }

  aceptarEditar(form) {
    if (!this.creando) {
      this.portfolio.putPortfolio(this.portflo.id, this.portflo.name).subscribe(
        (responsePut: any) => {
          swal({ type: 'success', title: 'Success', text: 'Operation completed successfully!' });
          this.cancelarEditar();
        },
        (error) => {
          swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
        }
      );
    } else {
      this.portfolio.postPortfolio(this.portflo.id, this.portflo.name).subscribe(
        (response: any) => {
          swal({ type: 'success', title: 'Success', text: 'Operation completed successfully!' });
          this.cancelarEditar();
          this.cargarDatos();
        },
        (error) => {
          swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
        }
      );
    }
  }

  eliminarPortfolio(portfolio) {
    this.portfolio.deletePortfolio(portfolio.id).subscribe(
      (response: any) => {
        this.cancelarEditar();
        this.portfolios.forEach((element, index) => {
          if (element.id === portfolio.id) {
            this.portfolios.splice(index, 1);
          }
        });
        swal({ type: 'success', title: 'Success', text: 'Operation completed successfully!' });
      },
      (error: any) => {
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

  private cargarDatos() {
    this.portfolio.getPortfolios().subscribe(
      (response: any) => {
        this.portfolios = response._embedded.portfolios;
        this.portfolios.forEach((element) => {
          element.mostrar = true;
          this.lines.getPortfolioLines(element.id).subscribe(
            (responseLine: any) => {
              element.lineas = responseLine._embedded.portfolioLines;
              element.lineas.forEach((e) => {
                this.lines.getCurrencyByLine(e.id).subscribe(
                  (responseCurrency: any) => {
                    e.currency = responseCurrency.acronym;
                    e.currencyName = responseCurrency.name;
                    this.cargado = true;
                  }
                );
              });
            },
            (error: any) => {
              swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
            }
          );
        });
      },
      (error) => {
        swal({ type: 'error', title: 'Oops...', text: 'Something went wrong!' });
      }
    );
  }

}

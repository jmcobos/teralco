import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../providers/portfolio.service';
import { PortfolioLinesService } from '../../providers/portfolio-lines.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  portfolios = [];
  mostrarEditar = true;
  nombre: string;

  constructor(private portfolio: PortfolioService, private lines: PortfolioLinesService) { }

  ngOnInit() {
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
                  }
                );
              });
            },
            (error: any) => {
              console.log('Error: ' + JSON.stringify(error));
            }
          );
        });
      },
      (error) => {
        console.log('Error: ' + JSON.stringify(error));
      }
    );
  }

  desplegarDetalle(portfolio) {
    this.portfolios.forEach((element) => {
      if (element.id === portfolio.id) {
        element.mostrar = !element.mostrar;
      }
    });
    console.log(this.portfolios);
  }

  editarPortfolio(portfolio) {
    debugger;
    this.nombre = portfolio.name;
    this.mostrarEditar = !this.mostrarEditar;
  }

  cancelarEditar() {
    this.mostrarEditar = !this.mostrarEditar;
  }

  aceptarEditar() {
    alert('Se ha guardado correctamente.');
  }

  eliminarPortfolio(portfolio) {
    alert('Se ha eliminado correctamente.');
  }

}

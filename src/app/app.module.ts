import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

import { CurrencyService } from './providers/currency.service';
import { PortfolioService } from './providers/portfolio.service';
import { PortfolioLinesService } from './providers/portfolio-lines.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    PortfolioComponent,
    NavbarComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes,
    FormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    CurrencyService,
    PortfolioService,
    PortfolioLinesService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

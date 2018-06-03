import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

import { CurrencyService } from './providers/currency.service';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyComponent,
    PortfolioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutes
  ],
  providers: [
    CurrencyService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

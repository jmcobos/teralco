import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const appRoutes: Routes = [
    { path:'inicio', component: InicioComponent },
    { path: 'currency', component: CurrencyComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'currency' }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, { enableTracing: true });
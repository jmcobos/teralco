import { RouterModule, Routes } from '@angular/router';
import { CurrencyComponent } from './components/currency/currency.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const appRoutes: Routes = [
    { path: 'currency', component: CurrencyComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'currency' }
];

export const AppRoutes = RouterModule.forRoot(appRoutes, { enableTracing: true });
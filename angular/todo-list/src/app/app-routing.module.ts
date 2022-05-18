import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AthGuardGuard } from './todo/center-side/ath-guard.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './todo/center-side/admin/admin.component';
import { CategoriesComponent } from './todo/center-side/categories/categories.component';
import { StatisticComponent } from './todo/center-side/statistic/statistic.component';
import { TransactionsComponent } from './todo/center-side/transactions/transactions.component';
import { TodoComponent } from './todo/todo/todo.component';
import { CardsComponent } from './todo/left-side/cards/cards.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/todo',
  },
  {
    path: 'todo',
    component: TodoComponent,
    children: [
      {
        path: 'categories',
        component: CategoriesComponent,
        children: [{ path: 'category/:id', component: CategoriesComponent }],
      },
      { path: 'statistic', component: StatisticComponent },
      { path: 'transactions/:id', component: TransactionsComponent },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AthGuardGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

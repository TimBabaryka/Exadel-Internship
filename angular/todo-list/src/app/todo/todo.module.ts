import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LeftSideComponent } from './left-side/left-side.component';
import { CenterSideComponent } from './center-side/center-side.component';
import { RightSideComponent } from './right-side/right-side.component';
import { MatIconModule } from '@angular/material/icon';
import { CardCreateComponent } from './right-side/card-create/card-create.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionCreateComponent } from './right-side/transaction-create/transaction-create.component';
import { CategoriesComponent } from './center-side/categories/categories.component';
import { StatisticComponent } from './center-side/statistic/statistic.component';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AdminComponent } from './center-side/admin/admin.component';
import { CategoryCreateComponent } from './right-side/category-create/category-create.component';
import { TransactionsComponent } from './center-side/transactions/transactions.component';

const routes: Routes = [
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    TodoComponent,
    LeftSideComponent,
    CenterSideComponent,
    RightSideComponent,
    CardCreateComponent,
    TransactionCreateComponent,
    CategoriesComponent,
    StatisticComponent,
    AdminComponent,
    CategoryCreateComponent,
    TransactionsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class TodoModule {}

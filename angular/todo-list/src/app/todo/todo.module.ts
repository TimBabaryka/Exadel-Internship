import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LeftSideComponent } from './left-side/left-side.component';
import { CenterSideComponent } from './center-side/center-side.component';
import { RightSideComponent } from './right-side/right-side.component';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  imports: [CommonModule, RouterModule.forChild(routes), MatIconModule],
})
export class TodoModule {}

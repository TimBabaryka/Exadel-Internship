import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegFormComponent } from './reg-form/reg-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'registration',
    component: RegFormComponent,
  },
];

@NgModule({
  declarations: [RegFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [RegFormComponent],
})
export class RegModule {}

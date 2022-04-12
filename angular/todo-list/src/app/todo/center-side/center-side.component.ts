import { Component } from '@angular/core';

@Component({
  selector: 'app-center-side',
  templateUrl: './center-side.component.html',
  styleUrls: ['./center-side.component.scss'],
})
export class CenterSideComponent {
  doSomething() {
    console.log('I am doing something!');
  }

  isShownCategories: boolean = false;
  isShownAdmin: boolean = false;
  isShownStatistic: boolean = false;
  isShownTransactions: boolean = false;

  toggleShowTransaction() {
    this.isShownTransactions = !this.isShownTransactions;
  }

  toggleShowCategories() {
    this.isShownCategories = !this.isShownCategories;
  }

  toggleShowAdmin() {
    this.isShownAdmin = !this.isShownAdmin;
  }
  toggleShowStat() {
    this.isShownStatistic = !this.isShownStatistic;
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss'],
})
export class StatisticComponent {
  range: any = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  categoryModel: any;
  stats: any[] = ['Categories', 'Monthly'];
  constructor() {}
}

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
}

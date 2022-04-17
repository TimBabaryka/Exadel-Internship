import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private defaultId = new BehaviorSubject<any>('default id');
  currentId = this.defaultId.asObservable();
  constructor() {}

  changeId(id: any) {
    this.defaultId.next(id);
  }
}

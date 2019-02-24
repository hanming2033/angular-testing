import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueService {
  getPromiseValue(): Promise<string> {
    return Promise.resolve('promise value');
  }
  getObservableValue(): Observable<string> {
    return of('observable value');
  }
  getValue(): string {
    return 'value from ValueService';
  }

  constructor() {}
}

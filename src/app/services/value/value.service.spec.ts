import { ValueService } from './value.service';

describe('ValueService', () => {
  it('#getValue should return "value from ValueService"', () => {
    const valueService = new ValueService();
    expect(valueService.getValue()).toBe('value from ValueService');
  });

  it('#getObservableValue should return value from observable', (done: DoneFn) => {
    const valueService = new ValueService();
    // * test observable
    valueService.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });

  it('#getPromiseValue should return value from a promise', (done: DoneFn) => {
    const valueService = new ValueService();
    // * test promise
    valueService.getPromiseValue().then(value => {
      expect(value).toBe('promise value');
      done();
    });
  });
});

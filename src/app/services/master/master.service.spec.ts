import { TestBed } from '@angular/core/testing';
import { ValueService } from '../value/value.service';
import { MasterService } from './master.service';

describe('MasterService', () => {
  let masterService: MasterService;
  let valueServiceSpy: jasmine.SpyObj<ValueService>;

  beforeEach(() => {
    // * create spy ValueService using stub return value for getValue method
    const spy = jasmine.createSpyObj<ValueService>('ValueService', ['getValue']);
    // * Alternate syntax
    // * const spy = jasmine.createSpyObj<ValueService>('ValueService', { getValue: stubValue });
    TestBed.configureTestingModule({
      // Provide both the service-to-test and its (spy) dependency
      providers: [MasterService, { provide: ValueService, useValue: spy }]
    });
    // Inject both the service-to-test and its (spy) dependency
    masterService = TestBed.get(MasterService);
    valueServiceSpy = TestBed.get(ValueService);
  });

  it('#getValue should return stubbed value from a spy', () => {
    // * fake the return value of dependency
    const stubValue = 'stub value';
    valueServiceSpy.getValue.and.returnValue(stubValue);
    // * test both master and dependent
    expect(masterService.getValue()).toBe(stubValue);
    expect(valueServiceSpy.getValue.calls.count()).toBe(1);
    expect(valueServiceSpy.getValue.calls.mostRecent().returnValue).toBe(stubValue);
  });
});

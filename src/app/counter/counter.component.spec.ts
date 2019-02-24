import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; // used for querying
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  // reference to the component
  let component: CounterComponent;
  // reference to component with additional methods
  // e.g. detect change, access native el, component instance
  let fixture: ComponentFixture<CounterComponent>;

  // declare new testing module, importing the component
  beforeEach(async(() => {
    // just configure like normal component
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    }).compileComponents(); // wait for async templates to be loaded (html & css)
  }));

  // setting up of components
  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    // get component from fixture wrapper
    component = fixture.componentInstance;

    // anything that is async is called by change detection
    // else is not called by change detection
    fixture.detectChanges();
  });

  it('should display the count number of 1', () => {
    const paraHtmlEl: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    expect(paraHtmlEl.textContent).toEqual('Number: 1');
  });

  it('should increment the counter by 1', () => {
    const initialValue = component.counter;
    component.increment();
    expect(component.counter - initialValue).toEqual(1);
  });

  it('should show a increment button with content as +', () => {
    const btnIncHtmlEl: HTMLElement = fixture.debugElement.query(By.css('button.increment')).nativeElement;
    expect(btnIncHtmlEl).toBeTruthy();
    expect(btnIncHtmlEl.textContent).toEqual('+');
  });

  it('should incrase counter by 1 if increment button is clicked', () => {
    const btnIncHtmlEl: HTMLElement = fixture.debugElement.query(By.css('button.increment')).nativeElement;
    const paraHtmlEl: HTMLElement = fixture.debugElement.query(By.css('p')).nativeElement;
    btnIncHtmlEl.click();
    fixture.detectChanges();
    expect(paraHtmlEl.textContent).toEqual('Number: 2');
  });

  it('should emit number 10 when end button is cliked', done => {
    const btnEndHtmlEl: HTMLElement = fixture.debugElement.query(By.css('button.end')).nativeElement;
    component.start = 10;
    component.end.subscribe((v: number) => {
      expect(v).toBe(10);
      // make sure observable is complete before completing
      done();
    });
    btnEndHtmlEl.click();
  });
});

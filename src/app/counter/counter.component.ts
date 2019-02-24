import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {
  @Input() start: number;
  @Output() end = new EventEmitter<number>();
  public counter = 1;
  constructor() {}

  ngOnInit() {}

  increment() {
    this.counter++;
  }

  ended = () => {
    this.end.emit(this.start);
  };
}

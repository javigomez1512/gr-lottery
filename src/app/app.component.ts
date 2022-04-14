import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, fromEvent, pluck, tap } from 'rxjs';
import { Ball } from './interfaces/ball';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  balls: Ball[] = [
    { number: 1, color: 'red' },
    { number: 2, color: 'lightyellow' },
    { number: 3, color: 'green' },
    { number: 4, color: 'lightpink' },
    { number: 5, color: 'orange' },
    { number: 6, color: 'lightgray' },
    { number: 7, color: 'red' },
    { number: 8, color: 'lightyellow' },
    { number: 9, color: 'green' },
    { number: 10, color: 'lightpink' },
  ];
  selectedBall$ = new BehaviorSubject<Ball>({ number: 0, color: '' });
  betAmount$ = new BehaviorSubject<number>(0);
  makeBet$ = new BehaviorSubject<boolean>(false);
  wallet$ = new BehaviorSubject<number>(500);
}

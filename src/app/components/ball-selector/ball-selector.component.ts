import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ball } from 'src/app/interfaces/ball';

@Component({
  selector: 'app-ball-selector',
  templateUrl: './ball-selector.component.html',
  styleUrls: ['./ball-selector.component.scss'],
})
export class BallSelectorComponent implements OnInit {
  @Input() balls: Ball[] = [];
  @Input() selectedBall$ = new BehaviorSubject<Ball>({ number: 0, color: '' });
  @Input() betAmount$ = new BehaviorSubject<number>(0);
  @Input() wallet$ = new BehaviorSubject<number>(0);
  @Input() makeBet$ = new BehaviorSubject<boolean>(false);

  selectedBall: Ball = { number: 0, color: '' };
  showBetResult: boolean = false;
  randomBall: Ball = this.getRandomBall();
  betWon: boolean = false;
  betAmount: number = 0;
  wallet: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.getRandomBall();
    this.selectedBall$.subscribe((sb: Ball) => {
      this.selectedBall = sb;
    });
    this.betAmount$.subscribe((ba) => (this.betAmount = ba));
    this.wallet$.subscribe((wa) => (this.wallet = wa));
    this.makeBet();
  }

  selectBall(ball: Ball) {
    this.selectedBall$.next(ball);
  }

  resetSelection() {
    this.selectedBall$.next({ number: 0, color: '' });
  }

  continue() {
    this.makeBet$.next(false);
    this.betAmount$.next(0);
    this.resetSelection();
  }

  makeBet() {
    this.makeBet$.subscribe((mb) => {
      if (mb == true) {
        this.randomBall = this.getRandomBall();
        if (this.randomBall.number === this.selectedBall.number) {
          this.betWon = true;
          this.wallet$.next(this.wallet + this.betAmount * 1.5);
        } else {
          this.betWon = false;
          this.wallet$.next(this.wallet - this.betAmount);
        }
      }
      this.showBetResult = mb;
    });
  }

  getRandomBall(): Ball {
    const randomNumber = Math.floor(Math.random() * 10 + 1);
    const randomBall = this.balls.filter(
      (ball) => ball.number == randomNumber
    )[0];
    return randomBall;
  }
}

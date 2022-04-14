import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Ball } from 'src/app/interfaces/ball';

@Component({
  selector: 'app-bet-slip',
  templateUrl: './bet-slip.component.html',
  styleUrls: ['./bet-slip.component.scss'],
})
export class BetSlipComponent implements OnInit {
  @Input() selectedBall$ = new BehaviorSubject<Ball>({ number: 0, color: '' });
  @Input() betAmount$ = new BehaviorSubject<number>(0);
  @Input() wallet$ = new BehaviorSubject<number>(0);
  @Input() makeBet$ = new BehaviorSubject<boolean>(false);

  selectedBall: Ball = { number: 0, color: '' };
  betsLimit: number = 8;
  betHistory: Ball[] = [];
  betAmount: number = 0;
  makeBet: boolean = false;

  mockBetHistory: Ball[] = [
    { number: 6, color: 'lightgray' },
    { number: 2, color: 'lightyellow' },
    { number: 5, color: 'orange' },
    { number: 9, color: 'green' },
    { number: 4, color: 'lightpink' },
  ];

  betForm: FormGroup = this.fb.group({
    amount: [
      '',
      [
        Validators.pattern('[0-9]*'),
        Validators.required,
        Validators.min(5),
        Validators.max(1000),
      ],
    ],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.selectedBall$.subscribe((sb: Ball) => {
      this.selectedBall = sb;
    });
    this.betAmount$.subscribe((ba) => (this.betAmount = ba));
    this.makeBet$.subscribe((mb) => (this.makeBet = mb));
  }

  onRaiseBet() {
    // this.betAmount += this.betForm.controls['amount'].value;
    this.betAmount$.next(
      this.betAmount + this.betForm.controls['amount'].value
    );
    this.resetForm();
  }

  onBet() {
    if (this.selectedBall.number !== 0) {
      this.betHistory.push(this.selectedBall);
      this.resetForm();
      // this.betAmount$.next(0);
      this.makeBet$.next(true);
    } else {
      alert('Please, select a ball to bet');
    }
  }

  private resetForm() {
    this.betForm.controls['amount'].setValue('');
    this.betForm.controls['amount'].markAsUntouched();
  }
}

import {Component} from '@angular/core';

@Component({
  selector: 'tic-tac-toe',
  standalone: true,
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  board: string[] = Array(9).fill(null);
  player: 'X' | 'O' = 'X';
  winner: string | null = null;

  makeMove(index: number): void {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.player;
      this.checkWinner();
      if (!this.winner) {
        this.player = this.player === 'X' ? 'O' : 'X';
      }
    }
  }

  checkWinner(): void {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winner = this.board[a];
        return;
      }
    }

    if (this.board.every(cell => cell !== null)) {
      this.winner = 'Draw';
    }
  }

  resetGame(): void {
    this.board = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
  }
}

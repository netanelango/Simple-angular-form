import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  playerName: string = '';
  categoryId: number | null = null;
  isQuizFinished = this.quizService.isQuizFinished;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.playerName = params['playerName'] || '';
      this.categoryId = Number(params['categoryId']) || null;
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}

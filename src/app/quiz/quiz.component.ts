import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';
  categoryId: number | null = null;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
      this.categoryId = +params['categoryId'];
      console.log('Player Name:', this.playerName);
        console.log('Category ID:', this.categoryId);

      if (this.categoryId) {
        this.quizService.getQuizContentByCategory(this.categoryId).subscribe(
          (questions: any[]) => {
            console.log('Questions récupérées par le composant:', questions);
            this.quizService.quizContent = questions;
          },
          (error) => {
            console.error('Erreur lors de la récupération des questions dans le composant', error);
          }
        );
      }
    });
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
}

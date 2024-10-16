import { Component, Input, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() categoryId: number = 0;
  quizContent: any[] = [];

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions() {
    this.quizContent = this.quizService.quizContent;
  }
}

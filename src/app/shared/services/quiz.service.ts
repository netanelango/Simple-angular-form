import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin,of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizContent: any[] = [];
  playerAnswers: {questionId: number; answer: string}[] = [];
  score = 0;
  isQuizFinished = false;
  playerName: string = '';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/categories');
  }

  checkAnswers() {
    this.score = 0;
    for (let i = 0; i < this.playerAnswers.length; i++) {
      const question = this.quizContent.find((q) => q.id === this.playerAnswers[i].questionId);
      if (!question) continue;
      for (let j = 0; j < question.answers.length; j++) {
        const currentAnswer = question.answers[j];
        if (currentAnswer.isCorrect && this.playerAnswers[i].answer === currentAnswer.answerLabel) {
          this.score += 1;
          break;
        }
      }
    }
    this.isQuizFinished = true;
  }

  addAnswer(answer: string, questionId: number) {
    const isAnswered = this.playerAnswers.find((a) => a.questionId === questionId);
    if (isAnswered) {
      isAnswered.answer = answer;
      return;
    }
    this.playerAnswers.push({questionId, answer});
  }

  // Modifié pour retourner un Observable
  getQuizContentByCategory(categoryId: number): Observable<any[]> {
    this.resetQuiz();

    return this.http.get<any[]>(`http://localhost:3000/questions?categoryId=${categoryId}`).pipe(
      switchMap((questions: any[]) => {
        console.log('Questions récupérées:', questions); // Vérifiez ce qui est récupéré
        const answerRequests = questions.map(question =>
          this.http.get<any[]>(`http://localhost:3000/answers?questionId=${question.id}`).pipe(
            map((answers: any[]) => ({
              id: question.id,
              question: question.questionLabel,
              answers
            })),
            catchError(err => {
              console.error(`Erreur lors de la récupération des réponses pour la question ${question.id}`, err);
              return of([]); // Retourne un tableau vide en cas d'erreur
            })
          )
        );
        return forkJoin(answerRequests);
      }),
      catchError(err => {
        console.error('Erreur lors de la récupération des questions', err);
        return of([]); // Retourne un tableau vide en cas d'erreur
      })
    );
  }


  resetQuiz() {
    this.quizContent = [];
    this.playerAnswers = [];
    this.score = 0;
    this.isQuizFinished = false;
  }
}

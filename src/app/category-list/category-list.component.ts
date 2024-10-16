import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  selectedCategoryId: number | null = null;

  @Output() categorySelected = new EventEmitter<number>();

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.quizService.getCategories().subscribe((categories: any[]) => {
      this.categories = categories;
    });
  }

  selectCategory(categoryId: number): void {
    console.log(`Catégorie sélectionnée : ${categoryId}`);
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
  }
}

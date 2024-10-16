import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  selectedCategoryId: number | null = null; // Propriété pour suivre la catégorie sélectionnée

  // Émet l'ID de la catégorie sélectionnée
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
    this.selectedCategoryId = categoryId; // Mettez à jour la catégorie sélectionnée
    this.categorySelected.emit(categoryId); // Émet l'événement
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playerName = '';
  selectedCategoryId: number | null = null; // Propriété pour stocker la catégorie sélectionnée

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    // Nous verrons plus tard comment gérer cela avec des observables
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
  }

  get isPlayerNameFill() {
    return this.playerName.length < 1 || this.selectedCategoryId === null; // Assurez-vous qu'une catégorie est sélectionnée
  }

  navigateToQuiz() {
    if (this.playerName.length > 0 && this.selectedCategoryId !== null) {
      this.router.navigate(['/quiz', this.playerName]);
    }
  }

  onCategorySelected(categoryId: number) {
    this.selectedCategoryId = categoryId; // Mettez à jour la catégorie sélectionnée
  }
}

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
  selectedCategoryId: number | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
  }

  get isPlayerNameFill() {
    return this.playerName.length < 1 || this.selectedCategoryId === null;
  }

  navigateToQuiz() {
    if (this.playerName.length > 0 && this.selectedCategoryId !== null) {
      this.router.navigate(['/quiz', this.playerName, this.selectedCategoryId]);
    }
  }

  onCategorySelected(categoryId: number) {
    this.selectedCategoryId = categoryId;
  }
}

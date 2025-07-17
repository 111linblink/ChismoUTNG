import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {

  constructor(private router: Router) {}

    goToView(category: string): void {
    this.router.navigate(['/view'], { queryParams: { category } });
  }
  

}

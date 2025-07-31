import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private apiUrl = 'https://chismografo-backend-152844519304.us-central1.run.app/api';

  constructor(private http: HttpClient) { }

  getGroupedAnswersByCategory(categoryId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/answers/grouped-by-category?category=${categoryId}`);
}

}

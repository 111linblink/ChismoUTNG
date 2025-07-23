import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  private apiUrl = 'http://localhost:3000/api/answers';

  constructor(private http: HttpClient) { }

  getGroupedAnswersByCategory(categoryId: number) {
  return this.http.get<any[]>(`${this.apiUrl}/grouped-by-category?category=${categoryId}`);
}

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiUrl = 'https://chismografo-backend-152844519304.us-central1.run.app/api';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/questions`);
  }

  sendAnswers(answers: any[]) {
  return this.http.post(`${this.apiUrl}/answers`, answers);
}

getQuestionsByCategory(categoryId: number): Observable<any[]>  {
  return this.http.get<any[]>(`${this.apiUrl}/questions/by-category/${categoryId}`);}
}

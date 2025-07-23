import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private apiUrl = 'http://localhost:3000/api/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  sendAnswers(answers: any[]) {
  return this.http.post('http://localhost:3000/api/answers', answers);
}

getQuestionsByCategory(categoryId: number): Observable<any[]>  {
  return this.http.get<any[]>(`${this.apiUrl}/by-category/${categoryId}`);
}


}

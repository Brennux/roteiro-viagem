import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Exemplo de API pública
  constructor(private http: HttpClient) { }

  // Obter todos os posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Criar um novo post
  createPost(post: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, post)
  }


  // Atualizar um post pelo ID
  updatePost(id: number, updates: { title?: string; body?: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updates);
  }

  // Excluir um post pelo ID
  deletePost(id:number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}

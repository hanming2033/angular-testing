import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public readonly ROOT_URL = 'http://jsonplacerholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts() {
    const httpHeaders = new HttpHeaders({ Authorization: 'my-auth-token' });
    return this.http.get<Post[]>(`${this.ROOT_URL}/posts`, { headers: httpHeaders });
  }
}

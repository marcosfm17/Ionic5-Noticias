import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  constructor(private http: HttpClient) { }
  
  getTopHeadLines(){
    return this.http.get<RepuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&apiKey=8551f40cde5b49fab82f412fa3d314e1`);
  }
}

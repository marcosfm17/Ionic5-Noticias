/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  apiKey: string = environment.apiKey; // '8551f40cde5b49fab82f412fa3d314e1';
  apiURL: string = environment.apiUrl;
  country: string = environment.country;
  categorySelected: string = '';
  categoryPages = 0
  headLinesPage = 0;
  headLinesByCategory = 0;
  httpOptions = {
    headers: new HttpHeaders({
      'X-Api-key': this.apiKey

    })
  };
  constructor(private http: HttpClient) {}


  private ejecutarQuery<T>(query: string) {
    console.log(`${this.apiURL}${query}`);
    return this.http.get<T>(`${this.apiURL}${query}`, this.httpOptions );
  }

  getTopHeadLines(){
    this.headLinesPage++;
    return this.ejecutarQuery<RepuestaTopHeadlines>(`/top-headlines?country=${this.country}&page=${this.headLinesPage}`);
  }

  getTopHeadLinesByCategory(category: string){
    if (category===this.categorySelected){
      this.categoryPages++;
    } else{
      this.categoryPages=0;
      this.categorySelected = category;
    }
    return this.ejecutarQuery<RepuestaTopHeadlines>(`/country=${this.country}&category=${category}&page=${this.categoryPages}`);
  }

}

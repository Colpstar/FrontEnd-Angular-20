import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  apiUrl = 'http://localhost:8000/api/pages';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get(this.apiUrl);
  }

  add(data: any) {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

  update(id: number, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }

  delete(id: number) {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }

}
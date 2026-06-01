import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}

  getMenus() {

    const levelId =
      localStorage.getItem('level_id');

    return this.http.get(
      `http://localhost:8000/api/my-pages?level_id=${levelId}`
    );

  }

}
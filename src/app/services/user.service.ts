import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.apiUrl);
  }

  addUser(data: any) {
    return this.http.post(this.apiUrl, data);
  }

  deleteUser(id: number) {
    return this.http.delete(
    `${this.apiUrl}/${id}`
  );
  }
  
  update(id: number, data: any) {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data
    );
  }
}
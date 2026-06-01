import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  apiUrl = 'http://localhost:8000/api/permissions';

  constructor(
    private http: HttpClient
  ) {}

  getAll() {
    return this.http.get(this.apiUrl);
  }

  save(data: any) {
    return this.http.post(
      this.apiUrl,
      data
    );
  }

}
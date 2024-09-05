import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseUrl: string = 'http://localhost:3000/api/v1' 
  constructor(
    private _http: HttpClient
  ) { }

  registerUser(body:any):Observable<any>{
    return this._http.post(`${this.baseUrl}/users/register`, body);
  }

  authenticateUser(body:any):Observable<any>{
    return this._http.put(`${this.baseUrl}/users/authenticate`, body);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly baseUrl: string = 'http://localhost:3000/api/v1' 
  constructor(
    private _http: HttpClient
  ) { }

  getAuthHeader(): any{
    return {authorization: localStorage.getItem('token')};
  }

  getAllCurrencies():Observable<any>{
    const headers = this.getAuthHeader();
    return this._http.get(`${this.baseUrl}/coversions/currencies`, {headers: headers})
  }

  convertAmount(payload:any):Observable<any>{
    const headers = this.getAuthHeader();
    return this._http.post(`${this.baseUrl}/coversions/convertAmount`, payload,{headers: headers})
  }

  getAllConversions():Observable<any>{
    const headers = this.getAuthHeader();
    return this._http.get(`${this.baseUrl}/coversions`,{headers: headers})
  }

}

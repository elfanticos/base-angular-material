import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { Observable } from 'rxjs';
import { HeadersService } from './headers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _header: HttpHeaders;
  constructor(
    private _http: HttpClient,
    private _headerService: HeadersService
  ) {
    this._header = _headerService.buildHeader();
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this._http.post(`${environment.apiUrlGestNet}/${environment.auth.login}`, body);
  }
}

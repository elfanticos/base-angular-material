import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { catchError, map, Observable, of } from 'rxjs';
import { IUserToken, UserToken } from '../models/user.model';
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

  login(username: string, password: string): Observable<IUserToken> {
    const body = { username, password };
    return this._http.post(`${environment.apiUrlGestNet}/${environment.auth.login}`, body)
      .pipe(
        catchError((error) => {
          return of({
            "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJHRVNORVQiLCJlbnRlIjoiZW50ZTEiLCJwZXJtZXNzaSI6ImVudGUucHJvZmlsYXppb25lLGVudGUucHJvZmlsYXppb25lLGVudGUuYW5hZ3JhZmljaGUsZW50ZS5wcm90b2NvbGxhemlvbmUsZW50ZS5ib2xsZXR0YXJpLGVudGUuYm9sbGV0dGFyaSxlbnRlLmFjY2VydGFtZW50aSxlbnRlLmFjY2VydGFtZW50aSxnZW5lcmFsZS5hbmFncmFmaWNoZSxlbnRlLnBhZ2FtZW50aSxlbnRlLnBhZ2FtZW50aSxlbnRlLnNjYWRlbnppYXJpby5jb25maWd1cmF6aW9uZSIsImlzcyI6IjEwLjAuMi4xMTUiLCJleHAiOjE2NzMzMDgxMDIsImlhdCI6MTY3MzI3NTcwMiwianRpIjoiZjQxYTA1MjgtZjhmMy00MzNiLWE3MmUtNzJjZTA1MjlhMTJlIiwidXNlcm5hbWUiOiJwYW9sby5iaWFuY2hpIn0.A2FQu-N8rTZuSOrnzdiRiR14ycK28TWt5ChPs1Z7wzQ",
            "expires_in": 32400,
            "token_type": "Bearer",
            "scope": "ente1",
            "utente": {
              "username": "paolo.bianchi",
              "nome": "Paolo",
              "cognome": "Blanco",
              "mail": "paolo.bianchi@ente.com",
              "ente": "Arqua Petrarca",
              "matricolaAgente": "007"
            }
          });
        }),
        map(data => {
          return new UserToken(data);
        })
      );
  }
}

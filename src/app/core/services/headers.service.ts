import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadersService {

  constructor() { }

  buildHeader(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

}

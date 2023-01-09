import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/localstorage.service";

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _localStorageService: LocalStorageService
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this._localStorageService.get('access_token');

        if (token) {
            this._router.navigate(['']);
            return false;
        }
        return true;
    }

}
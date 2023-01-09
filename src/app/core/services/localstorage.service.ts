
import { share } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService implements OnDestroy {
    private storageSub = new Subject<any>();
    public changes = this.storageSub.asObservable().pipe(share());

    constructor(
    ) {
        this.start();
    }

    ngOnDestroy() {
        this.stop();
    }


    private start(): void {
        window.addEventListener("storage", this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        if (event.storageArea == localStorage) {
            let v;
            try {
                v = JSON.parse(event.newValue || '{}');
            } catch (e) {
                v = event.newValue;
            }
            this.storageSub.next({ key: event.key, value: v });
        }
    }

    private stop(): void {
        window.removeEventListener("storage", this.storageEventListener.bind(this));
        this.storageSub.complete();
    }

    set(key: string, data: any): void {
        data = (typeof data !== 'object') ? data : JSON.stringify(data);
        localStorage.setItem(key, data);
        let storage: any = {};
        storage[key] = data;
        this.storageSub.next(storage);
    }

    get(key: string) {
        let JSONStr: string | null = localStorage.getItem(key);
        let isJSONValid = JSONStr && JSONStr != 'undefined';
        try {
            return isJSONValid ? JSON.parse(JSONStr || '{}') : undefined;
        } catch (e) {
            return JSONStr;
        }
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }

    watchStorage(): Observable<any> {
        return this.storageSub.asObservable().pipe(
            // map(value => {
            //     const newValue: any = {};
            //     Object.keys(value || {}).map(key => {
            //         if ((key || '').includes(this._globals.__DOMINIO)) {
            //             newValue[key.replace(`${this._globals.__DOMINIO}_`, '')] = value[key];
            //         }
            //     });
            //     return newValue;
            // })
        );
    }

}
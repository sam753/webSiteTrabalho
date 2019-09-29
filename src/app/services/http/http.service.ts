import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'style-loader!angular2-toaster/toaster.css';
import { NbGlobalPhysicalPosition, NbGlobalPosition, NbToastrService } from '@nebular/theme';


const EXPIRATION_TIME = 'expiration_time'

@Injectable()
export class HttpService {

    permission = undefined;
    customMessage = '';

    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;

    title = 'HI there!';
    content = `Default`;

    edit = undefined;
    
    private baseUrl = 'https://localhost:44386';
    private httpOptions: any;

    constructor(private http: HttpClient,
                private toastrService: NbToastrService,
                private router: Router,
            ) {
    }


    getHttpOptions() {
        return this.httpOptions;
    }

    get(path): Observable<any> {
        return this.http.get(`${this.baseUrl}${path}`, this.httpOptions);
    }

    post(path, data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}${path}`, data, this.httpOptions);
    }

    put(path, data: any): Observable<any> {
        return this.http.put(`${this.baseUrl}${path}`, data, this.httpOptions);
    }

    delete(path): Observable<any> {
        return this.http.delete(`${this.baseUrl}${path}`, this.httpOptions);
    }
}

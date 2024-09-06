import { HttpClient } from '@angular/common/http'; 
import { Injectable } from '@angular/core'; import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ManagerService {
    baseUrl: string = environment.backendAPIUrl;   

    constructor(private httpClient: HttpClient) { }
 

    getDepartmentList(): Observable<any> {
        return this.httpClient.get(this.baseUrl + 'reportingManagers');
    }
 
}

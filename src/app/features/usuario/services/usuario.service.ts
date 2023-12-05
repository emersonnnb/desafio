import { Injectable } from '@angular/core';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllUser(params: HttpParams): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users`, { params });
  }

  public getIdUser(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/users${id}`);
  };

  public postUser(payload: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${environment.apiUrl}/users`, payload);
  };

  public updateUser(id: number,data: UserModel ): Observable<UserModel> {
    return this.httpClient.put<UserModel>(`${environment.apiUrl}/users/${id}`, data);
  };

  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/users/${id}`);
  };
}

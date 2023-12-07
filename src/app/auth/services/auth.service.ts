import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, retry } from 'rxjs';
import { Login } from 'src/app/model/login';
import { Register } from 'src/app/model/register';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) {}
  private UserRole=new Subject()
  getAllUsers(user:string):Observable<Register[]>{
    return this.http.get<Register[]>(`${environment.APIURL}/${user}`).pipe(
      retry(2),
    )
  }
  registerForm(modelBody:Register):Observable<Register>{
    return this.http.post<Register>(`${environment.APIURL}/student`,modelBody).pipe(
      retry(2),
    )
  }
  login(modelBody:any):Observable<Login>{
    return this.http.put<Login>(`${environment.APIURL}/login/1`,modelBody).pipe(
      retry(2),
    )
  }
  getRule():Observable<Login>{
    return this.http.get<Login>(`${environment.APIURL}/login/1`).pipe(
      retry(2),
    )
  }
  getUserById(id:any){
    return this.http.get(`${environment.APIURL}/student/${id}`)
  }
  UpdateStudent(id:any,model:any){
    return this.http.put(`${environment.APIURL}/student/${id}`,model)
  }

  get userRule(){
    return this.UserRole
  }

}

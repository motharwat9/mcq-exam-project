import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from 'src/app/model/question';
import { Subject } from 'src/app/model/subject';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }
  createSubject(model:Subject):Observable<Subject>{
    return this.http.post<Subject>(`${environment.APIURL}/subjects`,model)
  }
  updatedQuestion(model:any ,id:any):Observable<Subject>{
    return this.http.put<Subject>(`${environment.APIURL}/subjects/${id}`,model)
  }
  getAllSubject():Observable<Subject[]>{
    return this.http.get<Subject[]>(`${environment.APIURL}/subjects`)
  }
  getSubjectByID(id:number):Observable<Subject>{
    return this.http.get<Subject>(`${environment.APIURL}/subjects/${id}`)
  }
  deleteSubject(id:any){
    return this.http.delete(`${environment.APIURL}/subjects/${id}`)
  }
}

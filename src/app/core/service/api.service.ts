import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions={
    headers : new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin":"*"
    })
  }
  constructor(private http:HttpClient) { }

  private formatErrors(error:Error){
  return throwError(() => new Error(error.message))
  }
  get(path:string,params:HttpParams = new HttpParams()):Observable<Object>{
    return this.http.get(path,{params}).pipe(catchError(this.formatErrors))
  }

  put(path:string,body:Object={}):Observable<Object>{
    return this.http.put(path,JSON.stringify(body),this.httpOptions).pipe(catchError(this.formatErrors))
  }

  post(path:string,body:Object={}):Observable<Object>{
    return this.http.post(path,JSON.stringify(body),this.httpOptions).pipe(catchError(this.formatErrors))
  }

  delete(path:string):Observable<Object>{
    return this.http.delete(path).pipe(catchError(this.formatErrors));
  }
}

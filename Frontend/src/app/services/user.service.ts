import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api: string = 'http://localhost:3400/api'

  constructor(private http: HttpClient) { }

  getCandidates(posRef:any){
    return this.http.get(`${this.api}/candidates/posRef/${posRef}`)

  }
  submitVotes(data:any,position:any){
    return this.http.post(`${this.api}/candidates/votes/${position}`, data)

  }
}

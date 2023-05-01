import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  api: string = 'http://localhost:3400/api'

  constructor(private http: HttpClient) { }

  sendComplaints(value:any){
    return this.http.post(`${this.api}/complaints`, value)

  }

  getComplaints(){
    return this.http.get(`${this.api}/complaints`)
  }

  deleteComplaint(id:any){
    return this.http.delete(`${this.api}/complaints/${id}`)
  }

  updateComplaint(id:any){
    return this.http.put(`${this.api}/complaints/${id}`,{ opened: true })
  }

  deleteAll(){
    return this.http.delete(`${this.api}/complaints`)

  }

  getWinnerCandidates(){
    return this.http.get(`${this.api}/winners`)

  }
}

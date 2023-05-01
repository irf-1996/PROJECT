import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  api: string = 'http://localhost:3400/api'

  constructor(private http: HttpClient) { }

  declareElection(item: any) {
    return this.http.post(`${this.api}/election`, item)
  }  

  deleteElection(id:any){
    return this.http.delete(`${this.api}/election/${id}`)

  }


  //! CRUD MASTER POSITION LIST 
  addPosition(item:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.api}/position`, item)
  }

  getPosition(){
    return this.http.get(`${this.api}/position`)
  }

  deletePosition(id:any){
    return this.http.delete(`${this.api}/position/${id}`)
  }

  editPosition(id:any){
    return this.http.get(`${this.api}/position/${id}`)
  }


  //! CRUD ELECTION
  getElectionList(){
    return this.http.get(`${this.api}/election`)
  }

  editElection(id:any,value:any):Observable<any>{
    return this.http.put<any>(`${this.api}/election/${id}`,value)
  }

  getActivePositions(id:any){
    return this.http.get(`${this.api}/election/${id}/position`)
  }


  addElecPosition(item:any,id:any):Observable<any[]>{
    return this.http.post<any[]>(`${this.api}/election/${id}/position`, item)
  }

  deleteElecPosition(item:any,id:any){
    let pos_id = item._id
    return this.http.delete(`${this.api}/election/${id}/position/${pos_id}`)
  }

  // candidates 
getCandidates(id:any,pos_id:any){
  return this.http.get(`${this.api}/election/${id}/pos/${pos_id}`)
}

applyCandidate(item:any,id:any){
  return this.http.post(`${this.api}/candidates/${id}`, item)
}



getAllCandidates(){
  return this.http.get(`${this.api}/candidates`)

}

rejectCandidate(id:any){
  return this.http.get(`${this.api}/candidates/${id}/reject`)

}
approveCandidate(id:any){
  return this.http.get(`${this.api}/candidates/${id}/approve`)
}

getActiveCandidates(id:any){
  return this.http.get(`${this.api}/candidates/${id}/active`)
}



//! ACTIVE_POSITIONS 

deleteCandidate(id:any,cand_id:any){
  return this.http.delete(`${this.api}/candidates/${id}/pos/${cand_id}`)
}








}
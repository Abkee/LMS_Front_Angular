import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../_models/profile';
import { AccesstokenService } from './accesstoken.service';
import { TutorSubjects } from '../_models/tutorSubjects';
import { Students } from '../_models/students';
import { FormGroup } from '@angular/forms';
import { PutGrade } from '../_models/putgrade';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  constructor(private http: HttpClient, private accesstokenService: AccesstokenService) {

  }
  private api_profile: string = "https://localhost:7052/api/Tutor/api/profile";
  private api_showSubjects: string = "https://localhost:7052/api/Tutor/api/showsubjects";
  private api_showStudents: string = "https://localhost:7052/api/Tutor/api/showstudents/subjectId?subjectId=";
  private api_changeProfile: string = "https://localhost:7052/api/Tutor/api/update/profile";
  //private api_CreateKlass: string = "https://localhost:7052/api/Tutor/api/create/klass";
  private api_PutGrade: string = "https://localhost:7052/api/Tutor/api/putgrade";
  private api_ShowStudentsByName: string = "https://localhost:7052/api/Tutor/api/showstudentsbyname/bystudent?bystudent=";

  showProfile(): Observable<Profile>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.get<Profile>(this.api_profile , { headers: reqHeader });
  }

  showSubjects(): Observable<TutorSubjects[]>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
   return this.http.get<TutorSubjects[]>(this.api_showSubjects,{headers: reqHeader});
  }

  showStudents(subjectId?: string | null): Observable<Students[]>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    let api = this.api_showStudents + subjectId;
    return this.http.get<Students[]>(api,{headers: reqHeader});
  }

  updateProfile(profile: FormGroup): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.post(this.api_changeProfile, profile.getRawValue(), {headers: reqHeader});
  }
  
  putGrade(putGrade: PutGrade[]): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.post(this.api_PutGrade, putGrade, {headers: reqHeader});
  }

  showAllStudentsByName(name: string | undefined): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    let api = this.api_ShowStudentsByName + name;
    return this.http.get(api, {headers: reqHeader});
  }
}

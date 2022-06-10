import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../_models/profile';
import { AccesstokenService } from './accesstoken.service';
import { TutorSubjects } from '../_models/tutorSubjects';
import { Students } from '../_models/students';
import { FormGroup } from '@angular/forms';

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
  private api_CreateKlass: string = "https://localhost:7052/api/Tutor/api/create/klass";
  private api_PutGrade: string = "https://localhost:7052/api/Tutor/api/putgrade";

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

  showStudents(klassId: string): Observable<Students[]>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    this.api_showStudents += klassId;
    return this.http.get<Students[]>(this.api_showStudents,{headers: reqHeader});
  }

  updateProfile(profile: FormGroup): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.post(this.api_changeProfile, profile.getRawValue(), {headers: reqHeader});
  }

  createKlass(klass: FormGroup): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.post(this.api_CreateKlass, klass.getRawValue(), {headers: reqHeader});
  }

  putGrade(grade: FormGroup): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.post(this.api_PutGrade, grade.getRawValue(), {headers: reqHeader});
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../_models/profile';
import { AccesstokenService } from './accesstoken.service';
import { Subjects } from '../_models/subjects';
import { Grades } from '../_models/grades';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private api_profile: string = "https://localhost:7052/api/Student/api/profile";
  private api_showsubjects: string = "https://localhost:7052/api/Student/api/showsubjects";
  private api_showgrades: string = "https://localhost:7052/api/Student/api/showgrades";
  private api_changeProfile: string = "https://localhost:7052/api/Student/api/update/profile";

  constructor(private http: HttpClient, private accesstokenService: AccesstokenService) { }
  
  showProfile(): Observable<Profile>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
   });
    return this.http.get<Profile>(this.api_profile , { headers: reqHeader });
  }

  showSubjects(): Observable<Subjects[]>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
   });
    return this.http.get<Subjects[]>(this.api_showsubjects, {headers: reqHeader});
  }

  showGrades(): Observable<Grades[]>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
   });
    return this.http.get<Grades[]>(this.api_showgrades, {headers: reqHeader});
  }

  updateProfile(profile: FormGroup): Observable<any>
  {
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accesstokenService.getAccessToken()
    });
    return this.http.post(this.api_changeProfile, profile.getRawValue(), {headers: reqHeader});
  }
}

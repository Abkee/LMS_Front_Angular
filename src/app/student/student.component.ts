import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Profile } from '../_models/profile';
import { StudentService } from '../_services/student.service';
import { Subjects } from '../_models/subjects';
import { Grades } from '../_models/grades';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  message = '';
  profils: Profile | undefined;
  subjects: Subjects[] | undefined;
  grades: Grades[] | undefined;
  authenticated = false;
  profileForm!: FormGroup;
  
  constructor(private studentService: StudentService,  private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated = auth;
      }
    );
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    });
    this.tutorPage();
  }
  tutorPage(){
    this.studentService.showProfile().subscribe((res:any)=>{
      this.profils=res;
      Emitters.authEmitter.emit(true);
    }, err=>{this.message='You are not logged in', Emitters.authEmitter.emit(false)});
  }
  ClikShowProfile: boolean = true;
  VisibleProfile: boolean = false;
  showProfile(){
    this.ClikShowProfile = !this.ClikShowProfile;
    this.VisibleProfile = !this.VisibleProfile;
  }
  
  ClikShowSubjects: boolean = true;
  VisibleSubjects: boolean = false;
  showSubjects()
  {
    this.ClikShowSubjects = !this.ClikShowSubjects;
    this.VisibleSubjects = !this.VisibleSubjects;
    this.studentService.showSubjects().subscribe(res =>{
      this.subjects = res;
    });
  }

  ClikShowGrades: boolean = true;
  VisibleGrades: boolean = false;
  showGrades()
  {
    this.ClikShowGrades = !this.ClikShowGrades;
    this.VisibleGrades = !this.VisibleGrades;
    if(this.grades == undefined){
      this.studentService.showGrades().subscribe(res =>{
        console.log(res);
        this.grades = res;
      });
    }
  }
  updateProfile(){
    console.log(this.profileForm.getRawValue());
    this.studentService.updateProfile(this.profileForm).subscribe(res =>{
      this.profils = this.profileForm.getRawValue();
      this.profileForm.reset();
    });
  }
}

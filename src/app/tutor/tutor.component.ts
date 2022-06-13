import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Profile } from '../_models/profile';
import { TutorService } from '../_services/tutor.service';
import { TutorSubjects } from '../_models/tutorSubjects';
import { Students } from '../_models/students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShowStudents } from '../_models/showStudents';
import { Klass } from '../_models/klass';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
  message = '';
  profils : Profile | undefined;
  authenticated = false;
  subjects: TutorSubjects[] | undefined;
  profileForm!: FormGroup;
  students: Students[] | undefined;
  allMyStudents: Students[] = [];
  klassForm!: FormGroup;
  gradeForm!: FormGroup;
  showFind: ShowStudents[] | undefined;
  //showFind: Students[] | undefined;
  showIds: string[] = []
  nameStudent: string | undefined;
  subjectIds: string[] = [];

  showStudentse: Students[] = [];
  constructor(private tutorService: TutorService, private formBuilder: FormBuilder) { }

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
    this.tutorService.showProfile().subscribe((res:any)=>{
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
  showSubjects(){
    this.ClikShowSubjects = !this.ClikShowSubjects;
    this.VisibleSubjects = !this.VisibleSubjects;
    if(this.subjects == undefined){
      this.tutorService.showSubjects().subscribe(res =>{
        this.subjects = res;
        console.log(res);
      });
    }
  }

  ClikShowStudents: boolean = true;
  VisibleStudents: boolean = false;
  showStudents(){
    this.ClikShowStudents = !this.ClikShowStudents;
    this.VisibleStudents = !this.VisibleStudents;
    
    if(this.subjects == undefined){
      this.tutorService.showSubjects().subscribe(res =>{
        this.subjects = res;
        if(this.subjectIds.length==0){
          this.subjects?.forEach(element => {
            if(element.id != undefined) this.subjectIds.push(element.id);
          });
         // console.log(this.subjectIds);
        }
      });
    } 
  }
  // Continium
  findStudent(){
    this.tutorService.showAllStudentsByName(this.nameStudent).subscribe(res =>{
      this.showFind = res;
      console.log(res);
      console.log(this.showFind);
    });
  }

  updateProfile(){
    console.log(this.profileForm.getRawValue());
    this.tutorService.updateProfile(this.profileForm).subscribe(res =>{
      this.profils = this.profileForm.getRawValue();
      this.profileForm.reset();
    });
  }
}

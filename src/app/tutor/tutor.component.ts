import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { Profile } from '../_models/profile';
import { TutorService } from '../_services/tutor.service';
import { TutorSubjects } from '../_models/tutorSubjects';
import { Students } from '../_models/students';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  klassIdForm!: FormGroup;
  profileForm!: FormGroup;
  students: Students[] | undefined;
  klass: Klass | undefined;
  klassForm!: FormGroup;
  gradeForm!: FormGroup;
  constructor(private tutorService: TutorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated = auth;
      }
    );
    this.klassIdForm = this.formBuilder.group({
      klassId: ['', [Validators.required]]
    });
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
    this.tutorService.showSubjects().subscribe(res =>{
      this.subjects = res;
      console.log(res);
    });
  }

  showStudents(){
    this.tutorService.showStudents(this.klassIdForm.value.klassId).subscribe(res =>{
      this.students = res;
      console.log(res);
    });
    this.klassIdForm.reset();
  }
  updateProfile(){
    console.log(this.profileForm.getRawValue());
    this.tutorService.updateProfile(this.profileForm).subscribe(res =>{
      this.profils = this.profileForm.getRawValue();
      this.profileForm.reset();
    });
  }

  ClikShowCreateKlass: boolean = true;
  VisibleCreateKlass: boolean = false;
  showCreateKlass(){
    this.ClikShowCreateKlass = !this.ClikShowCreateKlass;
    this.VisibleCreateKlass = !this.VisibleCreateKlass;
    this.klassForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      id: ['',[Validators.required]],
      schoolId: ['', [Validators.required]]
    });
  }

  createKlass(){
    console.log(this.klassForm.getRawValue());
    this.tutorService.createKlass(this.klassForm).subscribe(res =>{
      this.klassForm.reset();
    });
  }

  ClikShowPutGrade: boolean = true;
  VisiblePutGrade: boolean = false;
  showPutGrade(){
    this.ClikShowPutGrade = !this.ClikShowPutGrade;
    this.VisiblePutGrade = !this.VisiblePutGrade;
    this.gradeForm = this.formBuilder.group({
      id: ['',[Validators.required]],
      grade: ['',[Validators.required]],
      subjectId: ['', [Validators.required]],
      studentId: ['', [Validators.required]]
    });
  }

  putGrade(){
    console.log(this);
    this.tutorService.putGrade(this.gradeForm).subscribe(res => {
      this.gradeForm.reset();
    });
  }
}

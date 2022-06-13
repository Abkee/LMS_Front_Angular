import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { Students } from '../_models/students';
import { TutorService } from '../_services/tutor.service';
import { PutGrade } from '../_models/putgrade';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {
  id: string | undefined | null;
  stidentID: string | undefined;
  students: Students[] | undefined;
  authenticated = false;
  submitGradee: PutGrade[] = [];
  grade: PutGrade = new PutGrade(); 
  statusText: string | undefined;

  constructor(private route: ActivatedRoute, private tutorService: TutorService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.grade!.subjectId = this.id;
    this.showStudents();
  }

  async showStudents(){
    (await this.tutorService.showStudents(this.id)).subscribe(res =>{
      this.students = res;
      console.log(res);
    });
  }

  putGrade(){
    //console.log(this.students);
    this.students?.forEach((value) => {
      if(value.newGradeNumber!= null && value.newGradeNumber>0){
        if(value.newGradeNumber>0){
          if(value.id != null) {
            //console.log(value.id);
            this.grade.studentId = value.id;
          }
          if(value.newGradeNumber != null) {this.grade.grade = value.newGradeNumber;}
        }
        if(this.grade.grade!=null && this.grade.studentId!=null && this.grade.subjectId!=null) {
          console.log(this.grade);
          this.submitGradee?.push(this.grade);
          this.grade = new PutGrade();
          this.grade!.subjectId = this.id;
        }
      }
    });
    console.log(this.submitGradee);
    this.statusText = '';
    if(this.submitGradee.length !=0){
      this.tutorService.putGrade(this.submitGradee).subscribe(res => {
        console.log(res);
        this.statusText = res.text;
      });
      this.submitGradee = [];
      this.students?.forEach(value => {
        value.newGradeNumber = 0;
      });
    }
    }
}

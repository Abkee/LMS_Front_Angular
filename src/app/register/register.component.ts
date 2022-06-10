import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,FormControl ,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regisformTutor!: FormGroup;
  regisformStudent!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.regisformTutor = this.formBuilder.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      schoolId : ['', [Validators.required]],
    });

    this.regisformStudent = this.formBuilder.group({
      username: ['',[Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
      klassId : ['', [Validators.required]],
    });
  }
  submitTutor(): void{
    console.log(this.regisformTutor.getRawValue());
    this.http.post('https://localhost:7052/api/Authenticate/register/tutor',this.regisformTutor.getRawValue())
      .subscribe((resp: any) => {
        this.router.navigate(['/']);
        console.log(resp);
        });
  }
  submitStudent(): void{
    console.log(this.regisformStudent.getRawValue());
    this.http.post('https://localhost:7052/api/Authenticate/register/student',this.regisformStudent.getRawValue())
      .subscribe((resp: any) => {
        this.router.navigate(['/']);
        console.log(resp);
        });
  }

  ClikRegisTutor: boolean = true;
  VisibleTutor: boolean = false;
  onclickTutor(): void{
    this.ClikRegisTutor = !this.ClikRegisTutor;
    this.VisibleTutor = !this.VisibleTutor;
  }
  ClikRegisStudent: boolean = true;
  VisibleStudent: boolean = false;
  onclickStudent(): void{
    this.ClikRegisStudent = !this.ClikRegisStudent;
    this.VisibleStudent = !this.VisibleStudent;
  }
}

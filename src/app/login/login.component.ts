import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { Login } from '../_models/login';
import { AccesstokenService } from '../_services/accesstoken.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform!: FormGroup;
  role!: string;
  status: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private accesstokenService: AccesstokenService
  ) { }
  loginmodels: Login[] | undefined; 
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', [Validators.required, ]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    });
  }
  submit(): void{
    this.status = 'Unauthorized';
    console.log(this.loginform.getRawValue());
    this.http.post('https://localhost:7052/api/Authenticate/login',  this.loginform.getRawValue())
    .subscribe((resp: any) => {
      this.accesstokenService.setAccessToken(resp.token);
      console.log(resp.role.result[0]);
      this.role = resp.role.result[0];
      if(this.role=='Tutor'){
        this.router.navigate(['/tutor']);
      }
      else if (this.role=='Student'){
        this.router.navigate(['/student']);
      }
      });
      console.log(this.role);
  }
}

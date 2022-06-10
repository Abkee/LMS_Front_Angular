import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { AccesstokenService } from '../_services/accesstoken.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  authenticated = false;
  constructor(private accesstokenService: AccesstokenService) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth:boolean)=>{
        this.authenticated = auth;
      }
    );
  }
  logout(): void{
    this.accesstokenService.removeAccessToken();
    this.authenticated=false;
  }
}

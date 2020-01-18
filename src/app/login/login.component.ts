import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any;
  constructor(private appService:AppService, private router:Router) { }

  ngOnInit() {
    this.model = {};
  }

  onSubmit() { 
    this.appService.setUsername(this.model.username);
    this.router.navigateByUrl("/home");
  }

}

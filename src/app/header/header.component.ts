import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  username: string;
  constructor(private appService:AppService) {
   }

  ngOnInit() {
    this.appService.getUsername()
      .subscribe(name => {
        this.username=name});
  }

}

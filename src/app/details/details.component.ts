import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  imdbId:string;
  baseURL:string="https://www.omdbapi.com/";
  apiKey:string="85144051";
  noImageUrl:string="./assets/no_image.png";
  searchUrl:string;
  videoUrl:string;
  result:any;
  show:boolean=false;
  loading:boolean=false;
  constructor(private appService:AppService, private route: ActivatedRoute,
  private location: Location,private sanitizer: DomSanitizer, private router: Router) { }

  ngOnInit() {
    this.loading=true;
    this.route.params.subscribe(params => {
      console.log(params);
       this.imdbId = params['id'];
       this.searchUrl=this.baseURL+"?i="+this.imdbId+"&apikey="+this.apiKey+"&plot=full";
       this.appService.getActualResult(this.searchUrl).subscribe(
            response => {
              this.result=JSON.parse(response._body);
              this.videoUrl=("https://www.youtube.com/embed?listType=search&list="+this.result.Title+" "+this.result.Type+" "+"trailer").split(' ').join('%20');
              this.show=true;
              this.loading=false;
            });
    });
  }
  
}

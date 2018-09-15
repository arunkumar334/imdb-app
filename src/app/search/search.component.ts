import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,AfterViewInit {
  searchUrl:string="";
  baseURL:string="https://www.omdbapi.com/";
  apiKey:string="85144051";
  result:any;
  showError:boolean=false;
  showResult:boolean=false;
  errorMessage:string;
  networkError:boolean=false;
  loading:boolean=false;
  totalPages:any[]=[];
  currentPagination:any[];
  currentPage:number=1;
  totalPage:number;
  noImageUrl:string="./assets/no_image.png";
  imdbForm: FormGroup;

constructor(private appService: AppService, private router:Router, private fb:FormBuilder,
            private cdr: ChangeDetectorRef) { }

ngOnInit(): void {
  this.imdbForm = this.fb.group({
    searchString:"",
    searchType:"all",
    pageNo:'1'
  });
}

ngAfterViewInit(){
this.imdbForm.controls.searchString.patchValue(this.appService.searchString?this.appService.searchString:"");
this.currentPage=this.appService.pageNumber?this.appService.pageNumber:1;
this.imdbForm.controls.searchType.patchValue(this.appService.searchType?this.appService.searchType:"all");
this.imdbForm.controls.pageNo.patchValue(this.currentPage);
document.getElementById("searchInput").focus();
this.getResult('initial');
this.cdr.detectChanges();
}

getResult(source){
if (this.imdbForm.controls.searchString.value==""){
    if(source=='button')
    alert("please key in some input to search");
}
else{
this.totalPages=[];
this.currentPage = source=='initial'?this.currentPage:1;
this.imdbForm.controls.pageNo.patchValue(this.currentPage);
this.loading=true;
this.showResult=false;
this.showError=false;
this.networkError=false;
if(this.imdbForm.controls.searchType.value=="all"){
this.searchUrl=this.baseURL+"?s="+this.imdbForm.controls.searchString.value.trim()+"&apikey="+this.apiKey+"&page="+this.currentPage;
}
else{
this.searchUrl=this.baseURL+"?s="+this.imdbForm.controls.searchString.value.trim()+"&type="+this.imdbForm.controls.searchType.value+"&apikey="+this.apiKey+"&page="+this.currentPage;;
}

this.appService.getActualResult(this.searchUrl).subscribe(
            response => {
              this.result=JSON.parse(response._body);
              this.loading=false;
              if(this.result.Response=="True"){
              this.showResult=true;
              this.showError=false;
              }
              else if(this.result.Response=="False"){
              this.showResult=false;
              this.showError=true;
              this.errorMessage=this.result.Error;
              }
              this.totalPage=Math.ceil(this.result.totalResults/10);
              var i:number; 
              for(i = 1;i<=this.totalPage;i++) {
                  this.totalPages.push(i);
              }
              if(this.totalPages.length>7){
                this.currentPagination=this.totalPages.slice(0,7);
              }
              else{
                this.currentPagination=this.totalPages;
              }
            },
            error => {
              this.networkError=true;
              this.loading=false;
            }
    );
}
}

anotherPage(data,source){
  if(!isNaN(parseInt(data)) && data<=this.totalPage && data>=1){
  this.currentPage=data;
  this.imdbForm.controls.pageNo.patchValue(data);
  this.showResult=false;
  this.showError=false;
  this.loading=true;
  if(this.imdbForm.controls.searchType.value=="all"){
  this.searchUrl=this.baseURL+"?s="+this.imdbForm.controls.searchString.value.trim()+"&apikey="+this.apiKey+"&page="+data;
}
else{
  this.searchUrl=this.baseURL+"?s="+this.imdbForm.controls.searchString.value.trim()+"&type="+this.imdbForm.controls.searchType.value+"&apikey="+this.apiKey+"&page="+data;
}
  this.appService.getActualResult(this.searchUrl).subscribe(
              response => {
                this.result=JSON.parse(response._body);
                this.loading=false;
                if(this.result.Response=="True"){
                this.showResult=true;
                this.showError=false;
                }
                else if(this.result.Response=="False"){
                this.showResult=false;
                this.showError=true;
                }
              });
  if(source=="input" || source=="prev" || source=="next"){
  let temp=parseInt(data)%7;
  if(temp==0){
  this.currentPagination=this.totalPages.slice(data-7,data);
  }
  else{
  this.currentPagination=this.totalPages.slice((data-temp),(data-temp)+7);
  }
  }
}
else{
  alert("please enter a valid page number");
}
}

changePagination(type){
  if(type=='back'){
    this.currentPagination=this.totalPages.slice(this.currentPagination[0]-8,this.currentPagination[0]-1);
  }
  else if(type=='front'){
    this.currentPagination=this.totalPages.slice(this.currentPagination.slice(-1).pop(),this.currentPagination.slice(-1).pop()+7);
  }
}

moreDetails(){
  this.appService.setSearchCriteria(this.imdbForm.controls.searchString.value,this.imdbForm.controls.searchType.value,this.currentPage);
}

}
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class AppService {
searchString:string;
pageNumber:number;
searchType:string;
constructor(private http:Http) { }

getActualResult(searchUrl):Observable<any>{
	return this.http.get(searchUrl).pipe(map(response => {return response;}));
}

setSearchCriteria(searchString,searchType,pageNumber){
this.searchString=searchString;
this.pageNumber=pageNumber;
this.searchType=searchType;
}

private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }

}
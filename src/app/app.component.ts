import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
data:any=[
   {
      id: "Boss",
      children: [
        { id: "Person#1", children: [] },
        { id: "Person#2", children: [] },
        { id: "Person#3", children: [] },
      ]
   }
];
constructor() { }
ngOnInit(): void {
}
}
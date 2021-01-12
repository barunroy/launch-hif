import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'register',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  posts: object;
  errorMessage: object;

  Res: string;

  loading: boolean = false;
  Alert: boolean = false;
  
  private URL_BW = 'http://54.85.113.141:8096/resource1'

  constructor(private http: HttpClient) {
    this.posts= {};
   }
  
  ngOnInit() {
  }

  closeAlert(): void{
    this.Alert = false;
  }

  public onCreateBwPost(postBwData: { 
    
    Pkg: string; 
    SourceType: string;
    DestinationType: string;
    ValidationFlag: string;
    TransformationFlag: string;
    RoutingFlag: string;
  }) {
    // Send Http request
    //const  headers = new  HttpHeaders().set('responseType','text');
    this.loading = true;
    this.http.post(this.URL_BW,postBwData, { 'responseType':'text'​​​​​ }​​​​​)
    .subscribe({
      next: responsedata => { 
          this.Res = responsedata;
          //alert(this.Res)
          this.Alert = true
          this.loading = false;
      },
      error: error => {
          this.errorMessage = error.message;
         // console.error('There was an error!', error);
          alert('There is an error! the application is not yet created')
          
          this.loading = false;
      }
    
    });
  
  }

}

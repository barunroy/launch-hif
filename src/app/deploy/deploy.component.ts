import { OrderService } from './../services/order.service';
import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'deploy',
  templateUrl: './deploy.component.html',
  styleUrls: ['./deploy.component.css']
})
export class DeployComponent implements OnInit {

  postsBw6: object;
  postsBwce: object;
  postsBuild: object;
  nameValue: object;
  configvalues: object;
  errorMessage: object;
  
  values: any;
  resbw: string;
  myInput: string;
  
  buildrefresh: boolean = false;
  bwrefresh: boolean = false;
  bwcerefresh: boolean = false;
  inProgress: boolean = false;
  showBw6: boolean = false;
  tableShown: boolean = false ; // hidden by default
  isShown: boolean = false ; // hidden by default


  private URL_BW6 = 'http://54.85.113.141:8094/jenkinsbw6config'

  private URL_BWCE = 'http://54.85.113.141:8094/jenkinsbwcconfig'

  private URL_BUILD = 'http://54.85.113.141:8094/jenkinsbuild'

  private URL_GET = 'http://54.85.113.141:8181/integration-framework-0.0.1-SNAPSHOT/api/v1/deploymentDetails'

  
  selectedID: string = '';
  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedID = event.target.value;
  }


  constructor(private http: HttpClient) {
    this.postsBw6= {};
    this.postsBwce= {};
    this.postsBuild= {};
   }

  ngOnInit() {

    this.onGetProdname();
  
  }


  private onCreateBw6Post(postBw6Data: { 
    GIT_URL: string; 
    PROJECT_NAME: string; 
    Domain_DEV: string;
    AppSpace_DEV: string;
    Domain_SIT: string;
    AppSpace_SIT: string;
    Domain_UAT: string;
    AppSpace_UAT: string;
    Domain_PROD: string;
    AppSpace_PROD: string;
  }) {
    // Send Http request
    
    this.http.post(this.URL_BW6,postBw6Data, { 'responseType':'text'​​​​​ }​)
    .subscribe({
      next: responsedata => {
          this.resbw = responsedata;
          alert(this.resbw)
      },
      error: error => {
          this.errorMessage = error.message;
         // console.error('There was an error!', error);
          alert('There is a error! the BW6 application is not yet configure')

        this.showBw6 = !this.showBw6
        //this.Alert = true
      }
    });
  }

  toggleShowBw6() {

    this.showBw6 = ! this.showBw6;
    
    }

    private onCreateBwcePost(postBwceData: { 
      GIT_URL: string; 
      PROJECT_NAME: string; 
      INSTANCE_NAME: string;
      PROJECT_ID: string;
      COST_CENTER: string;
      MEM_REQUEST: string;
      CPU_REQUEST: string;
      MEM_LIMIT: string;
      CPU_LIMIT: string;
      TECH_OWNER: string;
      
    }) {
      // Send Http request
      
      this.http.post(this.URL_BWCE,postBwceData​, { 'responseType':'text'​​​​​ })
      .subscribe({
        next: responsedata => {
            this.resbw = responsedata;
            alert(this.resbw)
        },
        error: error => {
            this.errorMessage = error.message;
           // console.error('There was an error!', error);
            alert('There is a error! the BWCE application is not yet configure')
  
           this.tableShown = !this.tableShown
  
           //this.Alert = true
        }    
      });
    }
  toggleShowBwce() {

    this.tableShown = ! this.tableShown;
      
    }

    private onBuildBwPost(buildBwData: { 
     
      PROJECT_NAME: string;
      GIT_URL: string; 
      INSTANCE_NAME: string;
      DEPLOYMENT_TYPE: string;
      
    }) {
      // Send Http request
      
      this.http.post(this.URL_BUILD,buildBwData, { 'responseType':'text'​​​​​ }​)
      .subscribe({
        next: responsedata => {
            this.resbw = responsedata;
            this.inProgress = true;
            alert('Build is in Progress...');
        },
        error: error => {
            this.errorMessage = error.message;
           // console.error('There was an error!', error);
            alert('There is a error! the application is not yet build')
  
            this.isShown = !this.isShown
  
           //this.Alert = true
        }    
      });
    }

    toggleShowBuild() {

      this.isShown = ! this.isShown;
      
    }

    private onGetProdname() {
      // Send Http request
      this.http.get(this.URL_GET)
        .subscribe(response => {
          //console.log(response);
          
          this.nameValue = response;
  
          //this.hide = !this.hide
      });
    }  

    private onFetchStatus() {
      // Send Http request
      this.http.get(this.URL_GET + '/' + this.selectedID)
        .subscribe(response => {
          this.values = response; 
         
          this.inProgress = false;
          
          //this.showMe = !this.showMe
  
      });
    }

    private onFetchconfigStatus() {
      // Send Http request
      this.http.get(this.URL_GET + '/' + this.myInput)
        .subscribe(response => {        
          this.configvalues = response; 
          
          //this.showMe = !this.showMe
  
      });
    }

    clickBuildRefresh(){

      this.buildrefresh = !this.buildrefresh;
    }

    clickBwRefresh(){

      this.bwrefresh = !this.bwrefresh;
    }

    clickBwceRefresh(){

      this.bwcerefresh = !this.bwcerefresh;
    }

}

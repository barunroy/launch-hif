import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  prodValue: object;
  posts: object;
  
  values: any;
  status: string;
  errorMessage: string;

  loading: boolean  = false;
  showMe: boolean = true;
  hide: boolean = true;

  
  private URLG = 'http://54.85.113.141:8181/integration-framework-0.0.1-SNAPSHOT/api/v1/deploymentDetails';
  private URLC = 'http://54.85.113.141:8181/integration-framework-0.0.1-SNAPSHOT/api/v1/deploymentDetails/create';


  selectedID: string = '';
  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedID = event.target.value;
  }


  constructor(private http: HttpClient ) {
    this.posts= {};
  }

  ngOnInit(){
    this.onFetch();
    this.onGetProdId();
  }
  
  public onFetch() {
    // Send Http request

    this.http.get(this.URLG)
      .subscribe(response => {
        
        //console.log(response);
        this.values = response;
        //this.values.splice(0, 0, this.posts); 
        
        this.showMe = !this.showMe

    });
  }

  public onGetProdId() {
    // Send Http request
    this.http.get(this.URLG +'/'+ this.selectedID)
      .subscribe(response => {
        console.log(response);
        this.prodValue = response;

        this.hide = !this.hide
       

    });
  }  

  public onCreatePost(postData: { 
    projectId: string; 
    interfaceName: string; 
    deploymentMode: string }) {

    // Send Http request
    this.http.post(this.URLC,postData)
      .subscribe(responseData => {
        //console.log(responseData);
        this.posts= responseData;
        //alert(this.posts) 
        alert(" Value successfully added ")
        
        //this.Alert = true

      });
  }

  private onClearPosts(value) {
    // Send Http request
    //this.values.splice(value.projectId,1)
    if(confirm("Are you sure! do you want to Delete?")){
      this.values = this.values.filter((project) => {
        return project.interfaceName !== value
        });
      this.http.delete(this.URLG +'/delete/'+ value)
      .subscribe({
        next: data => {
          this.status = 'Delete successful';
          alert('The Inpute has been deleted')
        },
        error: error => {
          this.errorMessage = error.message;
          // console.error('There was an error!', error);
          alert('Status Code: 200-Success , but there is nothing in response!')
          //'There is a error! the inpute is not yet deleted'
        }
      });
    }
  }

}

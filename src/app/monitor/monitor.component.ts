import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Component({
  selector: 'monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  public values: object;

  public isShow: boolean = false;

  //private URLG = 'http://54.85.113.141:8181/integration-framework-0.0.1-SNAPSHOT/api/v1/deploymentDetails';

  private URLG = 'https://trial1106.api.mashery.com/deploymentDetails';
  


  constructor(private http: HttpClient ) {
  }

  ngOnInit(){
    this.onFetchAll();
  }
  
  private onFetchAll() {
    //parameters
    const options = { params: new HttpParams().set("api_key", "ruwbs6dmfthe87ty9r6etnuv") };
    // Send Http request
    this.http.get(this.URLG, options)
      .subscribe(response => {
        this.values = response;
        
    });
  }

  onClickShow(){
    this.isShow = !this.isShow
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';


@Injectable()
export class DataService {
	headers:any;
	result:any ;
  	constructor(private http: Http, private _sanitizer: DomSanitizer) {
    	this.headers = new Headers();
  	}

  	saveUser(user){
  		return this.http.post(environment.apiServerPath + "/api/saveUser", user, {
  			headers:this.headers
  		})
  		.map(result => this.result = result.json())
  		.catch(result => this.result = result.json());
  	}

    getUsers(){
      return this.http.get(environment.apiServerPath + "/api/getUsers", {
        headers:this.headers
      })
      .map(result => this.result = result.json())
      .catch(result => this.result = result.json());
    }

}

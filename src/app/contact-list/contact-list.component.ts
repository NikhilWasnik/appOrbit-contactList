import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { NgForm, FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import * as $ from 'jquery';
import { Subject } from 'rxjs/Subject';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
	service:any;
	users=[];
	route:any;
	dtOptions: DataTables.Settings = {};
	dtTrigger: Subject<any> = new Subject();

	constructor(private fb: FormBuilder, private dataservice:DataService,private router:Router) {
		this.service = dataservice;
		this.route = router;
	}

	ngOnInit() {
		this.dtOptions = {
	      	pagingType: 'full_numbers',
	      	pageLength: 10
	    };
		this.service.getUsers().subscribe((res)=>{
			if(res.data){
				if(res.data[0] == ""){
				}
				else{
					this.users = JSON.parse(res.data[0]);
				}
				this.dtTrigger.next();
			}
		},(error)=>{

		})
	}

	gotoEdit(id){
		this.route.navigate(['form'],{ queryParams: { 'userinfo': JSON.stringify(id) }, skipLocationChange: true });
	}

}

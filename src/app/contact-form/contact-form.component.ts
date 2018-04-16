import { Component, OnInit, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { NgForm, FormControl, FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
	contactForm:FormGroup;
	types:any = [
		"Work",
		"Personal"
	];
	user:any={
		firstName:"",
		lastName:"",
		emails:[],
		phones:[]
	};
	popUpHeader: String;
	popUpMsg: String;
	userList:any=[];
	service:any;
	items: any = [];
	emailArray:any = [];
	phones:any = [];
	phoneArray:any = [];
	userinfo:any;
	editFlag:boolean = false;

	constructor(private route: ActivatedRoute,private _sanitizer: DomSanitizer,private fb: FormBuilder, private dataservice:DataService,private router:Router) {
		this.service = dataservice;
		this.route.queryParams.subscribe(params => {
	    	if(params.userinfo != undefined){
	    		this.user = JSON.parse(params.userinfo);
	    		this.editFlag = true;
	    		console.log(this.user)
	    	}
	    });
	}

	ngOnInit() {
		this.createForm();
	}

	createForm() {
	    this.contactForm = this.fb.group({

	      firstName: [this.user.firstName],
	      lastName: [this.user.lastName],
	      emailType: [this.user.emailType],
	      emailId: [this.user.emailId],
	      phoneType: [this.user.phoneType],
	      phoneNumber: [this.user.phoneNumber],
	      items: this.fb.array([this.createItem()]),
	      phones: this.fb.array([this.createItemPhone()])
	    });
	}

	addEmailAttribute(){
		this.items = this.contactForm.get('items') as FormArray;
	    this.items.push(this.createItem());
	    if (this.user.emailType != '' && this.user.emailId != '') {
	      this.emailArray.push({ emailType: this.user.emailType, emailId: this.user.emailId });
	    }
	    // this.user.emailType = "";
	    // this.user.emailId = "";
	}

	createItem(): FormGroup {
	    return this.fb.group({
	    	emailType: '',
	      	emailId: ''
	    });
	}

	removeEmailAttribute() {
	    if (this.items && this.items.controls && this.items.controls.length > 1) {
	      this.items.controls.splice(this.items.controls.length - 1, 1);
	    }
	    if (this.emailArray && this.emailArray.length > 1) {
	      this.emailArray.splice(this.emailArray.length - 1, 1);
	    }
	}

	addPhoneAttribute(){
		this.phones = this.contactForm.get('phones') as FormArray;
	    this.phones.push(this.createItemPhone());
	    if (this.user.phoneType != '' && this.user.phoneNumber != '') {
	      this.phoneArray.push({ phoneType: this.user.phoneType, phoneNumber: this.user.phoneNumber });
	    }
	}

	createItemPhone(): FormGroup {
	    return this.fb.group({
	    	phoneType: '',
	      	phoneNumber: ''
	    });
	}

	removePhoneAttribute() {
	    if (this.phones && this.phones.controls && this.phones.controls.length > 1) {
	      this.phones.controls.splice(this.phones.controls.length - 1, 1);
	    }
	    if (this.phoneArray && this.phoneArray.length > 1) {
	      this.phoneArray.splice(this.phoneArray.length - 1, 1);
	    }
	}

	save(userInfo){
		var emails = [],emailTypes = [];
		$("form#contactForm input[type=email]").each(function(){
			var input = $(this).val();
			emails.push(input);
		});
	    $('.selectEmail  option:selected').each(function() {
	        emailTypes.push($(this).text());
	    });
	    var emailArr = [];
	    for(var i=0;i<emails.length;i++){
	    	var obj = {};
	    	Object.assign(obj,{emailType:emailTypes[i],emailId:emails[i]});
	    	emailArr.push(obj);
	    }

	    var phones = [], phoneTypes = [];
	    $("form#contactForm input[type=number]").each(function(){
			var input = $(this).val();
			phones.push(input);
		});
	    $('.selectPhone  option:selected').each(function() {
	        phoneTypes.push($(this).text());
	    });
	    var phoneArr = [];
	    for(var i=0;i<phones.length;i++){
	    	var obj = {};
	    	Object.assign(obj,{phoneType:phoneTypes[i],phoneNumber:phones[i]});
	    	phoneArr.push(obj);
	    }
	    this.user.emails = emailArr;
	    this.user.phones = phoneArr;
	    var d = new Date();
    	var n = d.getTime();	    
	    if(this.user != undefined && this.user.id != undefined){
	    	n = this.user.id;
	    }
	    Object.assign(userInfo,{id:n,editFlag:this.editFlag});
		this.service.saveUser(userInfo).subscribe((res)=>{
			alert(res.message);
		},(error)=>{
			alert("Error in saving user.");
		})
	}
}

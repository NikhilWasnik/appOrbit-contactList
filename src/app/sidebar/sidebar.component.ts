import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
	route:any;
  constructor(private router:Router) {
  	this.route = router;
  }

  ngOnInit() {
  }

  gotoForm(){
  	this.route.navigate(['form']);
  }

  gotoList(){
  	this.route.navigate(['list']);
  }

}

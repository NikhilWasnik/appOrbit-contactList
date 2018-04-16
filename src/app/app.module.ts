import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import * as $ from 'jquery';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    ContactListComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTablesModule,
    RouterModule.forRoot([
      {  path: "", component: AppComponent},
      {  path: "form", component: ContactFormComponent},
      {  path: "list", component: ContactListComponent}    
    ])
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

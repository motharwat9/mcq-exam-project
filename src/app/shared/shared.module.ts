import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    NavComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(), 
    MaterialModule
  ],
  exports: [
    NavComponent,
    RouterModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule ,
    MaterialModule
  ]

})
export class SharedModule { }

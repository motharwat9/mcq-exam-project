import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators } from '@angular/forms';
import { passwordMatchConfirmpass, passwordMatchName } from 'src/app/custom validator/complex.validator';
import { AuthService } from '../../services/auth.service';
import { Register } from 'src/app/model/register';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userIsReg:Register[]=[]
  userForm;
  constructor(private fb:FormBuilder,private service:AuthService ,private toastr:ToastrService,private route:Router){
    this.userForm=this.fb.group({
      username:['',[Validators.required, Validators.pattern('[a-zA-Z\\s]{3,}')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.pattern('[a-zA-z0-9]{12,}') ]],
      confirmPassword:['',[Validators.required]],
    },{validators:[passwordMatchName(),passwordMatchConfirmpass()]})
  }
  ngOnInit(): void {
    this.getAlluser()
  }
  get userName(){
    return this.userForm.get('username')
  }
  get userEmail(){
    return this.userForm.get('email')
  }
  get userPass(){
    return this.userForm.get('password')
  }
  get userConfirmPass(){
    return this.userForm.get('confirmPassword')
  }
  getAlluser(){
    this.service.getAllUsers('student').subscribe(res=>{
      this.userIsReg=res
    })
  }
  submit(){
    let form=this.userForm.value
    let model:Register={
      name:form.username,
      email:form.email,
      password:form.password,
    } as Register
    let index=this.userIsReg.findIndex(item=>item.email ==this.userForm.value.email)
    if(index !== -1){
      this.toastr.error("الايميل موجود مسبقا")
    }else{
      this.service.registerForm(model).subscribe(res=>{
        this.toastr.success("تم انشاء الحساب بنجاح")
        this.route.navigate(['/login'])
        this.getAlluser()
      })
    }
  }
}

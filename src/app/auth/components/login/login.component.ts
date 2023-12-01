import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Register } from 'src/app/model/register';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/model/login';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm;
  checkRadio:string='student'
  Users:Register[]=[]
  constructor(private fb:FormBuilder,private service:AuthService,private Toster:ToastrService,private route:Router){
    this.loginForm=this.fb.group({
      type:[this.checkRadio],
      email:['',[Validators.required]],
      password:['',[Validators.required ]],
    })
  }
  ngOnInit(): void {
    this.getAllUser()
  }
  detectChange(event:any){
    this.checkRadio=event.target.value
    this.getAllUser()
  }
  getAllUser(){
    this.service.getAllUsers(this.checkRadio).subscribe(res=>{
      this.Users=res
      console.log(this.Users)
    })
  }
  login(){

    let index=this.Users.findIndex(item=>(item.email == this.loginForm.value.email)&&(item.password == this.loginForm.value.password))
    if(index == -1){
      this.Toster.error("خطا فى كلمه المرور او الايميل ")
    }else{
      let model={
        email:this.loginForm.value.email,
        adminRule:this.loginForm.value.type
      } as Login

      this.service.login(model).subscribe(res=>{
        this.Toster.success("تم تسجيل الدخول بنجاح")
        this.route.navigate(['/subjects'])
        this.service.userRule.next(res)
      })
      }
    }
  
}

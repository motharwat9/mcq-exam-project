import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  ruleIsUser:any=null
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.auth.userRule.subscribe((res:any)=>{
      if(res.adminRule){
        this.ruleIsUser=res
        console.log(this.ruleIsUser) 
      }
    })
  }
  logout(){
    let model={}as Login
    this.auth.login(model).subscribe(res=>{
        this.ruleIsUser=null
    })
  }
}

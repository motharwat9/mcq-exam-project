import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { Subject } from 'src/app/model/subject';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Login } from 'src/app/model/login';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  Subjects:Subject[]=[];
  showspinner:boolean=true;
  users:Login | undefined=undefined;
  constructor(private serveice:DoctorService,private Auth:AuthService, private toaster:ToastrService,private router:Router){}
  ngOnInit(): void {
    this.getAllSub();
    this.getUserLogin();
    }
  getAllSub(){
    this.serveice.getAllSubject().subscribe(res=>{
      this.showspinner=false
      this.Subjects=res
    })
  }
  getUserLogin(){
    this.Auth.getRule().subscribe((res:Login)=>{
      this.users=res
      console.log(this.users)
    })
  }
  delete(index:number){
    let id = this.Subjects[index].id
    this.Subjects.splice(index,1)
    this.serveice.deleteSubject(id).subscribe(res =>{
      this.toaster.success("تم حذف المادة بنجاح")
    })
    if(this.Subjects.length ==0){
      this.router.navigate(['/new-exam'])
    }
  }
}

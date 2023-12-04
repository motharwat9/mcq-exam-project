import { Question } from 'src/app/model/question';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit{
  showResu:boolean=false;
  totalResult:number=0
  id:number=0
  subject:any;
  users:Login | undefined=undefined;

  constructor(private activatedRoute:ActivatedRoute,private service:DoctorService,private Auth:AuthService,
    
    private toaster:ToastrService){}
  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.getSubjectById()
    this.getUserLogin()
    console.log(this.id)
  }
  getSubjectById(){
    this.service.getSubjectByID(this.id).subscribe(res=>{
      this.subject=res
      console.log(this.subject)
    })
  }
  deleteQues(index:number){
    this.subject.questions.splice(index,1)
    let model={
      name:this.subject.name,
      questions:this.subject.questions
    }
    this.service.updatedQuestion(model,this.id).subscribe(res=>{
      this.toaster.success("تم حذف السؤال بنجاح")
    })
  }
  getUserLogin(){
    this.Auth.getRule().subscribe((res:Login)=>{
      this.users=res
      console.log(this.users)
    })
  }
  selectAnswer(event:any){
    let value=event.value |0
    let questionIndex=event.source.name
    this.subject.questions[questionIndex].studentAns=value
    console.log(this.subject.questions)
  }
  printRes(){
    this.totalResult=0;
    for(let i in this.subject.questions){
      if(this.subject.questions[i].studentAns == this.subject.questions[i].correctAnswer){
        this.totalResult++
      }
    }
    console.log(this.totalResult)
    this.showResu=true
  }
}

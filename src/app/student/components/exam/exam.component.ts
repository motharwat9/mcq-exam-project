import { Question } from 'src/app/model/question';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  studentInfo:any;
  users:Login | undefined=undefined;
  userSubject:any[]=[];
  validExam:boolean=true;
  showspinner:boolean=true;
  constructor(private activatedRoute:ActivatedRoute,private service:DoctorService,private Auth:AuthService,
    
    private toaster:ToastrService){}
  ngOnInit(): void {
    this.id=Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.getSubjectById()
    this.getUserLogin()
  }
  getSubjectById(){
    this.service.getSubjectByID(this.id).subscribe(res=>{
      this.showspinner=false
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
      this.getUserData()
      console.log(this.users)
    })
  }
  getUserData(){
    this.Auth.getUserById(this.users?.userId).subscribe((res:any)=>{
      this.studentInfo=res
      this.userSubject=res?.subjects? res?.subjects:[]
      console.log(this.studentInfo)
      this.checkValidExam()
    })
  }
  checkValidExam(){
    for(let x in this.userSubject){
      if(this.userSubject[x].subjectId == this.id){
        this.validExam=false
        this.totalResult=this.userSubject[x].degree;
        this.toaster.warning("لقد انجزت الاختبار مسبقا")
      }
    }
    console.log(this.showResu)
  }
  selectAnswer(event:any){
    let value=event.value 
    let questionIndex=event.source.name
    this.subject.questions[questionIndex].studentAns=value

  }

  printRes(){
    this.totalResult=0;
    for(let i in this.subject.questions){
      if(this.subject.questions[i].studentAns == this.subject.questions[i].correctAnswer){
        this.totalResult++
      }
    }
    this.showResu=true
    this.userSubject.push({
      subjectName:this.subject.name,
      subjectId:this.subject.id,
      degree:this.totalResult
    })
    let model = {
      name:this.studentInfo.name,
      email:this.studentInfo.email,
      password:this.studentInfo.password,
      id:this.studentInfo.id,
      subjects:this.userSubject
    }
    this.Auth.UpdateStudent(this.users?.userId,model).subscribe(res=>{
      this.toaster.success("تم تسجيل النتيجه بنجاح")
      // this.route.navigate(['/subjects'])
    })
  }
}

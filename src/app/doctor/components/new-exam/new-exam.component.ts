import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';
import { Question } from 'src/app/model/question';
import { Subject } from 'src/app/model/subject';


@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent {
  fromName:FormControl;
  questionForm:FormGroup;
  subjectName:string=''
  questions:Question[]=[];
  correctNum:string=''
  correctAns:string='';
  nextTab:boolean=false;
  previous:boolean=false
  id:number=0
  sterpperIndex:number=0;
  constructor(private _formBuilder: FormBuilder,private toastr:ToastrService,private service:DoctorService) {
    this.fromName=new FormControl('',Validators.required)
    this.questionForm=this._formBuilder.group({
      question:['',Validators.required],
      answer1:['',Validators.required],
      answer2:['',Validators.required],
      answer3:['',Validators.required],
      answer4:['',Validators.required]
        })
  }
 // أبدأ
  stertNextTab(){
    if(this.fromName.value == '' || this.fromName.value == null){
      this.toastr.error("يرجى ادخال أسم المادة")
    }else{
      this.nextTab=true
      this.subjectName=this.fromName.value
    }
  }
  // option change
  selsecCorrectAns(event:any){
    this.correctAns=event.value
  } 

  //حفظ
  createForm(){
    if(this.correctAns){
      let model:Question={
        question:this.questionForm.value.question,
          answer1:this.questionForm.value.answer1,
          answer2:this.questionForm.value.answer2,
          answer3:this.questionForm.value.answer3,
          answer4:this.questionForm.value.answer4,
          correctAnswer:this.questionForm.value[this.correctAns] 
        } 
        this.questions.push(model)
        this.questionForm.reset();
        this.correctAns=''
        this.previous=false
      }else {
        this.toastr.error("يرجى اختيار الاجابه الصحيحه")
      }
    }
    clearForm(){
      this.correctAns=''
      this.questionForm.reset()
    }
    cancel(){
      this.questionForm.reset();
      this.questions=[];
      this.nextTab=false;
      this.previous=false; 
      this.fromName.reset()
      this.subjectName='';
      this.correctAns=''
  }

  submit(){
    if(this.questions.length > 0){
      if(this.previous){
        this.sterpperIndex=2
      }else {
        let model:Subject={
          name:this.subjectName,
          questions:this.questions
        }
        this.service.createSubject(model).subscribe((res:any)=>{
          this.previous=true;
          this.id=res.id
        })
      }
    }
  }
  delete(index:number){
    this.questions.splice(index,1); 
    let model :Subject= {
      name:this.subjectName,
      questions:this.questions
    }
    this.service.updatedQuestion(model,this.id).subscribe(res=>{
      this.toastr.success("تم حذف السؤال بنجاح  ")
    })
    }
}


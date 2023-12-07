import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { Register } from 'src/app/model/register';
import { Student } from 'src/app/viewModel/student';
import { Subject } from 'src/app/model/subject';
import { SubjectID } from 'src/app/viewModel/subject';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  ELEMENT_DATA: any[]=[];
  students: Register[]=[];
  studentsIds: Student[]=[];
  subjects: Subject[]=[];
  subjectsIds:SubjectID[]=[];
  displayedColumns: string[]=[];
  constructor(private auth: AuthService, private doctor: DoctorService) {}
  ngOnInit(): void {
    this.getAllUsers();
    this.getAllSubject();
  }
  getAllUsers() {
    this.auth.getAllUsers('student').subscribe((res) => {
      this.students = res;
      for (let i in this.students) {
        for (let k in this.students[i].subjects) {
          this.studentsIds.push({
            id: this.students[i].id,
            name: this.students[i].name,
            degree: this.students[i].subjects[k].degree,
            idsuject: this.students[i].subjects[k].subjectId,
          });
        }
      }
    });
  }
  getAllSubject() {
    this.doctor.getAllSubject().subscribe((res) => {
      this.subjects = res;
      for (let i in this.subjects) {
        this.subjectsIds.push({
          id: this.subjects[i].id!,
          name: this.subjects[i].name,
        });
      }
      this.transformDAta();
    });
  }
  transformDAta() {
    this.displayedColumns = ['التسلسل','الاسم',...this.subjectsIds.map((subject) => subject.name)];
    this.populateElementData();
  }
  populateElementData() {
    for (let i = 0; i < this.students.length; i++) {
      const studentData: any = { 
        التسلسل:i+1,
        الاسم: this.students[i].name };

      for (let j = 0; j < this.subjects.length; j++) {
        const subjectId = this.subjects[j].id;
        const degree = this.findStudentSubjectDegree(this.students[i].id, subjectId || 0);
        studentData[this.subjects[j].name] = degree;
      }
      this.ELEMENT_DATA.push(studentData);
    }
  }
  findStudentSubjectDegree(studentId: number, subjectId: number) {
    const student = this.studentsIds.find((s) => s.id === studentId && s.idsuject === subjectId);
    return student ? student.degree : '-';
  }
}

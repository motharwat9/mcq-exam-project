import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.auth.getRule().subscribe(res=>{
      this.auth.userRule.next(res)
    })
  }
}

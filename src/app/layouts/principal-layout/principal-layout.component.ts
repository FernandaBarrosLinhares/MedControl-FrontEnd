import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-principal-layout',
  templateUrl: './principal-layout.component.html',
  styleUrls: ['./principal-layout.component.css']
})
export class PrincipalLayoutComponent implements OnInit{
  isProntuario: boolean = false;

  constructor(private router: Router) {
    inject(LoginService).urlEventEmitter.subscribe(url => {
      this.isProntuario = url.includes('prontuarios');
    })
  }
  
  ngOnInit(): void {
    const url = this.router.url.split('/')[2];
    this.isProntuario = url.includes('prontuarios');
  }
}

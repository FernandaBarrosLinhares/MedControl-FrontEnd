import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from 'src/app/services/url/url.service';

@Component({
  selector: 'app-principal-layout',
  templateUrl: './principal-layout.component.html',
  styleUrls: ['./principal-layout.component.css']
})
export class PrincipalLayoutComponent implements OnInit{
  formatoMaior: boolean = false;

  constructor(private router: Router) {
    inject(UrlService).urlEventEmitter.subscribe(url => {
      this.setIsProntuario(url);
    });
  }
  
  ngOnInit(): void {
    this.setIsProntuario(this.router.url);
  }

  setIsProntuario(url: string) {
    this.formatoMaior = url.includes('prontuarios') || url == "/labmedication";
  }
}

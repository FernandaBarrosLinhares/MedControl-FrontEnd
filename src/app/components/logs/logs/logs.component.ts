import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { ILogs } from 'src/app/interfaces/ILogs';
import { LoginService } from 'src/app/services/login/login.service';
import { LogsService } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit{
  logs:any = [];

  constructor(private logService:LogsService,
    private loginService:LoginService,
    private router:Router,
    private toatr:ToastrService
    ){

  }
  async ngOnInit(){
    this.logs = await this.logService.buscarTodos();
  }
}

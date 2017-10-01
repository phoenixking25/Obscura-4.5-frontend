import { Component, OnInit } from '@angular/core';
import { Player } from '../_models/level';
import { SignupRes } from '../_models/response';
import { HTTPService } from '../_services/http.service';
import { Router } from '@angular/router';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-level-list',
  templateUrl: './create-level.component.html',
  styleUrls: ['./create-level.component.css'],
  providers: [HTTPService]
})
export class CreateLevelComponent implements OnInit {
  level: any = {'name': '', 'levelNo': null, 'nextUrl': '', 'picture': '', 'html': '', 'js': '', 'hint': '', 'ans': ''};
  constructor(
    private http: HTTPService,
    private router: Router,
    private snackBar: MdSnackBar
  ) { }

  ngOnInit() {

  }
  submitForm(level: any){
    this.http.post('http://localhost:8080/crreateLevel/',level)
    .subscribe();
  }
}

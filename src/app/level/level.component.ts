import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Level } from '../_models/level';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css'],
  providers: [HTTPService]
})
export class LevelComponent implements OnInit {
  _id: string;
  level: Level = {name:'',photo:'',ans:'',js:''};
  answer: string;
  constructor(

    private http : HTTPService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((param: ParamMap)=>{
      this._id = param['id'];
      console.log(this._id);
      this.getLevel();
    });
  }
  

  getLevel(){
    this.http.get('level/',this._id)
      .toPromise()
      .then(response => response.json())
      .then(level => this.level = level)
    
  }

  postAnswer(){
    this.http.post('level/'+this._id+'/',this.answer)
  }

}

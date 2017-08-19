import { Component, OnInit } from '@angular/core';
import { HTTPService } from '../_services/http.service';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { Player } from '../_models/level';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
  providers: [HTTPService]
})
export class LeaderboardComponent implements OnInit {
  player: Player[];
  constructor(
    private http: HTTPService
  ) { }

  ngOnInit() {
    this.getPlayer()
  }
  getPlayer(){
    this.http.get('player/')
      .toPromise()
      .then(response => response.json())
      .then(player => this.player = player);
  }


}

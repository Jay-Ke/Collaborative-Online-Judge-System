import { Component, OnInit } from '@angular/core';

import {Problem} from '../../models/problem.model';

import {PROBLEMS} from '../../mock-problems';

import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit {
  problems:Problem[];
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getProblems();
  }

  getProblems():void{
    this.problems=this.dataService.getProblems();
  }

}

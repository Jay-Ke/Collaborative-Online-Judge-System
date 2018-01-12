import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {Problem} from '../../models/problem.model';

import {PROBLEMS} from '../../mock-problems';

import {DataService} from '../../services/data.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css']
})
export class ProblemListComponent implements OnInit,OnDestroy {
  problems:Problem[];
  subscriptionProblems:Subscription;
  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.getProblems();
  }

  ngOnDestroy(){
    this.subscriptionProblems.unsubscribe();
  }

  getProblems():void{
    //this.problems=this.dataService.getProblems();
    this.subscriptionProblems=this.dataService.getProblems()
      .subscribe(problems=>this.problems=problems);
  }

}

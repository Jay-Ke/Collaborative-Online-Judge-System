import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import {routing} from './app.routes';
import { AppComponent } from './app.component';

import { ProblemListComponent } from './components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './components/problem-detail/problem-detail.component';

import {DataService} from './services/data.service';
import {CollaborationService} from './services/collaboration.service';


import { NewProblemComponent } from './components/new-problem/new-problem.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';
import { EditorComponent } from './components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NewProblemComponent,
    NavbarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    CollaborationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

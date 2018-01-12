import { Component, OnInit } from '@angular/core';
import {CollaborationService} from '../../services/collaboration.service';
import {ActivatedRoute,Params} from '@angular/router';
declare const ace:any;
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  editor:any;
  languages:string[]=['Java','Python'];
  language:string='Java';
  sessionId:string;
  constructor(private collaboration:CollaborationService,
              private route:ActivatedRoute) { }
  defaultContent = {
    'Java': `public class Example {
      public static void main(String[] args) {
          // Type your Java code here
      }
    }`,
    'Python': `class Solution:
    def example():
        # Write your Python code here`
   };
  ngOnInit() {
    this.route.params
      .subscribe(params=>{
        this.sessionId=params['id'];
        this.initEditor();
        this.collaboration.restoreBuffer();
      })
    // this.editor = ace.edit("editor");
    // this.editor.setTheme("ace/theme/eclipse");
    // // this.editor.getSession().setMode("ace/mode/java");
    // // this.editor.setValue(this.defaultContent['Java']);
    // this.resetEditor();
    // this.editor.$blockScrolling = Infinity;
    // this.collaboration.init();
  }

  initEditor():void{
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/eclipse");
    // this.editor.getSession().setMode("ace/mode/java");
    // this.editor.setValue(this.defaultContent['Java']);
    this.resetEditor();
    this.editor.$blockScrolling = Infinity;

    //set up collaboration socket
    this.collaboration.init(this.editor,this.sessionId);
    this.editor.lastAppliedChange=null;

    //If the editor's content is changed, send the content
    this.editor.on('change',(e)=>{
      console.log('editor change: ' + JSON.stringify(e));
      if (this.editor.lastAppliedChange != e){
          this.collaboration.change(JSON.stringify(e));
      }
    });

  }

  setLanguage(language:string):void{
    this.language=language;
    this.resetEditor();
  }

  resetEditor():void{
    this.editor.setValue(this.defaultContent[this.language]);
    this.editor.getSession().setMode("ace/mode/"+this.language.toLowerCase());
  }

  submit():void{
    const userCode=this.editor.getValue();
    console.log(userCode);
  }
}

import { Component, OnInit } from '@angular/core';
import { Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import * as todo from '../todo.actions';
import { Todo } from '../model/todo.model'

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styles: []
})
export class TodosListComponent implements OnInit {

	public todos: Todo[] = [];
  public filtro:string;

  constructor(private store:Store<AppState> ) { }

  ngOnInit() {
  	this.store.subscribe((state)=>{
  		this.todos = state.todos;
      this.filtro = state.filtro;
  	});
  }

}

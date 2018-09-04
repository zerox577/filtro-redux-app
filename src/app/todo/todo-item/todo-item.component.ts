import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import {Todo} from '../model/todo.model'
import { FormControl,Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ToggleTodoAction,EditarTodoAction,BorrarTodoAction } from '../todo.actions';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styles: []
})
export class TodoItemComponent implements OnInit {

	@Input() todo: Todo;
	@ViewChild('txtInput') txtInput:ElementRef;
	public chkField:FormControl;
	public txtField:FormControl;
	public editando:boolean;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.chkField = new FormControl(this.todo.completado);
		this.txtField = new FormControl(this.todo.texto,Validators.required);
		this.chkField.valueChanges.subscribe((value)=>{
			const accion = new ToggleTodoAction(this.todo.id);
			this.store.dispatch(accion);
		});
	}
	editar(){
		this.editando = true;
		setTimeout(()=>{
			this.txtInput.nativeElement.select();
		},1);
	}
	terminar(){
		this.editando = false;
		if(this.txtField.invalid) return ;
		if(this.txtField.value === this.todo.texto) return;			
		const accion = new EditarTodoAction(this.todo.id,this.txtField.value);
		this.store.dispatch(accion);
	}
	borrar(){
		const accion = new BorrarTodoAction(this.todo.id);
		this.store.dispatch(accion);
	}
}

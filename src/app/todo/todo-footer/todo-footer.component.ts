import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import {Todo} from '../model/todo.model'

@Component({
	selector: 'app-todo-footer',
	templateUrl: './todo-footer.component.html',
	styles: []
})
export class TodoFooterComponent implements OnInit {

	public filtrosValidos:fromFiltro.filtrosValidos[] = ['todos','completados','pendientes'];
	public filtroActual:fromFiltro.filtrosValidos;
	public pendientes:number;

	constructor(private store:Store<AppState>) { }

	ngOnInit() {
		this.store.subscribe(state=>{
			this.filtroActual = state.filtro;
			this.contarPendientes(state.todos);
		});
	}
	cambiarFiltro(nuevoFiltro:fromFiltro.filtrosValidos){
		const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
		this.store.dispatch(accion);
	}
	contarPendientes(todos:Todo[]){
		this.pendientes = todos.filter(todo => !todo.completado).length;
	}
	limpiar(){
		const accion = new fromTodo.BorrarAllTodoAction();
		this.store.dispatch(accion);
	}
}

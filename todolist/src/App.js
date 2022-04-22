import React from  "react";


import Title from './Title';

import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';


class App extends React.Component {

	constructor(props){
		super(props);
		this.state = 
		{
			tasks_id:[],	
			tasks:[]
		};
	}
		
	componentDidMount = () => {
		fetch("http://192.168.1.10:3030")
			.then(response => response.json())
			.then(data => this.setTasks(data));
};
	

	setTasks = data => {

	
	for (let i = 0; i< data.length; i++)	
		{

			
			this.state.tasks.push(data[i].task);
			this.state.tasks_id.push(data[i]._id);
			
		}
			this.setState({tasks:this.state.tasks});


		/*this.state.tasks = tasks_ar;
		this.setState({
			tasks: this.state.tasks}
			);
			console.log(tasks_ar);*/
			console.log(this.state.tasks);
			console.log(this.state.tasks_id);
	};



	addTask = task =>{

	
	 fetch("http://192.168.1.10:3030", {method:"POST", body: '{"task":"' +task+'", "remove":"false"}' })
	 .then(response => response.json() )
     .then(data => {
	 	let id = data[0];

		this.state.tasks.push(task);
		this.state.tasks_id.push(id);

		this.setState({
		tasks: this.state.tasks
		});
		console.log(this.state.tasks);
		console.log(this.state.tasks_id);

	});
}

	removeTask = (task,  key, id_task) =>{
	console.log(key);
	this.state.tasks.splice(key, 1);
	this.setState({
	tasks:this.state.tasks
	});
	fetch("http://192.168.1.10:3030", {method:"post", body: '{"task_id":"' +id_task+'", "remove":"true"}' });

}




render (){
 return (
 	<div className="App"    >
		<Title />
		<TaskForm addTask={this.addTask} />
		<TaskList tasks={this.state.tasks}
				tasks_id={this.state.tasks_id}
			removeTask={this.removeTask}
		/>


			</div>
 	 );
	}
}
export default App;

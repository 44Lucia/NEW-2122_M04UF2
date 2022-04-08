import React from 'react';
//import './App.css';
import Title from './Title';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

class App extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tasks: []
		};
		console.log("Entrando");
	}

	componentWillMount () {
        fetch("http://172.31.99.183:3030/")
            .then(response => response.json())
			.then( data => this.SetTasks(data));
    }

    SetTasks = data => {
        console.log(data);
        for (let i = 0; i < data.length; i++){
            this.state.tasks.push(data[i].task);
        }
        this.setState({
			tasks: this.state.tasks
		});
    };

    addTask = task => {
        this.state.tasks.push(task);
        this.setState({
			tasks: this.state.tasks
		});

        fetch("http://172.31.99.183:3030/",{
            method: "POST",
            body: '{"task":"'+task+'"}'
		});
    }	

	removeTask = id_task => {
		this.state.tasks.splice(id_task, 1);
		this.setState({
			tasks: this.state.tasks
		});
	}


	render(){
		console.log(this.state.tasks);
		return (
<div className="App">
<Title />
<TaskForm addTask={this.addTask} />
<TaskList tasks={this.state.tasks} removeTask={this.removeTask}/>
</div>
		);
  }
}

export default App;

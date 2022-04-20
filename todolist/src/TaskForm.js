import React from 'react';

import TaskInput from './TaskInput';
import TaskSubmit from './TaskSubmit';

class TaskForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			task: ""
		};
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.addTask(this.state.task);

	}

	handleChange = (event) => {
		this.setState({
			task: event.target.value
		});
	}

	render()
	{
		return (
			<form >
			<TaskInput handleChange={this.handleChange} onSumbit={this.handleSubmit}/>
			<TaskSubmit onSubmit={this.handleSubmit}/>
			</form>
		);

	}
}


export default TaskForm;

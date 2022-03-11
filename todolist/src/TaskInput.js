import React from 'react';

class TaskInput extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value: ""
		};
	}

	handleChange = (event) => {
		console.log(event.target.value);
		this.setState({
			value: event.target.value
		});
	}

	render() {
		let l = this.state.value.length;

		return (
		<label htmlFor="task-input">Tarea {l < 2  &&
		<div>Error</div>
		}
		<input type="text" id="task-input" onChange={this.handleChange}/>
		</label>
		);
	}
}

export default TaskInput;

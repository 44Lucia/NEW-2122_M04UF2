import React from 'react'; 
import TextField from '@mui/material/TextField';

class TaskInput extends React.Component{

	constructor (props){
		super(props);
		this.state = {
		value: ""

		};
	}

	handleChange = (event)=>{
	this.props.handleChange(event);
		this.setState({
			value : event.target.value

		});
	event.preventDefault();
}

render(){
	return(
			<TextField id="task_input" 	
				label="Tarea" size="small" variant="filled"
				variant="outlined" 
				value={this.state.value}  
				onChange={this.handleChange}
				onSubmit={this.handleSubmit}
			/>

	);

	}
}
export default TaskInput;

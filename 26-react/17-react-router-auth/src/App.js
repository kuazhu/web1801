/*
* @Author: TomChen
* @Date:   2018-08-16 17:14:09
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-23 14:55:19
*/
import React,{ Component } from 'react';
import TodoList from './pages/todolist';
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

//引入css
import './App.css';

class A extends Component{
	render(){
		return (
			<div>
				Component A for login user
			</div>
		)
	}
}
class Login extends Component{
	render(){
		return (
			<div>
				Component Login
			</div>
		)
	}
}

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			isLogoin : false
		}
	}
	render(){
		const ProtectedRouter = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					this.state.isLogoin
					? <Component {...props} />
					: <Redirect to="/login" />
				)}
			/>
			)

		return(
			<Router>
				<div className="App">
					<ul>
						<li>
							<Link to="/todolist">todolist</Link>
						</li>
						<li>
							<Link to="/a">a-component</Link>
						</li>					
						<li>
							<Link to="/b">b</Link>
						</li>													
					</ul>				
					<Route path="/todolist" component={ TodoList } />		
					<ProtectedRouter path="/a" component={ A } />	
					<Route path="/b" render={()=>(<h1>b!!!</h1>)} />
					<Route path="/login" component={ Login } />
				</div>		
			</Router>	
		)
	}
}

export default App;
/*
* @Author: TomChen
* @Date:   2018-08-16 17:14:09
* @Last Modified by:   TomChen
* @Last Modified time: 2018-08-23 11:31:54
*/
import React,{ Component } from 'react';
import TodoList from './pages/todolist';
import {
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

//引入css
import './App.css';

class A extends Component{
	render(){
		return (
			<div>
				Component A
				{
					//this.props.match.params.id
				}
				<Switch>
					<Route exact path="/a" render={()=>(<h1>no param</h1>)} />
					<Route path="/a/sub" render={()=>(<h1>a/sub</h1>)} />
					<Route path="/a/:id" render={(route)=>(<h1>param{route.match.params.id}</h1>)} />
				</Switch>
			</div>
		)
	}
}



class App extends Component{

	render(){
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
							<Link to="/a/123">a-component-param</Link>
						</li>
						<li>
							<Link to="/a/sub">a-component-sub</Link>
						</li>						
						<li>
							<Link to="/b">b</Link>
						</li>													
					</ul>				
					<Route path="/todolist" component={ TodoList } />		
					<Route path="/a" component={ A } />	
					<Route path="/b" render={()=>(<h1>b!!!</h1>)} />
				</div>		
			</Router>	
		)
	}
}

export default App;
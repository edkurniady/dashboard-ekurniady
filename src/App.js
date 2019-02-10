import React, {Component} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import login from './components/login'
import register from './components/register'
import home from './components/home'
import yourposts from './components/yourposts'

class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Switch>
        <Route exact path = '/' component={login}/>
        <Route exact path = '/register' component={register}/>
        <Route exact path = '/home' component={home}/>
        <Route exact path = '/yourposts' component={yourposts}/>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App

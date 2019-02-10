import React, {Component} from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie'
import {Link} from 'react-router-dom'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.login = this.login.bind(this)
    }

    handleInput({target}){
        this.setState({
            [target.name]: target.value
        })
    }

    login(event){
        event.preventDefault()
        var {username, password} = this.state
        var payload = {username, password}

        var baseUrl = 'http://localhost:5000/'

        Axios.post(baseUrl + 'signin', payload).then(res => {
            if(res.data === 'usererror'){
                return alert('Username not found!')
            }else if(res.data === 'pwerror'){
                return alert('Username and password do not match!')
            }else{
                var cookies = new Cookies();
                cookies.set('token', res.data, { path: '/' });
                return this.props.history.push('home')
            }
        })
    }

    render(){
        return(
            <div className='loginpage'>
            <form onSubmit = {this.login}>

            <label>Username : </label>
            <input type = 'text' name='username' value={this.state.username} placeholder='Insert Username' onChange={this.handleInput}/>
            <br/>

            <label>Password : </label>
            <input type = 'password' name='password' placeholder='Enter Password' onChange={this.handleInput}/>
            <br/>

            <button name='submit'>Login</button>

            <br/><br/>
            <small>Don't have an account? <Link to='/register'>Register</Link></small>

            </form>
            </div>
        )
    }
}

export default Login
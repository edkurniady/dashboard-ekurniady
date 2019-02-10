import React, {Component} from 'react'
import Axios from 'axios'
import {Link} from 'react-router-dom'

class Register extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            username: '',
            password: ''
        }
        this.handleInput = this.handleInput.bind(this)
        this.register = this.register.bind(this)
    }

    handleInput({target}){
        this.setState({
            [target.name]: target.value
        })
    }

    register(event){
        event.preventDefault()
        var {name, email, username, password} = this.state
        var payload = {name, email, username, password}

        var baseUrl = 'http://localhost:5000/'

        Axios.post(baseUrl + 'register', payload).then(res => {
            if(res.data === 'taken'){
                return alert('Username is already taken! Please enter a different one.')
            }else{
                return this.props.history.push('')
            }
        })
    }

    render(){
        return(
            <div className='registerpage'>
            <form onSubmit = {this.register}>

            <label>Name : </label>
            <input type = 'text' name='name' value={this.state.name} placeholder='Insert your fullname' onChange={this.handleInput}/>
            <br/>

            <label>Email : </label>
            <input type = 'email' name='email' value={this.state.email} placeholder='Insert your email' onChange={this.handleInput}/>
            <br/>            

            <label>Username : </label>
            <input type = 'text' name='username' value={this.state.username} placeholder='Insert Username' onChange={this.handleInput}/>
            <br/>

            <label>Password : </label>
            <input type = 'password' name='password' placeholder='Enter Password' onChange={this.handleInput}/>
            <br/>

            <button name='submit'>Register</button>

            <br/><br/>
            <small><Link to='/'>Go Back</Link></small>

            </form>
            </div>
        )
    }
}

export default Register
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom'

class Header extends Component{
    constructor(props){
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
    }

    handleLogOut(event){
        var cookies = new Cookies();
        cookies.remove('token')
        alert('Successful Logout!')
        return this.props.history.push('')
    }

    render(){
        var cookies = new Cookies()
        if(!cookies.get('token')){
            alert('Please signin first!')
            return <Redirect to='/' />
        }

        if(this.props.active==='home'){
            return(
                <div className='headerpage'>
    
                <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <div className='nav-link active'>Home</div>
                </li>
                <li className='nav-item'>
                    <div className='nav-link'><Link to='/yourposts'>Your Posts</Link></div>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='' onClick={this.handleLogOut}>LogOut</a>
                </li>
                </ul>
                
                </div>
            )
        }else if(this.props.active==='yourposts'){
            return(
                <div className='headerpage'>
    
                <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <div className='nav-link' href=''><Link to='/home'>Home</Link></div>
                </li>
                <li className='nav-item'>
                    <div className='nav-link active'>Your Posts</div>
                </li>
                <li className='nav-item'>
                    <a className='nav-link' href='' onClick={this.handleLogOut}>LogOut</a>
                </li>
                </ul>
                
                </div>
            )
        }
    }
}

export default Header
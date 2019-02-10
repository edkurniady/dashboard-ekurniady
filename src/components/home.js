import React, {Component} from 'react'
import Axios from 'axios'

import Header from './header.js'

class Home extends Component{
    constructor(props) {
        super(props)
        this.state = {
          posts: [],
          loaded: false,
          view: false
        }
        this.handleState = this.handleState.bind(this)
        this.handleView = this.handleView.bind(this)
    }
    
    handleState(t){
        var baseUrl = 'http://localhost:5000/'
        var posts = []

        if(this.state.view)
            this.setState({view: false})

        if(t.length>0){
            var payload = {
                name: t
            }

            return Axios.post(baseUrl + 'tags/post/get', payload).then(res => {
                for(var i = 0; i<res.data.length; i++){
                    posts.push(res.data[i])
                }
            }).then(() => {
                return this.setState({
                    posts: posts,
                })
            }).then(()=>{
                this.setState({loaded: true})
            })

        }else{
            return Axios.get(baseUrl + 'home').then(res => {
                for(var i = 0; i<res.data.length; i++){
                    posts.push(res.data[i])
                }
            }).then(() => {
                return this.setState({
                    posts: posts,
                })
            }).then(()=>{
                this.setState({loaded: true})
            })
        }
    }

    handleView(postid){
        var posts = []
        if(postid>0){
            var baseUrl = 'http://localhost:5000/'
            var payload = {
                postid: postid
            }

            return Axios.post(baseUrl + 'post/get', payload).then(res =>{
                return posts.push(res.data)
            }).then(() => {
                return this.setState({
                    view: true,
                    posts: posts,
                })
            })
        }else{
            this.setState({view: false})
            return this.handleState('')
        }
            
    }

    componentDidMount() {
        this.handleState('')
    }

    render(){
        return (
            <div className='homepage'>
            <Header active='home'/>
            {this.state.loaded && this.state.view ? (
                this.state.posts.map(p => {
                    return(
                    <ul style={{'listStyleType':'none'}}>
                        <li><h3>{p.title}</h3></li>
                        <li><small>By {p.creator} | On {p.createdAt.substring(0, 10)} | Last Updated {p.updatedAt.substring(0, 10)}</small></li>
                        <li><h5>{p.content}</h5></li>
                        <li>{p.tags.map(t => {
                            return(
                                <ul style={{'listStyleType':'none', 'display':'inline-block', 'padding': '5px'}}>
                                    <small><li>{t}</li></small>
                                </ul>
                            )
                        })}</li>
                    </ul>
                    )    
                })
            ):(
                this.state.loaded && 
                this.state.posts.map(p => {
                    return(
                    <ul style={{'listStyleType':'none'}}>
                        <li><h3 style={{'color': 'blue'}}><div onClick = {() => this.handleView(p.id)}>{p.title}</div></h3></li>
                        <li><small>By {p.creator} . {p.createdAt.substring(0, 10)}</small></li>
                        <li><h5>{p.content.substring(0, 10)}...</h5></li>
                        <li>{p.tags.map(t => {
                            return(
                                <ul style={{'listStyleType':'none', 'display':'inline-block', 'padding': '5px'}}>
                                    <small><li><button onClick = {() => this.handleState(t)}>{t}</button></li></small>
                                </ul>
                            )
                        })}</li>
                    </ul>
                    )    
                })
            )}
            <button onClick = {() => this.handleState('')}>Reset</button>
            </div>
        )
    }
}

export default Home
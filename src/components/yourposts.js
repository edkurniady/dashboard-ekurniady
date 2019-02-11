import React, {Component} from 'react'
import Axios from 'axios'
import Cookies from 'universal-cookie'

import Header from './header.js'

class YourPosts extends Component{
    constructor(props){
        super(props)
        this.state = {
            posts: [],
            title: '',
            content: '',
            tags: '',
            loaded: false,
            update: false
        }
        this.handleView = this.handleView.bind(this)
        this.handleCRUD = this.handleCRUD.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    handleInput({target}){
        this.setState({
            [target.name]: target.value
        })
    }

    handleView(view, value){
        var baseUrl = 'http://localhost:5000/'

        if(view==='initial'){
            var cookies = new Cookies();
            var payload = {
                token: cookies.get('token')
            }
            var posts = []
            return Axios.post(baseUrl + 'yourposts', payload).then(res => {
                for(var i = 0; i<res.data.length; i++){
                    posts.push(res.data[i])
                }
            }).then(() => {
                return this.setState({
                    posts: posts,
                })
            }).then(()=>{
                this.setState({loaded: true, update:false})
            })

        }else if(view==='create'){
            this.setState({loaded: false})

        }else if(view==='update'){
            var payload = {
                postid: value
            }
            return Axios.post(baseUrl + 'post/get', payload).then(post=>{
                var tags = ''
                for(var i = 0; i<post.data.tags.length; i++){
                    tags+=post.data.tags[i]
                    if(i!==post.data.tags.length-1)
                        tags+='#'
                }
                return this.setState({
                    update: true,
                    title: post.data.title,
                    content: post.data.content,
                    tags: tags
                })
            })

        }else{
            var payload = {
                postid: value
            }
            return Axios.post(baseUrl + 'post/delete', payload).then(() => {
                return this.setState({
                    loaded: false
                })
            }).then(() => {
                return this.handleView('initial', 0)
            })
        }
    }

    handleCRUD(ops){
        var baseUrl = 'http://localhost:5000/'
        var tags = this.state.tags.split('#')

        if(ops==='create'){
            var cookies = new Cookies()
            var payload = {
                token: cookies.get('token'),
                title: this.state.title,
                content: this.state.content,
                tags: tags
            }
            return Axios.post(baseUrl + 'post/create', payload).then(() => {
                return this.handleView('initial', 0)
            })

        }else if(ops==='update'){
            var payload = {
                postid: this.state.posts[0].id,
                title: this.state.title,
                content: this.state.content,
                tags: tags
            }
            return Axios.put(baseUrl + 'post/update', payload).then(() => {
                return this.handleView('initial', 0)
            })
        }
    }

    componentDidMount(){
        this.handleView('initial', 0)
    }

    render(){
        return (
            <div className='yourpostspage'>
            <Header active='yourposts'/>


            {this.state.loaded ? (
                this.state.update ? (
                    <form onSubmit = {() => this.handleCRUD('update')}>
                    <h1>Update Post</h1>
                    <label>Title : </label>
                    <input type = 'text' name='title' value={this.state.title} placeholder='Insert Title' onChange={this.handleInput}/>
                    <br/>

                    <label>Content : </label>
                    <textarea name='content' value={this.state.content} placeholder='What is on your mind?' onChange={this.handleInput}/>
                    <br/>

                    <label>Tags : </label>
                    <input type = 'text' name='tags' value={this.state.tags} placeholder='tag1#tag2#...#tagn' onChange={this.handleInput}/>

                    <br/>
                    <button name='submit'>Update!</button>

                    </form>
                ) : (
                    this.state.posts.map(p => {
                        return(
                        <div className="yourpostslist">
                            <ul style={{'listStyleType':'none'}}>
                                <li><h3>{p.title}</h3></li>
                                <li><small>By {p.creator} . {p.createdAt.substring(0, 10)}</small></li>
                                <li><h5>{p.content.substring(0, 10)}...</h5></li>
                                <li>{p.tags.map(t => {
                                    return(
                                        <ul style={{'listStyleType':'none', 'display':'inline-block', 'padding': '5px'}}>
                                            <small><li>{t}</li></small>
                                        </ul>
                                    )
                                })}</li>
                                <button onClick = {() => this.handleView('update', p.id)}>Update</button>
                                <button onClick = {() => this.handleView('delete', p.id)}>Delete</button>
                            </ul>
                        </div>
                        )    
                    })
                )
            ) : (
                <form onSubmit = {() => this.handleCRUD('create')}>
                <h1>Create Post</h1>
                <label>Title : </label>
                <input type = 'text' name='title' value={this.state.title} placeholder='Insert Title' onChange={this.handleInput}/>
                <br/>

                <label>Content : </label>
                <textarea name='content' value={this.state.content} placeholder='What is on your mind?' onChange={this.handleInput}/>
                <br/>

                <label>Tags : </label>
                <input type = 'text' name='tags' value={this.state.tags} placeholder='tag1#tag2#...#tagn' onChange={this.handleInput}/>

                <br/>
                <button name='submit'>Post!</button>

                </form>
            )}
            <br/><br/>
            
            {this.state.loaded && !this.state.update ? (   
               <button onClick = {() => this.handleView('create', 0)}>Write New Post</button> 
            ) : (<br></br>)}
            
            </div>
        )        
    }
}

export default YourPosts
import React, { Component } from 'react';
import '../../assets/css/search.css'
class Search extends Component {
    constructor(){
        super()
        this.state = {
            hotList: [],
            val: "",
            getList: [],
            flag: true
        }
    }
    componentDidMount(){
        this.$http.get('/search/hot').then(res => {
            this.setState({
                hotList: res.data.result.hots
            })
        })
    }
    show(item){
        this.setState({
            val: item.first,
        })
    
    }
    change(e){
        if(!e.target.value){
            this.setState({
                val: e.target.value,
                flag: true
            })
        }
        else{
            this.setState({
                val: e.target.value,
                flag: false
            })
        }
    }
    keyDown(e){
        if (e.keyCode === 13) {
           this.getSong()
        }
    }
    getSong() {
        this.$http.get('/search?keywords='+ this.state.val).then(res => {
            console.log(res);
            this.setState({
                getList: res.data.result.songs
            })
        })
    }
    play(id){
        this.props.history.push('/play?id='+ id)
    }
    render() {
        let {hotList,val,getList,flag} = this.state        
        return (
            <div className="search">
                <div className="inp">
                    <input type="text" placeholder="搜索歌曲、歌手、专辑" value={val} onChange={this.change.bind(this)} onKeyDown={this.keyDown.bind(this)}/>
                </div>
                {
                    flag&&<div className="main">
                            <p>热门音乐</p>
                            <ul>
                                {
                                    hotList.map((item,index) => {
                                        return (
                                            <li key={index} onClick={this.show.bind(this,item)}>{item.first}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                }
                <div>
                    <ul className="newsong">
                        {
                            getList.map((item,index) => {
                                return (
                                    <li key={index} onClick={this.play.bind(this,item.id)}>
                                        <p>{item.name}</p>
                                        <p>
                                            {
                                                item.artists.map((val,i)=>{
                                                    return val.name
                                                }).join(' / ')
                                            }
                                            - <span>{item.name}</span>
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Search;
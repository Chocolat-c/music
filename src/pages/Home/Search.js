import React, { Component } from 'react';
import '../../assets/css/search.css'
class Search extends Component {
    constructor(){
        super()
        this.state = {
            hotList: [],
            val: "",
            getList: []
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
            val: item.first
        })
    }
    change(e){
        this.setState({
            val: e.target.value
        })
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
                getList: res.data.result.song
            })
        })
    }
    render() {
        let {hotList,val,getList} = this.state
        return (
            <div className="search">
                <div className="inp">
                    <input type="text" placeholder="搜索歌曲、歌手、专辑" value={val} onChange={this.change.bind(this)} onKeyDown={this.keyDown.bind(this)}/>
                </div>
                <div className="main">
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
                <div>
                    <ul>
                        {
                            // getList.map((item,index) => {
                            //     return (
                            //         <li>
                            //             <p></p>
                            //         </li>
                            //     )
                            // })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Search;
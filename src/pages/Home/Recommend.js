import React, { Component } from 'react';
import '../../assets/css/recommend.css'
class Recommend extends Component {
    constructor(){
        super()
        this.state = {
            songList: [],
            newsong: [],
        }
    }
    componentDidMount(){
        this.$http.get('/personalized?limit=6').then(res => {
            this.setState({
                songList: res.data.result
            })
        })
        this.$http.get('/personalized/newsong').then(res => {
            this.setState({
                newsong: res.data.result
            })
        })
        
    }
    play(id){
        this.props.history.push('/play?id='+ id)
    }
    render() {
        let {songList,newsong} = this.state
        return (
            <div className='recommend'>
                <h3>推荐歌单</h3>
                <ul className='remd_song'>
                    {
                        songList.map((item,index) => {
                            return (
                                <li key={index}>
                                    <div>
                                        <img src={item.picUrl}/>
                                    </div>
                                    <p>{item.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3>最新音乐</h3>
                <ul className="newsong">
                    {
                        newsong.map((item,index) => {
                            return (
                                <li key={index} onClick={this.play.bind(this,item.id)}>
                                    <p>{item.name}</p>
                                    <p>
                                        {
                                            item.song.artists.map((val,i)=>{
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
        );
    }
}

export default Recommend;
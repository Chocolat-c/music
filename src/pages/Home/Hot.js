import React, { Component } from 'react';
import '../../assets/css/hot.css'
import BScroll from "better-scroll"
class Hot extends Component {
    constructor(){
        super()
        this.state = {
            playlist: {},
            tracks:[],
            num: 1,
            end: 30
        }
    }
    componentDidMount(){
        let bs = new BScroll(".songList",{
            probeType: 2,
            click: true
        })
        bs.on("scroll",function(){
            console.log(1111);
        })
        this.$http.get('/top/list?idx=1').then(res => {
            this.setState({
                playlist: res.data.playlist,
                tracks: res.data.playlist.tracks
            })
        })
    }
    play(id){
        this.props.history.push('/play?id='+ id)
    }
    render() {
        let {playlist,tracks,num,end} = this.state
        return (
            <div className="hot">
                <div className="cover">
                    {
                        <img src={playlist.coverImgUrl} alt=""/>
                    }
                    <div className="songList">
                        <ul>
                            {
                                tracks.splice(0,end).map((item,index) => {
                                    return (
                                        <li key={index} onClick={this.play.bind(this,item.id)}>
                                            <div className="left">{num < 10 ? '0' + num++ : num ++}</div>
                                            <div className="right">
                                                <p>
                                                    <span>{item.name}</span>
                                                    <span>{item.alia.length > 0 ? "(" + item.alia[0] + ")" : ""}</span>
                                                </p>
                                                <p>
                                                    {
                                                        item.ar.map((val,i) => {
                                                            return <span key={i}>{val.name}-{item.name}</span>
                                                        })
                                                    }
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Hot;
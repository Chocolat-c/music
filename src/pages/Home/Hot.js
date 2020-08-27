import React, { Component } from 'react';
import '../../assets/css/hot.css'
class Hot extends Component {
    constructor(){
        super()
        this.state = {
            playlist: {},
            tracks:[],
            num: 1
        }
    }
    componentDidMount(){
        this.$http.get('/top/list?idx=1').then(res => {
            console.log(res);
            this.setState({
                playlist: res.data.playlist,
                tracks: res.data.playlist.tracks
            })
        })
    }
    render() {
        let {playlist,tracks,num} = this.state
        console.log(playlist.tracks);
        return (
            <div className="hot">
                <div className="cover">
                    {
                        <img src={playlist.coverImgUrl} alt=""/>
                    }
                    <ul>
                        {
                            tracks.map((item,index) => {
                                return (
                                    <li key={index}>
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
        );
    }
}

export default Hot;
import React, { Component } from 'react';
import qs from 'querystring'
import '../../assets/css/play.styl'

class Play extends Component {
    constructor(){
        super()
        this.state = {
            picUrl: '',
            url: "",
            bgstyle: {},
            gcArr: [], //歌词列表
            timeArr: [],
            ind: 0,
            flag: true, //播放图标显示
            top: ''
        }
    }
    componentDidMount(){
        let str = this.props.history.location.search.slice(1);
        let obj = qs.parse(str);
        let id = obj.id;
        this.$http.get('/song/detail?ids=' + id).then(res => {
            this.setState({
                picUrl: res.data.songs[0].al.picUrl,
                bgstyle: {
                    background: `url(${res.data.songs[0].al.picUrl}) no-repeat center center`,
                    transform: "scale(1.5)",
                    filter: "blur(20px)"
                }
            })
        })
        this.$http.get('/song/url?id=' + id).then(res => {
            this.setState({
                url: res.data.data[0].url
            })
        })
        this.$http.get('/lyric?id=' + id).then(res => {
            let arr = res.data.lrc.lyric.split(/\n/);
            let timeArr = [];
            let gcArr = [];
            arr.forEach(item => {
                let a = item.split("]");
                if(a[1]){
                    gcArr.push(a[1])
                    let str = a[0].slice(1)
                    timeArr.push(this.format(str)) 
                } 
            })
            console.log(gcArr);
            console.log(timeArr);
            this.setState({
                gcArr: gcArr,
                timeArr: timeArr
            })
        })
    }
    format(str){
        let b =  str.split(":");
        return parseInt(b[0]) * 60 + parseFloat(b[1])
    }
    play(){
        if(this.audio.paused){
            this.audio.play()            
            this.setState({
                flag: false
            })
        }
        else{
            this.audio.pause()
            this.setState({
                flag: true
            })
        }
    }
    update(){
        console.log(this.audio.currentTime);
        let curTime = this.audio.currentTime;
        let i = this.state.timeArr.findIndex((item,index) => {
            return item >= curTime && item < this.state.timeArr[index+1]
        })
        if(i == -1){
            i = 0;
        }
        let top = -i * 0.3 + "rem"
        this.setState({
            top: top,
            ind: i
        })
        console.log(this.state.top);
        
    }
    render() {        
        let {picUrl,bgstyle,gcArr,ind,url,flag,top} = this.state
        return (
            <div className="play">
                <div className="bg" style={bgstyle}></div>
                <div className="changbi"></div>
                <div className={flag ? "stop changquan" : "changquan"} onClick={this.play.bind(this)}>
                    <div className="pic">
                        <img src={picUrl} alt=""/>
                    </div>
                </div>
                {flag&& <i className="iconfont icon-zanting" onClick={this.play.bind(this)}></i>}
                <div className="lyric">
                    <ul style={{"marginTop": top}}>
                        {
                            gcArr.map((item,index) => {
                                return <li key={index} className={ index == ind ? 'active' : ''}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <audio onTimeUpdate={this.update.bind(this)} ref={ (el) => this.audio = el } src={url}></audio>
            </div>
        );
    }
}

export default Play;
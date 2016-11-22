import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserByName } from '../../actions/topicActions';
import { Link } from 'react-router';
import { fromNow } from '../../helpers/dateTimeHelper';

/**
 * 公共的脚部分
 */
export class FooterComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            /*
            <footer data-flex-box="0">
                <ul data-flex="dir:left; box:mean">
                    <li><a href="javascript:;">(待开发)</a></li>
                </ul>
            </footer>
            */
            <div />
        );
    }
}

/**
 * 回复时间组件
 */
export class ReplyTimeComponent extends Component {
    constructor(props) {
        super(props);
        this.getReplyDateAsString = () => {
            let { replyTime } = this.props;
            return fromNow(replyTime);
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.replyTime !== this.props.replyTime;
    }
    render() {
        return (<span className="time">{this.getReplyDateAsString() }</span>);
    }
}

/**
 * 用户头像组件
 */
export class UserPictureComponent extends Component {
    constructor(props) {
        super(props);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.avatar_url !== this.props.avatar_url;
    }

    headleClick(loginname) {
        console.log(loginname);
    }

    render() {
        let {avatar_url, loginname} = this.props.user;
        return (
            <a href="javascript:;" className="userLink" onClick={this.headleClick.bind(this, loginname)}>
                <div style={{ backgroundImage: `url(${avatar_url})` }} ></div>
            </a>
        );
    }
}

/**
 * 正在加载组件
 */
export class LoadingComponent extends Component {
    render() {
        return (
            <div className="fetching"></div>
        )
    }
}

export default connect(root => root.userReducer)(UserPictureComponent);
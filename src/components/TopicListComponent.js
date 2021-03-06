import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FooterComponent ,ReplyTimeComponent, UserPictureComponent} from './common/CommComponents';
import { getTopics } from '../actions/topicActions';
import { Link } from 'react-router';
import { getTabs, getTabName } from '../helpers/tabHelper';
/**
 * 文章列表
 */
class TopicListComponent extends Component {
    constructor(props) {
        super(props);
        //监听滚动条是否已经到达底部
        this.handScroll = ({ target: { scrollHeight, scrollTop, clientHeight}}) => {
            //如果到达底部则执行加载下一页的操作
            if (scrollTop + clientHeight >= scrollHeight) {
                let {dispatch, page, tab} = this.props;
                dispatch(getTopics(page + 1, tab));
            }
        }
    }

    /**
     * 第一次加载时判断是否需要去重新获取数据，因为有可能是从文章详情中返回的
     * 如果是从文章详情页中返回的则不需要重新请求，直接生成即可
     */
    componentWillMount() {
        let {dispatch, shouldFetch} = this.props;
        if (shouldFetch) {
            dispatch(getTopics(1));
        }
    }

    render() {
        let children;
        if (this.props.isFetching && this.props.page === 1) {
            children = (<div className="fetching"></div>);
        } else {
            let items = this.props.list.map((item, index) => {
                return <TopicItemComponent key={index} {...item} currentTab={this.props.tab}/>
            });
            children = (
                <ul data-flex="dir:top main:justify" className="topic-list">
                    {items}
                </ul>
            );
        }
        return (
            <div data-flex="dir:top main:justify" data-flex-box="1">
                <TopicListHeaderComponent {...this.props} />
                <div data-flex-box="1" className="contentWarpper" onScroll={e => this.handScroll(e) }>
                    {children}
                </div>
                <FooterComponent />
            </div>
        );
    }

    /**
     * 组件已经挂载完毕，此时可以进行DOM操作
     * 在此判断如果当前没有进行数据请求，则说明是从文章详情返回的，那么此时需要将滚动条恢复到上次停留的地方
     */
    componentDidMount() {
        let {shouldFetch} = this.props;
        if (!shouldFetch) {
            document.getElementsByClassName('contentWarpper')[0].scrollTop = parseInt(window.localStorage["topicListScrollHeight"]) || 0;
        }
    }
}

/**
 * 文章列表的头部
 */
export class TopicListHeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.handClick = (tab) => {
            if (tab !== this.props.tab) {
                let {dispatch} = this.props;
                dispatch(getTopics(1, tab));
                // document.getElementsByTagName('body')[0].scrollTop = 0; //
            }
        }
    }

    /**
     * 判断组件是否需要重新加载，以提升性能
     */
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.tab !== nextProps.tab;//防止重复render
    }

    render() {
        let tabs = getTabs();
        let children = tabs.map(({ key, name}, index) => {
            return (<li key={index} className={this.props.tab == key ? 'currentTab' : ''}><a href="javascript:;" onClick={e => this.handClick(key) } >{name}</a></li>);
        })
        return (
            <header data-flex="dir:left; " data-flex-box="0">
                <ul data-flex="dir:left box:mean">
                    {children}
                </ul>

            </header>
        );
    }
}

/**
 * 文章列表项组件
 */
export class TopicItemComponent extends Component {
    constructor(props) {
        super(props);
        this.getTabName = () => {
            let { top, good, tab, currentTab} = this.props;
            if (top) {
                return '置顶';
            } else if (good) {
                return '精华';
            } else {
                switch (tab) {
                    case 'good': return '精华';
                    case 'share': return '分享';
                    case 'ask': return '问答';
                    case 'job': return '招聘';
                }
            }
        }
    }

    render() {
        let { id, top, tab, good, title, currentTab, visit_count, reply_count, last_reply_at, author} = this.props;
        let tabElement;
        if (currentTab == 'all' || top || good) {
            tabElement = <span className={ top || good || tab === currentTab ? 'green' : 'normal'}>{this.getTabName()}</span>;
        }
        return (
            <li>
                <UserPictureComponent user={ author } />
                { tabElement }
                <Link title={ title } to={ `/topic/${tab}/${id}` }>{ title }</Link>
                <span className="count">
                    <span>{ reply_count }</span><span>/</span><span>{ visit_count }</span>
                </span>
                <ReplyTimeComponent replyTime={ last_reply_at } />
            </li>
        );
    }
}

export default connect(root => root.topicListReducer)(TopicListComponent);
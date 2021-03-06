import keyMirror from 'fbjs/lib/keyMirror';


export const actionTypes = keyMirror({
    GET_TOPIC_LISTS_FETCHING: null,//正在加载，（网络请求）
    GET_TOPIC_LISTS_FIRST_COMPLETED: null,//加载列表的首页完毕
    GET_TOPIC_LISTS_COMPLETED: null,//加载列表的其他页完毕
    GO_BACK_TOPIC_LIST: null, //回退
    GET_TOPIC_BYID_FETCHING: null,//正在根据ID加载，（网络请求）
    GET_TOPIC_BYID_COMPLETED: null,//根据ID加载topic完毕
    GET_TOPIC_BYNAME_FETCHING: null,//正在根据用户名加载，（网络请求）
    GET_TOPIC_BYNAME_COMPLETED: null//根据用户名加载完毕
});
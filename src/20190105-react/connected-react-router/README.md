## connected
- 连接
- 连接的redux和路由
### 

1.让我们可以通过派发动作的方式进行跳转路径
2.让我们可以把当前的路径信息存放到仓库中去以便随时获取

1.是不是 一个监听 push 方法，然后调用history跳转路径
push 生成一个非常特殊的action，然后被派发给仓库
routerMiddleware 负责监听这个action,然后跳到指定路径

2.一个监听 location 的原生路由改变，然后把信息存入 reducer
ConnectedRouter
connectRouter

push -> middleware -> history -> historylisten -> store -> components

1.派发push
2.在middleware里面调用history.push跳路径 
3.路径改变之后会让history.listen监听函数执行
4.监听函数里面会dispatch({type:'location_change'})
5.store的connect-reducer会收到这个动作，保存状态到仓库
6.保存完了以后，会刷新connect仓库的组件



1.组件里调用go方法 
2. go方法会返回一个action {type:'CALL_HISTORY_METHOD',payload:{method:'push',args:[
    { pathname: '/counter?id=1', state={ from: '/' } }
]}}
3.因为在home组件是经过connect绑定了，所以会自动向仓库派发此action
4.routerMiddleware能首先收到action,判断如果是CALL_HISTORY_METHOD的话。就会调用
history对象跳转路径.
5.路径改变后，最外层组件路由组件会开始刷新
6.然后我们的props.history.listen监听函数会执行。会派发一个LOCATION_CHANGE的动作
7.connectRouter会把收到的payload放到仓库中去
8.仓库状态发生改变了，状态改变后会让connect过的组件进行更新


import React, { useContext, useState, useEffect } from 'react';
import ReactReduxContext from './Context';
import { bindActionCreators } from '../redux'
/**
 * 这个用的高阶组件
 * 1.从上下文中获取到Context {store}
 * 2.从store.getState()=>mapStateToProps=>对象成为OldComponent的属性对象
 * 3.负责订阅store状态变化事件，当仓库状态发生改变之后，要刷新当组件以及 OldComponent
 * 4.把actions进行绑定，然后把绑定后的结果boundActions作为属性对象传递给OldComponent
 * @param {*} mapStateToProps 把仓库中的状态映射为组件属性对象
 * @param {*} mapDispatchToProps 把dispatch方法映射组件属性对象 
 */
//useRef useEffect
export default function (mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return function (props) {//这是返回那个React组件ConnectedCounter1
            let context = useContext(ReactReduxContext);//context.store
            let [state, setState] = useState(mapStateToProps(context.store.getState()));
            //useState的参数可以是一个函数，都行惰性初始化
            let [boundActions] = useState(() => bindActionCreators(mapDispatchToProps, context.store.dispatch));
            useEffect(() => {
                console.log('useEffect');
                //mapDispatchToProps = bindActionCreators(mapDispatchToProps, context.store.dispatch);
                return context.store.subscribe(() => {
                    setState(mapStateToProps(context.store.getState()));
                });
            }, []);
            console.log('render');
            //let boundActions = bindActionCreators(mapDispatchToProps, context.store.dispatch);
            return <OldComponent {...state} {...boundActions} />
        }
    }
}
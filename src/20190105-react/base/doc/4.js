import React from 'react';
import ReactDOM from 'react-dom';
/**
 * 元素的更新
 * 默认情况下React是不可变的，如果说一个元素创建了，我们不会去修改它
 * 如果界面需修改，我们需要创建一个新的元素,渲染新的元素
 */

function tick() {

}

//React元素的属性是不可以改的,如果要修改，需要每次都创建一个新的 element
setInterval(() => {
    //Cannot assign to read only property 'children' of object
    //console.log('element.props', element.props);
    //element.props.children = new Date().toLocaleString();
    let element = <div>{new Date().toLocaleString()}</div>;
    /**
     *  Object.freeze(element.props);属性对象也不可能修改
        Object.freeze(element);//元素本身不可以修改
     */
    ReactDOM.render(
        element
        , document.getElementById('root'));
}, 1000);

function freeze(obj) {
    //原理就是把属性的writable=false
}
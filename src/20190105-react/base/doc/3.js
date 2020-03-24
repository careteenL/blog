import React from 'react';
import ReactDOM from 'react-dom';
/* let element = (
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
    </div>
) */
let spans = [
    <span>1</span>,//{type:'span',props:{children:'1'}}
    <span>2</span>, ,//{type:'span',props:{children:'2'}}
    <span>3</span>,//{type:'span',props:{children:'3'}}
]
/* let divs = spans.map(item => (
    <div>
        {item}
    </div>
)); */
function map(children, fn) {
    return children.map(fn);
}
//let divs = React.Children.map(spans, (item, index) => <div key={index}>{item}</div>);
let divs = map(spans, (item, index) => <div key={index}>{item}</div>);
//console.log(element);
//console.log(element.props.children);//是一个数组
ReactDOM.render(
    <div>{divs}</div>
    , document.getElementById('root'));
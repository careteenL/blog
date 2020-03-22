import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';//现在组件属性校验器已经变成了一个独立的模块
/**
 *  属性校验
 * 1. 为什么需要属性校验
 * 
 */
class Person extends React.Component {
    static defaultProps = {
        gender: 'male'
    }
    static propTypes = {
        //age: PropTypes.number.isRequired,
        gender: PropTypes.oneOf(['male', 'female']).isRequired,
        hobby: PropTypes.arrayOf(PropTypes.string).isRequired,
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        }),
        age: function (props, propName, componentName) {
            if (props.age < 18) {
                throw new Error('你还未成年');
            }
        }
    }
    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <td>age</td>
                        <td>gender</td>
                        <td>hobby</td>
                        <td>position</td>
                        <td>friends</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{this.props.age}</td>
                        <td>{this.props.gender}</td>
                        <td>hobby</td>
                        <td>position</td>
                        <td>friends</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}
let personProps = {
    age: 10,//年龄
    //gender: 'male',//性别 male female
    hobby: ['basketball', 'football'],//爱好
    position: { x: 10, y: 10 },//地理坐标
    friends: [{ name: 'zhangsan', age: 10 }, { name: 'lisi', age: -20 }]
}
ReactDOM.render(<Person {...personProps} />, document.getElementById('root'));
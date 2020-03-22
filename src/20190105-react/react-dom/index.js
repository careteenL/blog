/**
 * 
 * @param {*} element React节点 因为它可以React元素，也可以是数字 字符串
 * @param {*} parent  父容器，它是一个真实DOM元素 
 */
function render(node, parent) {
    if (typeof node === 'string') {
        return parent.appendChild(document.createTextNode(node));
    }
    let type, props, ref;
    type = node.type;//h1 Function ClassComponent
    ref = node.ref;
    ref = { current: null };
    props = node.props;//props.children
    if (type.isReactComponent) {
        let element = new type(props).render();
        type = element.type;
        props = element.props;
        if (typeof element.type == 'function') {
            return render(element, parent);
        }
    } else if (typeof type === 'function') {
        let element = type(props);
        type = element.type;
        props = element.props;
        if (typeof element.type == 'function') {
            return render(element, parent);
        }
    }
    let domElement = document.createElement(type);//创建h1的真实DOM元素
    ref.current = domElement;
    //迭代属性对象中的所有的属性
    for (let propName in props) {
        if (propName == 'children') {
            let children = props.children;//可能是一个对象，也可以是一个数组
            if (Array.isArray(children)) {//如果不是数组，要转成数组
                children.forEach(child => render(child, domElement));
            } else {
                render(children, domElement)
            }
        } else if (propName === 'className') {
            domElement.className = props.className;
        } else if (propName === 'style') {//值就是一个行内的样式对象
            let styleObject = props.style;//{ color: 'red', backgroundColor: 'yellow' }
            /*  for (let attr in styleObject) {
                 domElement.style[attr] = styleObject[attr];
             } */
            let cssText = Object.keys(styleObject).map(attr => {
                return `${attr.replace(/(A-Z)/g, () => {
                    return '-' + arguments[1].toLowerCase()
                })}:${styleObject[attr]}`;
            }).join(';');
            domElement.style.cssText = cssText;
        } else {
            domElement.setAttribute(propName, props[propName]);
        }
    }
    parent.appendChild(domElement);
}


export default {
    render
}
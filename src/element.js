export function Element (type, props, children) {
  this.type = type
  this.props = props
  this.children = children
}

//给节点设置属性
export const setAttr = (node, key, value) => {
  switch (key) {
    case "value":
      if (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA') {
        node.value = value
      } else {
        node.setAttribute(key, value)
      }
      break;
    case "style":
      node.style.cssText = value
      break;
    default:
      node.setAttribute(key, value)
      break;
  }
}

//创建虚拟dom
export const createElement = (...args) => new Element(...args)

//将虚拟dom转化成真实dom
export const render = eleObj => {
  const ele = document.createElement(eleObj.type)
  for (let key in eleObj.props) {
    setAttr(ele, key, eleObj.props[key])
  }
  eleObj.children.forEach(child => {
    child = (child instanceof Element) ? render(child) : document.createTextNode(child)
    ele.appendChild(child)
  })
  return ele
}

//将真实dom渲染到指定真实节点上
export const renderDOM = (ele, node) => {
  node.appendChild(ele)
}



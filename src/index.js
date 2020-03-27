import {
  createElement,
  render,
  renderDOM
} from './element'

import { diff } from './diff'
import doPatch from './patch.js'

const VirtualDom1 = createElement('ul', { class: 'list-group' },
[
  createElement('li', {}, ['a']),
  createElement('li', {}, ['b']),
  createElement('li', {}, ['c']),
])

const VirtualDom2 = createElement('ul', { class: 'list' },
[
  createElement('li', {}, ['a']),
  createElement('div', {}, ['b']),
  createElement('li', {}, ['c']),
])

//第一次渲染，将虚拟dom转化为真实dom
const ele = render(VirtualDom1)
//真实dom插入到指定根节点下
renderDOM(ele, document.getElementById('root'))

const rerender = () => {
  //比对前后两个虚拟DOM的差异，得到patches差异对象
  const patches = diff(VirtualDom1, VirtualDom2)
  console.log(patches)
  //根据差异对象patches
  doPatch(ele, patches)
}

const btn = document.getElementById('btn')
btn.addEventListener('click', rerender)





//dom diff作用 根据前后生成的虚拟dom对象对比生成区别对象，再进行渲染

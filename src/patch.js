import {
  ATTRS,
  REMOVE,
  REPLACE,
  TEXT
} from './const'
import {
  setAttr,
  render,
  Element
} from './element'

let allPatches
let index = 0
export default function patch(node, patches) {
  //给元素打补丁
  allPatches = patches
  walk(node)
}

function walk (node) {
  const currentPatch = allPatches[index++]
  const childList = node.childNodes
  childList.forEach(child => walk(child))
  if (currentPatch && currentPatch.length > 0) {
    doPatch(node, currentPatch)
  }
}

function doPatch (node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case ATTRS:
        for (let key in patch.props) {
          const value = patch.props[key]
          if (value) {
            setAttr(node, key, value)
          } else {
            node.removeAttribute(key)
          }
        }
        break;
      case TEXT:
        node.textContent = patch.text
        break;
      case REMOVE:
        node.parentNode.removeChild(node)
        break;
      case REPLACE:
        let newNode = (patch.newNode instanceof Element) ? render(patch.newNode) : document.createTextNode(patch.newNode)
        node.parentNode.replaceChild(newNode, node)
        break;
      default:
        break;
    }
  })
}
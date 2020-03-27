import {
  ATTRS,
  TEXT,
  REMOVE,
  REPLACE
} from './const'

let Index = 0
function diffChildren (oldChildren, newChildren, patches) {
  oldChildren.forEach((child, idx) => {
    recursion(child, newChildren[idx], ++Index, patches)
  })
}

function diffAttr (oldAttrs, newAttrs) {
  let patch = {}
  for (let key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      patch[key] = newAttrs[key]
    }
  }
  for (let key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      patch[key] = newAttrs[key]
    }
  }
  return patch
}

function isString (node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

function recursion (oldNode, newNode, index, patches) {
  const currentPatch = []
  //判断当前节点是否是字符串
  if (!newNode) {
    currentPatch.push({ type: REMOVE, index })
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode !== newNode) {
      currentPatch.push({ type: TEXT, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
      let attrs = diffAttr(oldNode.props, newNode.props)
      if (Object.keys(attrs).length > 0) {
        currentPatch.push({ type: ATTRS, attrs })
      }
      diffChildren(oldNode.children, newNode.children, patches)
  } else {
    currentPatch.push({ type: REPLACE, newNode })
  }
  if (currentPatch.length > 0) {
    patches[index] = currentPatch
  }
}

export function diff (oldTree, newTree) {
  const patches = {}
  let index = 0
  recursion(oldTree, newTree, index, patches)
  return patches
}
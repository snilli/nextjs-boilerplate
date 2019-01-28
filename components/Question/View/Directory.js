import PropTypes from 'prop-types'
import React from 'react'
import { Tree } from 'antd'

const { TreeNode } = Tree
const { DirectoryTree } = Tree

const buildTree = (data) =>
  data.map((item) => {
    const { title, id, children, sheet } = item
    if (children) {
      return (
        <TreeNode key={id} title={title} isLeaf={sheet}>
          {buildTree(children)}
        </TreeNode>
      )
    }
    return <TreeNode key={id} title={title} isLeaf={sheet} />
  })

const Directory = ({ genData, handleSelectTreeNode, nodeSelect }) => {
  const treeNodeCtx = buildTree(genData)

  return (
    <DirectoryTree
      onSelect={handleSelectTreeNode}
      defaultSelectedKeys={[nodeSelect.id.toString()]}
      defaultExpandedKeys={[nodeSelect.id.toString()]}
    >
      {treeNodeCtx}
    </DirectoryTree>
  )
}

Directory.propTypes = {
  genData: PropTypes.instanceOf(Array).isRequired,
  handleSelectTreeNode: PropTypes.func.isRequired,
  nodeSelect: PropTypes.shape({}).isRequired,
}

export default Directory

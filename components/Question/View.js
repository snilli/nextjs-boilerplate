import { Button, Tree, Card, Popover } from 'antd'
import arrayToTree from 'array-to-tree'
import React from 'react'
import ModelForm from './ModalForm'

const dataMock = require('./mockTree.json')

const { TreeNode } = Tree
const { DirectoryTree } = Tree

const gridStyle = {
  width: '25%',
}
const gridStyle1 = {
  width: '75%',
}

const buildTree = (data) => {
  const root = [
    {
      id: 0,
      title: 'root',
      sheet: false,
      children: [],
    },
  ]

  const tree = arrayToTree(data)

  root[0].children.push(...tree)
  return root
}

class Demo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      treeData: dataMock,
      genData: buildTree(dataMock),
      nodeSelect: 0,
      visible: {
        folder: false,
        sheet: false,
        info: false,
      },
    }
    this.showModal = this.showModal.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  handleSelectTreeNode = (selectedKeys, info) => {
    // console.log(info.node.isLeaf())
    const { treeData } = this.state
    const [id] = selectedKeys.map((item) => parseInt(item, 10))
    const data = treeData.filter((item) => item.id === id)

    if (data.length > 0) {
      this.setState({
        nodeSelect: data[0],
      })
    }
  }

  handleClickInfo = (visible) => {
    const { nodeSelect } = this.state
    if (nodeSelect.id === 0) {
      return
    }

    this.setState({
      visible: {
        info: visible,
      },
    })
  }

  showModal = (e) => {
    const { id } = e.target
    this.setState({ visible: { [id]: true, info: false } })
  }

  setVisible = () => {
    this.setState({ visible: { info: true, folder: false, sheet: false } })
  }

  handleCancel = () => {
    this.setVisible()
  }

  // handle sumbit modal form
  handleCreateFolder = () => {
    const { folderForm } = this
    folderForm.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Folder: ', values)
      folderForm.resetFields()
      this.setVisible()
    })
  }

  handleCreateSheet = () => {
    const { sheetForm } = this
    sheetForm.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Sheet: ', values)
      sheetForm.resetFields()
      this.setVisible()
    })
  }

  // create modal form each menu
  saveFolderFormRef = (form) => {
    this.folderForm = form
  }

  saveSheetFormRef = (form) => {
    this.sheetForm = form
  }

  // onClick = () => {

  //   const { data, nodeSelect } = this.state
  //   const indexId = data.findIndex((item) => item.id === nodeSelect[0])
  //   data.splice(indexId, 1)
  //   this.setState({
  //     genData: buildTree(data),
  //   })
  // }

  render() {
    const loop = (data) =>
      data.map((item) => {
        const { title, id, children, sheet } = item
        if (children) {
          return (
            <TreeNode key={id} title={title} isLeaf={sheet}>
              {loop(children)}
            </TreeNode>
          )
        }
        return <TreeNode key={id} title={title} isLeaf={sheet} />
      })

    const { genData } = this.state
    const treeNodeCtx = loop(genData)
    const {
      nodeSelect,
      visible: { folder, info, sheet },
      treeData,
    } = this.state

    const [currentData] = treeData.filter((item) => item.id === nodeSelect.id)
    return (
      <Card>
        <Card.Grid style={gridStyle}>
          <DirectoryTree onSelect={this.handleSelectTreeNode}>{treeNodeCtx}</DirectoryTree>
        </Card.Grid>

        <Card.Grid style={gridStyle1}>
          <Popover
            content={
              <div>
                {currentData && !currentData.sheet && (
                  <div>
                    <a id="folder" href="# " onClick={this.showModal}>
                      New Folder
                    </a>
                    <ModelForm
                      ref={this.saveFolderFormRef}
                      title="New Folder"
                      visible={folder}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreateFolder}
                    />
                  </div>
                )}
                {currentData && !currentData.sheet && (
                  <div>
                    <a id="sheet" href="# " onClick={this.showModal}>
                      New Sheet
                    </a>
                    <ModelForm
                      ref={this.saveSheetFormRef}
                      title="New Folder"
                      visible={sheet}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreateSheet}
                    />
                  </div>
                )}
                <div>
                  <a href="#a">Rename</a>
                </div>
                <div>
                  <a href="#a">Delete</a>
                </div>
              </div>
            }
            trigger="click"
            visible={!!nodeSelect && info}
            onVisibleChange={this.handleClickInfo}
          >
            <Button shape="circle" icon="info" style={{ float: 'right' }} disabled={!nodeSelect} />
          </Popover>
          {nodeSelect.id}
        </Card.Grid>
      </Card>
    )
  }
}

export default Demo

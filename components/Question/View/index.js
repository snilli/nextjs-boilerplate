import { Card, Skeleton } from 'antd'
import arrayToTree from 'array-to-tree'
import React from 'react'

import InfoButton from './InfoButton'
import QuestionView from './QuestionView'
import Directory from './Directory'

import AddQuestion from './OverallQuestion/AddQuestion'

const { Grid } = Card

const dataMock = require('./mockTree.json')
const questionMock = require('./question.json')

const gridStyle = {
  width: '25%',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
}

const gridStyle1 = {
  width: '75%',
  overflowX: 'auto',
  whiteSpace: 'nowrap',
}

const root = {
  id: -1,
  title: 'root',
  sheet: false,
  parentId: null,
}

const initData = (data) => {
  const haveRoot = data.filter((item) => item.id === -1)

  if (haveRoot.length === 0) {
    data.push(root)
  }

  const getRoot = data.map((item) => {
    const check = item
    if (check.parentId === null && check.id !== -1) {
      check.parentId = -1
    }
    return check
  })
  return getRoot
}

class Demo extends React.Component {
  constructor(props) {
    super(props)

    const data = initData(dataMock)

    this.state = {
      treeData: data,
      genData: arrayToTree(data, { parentProperty: 'parentId' }),
      nodeSelect: root,
      questionList: [],
      visible: {
        folder: false,
        sheet: false,
        info: false,
        rename: false,
        question: false,
      },
    }
    // bind this for pass to InfoButton
    this.showModal = this.showModal.bind(this)
    this.saveFolderFormRef = this.saveFolderFormRef.bind(this)
    this.saveSheetFormRef = this.saveSheetFormRef.bind(this)
    this.saveRenameFormRef = this.saveRenameFormRef.bind(this)
    this.handleModelCancel = this.handleModelCancel.bind(this)
    this.handleCreateFolder = this.handleCreateFolder.bind(this)
    this.handleCreateSheet = this.handleCreateSheet.bind(this)
    this.handleRename = this.handleRename.bind(this)
    this.handleClickInfo = this.handleClickInfo.bind(this)
    // bind this for pass to Directory
    this.handleSelectTreeNode = this.handleSelectTreeNode.bind(this)
    // bind this for add question
    this.saveAddQuestionFormRef = this.saveAddQuestionFormRef.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.addQuestionChoise = this.addQuestionChoise.bind(this)
  }

  handleSelectTreeNode = (selectedKeys, info) => {
    // console.log(info.node.isLeaf())
    const { treeData } = this.state
    const [id] = selectedKeys.map((item) => parseInt(item, 10))
    const data = treeData.filter((item) => item.id === id)
    let questionList = []
    if (data.length > 0) {
      if (data[0].sheet) {
        questionList = questionMock.filter((item) => item.parentId === data[0].id)
      }

      this.setState({
        nodeSelect: data[0],
        questionList,
      })
    }
  }

  handleClickInfo = (visible) => {
    // const { nodeSelect } = this.state
    // if (nodeSelect.id === -1) {
    //   return
    // }
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

  setModelClose = () => {
    this.setState({
      visible: { info: true, folder: false, sheet: false, rename: false, question: false },
    })

    setTimeout(() => this.setState({ visible: { info: false } }), 10)
  }

  handleModelCancel = () => {
    this.setModelClose()
  }

  // handle sumbit modal form
  handleCreateFolder = () => {
    const { folderForm } = this

    folderForm.validateFields((err, values) => {
      if (!err) {
        const isSheet = false
        this.handleAllCreate(folderForm, values.name, isSheet)
      }
    })
  }

  handleCreateSheet = () => {
    const { sheetForm } = this
    sheetForm.validateFields((err, values) => {
      if (!err) {
        const isSheet = true
        this.handleAllCreate(sheetForm, values.name, isSheet)
      }
    })
  }

  handleRename = () => {
    const { renameForm } = this
    renameForm.validateFields((err, values) => {
      if (!err) {
        const isSheet = true
        this.handleAllCreate(renameForm, values.name, isSheet, true)
      }
    })
  }

  handleCreateQuestion = () => {
    const { questionForm } = this
    questionForm.validateFields((err, values) => {
      if (err) {
        return
      }
      // if (!err) {
      //   const isSheet = true
      //   this.handleAllCreate(questionForm, values.name, isSheet, true)
      // }
      console.log('name ', values)
    })
  }

  handleAllCreate = (form, name, isSheet, renameNode = false) => {
    const { nodeSelect, treeData } = this.state

    const treeDataId = treeData.map((item) => item.id)
    const maxId = Math.max(...treeDataId)

    if (renameNode) {
      const index = treeData.findIndex((item) => item.id === nodeSelect.id)
      treeData[index].title = name
    } else {
      //  use when connect db
      // const isParentRoot = nodeSelect.id === -1
      const newFolder = {
        id: maxId + 1,
        title: name,
        sheet: isSheet,
        //  use when connect db
        // parentId: isParentRoot ? null : nodeSelect.id,
        parentId: nodeSelect.id,
      }

      treeData.push(newFolder)
    }

    this.setState({
      treeData,
      genData: arrayToTree(treeData, { parentProperty: 'parentId' }),
    })

    form.resetFields()
    this.setModelClose()
  }

  // create modal form each menu
  saveFolderFormRef = (form) => {
    this.folderForm = form
  }

  saveSheetFormRef = (form) => {
    this.sheetForm = form
  }

  saveRenameFormRef = (form) => {
    this.renameForm = form
  }

  saveAddQuestionFormRef = (form) => {
    this.questionForm = form
    this.questionForm.setFieldsValue({
      anwserIndex: null,
      id: [1, 2],
    })
  }

  handleSelectChange = (value) => {
    console.log(value)
  }

  // add question zone
  addQuestionChoise = () => {
    const { questionForm } = this
    const id = questionForm.getFieldValue('id')

    id.push('')

    questionForm.setFieldsValue({
      id,
    })
  }

  render() {
    const { genData } = this.state
    const { nodeSelect, visible, questionList } = this.state
    return (
      <Card>
        <Grid style={gridStyle}>
          <Directory
            genData={genData}
            handleSelectTreeNode={this.handleSelectTreeNode}
            nodeSelect={nodeSelect}
          />
        </Grid>

        <Grid style={gridStyle1}>
          {nodeSelect.id}
          <InfoButton
            visible={visible}
            nodeSelect={nodeSelect}
            showModal={this.showModal}
            saveFolderFormRef={this.saveFolderFormRef}
            saveSheetFormRef={this.saveSheetFormRef}
            saveRenameFormRef={this.saveRenameFormRef}
            handleModelCancel={this.handleModelCancel}
            handleCreateFolder={this.handleCreateFolder}
            handleCreateSheet={this.handleCreateSheet}
            handleRename={this.handleRename}
            handleClickInfo={this.handleClickInfo}
          />
          {nodeSelect.sheet && (
            <AddQuestion
              saveAddQuestionFormRef={this.saveAddQuestionFormRef}
              showModal={this.showModal}
              visible={visible}
              handleModelCancel={this.handleModelCancel}
              handleCreateQuestion={this.handleCreateQuestion}
              handleSelectChange={this.handleSelectChange}
              form={this.questionForm}
              addQuestionChoise={this.addQuestionChoise}
            />
          )}
        </Grid>
        <Grid style={gridStyle1}>
          {questionList.length > 0 && <QuestionView questionList={questionList} />}
        </Grid>
      </Card>
    )
  }
}

export default Demo

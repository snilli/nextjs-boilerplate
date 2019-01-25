import { Card, Input } from 'antd'
import arrayToTree from 'array-to-tree'
import React from 'react'

import InfoButton from './InfoButton'
import QuestionView from './QuestionView'
import Directory from './Directory'

import AddQuestion from '../Add'

const { Grid } = Card
const { Search } = Input

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

    this.state = {
      treeData: [],
      genData: [],
      nodeSelect: root,
      questionList: [],
      sheetQuestionList: [],
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
  }

  componentDidMount() {
    const data = initData(dataMock)
    this.setState({
      treeData: data,
      genData: arrayToTree(data, { parentProperty: 'parentId' }),
      questionList: questionMock,
    })
  }

  handleSelectTreeNode = (selectedKeys, info) => {
    // console.log(info.node.isLeaf())
    const { treeData, questionList } = this.state
    const [id] = selectedKeys.map((item) => parseInt(item, 10))
    const data = treeData.filter((item) => item.id === id)

    let sheetQuestionList = []

    if (data.length > 0) {
      if (data[0].sheet) {
        sheetQuestionList = questionList.filter((item) => item.parentId === data[0].id)
      }

      this.setState({
        nodeSelect: data[0],
        sheetQuestionList,
      })
    }
  }

  handleClickInfo = (visible) => {
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
      if (!err) {
        const { type, title, choise, answerIndex } = values
        const { questionList, nodeSelect, sheetQuestionList } = this.state

        let answer = []

        switch (type) {
          case '1':
            answer.push(choise.find((item, index) => index + 1 === answerIndex))
            break
          case '2':
            answer = answerIndex.map((ansIndex) =>
              choise.find((item, index) => index + 1 === ansIndex)
            )
            break
          default:
            answer = []
        }

        const questionListId = questionList.map((item) => item.id)

        const maxQuestionId = Math.max(...questionListId)

        const currentQuestion = {
          id: questionListId.length > 0 ? maxQuestionId + 1 : 1,
          parentId: nodeSelect.id,
          type: parseInt(type, 10),
          title,
          choise,
          answer,
        }

        questionList.push(currentQuestion)

        if (nodeSelect.id === currentQuestion.parentId) {
          sheetQuestionList.push(currentQuestion)
        }

        this.setState({ questionList, sheetQuestionList })
        questionForm.resetFields()
        this.setModelClose()
      }
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
    if (form) {
      this.questionForm = form
      this.questionForm.setFieldsValue({
        answerIndex: null,
        id: [1, 2],
      })
    }
  }

  render() {
    const { genData } = this.state
    const { nodeSelect, visible, sheetQuestionList } = this.state
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
          <Search
            style={{ width: '80%' }}
            placeholder="input search text"
            onSearch={(value) => console.log(value)}
            enterButton
          />
          {/* {nodeSelect.id} */}
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
              form={this.questionForm}
            />
          )}
        </Grid>
        <Grid style={gridStyle1}>
          {sheetQuestionList.length > 0 && <QuestionView sheetQuestionList={sheetQuestionList} />}
        </Grid>
      </Card>
    )
  }
}

export default Demo

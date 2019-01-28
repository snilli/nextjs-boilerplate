import React, { Component } from 'react'

import { Button } from 'antd'
import ModalForm from './ModalForm'
import PropTypes from 'prop-types'

class AddQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.addQuestionChoise = this.addQuestionChoise.bind(this)
    this.removeQuestionChoise = this.removeQuestionChoise.bind(this)
  }

  // add question zone
  addQuestionChoise = () => {
    const { form } = this.props
    const id = form.getFieldValue('id')
    const nextId = id.concat(id[id.length - 1] + 1)

    form.setFieldsValue({
      id: nextId,
    })
  }

  removeQuestionChoise = (k) => {
    const { form } = this.props
    const id = form.getFieldValue('id')
    const answerIndex = form.getFieldValue('answerIndex')

    if (id.length === 2) {
      return
    }

    form.setFieldsValue({
      id: id.filter((item) => item !== k),
      answerIndex: answerIndex === k - 1 ? null : answerIndex,
    })
  }

  render() {
    const {
      saveAddQuestionFormRef,
      visible,
      showModal,
      handleModelCancel,
      handleCreateQuestion,
      from,
    } = this.props
    return (
      <div className="add-question">
        <Button id="question" type="primary" icon="plus" onClick={showModal}>
          เพิ่มข้อสอบ
        </Button>
        <ModalForm
          ref={saveAddQuestionFormRef}
          title="เพิ่มข้อสอบ"
          value=""
          visible={visible.question}
          onCancel={handleModelCancel}
          onCreate={handleCreateQuestion}
          handleSelectChange={this.handleSelectChange}
          from={from}
          addQuestionChoise={this.addQuestionChoise}
          removeQuestionChoise={this.removeQuestionChoise}
        />
      </div>
    )
  }
}

export default AddQuestion

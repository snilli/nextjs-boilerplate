import { Button } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import ModalForm from './ModalForm'

const index = ({
  saveAddQuestionFormRef,
  visible,
  showModal,
  handleModelCancel,
  handleCreateQuestion,
  handleSelectChange,
  from,
}) => (
  <div style={{ float: 'right' }}>
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
      handleSelectChange={handleSelectChange}
      from={from}
    />
  </div>
)

index.propTypes = {}

export default index

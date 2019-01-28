import { Form, Input, Modal } from 'antd'

import React from 'react'

const { Item: FormItem, create } = Form

const ModelForm = create()((props) => {
  const { visible, onCancel, onCreate, form, title } = props
  const { getFieldDecorator } = form

  return (
    <Modal visible={visible} title={title} okText="Create" onCancel={onCancel} onOk={onCreate}>
      <Form layout="vertical">
        <FormItem label="Name">
          {getFieldDecorator('name', {
            initialValue: props.value,
            rules: [{ required: true, message: 'กรุณาใส่ชื่อที่ท่านต้องการ' }],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
})

export default ModelForm

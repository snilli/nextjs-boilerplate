import { Modal, Form, Input, Select, Divider } from 'antd'
import React from 'react'

const { Item: FormItem, create } = Form
const { Option } = Select

const ModelForm = create()((props) => {
  const { visible, onCancel, onCreate, form, title } = props
  const { getFieldDecorator } = form
  const { type } = props.form.getFieldsValue()
  return (
    <Modal visible={visible} title={title} okText="Create" onCancel={onCancel} onOk={onCreate}>
      <Form layout="vertical">
        <FormItem label="โจทย์">
          {getFieldDecorator('title', {
            initialValue: props.value,
            rules: [{ required: true, message: 'กรุณาใส่โจทย์ที่ท่านต้องการ' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="ประเภท">
          {getFieldDecorator('type', {
            initialValue: '1',
            rules: [{ required: true }],
          })(
            <Select onChange={props.handleSelectChange}>
              <Option value="1">ข้อกา</Option>
              <Option value="2">ข้อกาหลายคำตอบ</Option>
              <Option value="3">ข้อเขียน</Option>
            </Select>
          )}
        </FormItem>
        {type === '1' && (
          <FormItem label="ประเภท">
            {getFieldDecorator('type', {
              initialValue: '1',
              rules: [{ required: true }],
            })(
              <Select onChange={props.handleSelectChange}>
                <Option value="1">ข้อกา</Option>
                <Option value="2">ข้อกาหลายคำตอบ</Option>
                <Option value="3">ข้อเขียน</Option>
              </Select>
            )}
          </FormItem>
        )}
      </Form>
    </Modal>
  )
})

export default ModelForm

import { Modal, Form, Input, Select, Radio, Button, Icon } from 'antd'
import React from 'react'

const { Item: FormItem, create } = Form
const { Option } = Select
const RadioGroup = Radio.Group

const idd = [1, 2]

const ModelForm = create()((props) => {
  const { visible, onCancel, onCreate, form, title } = props
  const { getFieldDecorator, getFieldValue } = form
  const { type } = props.form.getFieldsValue()

  getFieldDecorator('id', { initialValue: [] })
  const id = getFieldValue('id')

  const formItems = id.map((item, index) => {
    console.log(item)
    return (
      <FormItem key={item}>
        <Radio value={item - 1}>
          {getFieldDecorator(`choise[${item - 1}]`, {
            initialValue: idd[item - 1],
            rules: [
              {
                required: true,
                message: 'กรุณาใส่ชื่อที่ท่านต้องการ',
              },
            ],
          })(<Input style={{ width: '80%' }} />)}
        </Radio>

        {id.length > 2 ? (
          <Icon
            style={{ float: 'right' }}
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={id.length === 1}
            // onClick={() => this.remove(item)}
          />
        ) : null}
      </FormItem>
    )
  })
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
          <Form.Item>
            {getFieldDecorator('anwserIndex', {
              rules: [{ required: true, message: 'กรุณาเลือกข้อที่เป็นเฉลย' }],
            })(<RadioGroup>{formItems}</RadioGroup>)}
          </Form.Item>
        )}
        <FormItem>
          <Button type="dashed" onClick={props.addQuestionChoise} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
      </Form>
    </Modal>
  )
})

export default ModelForm

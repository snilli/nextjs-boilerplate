import { Button, Checkbox, Form, Icon, Input, Modal, Radio, Select } from 'antd'
import React, { Component } from 'react'

const { Item: FormItem, create } = Form
const { Option } = Select
const { Group: RadioGroup } = Radio
const { Group: CheckboxGroup } = Checkbox

const radioStyle = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

const Choise = (props) => (
  <FormItem label="ตัวเลือก">
    {props.form.getFieldDecorator('answerIndex', {
      rules: [
        {
          required: true,
          message: 'กรุณาเลือกข้อที่เป็นเฉลย',
        },
      ],
    })(props.children)}
    <br />
    <Button type="dashed" onClick={props.addChoise}>
      <Icon type="plus" /> เพิ่มตัวเลือก
    </Button>
  </FormItem>
)

class ModelForm extends Component {
  uniqueChoise = (rule, value, callback) => {
    const { form } = this.props
    const choise = form.getFieldValue('choise')

    const dupicateChoise = choise.filter((item) => item === value)

    if (dupicateChoise.length === 1) {
      callback()
      return
    }
    callback('ซ้ำ')
  }

  render() {
    const { visible, onCancel, onCreate, form, title } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { type } = form.getFieldsValue()
    const { removeQuestionChoise, handleSelectChange, addQuestionChoise } = this.props

    getFieldDecorator('id', { initialValue: [1, 2] })
    const id = getFieldValue('id')

    const radioChoise = id.map((item) => (
      <div key={item} className="choise-layout">
        <Radio value={item}>
          {getFieldDecorator(`choise[${item - 1}]`, {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'กรุณาใส่ชื่อที่ท่านต้องการ',
                validator: this.uniqueChoise,
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
            onClick={() => removeQuestionChoise(item)}
          />
        ) : null}
      </div>
    ))

    const checkboxChoise = id.map((item) => (
      <div key={item} className="choise-layout">
        <Checkbox value={item}>
          {getFieldDecorator(`choise[${item - 1}]`, {
            initialValue: '',
            rules: [
              {
                required: true,
                message: 'กรุณาใส่ชื่อที่ท่านต้องการ',
                validator: this.uniqueChoise,
              },
            ],
          })(<Input style={{ width: '80%' }} />)}
        </Checkbox>

        {id.length > 2 ? (
          <Icon
            style={{ float: 'right' }}
            className="dynamic-delete-button"
            type="minus-circle-o"
            disabled={id.length === 1}
            onClick={() => removeQuestionChoise(item)}
          />
        ) : null}
      </div>
    ))

    return (
      <Modal visible={visible} title={title} okText="Create" onCancel={onCancel} onOk={onCreate}>
        <Form layout="vertical">
          <FormItem label="โจทย์">
            {getFieldDecorator('title', {
              initialValue: this.props.value,
              rules: [{ required: true, message: 'กรุณาใส่โจทย์ที่ท่านต้องการ' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="ประเภท">
            {getFieldDecorator('type', {
              initialValue: '1',
              rules: [{ required: true }],
            })(
              <Select onChange={handleSelectChange}>
                <Option value="1">ข้อกา</Option>
                <Option value="2">ข้อกาหลายคำตอบ</Option>
                <Option value="3">ข้อเขียน</Option>
              </Select>
            )}
          </FormItem>
          {type === '1' && (
            <Choise form={form} addChoise={addQuestionChoise}>
              <RadioGroup>{radioChoise}</RadioGroup>
            </Choise>
          )}
          {type === '2' && (
            <Choise form={form} addChoise={addQuestionChoise}>
              <CheckboxGroup>{checkboxChoise}</CheckboxGroup>
            </Choise>
          )}
          {/* <FormItem label="tag">
          </FormItem> */}
        </Form>
      </Modal>
    )
  }
}

export default create()(ModelForm)

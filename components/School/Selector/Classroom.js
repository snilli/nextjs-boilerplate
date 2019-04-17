import React, { Component } from 'react'
import { Button, Cascader, Checkbox, Form, Icon, Input, Modal, Radio, Select } from 'antd'

const { Item: FormItem, create } = Form
const { Option } = Select

const options = [
  {
    value: '28',
    label: 'สิริรัตนาธร',
    children: [
      {
        value: '10',
        label: 'ม.1',
        children: [
          {
            value: '101',
            label: 'ห้อง 1',
          },
          {
            value: '102',
            label: 'ห้อง 2',
          },
          {
            value: '103',
            label: 'ห้อง 3',
          },
        ],
      },
      {
        value: '13',
        label: 'ม.4',
        children: [
          {
            value: '101',
            label: 'ห้อง 1',
          },
          {
            value: '102',
            label: 'ห้อง 2',
          },
          {
            value: '103',
            label: 'ห้อง 3',
          },
        ],
      },
    ],
  },
  {
    value: '173',
    label: 'หนองกี่',
    children: [
      {
        value: '10',
        label: 'ม.1',
        children: [
          {
            value: '101',
            label: 'ห้อง 1',
          },
          {
            value: '102',
            label: 'ห้อง 2',
          },
          {
            value: '103',
            label: 'ห้อง 3',
          },
        ],
      },
      {
        value: '13',
        label: 'ม.4',
        children: [
          {
            value: '101',
            label: 'ห้อง 1',
          },
          {
            value: '102',
            label: 'ห้อง 2',
          },
          {
            value: '103',
            label: 'ห้อง 3',
          },
        ],
      },
    ],
  },
]

class ClassRoomSelector extends Component {
  onChange = (value) => {
    console.log(value)
  }

  filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  render() {
    const { visible, onCancel, onCreate, form, title } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { type } = form.getFieldsValue()

    getFieldDecorator('id', { initialValue: [1, 2] })
    const id = getFieldValue('id')

    return (
      <Form layout="vertical">
        <FormItem label="เลือกโรงเรียน">
          {getFieldDecorator('type', {
            // initialValue: '',
            rules: [{ required: true, message: 'เลือกโรงเรียนก่อนสิ' }],
          })(
            <Cascader
              size="large"
              options={options}
              onChange={this.onChange}
              placeholder="เลือกโรงเรียน"
              showSearch={this.filter}
            />
          )}
        </FormItem>
      </Form>
    )
  }
}

export default create()(ClassRoomSelector)

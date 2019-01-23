import React, { Component } from 'react'
import { Form, Input, Icon, Button, Radio } from 'antd'

const RadioGroup = Radio.Group

class DynamicFieldSet extends Component {
  state = {
    choise: ['', ''],
    count: 0,
  }

  componentDidMount() {
    this.props.form.setFieldsValue({
      anwserIndex: null,
      id: [1, 2],
    })
  }

  remove = (k) => {
    const { form } = this.props
    // can use data-binding to get
    const id = form.getFieldValue('id')
    const choise = form.getFieldValue('choise')
    const anwserIndex = form.getFieldValue('anwserIndex')

    // We need at least one passenger
    if (id.length === 1) {
      return
    }

    const dddd = anwserIndex === k - 1 ? null : anwserIndex

    // const kkk = choise.filter((item, index) => index !== k - 1)

    choise.splice(k - 1, 1)
    // can use data-binding to set
    form.setFieldsValue({
      id: id.filter((item) => item !== k),
      choise: id.filter((item) => item !== k),
      anwserIndex: dddd,
    })
  }

  add = () => {
    const { form } = this.props
    // can use data-binding to get
    const id = form.getFieldValue('id')
    const nextId = id.concat(id.length + 1)

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      id: nextId,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    }

    getFieldDecorator('id', { initialValue: [] })
    const id = getFieldValue('id')
    const formItems = id.map((item, index) => (
      <Form.Item key={item}>
        <Radio value={item - 1}>
          {getFieldDecorator(`id[${item - 1}]`, {
            initialValue: this.state.choise[item - 1],
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
            onClick={() => this.remove(item)}
          />
        ) : null}
      </Form.Item>
    ))
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('anwserIndex', {
            rules: [{ required: true, message: 'กรุณาเลือกข้อที่เป็นเฉลย' }],
          })(<RadioGroup>{formItems}</RadioGroup>)}
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet)

export default WrappedDynamicFieldSet

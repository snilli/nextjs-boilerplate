import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Steps,
  Table,
  TimePicker,
  Transfer,
} from 'antd'

import React from 'react'
import moment from 'moment'

const dataMock = require('../Question/View/question.json')

const format = 'HH:mm'

const { Item: FormItem, create } = Form
const { Option } = Select
const { RangePicker } = DatePicker
const { Step } = Steps

const dateFormat = 'YYYY/MM/DD'

const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
]

const columns = [
  {
    title: 'คำถาม',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'คะแนน',
    dataIndex: 'point',
    key: 'point',
  },
]

const Step1 = ({ getFieldDecorator, closeTranfer, filterOption, targetKeys, handleChange }) => (
  <Form layout="vertical" style={{ width: '90%', margin: '0 auto' }}>
    <FormItem label="ชื่อชุดข้อสอบ">
      {getFieldDecorator('title', {
        rules: [{ required: true, message: 'กรุณาใส่ชื่อชุดข้อสอบ' }],
      })(<Input />)}
    </FormItem>
    <FormItem label="เลือกชีทข้อสอบ">
      {getFieldDecorator('sheet', {
        rules: [{ required: true, message: 'กรุณาใส่ชื่อชุดข้อสอบ' }],
      })(
        <Select
          showSearch
          placeholder="Select a person"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          <Option value="1">ดีจ้า</Option>
        </Select>
      )}
    </FormItem>
    <FormItem label="เวลาในการทำ">
      {getFieldDecorator('time', {
        rules: [{ required: true }],
      })(<TimePicker format={format} />)}
    </FormItem>
    <FormItem label="เกณการสอบผ่าน > x %">
      {getFieldDecorator('percen', {
        rules: [{ required: true }],
      })(<Input />)}
    </FormItem>
    <FormItem label="เลือกข้อสอบ">
      {getFieldDecorator('modifier', { rules: [{ required: true }] })(
        <Transfer
          disabled={closeTranfer}
          dataSource={dataMock}
          showSearch
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          // onSearch={this.handleSearch}
          render={(item) => item.title}
        />
      )}
    </FormItem>
  </Form>
)

const Step2 = ({ getFieldDecorator }) => (
  <div style={{ width: '90%', margin: '0 auto' }}>
    <Button icon="retweet">สลับลำดับข้อสอบ</Button>
    <br />
    <br />
    <p>
      ตั้งค่าคะแนนทุกข้อ <Input style={{ width: '50px' }} /> คะแนน
    </p>
    <p>ช่วงเวลาการสอบ</p>
    <RangePicker
      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
    <Table pagination={false} columns={columns} dataSource={dataMock} />
  </div>
)

class MoForm extends React.Component {
  test = () => {}

  state = { targetKeys: [], closeTranfer: false, current: 0 }

  filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1

  handleChange = (targetKeys) => {
    const d = targetKeys.map((item) => dataMock.filter((item2) => item2.key === item))

    this.setState({ targetKeys })
  }

  handleSearch = (dir, value) => {
    console.log('search:', dir, value)
  }

  next() {
    const current = this.state.current + 1
    this.setState({ current })
  }

  prev() {
    const current = this.state.current - 1
    this.setState({ current })
  }

  render() {
    const { visible, onCancel, onCreate, form, title } = this.props
    const { getFieldDecorator } = form
    const { current } = this.state

    return (
      <Modal
        visible={visible}
        title=""
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
        style={{ width: '900px' }}
      >
        <div>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          {steps[current].title === 'First' ? (
            <div className="steps-content">
              <Step1
                getFieldDecorator={getFieldDecorator}
                closeTranfer={this.state.closeTranfer}
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                handleChange={this.handleChange}
              />
            </div>
          ) : (
            <div className="steps-content">
              <Step2 getFieldDecorator={getFieldDecorator} />
            </div>
          )}

          <div className="steps-action">
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                Next
              </Button>
            )}
            {current > 0 && (
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </Modal>
    )
  }
}

export default create()(MoForm)

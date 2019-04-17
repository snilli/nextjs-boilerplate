import React, { Component } from 'react'
import {
  Avatar,
  Button,
  Col,
  Divider,
  Form,
  Icon,
  Input,
  Progress,
  Radio,
  Row,
  Switch,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd'

const { Item: FormItem, create } = Form
const { TextArea } = Input
const { Title, Text, Paragraph } = Typography
const columns = [
  {
    title: 'ลำดับที่',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'รหัสนักเรียน',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'ชื่อ-สกุล',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a href="javascript:;">{text}</a>,
  },

  {
    title: 'รูป',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'สถานะ',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <span>
        {tags.map((tag) => {
          let color = tag.length > 15 ? 'geekblue' : 'green-inverse'
          if (tag === 'บัตรจริง') {
            color = 'geekblue-inverse'
          }
          if (tag === 'บัตรขาว') {
            color = 'geekblue'
          }
          if (tag === 'ยังไม่เช็ค') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </span>
    ),
  },
]

const data = [
  {
    key: '1',
    name: 'นางสาว พิมพ์ชนก เต่าหลาย',
    age: 19873,
    address: (
      <img
        alt="19873"
        src="https://s3-ap-southeast-1.amazonaws.com/nextschool.com/students/00-nextgensoft/krROQJ7TsSjwHwfp2ijqWPfcz0KZa1vc.jpg"
        width="48"
      />
    ),
    tags: ['บัตรจริง', 'เช็คแล้ว'],
  },
  {
    key: '2',
    name: 'นางสาว กชพร สีตะบุตร',
    age: 19874,
    address: (
      <img
        alt="19873"
        src="https://s3-ap-southeast-1.amazonaws.com/nextschool.com/students/00-nextgensoft/vCyvujro-Gfeju4TSv8e2wSkitGnH7xx.jpg"
        width="48"
      />
    ),
    tags: ['บัตรจริง', 'ยังไม่เช็ค'],
  },
  {
    key: '3',
    name: 'นางสาว อลินตา ปิ่นศิริ',
    age: 19875,
    address: (
      <img
        alt="19873"
        src="https://s3-ap-southeast-1.amazonaws.com/nextschool.com/students/166/34586_20180219_112450.jpg"
        width="48"
      />
    ),
    tags: ['บัตรขาว', 'เช็คแล้ว'],
  },
]

class StudentTable extends Component {
  state = {
    percent: 90,
  }

  onChange = (value) => {
    console.log(value)
  }

  render() {
    const { visible, onCancel, onCreate, form, title } = this.props
    const { getFieldDecorator, getFieldValue } = form
    const { type } = form.getFieldsValue()
    return (
      <div>
        <Form layout="vertical">
          <FormItem label="RFID">
            {getFieldDecorator('rfid', {
              rules: [{ required: true, message: 'สแกนบัตรก่อนสิ' }],
            })(
              <Input
                size="large"
                placeholder="สแกนบัตร"
                required
                prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            )}
          </FormItem>
        </Form>
        <Row type="flex" justify="space-between">
          <Col span={12}>
            <Title level={3}>จำนวนนักเรียน 43 คน</Title>
            <Paragraph strong level={4}>
              บัตรจริง <Text code>40</Text> ใบ บัตรขาว <Text code>3</Text> ใบ
            </Paragraph>
          </Col>
          <Col span={12}>
            <Form layout="inline" style={{ justifycontent: 'flex-end' }}>
              <FormItem label="กรองเฉพาะบัตรที่ยังไม่ได้เช็ค">
                <Switch />
              </FormItem>
            </Form>
          </Col>
        </Row>

        <Table size="middle" columns={columns} dataSource={data} />

        <Form layout="vertical">
          <FormItem label="เช็คบัตรแล้ว">
            <Progress percent={this.state.percent} />
          </FormItem>
          <FormItem label="รหัสนักเรียนบัตรที่ยังไม่ได้เช็ค">
            <TextArea rows={3} />
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default create()(StudentTable)
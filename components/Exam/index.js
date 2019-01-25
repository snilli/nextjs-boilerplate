import { Button, Card, Divider, Icon, List } from 'antd'
import React, { Component } from 'react'

import ModalForm from './ModalForm'

const questionData = '../Question/View/question.json'

const data = [
  {
    title: 'สอบท้ายบทที่ 1',
    question: 20,
    des: 'view',
  },
  // {
  //   title: 'สอบท้ายบทที่ 2',
  //   question: 20,
  //   des: 'view',
  // },
  // {
  //   title: 'สอบกลางภาค',
  //   question: 20,
  //   des: 'view',
  // },
]

class Index extends Component {
  // state = { modal: [false, false, false] }
  state = { modal: false }

  showModal = () => {
    // const { modal } = this.state

    this.setState({
      // modal: modal.map((item, index) => id === index),
      modal: true,
    })
  }

  onCancel = () => {
    this.setState({
      // modal: [false, false, false],
      modal: false,
    })
  }

  handleCreate = () => {
    const form = this.formRef.props.form
    form.validateFields((err, values) => {
      console.log(values)

      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      form.resetFields()
      this.setState({ modal: [false, false, false] })
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  render() {
    const { modal } = this.state
    return (
      <div>
        <h2 style={{ float: 'left' }}>ชุดข้อสอบ</h2>
        <div style={{ float: 'right' }}>
          <Button type="primary" onClick={this.showModal}>
            <Icon type="plus" />
          </Button>
          <ModalForm
            visible={this.state.modal}
            onCancel={this.onCancel}
            onCreate={this.handleCreate}
          />
        </div>

        <Divider />
        <List
          grid={{ gutter: 16, column: 3 }}
          // itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <Card title={item.title}>
                <p>จำนวนข้อสอบ: {item.question} ข้อ</p>
                <p>เวลาที่ใช้: {item.question} นาที</p>
                <p>คะแนนเต็ม: {item.question} คะแนน</p>
                <p>จำนวนข้อสอบ: {item.question} ข้อ</p>
                <p>เกณการสอบผ่าน: 50%</p>
                <div style={{ float: 'right', fontSize: '20px' }}>
                  <Icon type="edit" /> &nbsp;
                  <Icon type="diff" /> &nbsp;
                  <Icon type="delete" />
                </div>
              </Card>
              {/* <List.Item.Meta
                title={
                  <div>
                    <h2>ชื่อชุด: {}</h2>
                    
                  </div>
                }
              /> */}
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default Index

import { Card, Divider, List, Tabs } from 'antd'
import React, { Component } from 'react'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

const data = [
  {
    title: 'สอบท้ายบทที่ 1',
    question: 20,
    des: 'view',
  },
]

const ListContent = ({ id }) => (
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          title={
            <div>
              <h2>ชื่อชุด: {item.title}</h2>
              <p>จำนวนข้อสอบ: {item.question} ข้อ</p>
              <p>เวลาที่ใช้: {item.question} นาที</p>
              <p>คะแนนเต็ม: {item.question} คะแนน</p>
              <p>จำนวนข้อสอบ: {item.question} ข้อ</p>
            </div>
          }
        />
        {id === '1' && (
          <div>
            <a href="">delete</a>
          </div>
        )}
        {id === '3' && <a href="">view</a>}
      </List.Item>
    )}
  />
)

class SessionIndexComponent extends Component {
  onTest = () => {}

  render() {
    return (
      <div>
        <h2>การสอบที่เปิดสอบ</h2>
        <Divider />
        <Card style={{ width: '90%', margin: '0 auto' }}>
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="กำลังจะถึง" key="1">
              <ListContent id="1" />
            </TabPane>
            <TabPane tab="ปัจจุบัน" key="2">
              <ListContent id="2" />
            </TabPane>
            <TabPane tab="ครั้งที่ผ่านมา" key="3">
              <ListContent id="3" />
            </TabPane>
          </Tabs>
        </Card>
      </div>
    )
  }
}

export default SessionIndexComponent

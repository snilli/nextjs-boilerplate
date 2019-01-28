import { Card } from 'antd'
import Link from 'next/link'
import React from 'react'

const data = [
  {
    title: 'ข้อสอบระดับชั้น ม.1',
  },
  {
    title: 'ข้อสอบระดับชั้น ม.2',
  },
  {
    title: 'ข้อสอบระดับชั้น ม.3',
  },
]

const gridStyle = {
  width: '33.33%',
  textAlign: 'center',
}

const QuestionIndexComponent = () => (
  <div>
    <Card
      title={
        <div>
          <h2 style={{ float: 'left' }}>กลุ่มข้อสอบ</h2>
          <a href="#ss" style={{ float: 'right' }}>
            เพิ่มกลุ่ม
          </a>
        </div>
      }
    >
      {data.map((item, index) => (
        <Card.Grid key={item.title} style={gridStyle}>
          <Link
            href={{
              pathname: '/question/view',
              query: { id: index + 1 },
            }}
          >
            <a href="">{item.title}</a>
          </Link>
        </Card.Grid>
      ))}
    </Card>
  </div>
)

export default QuestionIndexComponent

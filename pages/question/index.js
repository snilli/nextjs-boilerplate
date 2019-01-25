import { List, Divider, Icon, Card } from 'antd'
import React from 'react'
import Link from 'next/link'

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

const InfiniteListExample = () => (
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
            {item.title}
          </Link>
        </Card.Grid>
      ))}
    </Card>
  </div>
)

export default InfiniteListExample

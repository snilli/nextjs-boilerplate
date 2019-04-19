import React, { Component } from 'react'
import { Cascader, Checkbox, Form, Icon, Input, Modal, Radio, Select } from 'antd'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { StudentTable } from '../../Student'

const { Item: FormItem, create } = Form
const { Option } = Select

const GET_CLASSROOM = gql`
  query School {
    allSchool(where: { status: 10, id: { notIn: [5, 126, 132] } }) {
      id
      name
      classList {
        id
        name
        totalStudent
        classroomList {
          id
          classRoomName
          totalStudent
        }
      }
    }
  }
`

class RfidSelector extends Component {
  state = {
    schoolId: null,
    classId: null,
    classroomId: null,
    totalStudent: null,
  }

  onChange = (value, label) => {
    const totalStudent = label[2].label.split(':')
    this.setState({
      schoolId: value[0],
      classId: value[1],
      classroomId: value[2],
      totalStudent,
    })

    // console.log(value)
  }

  onLoad = (e) => {}

  filter = (inputValue, path) =>
    path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)

  renderStudentTable = (classroomId, totalStudent) => (
    <StudentTable classroomId={classroomId} totalStudent={totalStudent} />
  )

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
      </div>
    )
  }
}

export default create()(RfidSelector)

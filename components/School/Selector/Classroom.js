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

class ClassRoomSelector extends Component {
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

    const { schoolId, classId, classroomId, totalStudent } = this.state

    return (
      <div>
        <Query query={GET_CLASSROOM}>
          {({ loading, error, data }) => {
            if (loading) return <div>รอก่อน</div>
            if (error) return `[[Error!]]: ${error}`

            const classData = data.allSchool.map((school) => ({
              value: school.id,
              label: school.name,
              children: school.classList.map((academicClass) => ({
                value: academicClass.id,
                label: academicClass.name,
                children: academicClass.classroomList.map((classroom) => ({
                  value: classroom.id,
                  label: `${classroom.classRoomName}: [${classroom.totalStudent}]`,
                })),
              })),
            }))
            return (
              <Form layout="vertical">
                <FormItem label="เลือกโรงเรียน">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: 'เลือกโรงเรียนก่อนสิ' }],
                  })(
                    <Cascader
                      size="large"
                      options={classData}
                      expandTrigger="hover"
                      onChange={this.onChange}
                      placeholder="เลือกโรงเรียน"
                      showSearch={this.filter}
                    />
                  )}
                </FormItem>
              </Form>
            )
          }}
        </Query>
        {this.renderStudentTable(classroomId, totalStudent)}
      </div>
    )
  }
}

export default create()(ClassRoomSelector)

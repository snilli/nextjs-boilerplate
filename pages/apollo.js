import React, { Component } from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const GET_CHILD_IN_HOODS = gql`
  query ParentStudentList($id: Int!) {
    children: parent(id: $id) {
      studentList {
        id
        code
        imageUrl
        fullName
        latitude
        longitude
        schoolInfo {
          fullName: name
          latitude
          longitude
          logo
        }
      }
    }
  }
`

const ChildInHood = ({ parentId }) => (
  <Query query={GET_CHILD_IN_HOODS} variables={{ id: parentId }}>
    {({ loading, error, data }) => {
      if (loading) return null
      if (error) return `[[Error!]]: ${error}`

      return data.children.studentList.map((student) => (
        <div>
          <img key={student.code} alt={student.code} src={student.imageUrl} width="100" />
          <img key={student.code} alt={student.code} src={student.imageUrl} width="100" />
          <img key={student.code} alt={student.code} src={student.imageUrl} width="100" />
        </div>
      ))
    }}
  </Query>
)

ChildInHood.propTypes = {
  parentId: PropTypes.number.isRequired,
}

class ApolloIndex extends Component {
  onLoad = (e) => {}

  render() {
    return (
      <div>
        apollo
        <ChildInHood parentId={128851} />
      </div>
    )
  }
}
export default ApolloIndex

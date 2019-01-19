import { Button, Modal, Form, Input, Radio } from 'antd'
import React from 'react'
import CollectionCreateForm from './ModalForm'

const { Item: FormItem } = Form

class CollectionsPage extends React.Component {
  state = {
    visible: {
      folder: false,
    },
  }

  showModal = () => {
    this.setState({
      visible: {
        folder: true,
      },
    })
  }

  handleCancel = () => {
    this.setState({
      visible: {
        folder: false,
      },
    })
  }

  handleCreate = () => {
    console.log(this)
    const { folderForm } = this
    folderForm.validateFields((err, values) => {
      if (err) {
        return
      }

      console.log('Received values of form: ', values)
      folderForm.resetFields()
      this.setState({ visible: false })
    })
  }

  saveFormRef = (form) => {
    this.folderForm = form
  }

  render() {
    return (
      <div>
        <a onClick={this.showModal}>New Collection</a>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible.folder}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    )
  }
}

export default CollectionsPage

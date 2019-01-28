import { Button, Popover } from 'antd'

import ModalForm from './ModalForm'
import PropTypes from 'prop-types'
import React from 'react'

const InfoButton = ({
  visible,
  nodeSelect,
  showModal,
  saveFolderFormRef,
  saveSheetFormRef,
  saveRenameFormRef,
  handleCreateFolder,
  handleCreateSheet,
  handleRename,
  handleModelCancel,
  handleClickInfo,
}) => (
  <Popover
    content={
      <div>
        {!nodeSelect.sheet && (
          <div>
            <div id="folder" href="# " onClick={showModal} role="presentation">
              New Folder
            </div>
            <ModalForm
              ref={saveFolderFormRef}
              title="New Folder"
              value=""
              visible={visible.folder}
              onCancel={handleModelCancel}
              onCreate={handleCreateFolder}
            />
          </div>
        )}
        {!nodeSelect.sheet && nodeSelect.id !== -1 && (
          <div>
            <div id="sheet" href="# " onClick={showModal} role="presentation">
              New Sheet
            </div>
            <ModalForm
              ref={saveSheetFormRef}
              title="New Folder"
              value=""
              visible={visible.sheet}
              onCancel={handleModelCancel}
              onCreate={handleCreateSheet}
            />
          </div>
        )}
        {nodeSelect.id !== -1 && (
          <div>
            <div id="rename" onClick={showModal} role="presentation">
              Rename
            </div>
            <ModalForm
              ref={saveRenameFormRef}
              title="Rename"
              value={nodeSelect.title}
              visible={visible.rename}
              onCancel={handleModelCancel}
              onCreate={handleRename}
            />
          </div>
        )}
        {nodeSelect.id !== -1 && (
          <div>
            <div>Delete</div>
          </div>
        )}
      </div>
    }
    trigger="click"
    visible={!!nodeSelect && visible.info}
    onVisibleChange={handleClickInfo}
  >
    <Button shape="circle" icon="info" style={{ float: 'right' }} />
  </Popover>
)

InfoButton.propTypes = {
  visible: PropTypes.shape({
    folder: PropTypes.bool,
    sheet: PropTypes.bool,
    rename: PropTypes.bool,
    info: PropTypes.bool,
  }).isRequired,
  nodeSelect: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  showModal: PropTypes.func.isRequired,
  saveFolderFormRef: PropTypes.func.isRequired,
  saveSheetFormRef: PropTypes.func.isRequired,
  saveRenameFormRef: PropTypes.func.isRequired,
  handleCreateFolder: PropTypes.func.isRequired,
  handleCreateSheet: PropTypes.func.isRequired,
  handleRename: PropTypes.func.isRequired,
  handleModelCancel: PropTypes.func.isRequired,
  handleClickInfo: PropTypes.func.isRequired,
}

export default InfoButton

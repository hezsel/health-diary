import React from 'react'
import {
  Paper,
} from '@material-ui/core'
import {
  InsertDriveFile as InsertDriveFileIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { path } from 'ramda'
import api from '../services'

const Attachment = ({
  type,
  item,
  updateList,
}) => {
  const classes = makeStyles((theme) => ({
    paper: {
      padding: 15,
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'pre-line',
      cursor: 'pointer',
    },
    attachment: {
      color: '#11cb5f',
    },
  }))()

  const getFileDownload = async () => {
    const attachmentId = path(['attachments', 0, 'id'], item)
    if (!attachmentId) return
    const { signedUrlToDownload } = await api.attachment.get(attachmentId)
    window.open(signedUrlToDownload)
  }

  const uploadAttachment = async (file) => {
    await api.attachment.create(type, item.id, file)
    updateList()
  }

  return <>
    {
      item.attachments.length > 0
        ?
          <Paper
            className={[classes.paper, classes.attachment].join(' ')}
            onClick={() => getFileDownload()}
          >
            <InsertDriveFileIcon
              fontSize="small"
              color={"secondary"}
            /><strong>{item.attachments[0].originalFileName}</strong>
          </Paper>
        : <>
          <label htmlFor="attachment-upload">
            <Paper
              className={classes.paper}
            >
              <InsertDriveFileIcon
                fontSize="small"
                color={"primary"}
              /><strong>Adicionar Anexo</strong>
            </Paper>
          </label>
          <input
            id="attachment-upload"
            type="file"
            style={{ display: 'none' }}
            accept={'*'}
            onChange={e => uploadAttachment(e.target.files[0])}
          />
        </>
    }
  </>
}

export default Attachment

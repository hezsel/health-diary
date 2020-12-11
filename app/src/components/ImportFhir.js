import React from 'react'
import {
  Button,
} from '@material-ui/core'

import api from '../services'

const ImportFhir = ({
  updateList,
}) => {
  let fileReader

  const handleFileRead = (e) => {
    const content = JSON.parse(fileReader.result)
    api.fhir.importResource(content).then(() => {
      updateList()
      alert('Recurso Fhir importando com sucesso!')
    })
  }
  const handleFileChange = (file) => {
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }
  return <>
    <label htmlFor="file-upload">
      <Button
        style={{ color: 'white', marginRight: 10 }}
        variant='contained'
        size='large'
        color="primary"
        onClick={() => document.querySelector('#file-upload').click()}
      >
        Importar FHIR
      </Button>
    </label>
    <input
      id="file-upload"
      type="file"
      style={{ display: 'none' }}
      accept={'.json'}
      onChange={e => handleFileChange(e.target.files[0])}
    />
  </>
}

export default ImportFhir

import React from 'react'
import {
  Button,
} from '@material-ui/core'

import api from '../services'

const ExportFhir = ({
  id,
  type,
}) => {
  const getFhirFromApi = async () => {
    const { fhir: fhirData } = await api.fhir.exportResource(type, id)
    if (!fhirData) return
    const toDownload = new Blob([JSON.stringify(fhirData)], { type: 'application/json' })
    const a = document.createElement("a")
    a.href = URL.createObjectURL(toDownload)
    a.download = `${id}.json`
    a.click()

  }
  return <>
    <label htmlFor="file-upload">
      <Button
        style={{ color: 'white' }}
        variant='contained'
        size='large'
        color="primary"
        onClick={() => getFhirFromApi()}
      >
        Exportar FHIR
      </Button>
    </label>
  </>
}

export default ExportFhir

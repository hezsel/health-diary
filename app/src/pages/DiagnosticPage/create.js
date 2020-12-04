import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Dialog,
  TextField,
  Grid,
  InputAdornment,
  Button,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
  Room as RoomIcon,
  Close as CloseIcon,
} from '@material-ui/icons'
import { head, pipe, split } from 'ramda'

import api from '../../services'

const CreatePage = styled.div`
  padding-Top: 10px;
  padding-Left: 20px;
  padding-Right: 30px;
  padding-Bottom: 20px;
`

const formatDate = (date) => {
  if (!date) return null
  return pipe(split('T'), head)(date.toISOString())
}

const getFormatedDate = (isoDateString) => {
  if (!isoDateString) return null
  const now = new Date()
  return new Date(new Date(isoDateString).getTime() + now.getTimezoneOffset() * 60000)
}

const Create = ({
  modalStatus,
  updateList,
  setModalStatus,
  editing,
}) => {
  const [diagnosticCodeId, setDiagnosticCodeId] = useState(null)
  const [date, setDate] = useState(new Date())
  const [performer, setPerformer] = useState(null)
  const [result, setResult] = useState(null)
  const [observation, setObservation] = useState(null)

  const [diagnosticCodeList, setDiagnosticCodeList] = useState([])

  const updateCodeList = async (filters = {}) => {
    setDiagnosticCodeList(await api.diagnosticCode.list(filters))
  }
  useEffect(() => {
    updateCodeList()
    if (editing.id) {
      setDiagnosticCodeId(editing.diagnosticCode.id)
      setDate(getFormatedDate(editing.date))
      setPerformer(editing.performer)
      setResult(editing.result)
      setObservation(editing.observation)
    }
  }, [editing])

  const searchCode = async (name) => {
    if (!name || name.length < 3) return
    updateCodeList({ name })
  }

  const createItem = (data) => {
    api.diagnostic.create(data)
      .then(() => {
        alert('Exame criado com sucesso!')
        updateList()
      })
      .catch((err) => {
        alert('Houve um erro criando o exame.')
      })
  }

  const updateItem = (id, data) => {
    api.diagnostic.update(id, data)
      .then(() => {
        alert('Exame editado com sucesso!')
        updateList()
      })
      .catch((err) => {
        alert('Houve um erro editando o exame.')
      })
  }

  const saveItem = () => {
    const data = {
      diagnosticCodeId,
      date: formatDate(date),
      performer: performer || null,
      result: result || null,
      observation: observation || null,
    }
    if (editing.id) {
      updateItem(editing.id, data)
      return
    }
    createItem(data)
  }

  return (<Dialog
    open={modalStatus}
    maxWidth="md"
    fullWidth
  >
    <CreatePage>
      <Grid container>
        <Grid item xs={10}>
          <h2 style={{ marginLeft: 20 }}>{editing.id ? 'Editar' : 'Novo'} Exame</h2>
        </Grid>
        <Grid
          container
          item
          xs={2}
          direction="row"
          justify="flex-end"
          style={{ marginTop: 18 }}
        >
          <CloseIcon
            style={{ color: 'dimgray', marginRight: 11, cursor: 'pointer' }}
            onClick={() => setModalStatus(false)}
          />
        </Grid>
        <Grid item xs={12} md={4} style={{ paddingLeft: 10 }}>
          <Grid item xs={12}>
            <Autocomplete
              id="diagnostic-auto-complete"
              options={diagnosticCodeList}
              getOptionLabel={(option) => option.name}
              defaultValue={editing ? editing.diagnosticCode : []}
              getOptionSelected={(option, selected = {}) => option.id === selected.id}
              onChange={(event, value) => setDiagnosticCodeId(value ? value.id : null)}
              onInputChange={(event, name) => searchCode(name)}
              renderInput={(params) => <TextField
                {...params}
                fullWidth
                label="Exame*"
                variant="filled"
                value={diagnosticCodeId}
              />}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 4 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="diagnostic-date"
                fullWidth
                disableToolbar
                inputVariant={'filled'}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Data*"
                value={date}
                onChange={setDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 12, marginBottom: 16 }}>
            <TextField
              id="diagnostic-performer"
              fullWidth
              label="Laboratório"
              variant="filled"
              value={performer || ''}
              onChange={(e) => setPerformer(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <RoomIcon style={{ color: 'dimgray', marginRight: 11 }} />
                </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={4} style={{ paddingLeft: 10, marginBottom: 16 }}>
          <Grid item xs={12}>
            <TextField
              id="diagnostic-result"
              fullWidth
              multiline
              rows={9}
              rowsMax={9}
              value={result || ''}
              onChange={(e) => setResult(e.target.value)}
              label="Resultados"
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={4} style={{ paddingLeft: 10, marginBottom: 16 }}>
          <Grid item xs={12}>
            <TextField
              id="diagnostic-observation"
              fullWidth
              multiline
              rows={9}
              rowsMax={9}
              value={observation || ''}
              onChange={(e) => setObservation(e.target.value)}
              label="Observações..."
              variant="filled"
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justify="flex-end"
        >
          <Button
            style={{ color: 'white' }}
            variant='contained'
            size='large'
            color="secondary"
            onClick={() => saveItem()}
          >
            Salvar
          </Button>
        </Grid>
      </Grid>
    </CreatePage>
  </Dialog>)
}

export default Create

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Dialog,
  TextField,
  Grid,
  InputAdornment,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
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

const getFormatedTime = (time) => {
  const [hours, minutes] = split(':', time)

  return new Date().setHours(hours, minutes)
}

const formatTime = (date) => {
  if (!date) return null
  const hours = `${date.getHours()}`.padStart(2, 0)
  const minutes = `${date.getMinutes()}`.padStart(2, 0)
  return `${hours}:${minutes}`
}

const areRequiredFieldsOk = (item) => {
  if (!item.name) {
    alert('Campo "Nome" é obrigatório.')
    return false
  }
  if (!item.date) {
    alert('Campo "Data" é obrigatório.')
    return false
  }

  return true
}

const Create = ({
  modalStatus,
  updateList,
  setModalStatus,
  editing,
}) => {
  const [type, setType] = useState('other')
  const [name, setName] = useState(null)
  const [diagnosticCodeId, setDiagnosticCodeId] = useState(null)
  const [immunizationCodeId, setImmunizationCodeId] = useState(null)
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(null)
  const [location, setLocation] = useState(null)
  const [observation, setObservation] = useState(null)

  const [diagnosticCodeList, setDiagnosticCodeList] = useState([])
  const [immunizationCodeList, setImmunizationCodeList] = useState([])

  const updateDiagnosticCodeList = async (filters = {}) => {
    setDiagnosticCodeList(await api.diagnosticCode.list(filters))
  }
  const updateImmunizationCodeList = async (filters = {}) => {
    setImmunizationCodeList(await api.immunizationCode.list(filters))
  }
  useEffect(() => {
    if (editing.id) {
      if (editing.diagnosticCode) {
        setType('diagnostic')
        setDiagnosticCodeId(editing.diagnosticCode.id)
      } else if (editing.immunizationCode) {
        setType('immunization')
        setImmunizationCodeId(editing.immunizationCode.id)
      } else {
        setType('other')
      }
      setName(editing.name)
      setDate(getFormatedDate(editing.date))
      setTime(getFormatedTime(editing.time))
      setLocation(editing.location)
      setObservation(editing.observation)
    }
  }, [editing])

  const searchCode = async (searchType, name) => {
    if (!name || name.length < 3) return
    if (searchType === 'immunization') {
      updateImmunizationCodeList({ name })
    }
    if (searchType === 'diagnostic') {
      updateDiagnosticCodeList({ name })
    }
  }

  const createItem = (data) => {
    api.schedule.create(data)
      .then(() => {
        alert('Lembrete criado com sucesso!')
        updateList()
      })
      .catch((err) => {
        alert('Houve um erro criando o lembrete.')
      })
  }

  const updateItem = (id, data) => {
    api.schedule.update(id, data)
      .then(() => {
        alert('Lembrete editado com sucesso!')
        updateList()
      })
      .catch((err) => {
        alert('Houve um erro editando o lembrete.')
      })
  }

  const saveItem = () => {
    const data = {
      name: name || null,
      date: formatDate(date),
      time: formatTime(time),
      location: location || null,
      observation: observation || null,
    }
    if (type === 'immunization') {
      data.immunizationCodeId = immunizationCodeId || null
    }
    if (type === 'diagnostic') {
      data.diagnosticCodeId = diagnosticCodeId || null
    }
    if (!areRequiredFieldsOk(data)) return
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
          <h2 style={{ marginLeft: 20 }}>{editing.id ? 'Editar' : 'Novo'} Lembrete</h2>
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
        <Grid container item xs={12} style={{marginTop: -35, marginBottom: 18, paddingLeft: 10}}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue={type || 'other'}
                onChange={(e) => setType(e.target.value)}
              >
                <FormControlLabel
                  value="immunization"
                  control={<Radio color="primary" />}
                  label="Vacina"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="diagnostic"
                  control={<Radio color="primary" />}
                  label="Exame"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio color="primary" />}
                  label="Outro"
                  labelPlacement="end"
                />
              </RadioGroup>
            </Box>
          </Grid>
          {
            type === 'immunization' &&
            <Grid item xs={12} style={{ marginBottom: 18 }}>
              <Autocomplete
                id="immunization-auto-complete"
                options={immunizationCodeList}
                getOptionLabel={(option) => option.name}
                defaultValue={editing ? editing.immunizationCode : []}
                getOptionSelected={(option, selected = {}) => option.id === selected.id}
                onChange={(event, value) => setImmunizationCodeId(value ? value.id : null)}
                onInputChange={(event, name) => searchCode('immunization', name)}
                renderInput={(params) => <TextField
                  {...params}
                  fullWidth
                  label="Vacina*"
                  variant="filled"
                  value={immunizationCodeId}
                />}
              />
            </Grid>
          }
          {
            type === 'diagnostic' &&
            <Grid item xs={12} style={{ marginBottom: 18 }}>
              <Autocomplete
                id="diagnostic-auto-complete"
                options={diagnosticCodeList}
                getOptionLabel={(option) => option.name}
                defaultValue={editing ? editing.diagnosticCode : []}
                getOptionSelected={(option, selected = {}) => option.id === selected.id}
                onChange={(event, value) => setDiagnosticCodeId(value ? value.id : null)}
                onInputChange={(event, name) => searchCode('diagnostic', name)}
                renderInput={(params) => <TextField
                  {...params}
                  fullWidth
                  label="Exame*"
                  variant="filled"
                  value={diagnosticCodeId}
                />}
              />
            </Grid>
          }
          <Grid item xs={12}>
            <TextField
              id="schedule-name"
              fullWidth
              label="Nome do Lembrete*"
              variant="filled"
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingLeft: 10 }}>
          <Grid item xs={12} style={{ marginTop: -16 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="schedule-date"
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
          <Grid item xs={12} style={{ marginTop: -3 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                fullWidth
                ampm={false}
                id="schedule-time"
                inputVariant={'filled'}
                variant="inline"
                label="Horário"
                value={time}
                onChange={setTime}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 11, marginBottom: 16 }}>
            <TextField
              id="schedule-location"
              fullWidth
              label="Local"
              variant="filled"
              value={location || ''}
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <RoomIcon style={{ color: 'dimgray', marginRight: 11 }} />
                </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        <Grid item container xs={12} md={6} style={{ paddingLeft: 10, marginBottom: 16 }}>
          <Grid item xs={12}>
            <TextField
              id="schedule-observation"
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

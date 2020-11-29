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
  ViewHeadline as ViewHeadlineIcon,
  Close as CloseIcon,
} from '@material-ui/icons'
import { reject, anyPass, isEmpty, isNil } from 'ramda'

import api from '../../services'

const CreatePage = styled.div`
  padding-Top: 10px;
  padding-Left: 20px;
  padding-Right: 30px;
  padding-Bottom: 20px;
`

const formatDate = (date) => {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

const removeNotUsedAttributes = reject(anyPass([isNil, isEmpty]))

const ListItems = ({
  modalStatus,
  updateList,
  setModalStatus,
  editing,
}) => {
  const [immunizationCodeId, setImmunizationCodeId] = useState('immu_code_ckhwkga9n0000x0ucaolme544')
  const [date, setDate] = useState(new Date())
  const [expirationDate, setExpirationDate] = useState(null)
  const [location, setLocation] = useState(null)
  const [lotNumber, setLotNumber] = useState(null)
  const [doseQuantity, setDoseQuantity] = useState(null)
  const [observation, setObservation] = useState(null)

  const [immunizationCodeList, setImmunizationCodeList] = useState([])

  const updateCodeList = async (filters = {}) => {
    setImmunizationCodeList(await api.immunizationCode.list(filters))
  }
  useEffect(() => {
    updateCodeList()
    if (!isEmpty(editing)) {
      setDate(new Date(editing.date))
      setExpirationDate(new Date(editing.expirationDate))
      setLocation(editing.location)
      setLotNumber(editing.lotNumber)
      setDoseQuantity(editing.doseQuantity)
      setObservation(editing.observation)
    }
  }, [editing])

  const searchCode = async (name) => {
    if (!name || name.length < 3) return
    updateCodeList({ name })
  }

  const createItem = (data) => {
    api.immunization.create(data)
      .then(() => {
        alert('Vacina criada com sucesso!')
        updateList()
      })
      .catch((err) => {
        alert('Houve um erro criando a vacina.')
      })
  }

  const updateItem = (id, data) => {
    api.immunization.update(id, data)
      .then(() => {
        alert('Vacina editada com sucesso!')
        updateList()
      })
      .catch((err) => {
        alert('Houve um erro editando a vacina.')
      })
  }

  const saveItem = () => {
    const data = removeNotUsedAttributes({
      immunizationCodeId,
      date: formatDate(date),
      expirationDate: formatDate(expirationDate),
      location,
      lotNumber,
      doseQuantity,
      observation,
    })
    if (editing.id) {
      updateItem(editing.id, data)
      return
    }
    createItem(date)
  }

  return (<Dialog
    open={modalStatus}
    maxWidth="md"
    fullWidth
  >
    <CreatePage>
      <Grid container>
        <Grid item xs={10}>
          <h2 style={{ marginLeft: 20 }}>{editing.id ? 'Editar' : 'Nova'} Vacina</h2>
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
        <Grid item xs={12} md={6} style={{ paddingLeft: 10 }}>
          <Grid item xs={12}>
            <Autocomplete
              id="immunization-auto-complete"
              options={immunizationCodeList}
              getOptionLabel={(option) => option.name}
              defaultValue={editing ? editing.immunizationCode : []}
              getOptionSelected={(option, selected = {}) => option.id === selected.id}
              onChange={(event, value) => setImmunizationCodeId(value ? value.id : null)}
              onInputChange={(event, name) => searchCode(name)}
              renderInput={(params) => <TextField
                {...params}
                fullWidth
                label="Vacina*"
                variant="filled"
                value={immunizationCodeId}
              />}
            />
          </Grid>
          <Grid item xs={12} style={{ marginTop: 3 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="immunization-date"
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
          <Grid item xs={12} style={{ marginTop: -4 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="immunization-expire-date"
                fullWidth
                disableToolbar
                inputVariant={'filled'}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Validade"
                value={expirationDate}
                onChange={setExpirationDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 9, marginBottom: 16 }}>
            <TextField
              id="immunization-location"
              fullWidth
              label="Localização"
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
              id="immunization-observation"
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
          <Grid item xs={6} style={{ marginTop: 16 }}>
            <TextField
              id="immunization-dose-quantity"
              fullWidth
              label="Dose"
              variant="filled"
              value={doseQuantity || ''}
              onChange={(e) => setDoseQuantity(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <ViewHeadlineIcon style={{ color: 'dimgray', marginRight: 11 }} />
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6} style={{ marginTop: 16, paddingLeft: 10 }}>
            <TextField
              id="immunization-lot-number"
              fullWidth
              label="Lote"
              variant="filled"
              value={lotNumber || ''}
              onChange={(e) => setLotNumber(e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="end">
                  <ViewHeadlineIcon style={{ color: 'dimgray', marginRight: 11 }} />
                </InputAdornment>
              }}
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

export default ListItems

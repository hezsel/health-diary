import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Button,
  TextField,
  Dialog,
  Grid,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import {
  Close as CloseIcon,
} from '@material-ui/icons'
import { head, pipe, reject, split, isNil } from 'ramda'

import api from '../../services'

const FilterPage = styled.div`
  padding-Top: 10px;
  padding-Left: 20px;
  padding-Right: 30px;
  padding-Bottom: 20px;
`

const formatDate = (date) => {
  if (!date) return null
  return pipe(split('T'), head)(date.toISOString())
}

const ListItems = ({
  modalStatus = true,
  setModalStatus,
  updateList,
}) => {
  const [diagnosticCodeId, setDiagnosticCodeId] = useState(null)
  const [date, setDate] = useState(null)

  const search = () => {
    updateList(reject(isNil, {
      diagnosticCodeId,
      date: formatDate(date),
    }))
  }

  const [diagnosticCodeList, setDiagnosticCodeList] = useState([])

  const updateCodeList = async (filters = {}) => {
    const diagnostics = await api.diagnosticCode.list(filters)
    setDiagnosticCodeList(diagnostics)
  }

  useEffect(() => {
    updateCodeList()
  }, [])

  const searchCode = async (name) => {
    if (!name || name.length < 3) return
    updateCodeList({ name })
  }

  return (<Dialog
    open={modalStatus}
    maxWidth="md"
    fullWidth
  >
    <FilterPage>
      <Grid container>
        <Grid item xs={10}>
          <h2 style={{ marginLeft: 20 }}>Buscar Exame</h2>
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
        <Grid item container xs={12} style={{marginLeft: 15}} spacing={1}>
          <Grid item xs={12} md={6} style={{marginBottom: 15}}>
            <Autocomplete
              id="diagnostic-auto-complete"
              options={diagnosticCodeList}
              getOptionLabel={(option) => option.name}
              getOptionSelected={(option, selected = {}) => option.id === selected.id}
              onChange={(event, value) => setDiagnosticCodeId(value ? value.id : null)}
              onInputChange={(event, name) => searchCode(name)}
              renderInput={(params) => <TextField
                {...params}
                fullWidth
                label="Tipo de Exame"
                variant="filled"
                value={diagnosticCodeId}
              />}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{marginTop: -16}}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                id="diagnostic-date"
                fullWidth
                disableToolbar
                inputVariant={'filled'}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                label="Data do Exame"
                value={date}
                onChange={setDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
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
            onClick={() => search()}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>
    </FilterPage>
  </Dialog>)
}

export default ListItems

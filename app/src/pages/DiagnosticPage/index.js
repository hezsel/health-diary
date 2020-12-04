import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar'
import styled from 'styled-components'
import ListItems from './listItems'
import CreateDiagnostic from './create'
import FilterDiagnostic from './filter'
import { useHistory } from "react-router-dom"
import { isLoggedIn } from '../../services/user'
import api from '../../services'
import { Grid, Fab } from '@material-ui/core'
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
} from '@material-ui/icons'

const Page = styled.div`
  padding-top: 50px;
  padding-left: 120px;
  padding-right: 60px;
  padding-bottom: 50px;
  @media (max-width: 600px) {
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 70px;
  }  
`

const DiagnosticPage = () => {
  const history = useHistory()
  isLoggedIn(history)

  const [createModalStatus, setCreateModalStatus] = useState(false)
  const [filterModalStatus, setFilterModalStatus] = useState(false)
  const [diagnosticList, setDiagnosticList] = useState([])
  const [editing, setEditing] = useState({})

  const updateList = async (filters = {}) => {
    setCreateModalStatus(false)
    setFilterModalStatus(false)
    const diagnostics = await api.diagnostic.list(filters)
    setDiagnosticList(diagnostics)
  }

  let modalKey = new Date().valueOf()

  useEffect(() => {
    updateList()
  }, [])

  const setEdit = (item) => {
    setEditing(item)
    setCreateModalStatus(true)
  }

  return (<>
    <NavBar />
    <Page>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <h1>Seus Exames:</h1>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={6}
          direction="row"
          alignItems="center"
          justify="flex-end"
        >
          <Fab
            style={{ marginRight: 10 }}
            size="medium"
            aria-label="fitler"
            onClick={() => setFilterModalStatus(true)}
          >
            <FilterListIcon />
          </Fab>
          <Fab
            color="primary"
            size="medium"
            aria-label="add"
            onClick={() => {
              setEditing({})
              setCreateModalStatus(true)
            }}
          >
            <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <ListItems
            items={diagnosticList}
            updateList={updateList}
            setEdit={setEdit}
          />
        </Grid>
      </Grid>
      <CreateDiagnostic
        key={modalKey}
        modalStatus={createModalStatus}
        setModalStatus={setCreateModalStatus}
        updateList={updateList}
        editing={editing}
      />
      <FilterDiagnostic
        key={modalKey + 1}
        modalStatus={filterModalStatus}
        setModalStatus={setFilterModalStatus}
        updateList={updateList}
      />
    </Page>
  </>)
}
 
export default DiagnosticPage

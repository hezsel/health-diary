import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar'
import styled from 'styled-components'
import ListItems from './listItems'
import CreateImmunization from './create'
import { useHistory } from "react-router-dom"
import { isLoggedIn } from '../../services/user'
import api from '../../services'
import { Grid, Fab } from '@material-ui/core'
import {
  Add as AddIcon,
  FilterList as FilterListIcon,
} from '@material-ui/icons'

const Page = styled.div`
  padding-Top: 50px;
  padding-Left: 120px;
  padding-Right: 120px;
  padding-Bottom: 50px;
`

const ImmunizationPage = () => {
  const history = useHistory()
  isLoggedIn(history)

  const [createModalStatus, setCreateModalStatus] = useState(false)
  const [immunizationList, setImmunizationList] = useState([])
  const [editing, setEditing] = useState({})

  const updateList = async () => {
    setCreateModalStatus(false)
    setImmunizationList(await api.immunization.list())
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
        <Grid item xs={10}>
          <h1>Suas Vacinas:</h1>
        </Grid>
        <Grid
          container
          item
          xs={2}
          direction="row"
          alignItems="center"
          justify="flex-end"
        >
          <Fab
            style={{ marginRight: 10 }}
            size="medium"
            aria-label="fitler"
            disabled
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
            items={immunizationList}
            updateList={updateList}
            setEdit={setEdit}
          />
        </Grid>
      </Grid>
      <CreateImmunization
        key={modalKey}
        modalStatus={createModalStatus}
        setModalStatus={setCreateModalStatus}
        updateList={updateList}
        editing={editing}
      />
    </Page>
  </>)
}
 
export default ImmunizationPage

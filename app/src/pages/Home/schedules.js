import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar'
import api from '../../services'
import {
  Grid,
  Fab,
} from '@material-ui/core'
import {
  Add as AddIcon,
} from '@material-ui/icons'
import ScheduleItem from './scheduleItem'
import CreateSchedule from './createSchedule'

const Schedules = () => {
  const [createModalStatus, setCreateModalStatus] = useState(false)
  const [scheduleList, setScheduleList] = useState([])
  const [editing, setEditing] = useState({})

  const updateList = async (filters = {}) => {
    setCreateModalStatus(false)
    const schedules = await api.schedule.list(filters)
    setScheduleList(schedules)
  }

  const deleteItem = id => {
    api.schedule.remove(id).then(() => {
      alert('Lembrete deletado com sucesso!')
      updateList()
    })
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
    <Grid container>
      <Grid item xs={12} sm={6}>
        <h1>Seus Lembretes:</h1>
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
      <Grid container item xs={12} spacing={2}>
        {scheduleList.map((item) => (
          <ScheduleItem
            key={item.id}
            item={item}
            setEdit={setEdit}
            deleteItem={deleteItem}
          />
        ))}
      </Grid>
    </Grid>
    <CreateSchedule
      key={modalKey}
      modalStatus={createModalStatus}
      setModalStatus={setCreateModalStatus}
      updateList={updateList}
      editing={editing}
    />
  </>)
}
 
export default Schedules

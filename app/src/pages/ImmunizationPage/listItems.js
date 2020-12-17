import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Collapse,
} from '@material-ui/core'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons'
import { join, pipe, reverse, split } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'
import ExportFhir from '../../components/ExportFhir'
import Attachment from '../../components/Attachment'

import api from '../../services'

const formatDate = isoDateString => {
  if (!isoDateString) return ''
  return pipe(split('-'), reverse, join('/'))(isoDateString)
}

const Content = ({ item, updateList }) => {
  const classes = makeStyles((theme) => ({
    root: {
      marginTop: 10,
      marginBottom: 10,
    },
    paper: {
      padding: 15,
      textAlign: 'left',
      color: theme.palette.text.secondary,
      whiteSpace: 'pre-line',
    },
    observation: {
      minHeight: 80,
    },
  }))()

  return (<div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item container spacing={1} xs={12} md={6}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <strong>Data:</strong> {formatDate(item.date)}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <strong>Local:</strong> {item.location || '-'}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <strong>Dose:</strong> {item.doseQuantity || '-'}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <strong>Lote:</strong> {item.lotNumber || '-'}
          </Paper>
        </Grid>
      </Grid>
      <Grid item container spacing={1} xs={12} md={6}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <strong>Validade:</strong> {formatDate(item.expirationDate) || '-'}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={[classes.paper, classes.observation].join(' ')}>
            <strong>Observações:</strong><br/>{item.observation || '-'}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Attachment
            item={item}
            type={'immunization'}
            updateList={updateList}
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        direction="row"
        justify="flex-end"
      >
        <ExportFhir
          type={'immunization'}
          id={item.id}
          updateList={updateList}
        />
      </Grid>
    </Grid>
  </div>)
}

const Row = ({
  row,
  setEdit,
  deleteItem,
  updateList,
}) => {
  const classes = makeStyles(() => ({
    header: {
      cursor: 'pointer',
    },
    delete: {
      color: 'red',
      cursor: 'pointer',
    },
    edit: {
      marginRight: '10',
      cursor: 'pointer',
    },
  }))()
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow key={row.id}>
        <TableCell
          className={classes.header}
          scope="row"
          onClick={() => setOpen(!open)}
        >
          {row.immunizationCode.name}
        </TableCell>
        <TableCell
          className={classes.header}
          align="right"
          onClick={() => setOpen(!open)}
        >
          {formatDate(row.date)}
        </TableCell>
        <TableCell align="right">
          <EditIcon
            className={classes.edit}
            onClick={() => setEdit(row)}
          />
          <DeleteIcon
            className={classes.delete}
            onClick={() => deleteItem(row.id)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit style={{ marginBottom: 10}}>
            <Content item={row} updateList={updateList}/>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const ListItems = ({
  items: rows,
  updateList,
  setEdit,
}) => {
  const deleteItem = id => {
    api.immunization.remove(id).then(() => {
      alert('Vacina deletada com sucesso!')
      updateList()
    })
  }

  return (<>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">
              <strong>Nome</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Data</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Ações</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              setEdit={setEdit}
              deleteItem={deleteItem}
              updateList={updateList}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>)
}

export default ListItems

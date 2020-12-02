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
import { head, join, pipe, reverse, split } from 'ramda'

import api from '../../services'

const formatDate = isoDateString => {
  if (!isoDateString) return ''
  return pipe(split('T'), head, split('-'), reverse, join('/'))(isoDateString)
}

const Row = ({
  row,
  setEdit,
  deleteItem,
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow key={row.id}>
        <TableCell scope="row" onClick={() => setOpen(!open)}>
          {row.immunizationCode.name}
        </TableCell>
        <TableCell align="right" onClick={() => setOpen(!open)}>
          {formatDate(row.date)}
        </TableCell>
        <TableCell align="right" onClick={() => setOpen(!open)}>
          {formatDate(row.expirationDate)}
        </TableCell>
        <TableCell align="right">
          <EditIcon
            style={{marginRight: '10', cursor: 'pointer' }}
            onClick={() => setEdit(row)}
          />
          <DeleteIcon
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => deleteItem(row.id)}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Grid container>
              <Grid item xs={12} style={{ whiteSpace: 'noraml', wordBreak: 'break-word'}}>
                {JSON.stringify(row)}
              </Grid>
            </Grid>
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
            <TableCell align="left">Nome</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Validade</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row
              key={row.id}
              row={row}
              setEdit={setEdit}
              deleteItem={deleteItem}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>)
}

export default ListItems

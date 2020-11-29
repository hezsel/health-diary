import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
            <TableRow key={row.id}>
              <TableCell scope="row">
                {row.immunizationCode.name}
              </TableCell>
              <TableCell align="right">{formatDate(row.date)}</TableCell>
              <TableCell align="right">{formatDate(row.expirationDate)}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>)
}

export default ListItems

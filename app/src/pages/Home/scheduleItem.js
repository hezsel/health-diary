import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  MenuItem,
  MenuList,
  Paper,
  Grow,
  Popper,
  ClickAwayListener,
} from '@material-ui/core'
import {
  AccessTime as AccessTimeIcon,
  Healing as HealingIcon,
  Assignment as AssignmentIcon,
  MoreVert as MoreVertIcon, 
} from '@material-ui/icons'
import { join, pipe, reverse, split } from 'ramda'
import { makeStyles } from '@material-ui/core/styles'

const formatDate = isoDateString => {
  if (!isoDateString) return ''
  return pipe(split('-'), reverse, join('/'))(isoDateString)
}

const getScheduleType = (item) => {
  if (item.diagnosticCode) return 'diagnosticCode'
  if (item.immunizationCode) return 'immunizationCode'
  return 'other'
}

const scheduleIcons = (type) => {
  if (type === 'diagnosticCode') {
    return (<AssignmentIcon />)
  }
  if (type === 'immunizationCode') {
    return (<HealingIcon />)
  }
  return (<AccessTimeIcon />)
}

const ScheduleItem = ({ item, setEdit, deleteItem }) => {
  const classes = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
      minHeight: 250,
    },
    action: {
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    immunizationCode: {
      backgroundColor: '#11cb5f',
    },
    diagnosticCode: {
      backgroundColor: '#6966f6',
    },
    other: {
      backgroundColor: '#d3d3d3',
    },
  }))()
  const [scheduleType] = useState(getScheduleType(item))
  const anchorRef = useRef(null)
  const [openMenu, setOpenMenu] = React.useState(false)
  const prevOpen = useRef(openMenu)

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen)
  }

  const handleClose = (type) => (event) => {
    if (type === 'edit') {
      setEdit(item)
    }
    if (type === 'delete') {
      deleteItem(item.id)
    }
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }

    setOpenMenu(false)
  }

  useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = openMenu
  }, [openMenu])

  return(<>
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes[scheduleType]}>
              {scheduleIcons(scheduleType)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" ref={anchorRef} onClick={handleToggle}>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.name}
          subheader={scheduleType !== 'other' ? item[scheduleType].name : ''}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>{item.location}</strong><br />
            <strong>data: {formatDate(item.date)}</strong><br />
            <strong>horário: {item.time}</strong><br />
            {item.observation || 'Sem observações'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose('none')}>
              <MenuList autoFocusItem={openMenu} id="menu-list-grow">
                <MenuItem onClick={handleClose('edit')}>Editar</MenuItem>
                <MenuItem onClick={handleClose('delete')}>Deletar</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  </>)
}

export default ScheduleItem

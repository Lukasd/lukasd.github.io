import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { Link as RouterLink } from 'react-router-dom'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Alert from '@material-ui/lab/Alert'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

import actions from '../../actions'

//images
import Img_Logo from '../../assets/images/logo.png'

export default () => {
  let { token } = useParams()

  const dispatch = useDispatch()
  const classes = useStyles()

  const isValidating = useSelector((state) => state.validate.isValidating)
  const isActivated = useSelector((state) => state.validate.isActivated)
  const message = useSelector((state) => state.validate.message)

  useEffect(() => {
    dispatch(actions.validateEmail(token))
  }, [token])

  return (
    <Container>
      <div className={classes.paper}>
        <Avatar variant="square" alt="name.cz" src={Img_Logo} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Aktivace účtu
        </Typography>
        <div className={classes.paper}>
          <ValidateStatus isValidating={isValidating} isActivated={isActivated} message={message} />
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

const ValidateStatus = ({ isValidating, isActivated, message }) => {
  if (isActivated && !isValidating) {
    return (
      <>
        <CheckCircleOutlineIcon fontSize="large" style={{ color: green[500], fontSize: 50, marginBottom: '32px' }} />
        <Alert variant="filled" severity="success">
          {message}
        </Alert>
      </>
    )
  } else if (!isActivated && !isValidating) {
    return (
      <>
        <ErrorOutlineIcon fontSize="large" style={{ color: red[500], fontSize: 50, marginBottom: '32px' }} />
        <Alert variant="filled" severity="error">
          {message}
        </Alert>
      </>
    )
  } else {
    return <CircularProgress />
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link component={RouterLink} color="inherit" to="/">
        .cz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}))

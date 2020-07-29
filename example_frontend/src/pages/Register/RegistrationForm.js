import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import CircularProgress from '@material-ui/core/CircularProgress'
import asyncValidate from './asyncValidate'
import Tooltip from '@material-ui/core/Tooltip'
import InputAdornment from '@material-ui/core/InputAdornment'
import ErrorIcon from '@material-ui/icons/Error'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

//tes
import { useSelector } from 'react-redux'
import { getFormAsyncErrors, getFormSyncErrors, getFormMeta, isInvalid } from 'redux-form'

//copyright
import Copyright from '../../components/Copyright'

//validate
import validate from './validate'

//dialog
import Dialog from '../../components/Dialog'

//images
import Img_Logo from '../../assets/images/logo.png'

const renderInputHelper = ({ classes, handleTooltipOpen, validatedInputStyle, label, name, input, meta: { touched, invalid }, ...custom }) => (
  <FormControl fullWidth error={touched && invalid} variant="outlined">
    <InputLabel htmlFor={name}>{label}</InputLabel>
    <OutlinedInput
      endAdornment={
        touched && invalid ? (
          <InputAdornment position="end">
            <ErrorIcon onClick={handleTooltipOpen} style={{ color: red[500], cursor: 'pointer' }} />
          </InputAdornment>
        ) : touched && !invalid ? (
          <CheckCircleIcon style={{ color: green[500], cursor: 'pointer' }} />
        ) : null
      }
      classes={touched && !invalid ? { notchedOutline: validatedInputStyle } : null}
      id={name}
      value={name}
      name={name}
      label={label}
      {...input}
      {...custom}
    />
  </FormControl>
)

const renderCheckbox = ({ handleTooltipOpen, validatedCheckbox, input, label, meta: { touched, invalid, error }, ...custom }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <FormControlLabel
      control={<Checkbox style={input.value ? { color: green[400] } : null} checked={input.value ? true : false} onChange={input.onChange} />}
      label={label}
    />
    {touched && invalid && <ErrorIcon onClick={handleTooltipOpen} style={{ color: red[500], cursor: 'pointer', margin: '0 14px 0 5px' }} />}
  </div>
)

const STooltip = ({ name, type, label, touched, syncError, asyncError, component, classes }) => {
  const [open, setOpen] = useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <ErrorTooltip
        placement="top"
        open={open && ((asyncError ? true : false) || (syncError ? true : false))}
        title={asyncError || syncError}
        arrow={true}
      >
        <div>
          <Field
            handleTooltipOpen={handleTooltipOpen}
            name={name}
            type={type}
            component={component}
            validatedInputStyle={classes.validatedInputStyle}
            label={label}
            onFocus={touched && (asyncError || syncError) ? handleTooltipOpen : null}
          />
        </div>
      </ErrorTooltip>
    </ClickAwayListener>
  )
}

const ErrorTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: red[500],
    color: 'white',
    fontSize: 15,
    padding: '10px 20px',
  },
  arrow: {
    '&:before': { color: red[500] },
  },
  tooltipPlacementTop: {
    margin: '40px 0 10px 0 ',
  },
}))(Tooltip)

const RegistrationForm = (props) => {
  const { handleSubmit, submitting } = props
  const classes = useStyles()

  const formErrors = useSelector((state) => ({
    async: getFormAsyncErrors('RegistrationForm')(state),
    sync: getFormSyncErrors('RegistrationForm')(state),
    meta: getFormMeta('RegistrationForm')(state),
    invalid: isInvalid('RegistrationForm')(state),
  }))

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar variant="square" alt="name.cz" src={Img_Logo} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Registrace
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <STooltip
                name="email"
                type="text"
                label="Email"
                touched={formErrors.meta.email?.touched ?? false}
                syncError={formErrors.sync?.email ?? false}
                asyncError={formErrors.async?.email ?? false}
                classes={classes}
                component={renderInputHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <STooltip
                name="password"
                type="password"
                label="Heslo"
                touched={formErrors.meta.password?.touched ?? false}
                syncError={formErrors.sync?.password ?? false}
                asyncError={formErrors.async?.password ?? false}
                classes={classes}
                component={renderInputHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <STooltip
                name="terms"
                touched={formErrors.meta.terms?.touched ?? false}
                syncError={formErrors.sync?.terms ?? false}
                asyncError={formErrors.async?.terms ?? false}
                classes={classes}
                component={renderCheckbox}
                label={<TermsLabel text="Souhlasím s podmínkami" />}
              />
            </Grid>
          </Grid>
          <Button type="submit" disabled={submitting} size="large" fullWidth variant="contained" color="primary" className={classes.submit}>
            {submitting ? <CircularProgress size={24} /> : 'Registrovat'}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgotten" variant="body2">
                Zapomenuté heslo
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/login" variant="body2">
                {'Přihlásit se'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default reduxForm({
  form: 'RegistrationForm',
  validate,
  asyncValidate,
})(RegistrationForm)

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: '600px',
  },
  helperError: {
    margin: theme.spacing(1, 0, 0, 0),
  },
  validatedInputStyle: {
    borderColor: 'green',
    borderWidth: 2,
    //backgroundColor: 'rgba(0, 255, 0, 0.1)',
  },
  validatedCheckbox: {
    color: green[400],
  },
  errTooltip: {
    tooltipArrow: {
      backgroundColor: '#e6db74',
    },
    backgroundColor: '#e6db74',
    color: 'black',
  },
}))

const TermsLabel = ({ text }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Typography style={{ textDecoration: 'underline' }} component="span" onClick={handleOpen}>
        {text}
      </Typography>
      <Dialog title={'Podmínky'} open={open} handleOpen={handleOpen} handleClose={handleClose} />
    </>
  )
}

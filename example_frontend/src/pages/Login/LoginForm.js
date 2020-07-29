import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormHelperText from '@material-ui/core/FormHelperText'
import Container from '@material-ui/core/Container'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'
import { push } from 'connected-react-router'
import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Tooltip from '@material-ui/core/Tooltip'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import InputAdornment from '@material-ui/core/InputAdornment'
import ErrorIcon from '@material-ui/icons/Error'

import { getFormSyncErrors, getFormSubmitErrors, getFormMeta, isInvalid } from 'redux-form'

import submit from './submit'
import actions from '../../actions'

import Copyright from '../../components/Copyright'
//images
import Img_Logo from '../../assets/images/logo.png'

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

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Musíte vyplnit email'
  } else if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Špatný formát'
  }

  if (!values.password) {
    errors.password = 'Musíte vyplnit heslo'
  } else if (values.password.length < 8) {
    errors.password = 'Min. 8 znaků'
  }

  return errors
}

const renderInputHelper = ({ handleTooltipOpen, validatedInputStyle, label, name, input, meta: { touched, invalid }, ...custom }) => (
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

const renderCheckbox = ({ input, label, meta: { touched, invalid, error }, ...custom }) => (
  <div>
    <FormControlLabel
      control={<Checkbox style={input.value ? { color: green[400] } : null} checked={input.value ? true : false} onChange={input.onChange} />}
      label={label}
    />
  </div>
)

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const SnackbarError = ({ error }) => {
  return (
    <Snackbar open={true} autoHideDuration={6000}>
      <Alert severity="warning">{error}</Alert>
    </Snackbar>
  )
}

const STooltip = ({ name, type, label, touched, syncError, submitError, component, validatedInputStyle }) => {
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
        open={open && ((syncError ? true : false) || (submitError ? true : false))}
        title={syncError || submitError}
        arrow={true}
      >
        <div>
          <Field
            handleTooltipOpen={handleTooltipOpen}
            name={name}
            type={type}
            component={component}
            validatedInputStyle={validatedInputStyle}
            label={label}
            onFocus={touched && (syncError || submitError) ? handleTooltipOpen : null}
          />
        </div>
      </ErrorTooltip>
    </ClickAwayListener>
  )
}

const LoginForm = (props) => {
  const { error, handleSubmit, submitting } = props
  const classes = useStyles()

  const formErrors = useSelector((state) => ({
    sync: getFormSyncErrors('LoginForm')(state),
    submit: getFormSubmitErrors('LoginForm')(state),
    meta: getFormMeta('LoginForm')(state),
    invalid: isInvalid('LoginForm')(state),
  }))

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar variant="square" alt="name.cz" src={Img_Logo} className={classes.avatar} />
        <Typography component="h1" variant="h5">
          Přihlášení
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <STooltip
                name="email"
                type="text"
                label="Email"
                touched={formErrors.meta.email?.touched ?? false}
                syncError={formErrors.sync?.email ?? false}
                submitError={formErrors.submit?.email ?? false}
                validatedInputStyle={classes.validatedInputStyle}
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
                submitError={formErrors.submit?.password ?? false}
                validatedInputStyle={classes.validatedInputStyle}
                component={renderInputHelper}
              />
            </Grid>
            <Grid item xs={12}>
              <Field name="remember" component={renderCheckbox} label="Zůstat přihlášen/a" />
            </Grid>
          </Grid>
          <Button type="submit" disabled={submitting} size="large" fullWidth variant="contained" color="primary" className={classes.submit}>
            Přihlásit se
          </Button>

          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgotten" variant="body2">
                Zapomenuté heslo
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {'Registrace'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* {error ? <SnackbarError error={error} /> : null} */}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default reduxForm({
  form: 'LoginForm',
  validate,
  onSubmitSuccess: (result, dispatch) => {
    dispatch(actions.verifyUser())
    dispatch(push('/'))
  },
})(LoginForm)

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
}))

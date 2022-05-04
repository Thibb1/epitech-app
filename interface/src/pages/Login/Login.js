import { Button, TextField, Typography } from '@mui/material'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useAuth } from 'base-shell/lib/providers/Auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme } from '@mui/material/styles'
import CustomPaper from '../../components/CustomPaper'

const Login = ({ redirectTo = '/' }) => {
  const intl = useIntl()
  const theme = useTheme()
  const navigate = useNavigate()
  let location = useLocation()
  const [autoLoginUrl, setAutoLoginUrl] = useState('')
  const { toggleThis } = useMenu()
  const { setAuth } = useAuth()

  function handleSubmit(event) {
    event.preventDefault()
    const smatch = autoLoginUrl?.match(/^https:\/\/intra\.epitech\.eu\/auth-(\w{40})$/);
    if (smatch.length !== 2)
      return;
    console.log(smatch);
    authenticate({
      displayName: 'User',
      login: smatch[1],
    })
  }

  const authenticate = (user) => {
    // const loadName = async () => {
    //   const data = await fetch(user.login)
    // }
    setAuth({ isAuthenticated: true, ...user })
    toggleThis('isAuthMenuOpen', false)

    let from = new URLSearchParams(location.search).get('from')

    if (from) {
      navigate(from, { replace: true })
    } else {
      navigate(redirectTo, { replace: true })
    }
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: 'sign_in' })}>
      <CustomPaper elevation={6}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: `100%`,
          }}
        >
          <Typography component="h1" variant="h5">
            {intl.formatMessage({ id: 'sign_in' })}
          </Typography>
          <form
            style={{ marginTop: theme.spacing(1) }}
            onSubmit={handleSubmit}
            noValidate
          >
            <TextField
              value={autoLoginUrl}
              onInput={(e) => setAutoLoginUrl(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="autoLoginUrl"
              label={intl.formatMessage({ id: 'auto_login_url' })}
              id="autoLoginUrl"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ margin: theme.spacing(3, 0, 2) }}
              disabled={!autoLoginUrl?.match(/^https:\/\/intra\.epitech\.eu\/auth-\w{40}$/)}
            >
              {intl.formatMessage({ id: 'sign_in' })}
            </Button>
          </form>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <a href="https://intra.epitech.eu/admin/autolog" target="_blank" rel="noreferrer">
              {intl.formatMessage({ id: 'get_auto_login_url' })}
            </a>
            {/*<Link to="/password_reset">*/}
            {/*  {intl.formatMessage({ id: 'forgot_password' })}?*/}
            {/*</Link>*/}
          </div>
        </div>
      </CustomPaper>
    </Page>
  )
}

export default Login

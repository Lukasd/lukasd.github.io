import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import { Switch, Route, Redirect } from 'react-router-dom'
import { history } from '../../configureStore'
import { ConnectedRouter } from 'connected-react-router'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'

//components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'

//pages
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import Forgotten from '../../pages/Forgotten'
import Home from '../../pages/Home'
import Create from '../../pages/Create'
import Browse from '../../pages/Browse'
import Teams from '../../pages/Teams'
import Events from '../../pages/Events'
import Validate from '../../pages/Validate'

export default ({ isLoggedIn, isLoading }) => {
	if (isLoading) {
		return <LoadingPage />
	} else {
		return (
			<ConnectedRouter history={history}>
				<CssBaseline />
				<Switch>
					<Route path="/login">{isLoggedIn ? <Redirect to="/" /> : <Login />}</Route>
					<Route path="/register">{isLoggedIn ? <Redirect to="/" /> : <Register />}</Route>
					<Route path="/forgotten">{isLoggedIn ? <Redirect to="/" /> : <Forgotten />}</Route>
					<Route path="/validate/:token">{isLoggedIn ? <Redirect to="/" /> : <Validate />}</Route>
					<Route path="/create">
						<Layout>
							<Create />
						</Layout>
					</Route>
					<Route path="/browse">
						<Layout>
							<Browse />
						</Layout>
					</Route>
					<Route path="/teams">
						<Layout>
							<Teams />
						</Layout>
					</Route>
					<Route path="/events">
						<Layout>
							<Events />
						</Layout>
					</Route>
					<Route exact path="/">
						{isLoggedIn ? (
							<Layout>
								<Home />
							</Layout>
						) : (
							<Redirect to="/login" />
						)}
					</Route>
					<Route path="*">
						<NoMatch />
					</Route>
				</Switch>
			</ConnectedRouter>
		)
	}
}

const LoadingPage = () => (
	<div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
		<CircularProgress />
	</div>
)

const Layout = ({ children }) => (
	<>
		<Navbar />
		<div style={{ padding: '0 0 0 60px' }}>{children}</div>
	</>
)

const NoMatch = () => <div>404 not found</div>

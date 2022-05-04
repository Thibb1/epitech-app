// dependencies
const express = require('express')
const helmet = require('helmet');
const morgan = require('morgan');

// express app
const app = express()

// middlewares
app.use(helmet())
app.use(morgan('dev'))

// api wrapper
const api = require('./api')

// routes

app.get('/api/user', (req, res) => {
  api.get_user_info(req.query.token)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err))
})

// TODO check if startDate and endDate are valid and their range is correct
app.get('/api/planning/:start_date/:end_date', (req, res) => {
  api.get_planning_events(req.query.token, req.params.start_date, req.params.end_date)
    .then(events => res.json(events))
    .catch(err => res.status(500).json(err))
})

// start server
app.listen(3001, () => console.log('Server started on port 3001'))
// i = `${base_uri}${auth}/planning/load?format=json&start=2022-05-02&end=2022-05-08`
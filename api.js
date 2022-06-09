// base variables
const axios = require('axios');
const base_uri = 'https://intra.epitech.eu'

// fetch wrapper with error handling
async function fetch_call(uri, query_params = {}) {
  query_params.format = 'json'
  const params = new URLSearchParams(query_params)
  console.log(`${uri}?${params}`)
  const res = await axios.get(`${uri}?${params}`)
  const json = res.data
  if (json.error) {
    return json.error
  }
  return json
}

// api wrapper
async function api_call(auth_token, api_endpoint, query_params = {}) {
  const uri = `${base_uri}/${auth_token}/${api_endpoint}`
  return await fetch_call(uri, query_params)
}

async function get_user_info(auth_token) {
  return await api_call(auth_token, 'user')
}

async function get_planning_events(auth_token, start_date, end_date) {
  return await api_call(auth_token, 'planning/load', {
    start: start_date,
    end: end_date
  })
}

module.exports = {
  get_user_info,
  get_planning_events
}
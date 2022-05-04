// base variables
const base_uri = '/api'

// fetch wrapper with error handling
async function fetch_call(uri, query_params = {}) {
  const params = new URLSearchParams(query_params)
  const res = await fetch(uri + '?' + params)
  const json = await res.json()
  if (json.error) {
    return json.error
  }
  return json
}

// api wrapper
async function api_call(auth_token, api_endpoint, query_params = {}) {
  query_params.token = 'auth-' + auth_token
  const uri = `${base_uri}/${api_endpoint}`
  return await fetch_call(uri, query_params)
}

export async function get_user_info(auth_token) {
  return await api_call(auth_token, 'user')
}

export async function get_planning_events(auth_token, start_date, end_date) {
  return await api_call(auth_token, `planning/${start_date}/${end_date}`)
}
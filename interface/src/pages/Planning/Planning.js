import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import { useIntl } from 'react-intl'

import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  MonthView,
  ViewSwitcher,
  Toolbar,
  Appointments,
  DateNavigator,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { get_planning_events } from '../../api/api'
import { buildFilter, filterData, mapData } from '../../utils/filter'
import { useAuth } from 'base-shell/lib/providers/Auth';
import { ConstructionOutlined } from '@mui/icons-material';

function myFetch(uri) {
  return fetch(uri)
    .then(res => res.json())
    .then(json => {
      if (json.error) {
        console.log(json.error)
        return []
      }
      return json
    })
    .catch(err => {
      console.log(err)
      return []
    })
}


const Planning = () => {
  let rawSchelerData = JSON.parse(localStorage.getItem('schedulerData')) || []
  const { auth } = useAuth()
  if (!rawSchelerData.length && auth?.login) {
    get_planning_events(auth?.login, '2022-05-02', '2022-05-08')
      .then(data => {
        const map = {
          startDate: 'start',
          endDate: 'end',
          title: 'acti_title',
          moduleCode: 'codemodule',
          codeInstance: 'codeinstance',
          moduleTitle: 'titlemodule',
          moduleAvailable: 'module_available',
          moduleRegistered: 'module_registered',
          allowRegister: 'allow_register',
          eventRegistered: 'event_registered',
        }
        const mappedData = mapData(data, map)
        localStorage.setItem('schedulerData', JSON.stringify(mappedData))
        rawSchelerData = mappedData
      })
  }
  const query = {
    moduleCode: [
      'B-ANG-001',
      'G-EPI-004',
    ],
    codeInstance: [
      // 'LIL-0-1',
    ],
    moduleAvailable: [
      // true,
    ],
    modeduleRegistered: [
      // true,
    ],
    allowRegister: [
      // true,
    ],
    eventRegistered: [

    ],
  }
  // console.log(query)
  const filter = buildFilter(query)
  // console.log(filter)
  const filteredSchedulerData = filterData(rawSchelerData, filter)
  console.log(filteredSchedulerData)

  const data = [{
    fieldName: 'moduleCode',
    title: 'moduleCode',
    allowMultiple: false,
    instances: [
      { id: 'B-ANG-001', text: 'B-ANG-001' },
      { id: 'G-EPI-004', text: 'G-EPI-004' },
    ],
  }]
  // parse fetch data to schedulerData
  // const schedulerData = [
  //
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Paper>
        <Scheduler
          locale={intl.locale}
          data={filteredSchedulerData}
        >
          {/* <ViewState
            currentDate={currentDate}
          /> */}
          <ViewState
            defaultCurrentViewName="Week"
          />
          <MonthView
            startDayHour={9}
            endDayHour={19}
          />
          <WeekView
            startDayHour={9}
            endDayHour={19}
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <Appointments />
          <AppointmentTooltip
            showCloseButton
          />
          <AppointmentForm
            readOnly
          />
          <Resources
            mainResourceName='moduleCode'
            dataSource={data}
          />
        </Scheduler>
      </Paper>
    </Page>
  )
}
export default Planning

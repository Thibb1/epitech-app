import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import { useIntl } from 'react-intl'

import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
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
import { buildFilter, filterData, filterOutData, mapData } from '../../utils/filter'
import { useAuth } from 'base-shell/lib/providers/Auth';

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
  // TODO on the fly query
  const query = {
    moduleCode: [
      // 'B-ANG-001',
      // 'G-EPI-004',
    ],
    codeInstance: [
      // 'LIL-0-1',
      'LIL-4-1',
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
  const filter = buildFilter(query)
  let filteredSchedulerData = filterData(rawSchelerData, filter)
  const queryOut = {
    moduleCode: [
      'B-ANG-001',
    ],
    codeInstance: [
      // 'LIL-0-1',
      'LIL-2-1',
      'FR-8-1',
    ],
  }
  const filterOut = buildFilter(queryOut)
  filteredSchedulerData = filterOutData(filteredSchedulerData, filterOut)
  console.log(filteredSchedulerData)

  const moduleCodeInstances = filteredSchedulerData
    .map(item => item.moduleCode)
    .filter((item, index, self) => self.findIndex(i => i === item) === index)
    .map(moduleCode => {return {id: moduleCode, text: moduleCode}})
  const codeInstanceModules = filteredSchedulerData
    .map(item => item.codeInstance)
    .filter((item, index, self) => self.findIndex(i => i === item) === index)
    .map(codeInstance => {return {id: codeInstance, text: codeInstance}})
  const moduleTitleInstances = filteredSchedulerData
    .map(item => item.moduleTitle)
    .filter((item, index, self) => self.findIndex(i => i === item) === index)
    .map(moduleTitle => {return {id: moduleTitle, text: moduleTitle}})

  const resources = [
    {
      fieldName: 'moduleCode',
      title: 'moduleCode',
      isMain: true,
      instances: moduleCodeInstances,
    },
    {
      fieldName: 'codeInstance',
      title: 'codeInstance',
      instances: codeInstanceModules,
    },
    {
      fieldName: 'moduleTitle',
      title: 'moduleTitle',
      instances: moduleTitleInstances,
    }
  ]
  // TODO remove time on tiles for mobile users
  // const layout = props => (
  //   <WeekView.Layout
  //     {...props}
  //   />
  // )
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Paper>
        <Scheduler
          locale={intl.locale}
          data={filteredSchedulerData}
          firstDayOfWeek={1}
        >
          {/* TODO save currentDate to keep it on refresh
          <ViewState
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
          <DayView
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
            data={resources}
          />
        </Scheduler>
      </Paper>
    </Page>
  )
}
export default Planning

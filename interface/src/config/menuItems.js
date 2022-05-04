import React from 'react'
import {
  CalendarMonth as CalendarIcon,
  ChromeReaderMode,
  Dashboard as DashboardIcon,
  ExitToApp as ExitToAppIcon,
  GetApp,
  InfoOutlined,
  Language as LanguageIcon,
  Lock as LockIcon,
  MenuOpen as MenuOpenIcon,
  SettingsApplications as SettingsIcon,
  Style as StyleIcon,
} from '@mui/icons-material'

import allLocales from './locales'
import allThemes from './themes'

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props

  const { toggleThis, isDesktop, isMiniSwitchVisibility } =
    menuContext
  const { themeID, setThemeID } = themeContext

  const { auth, setAuth } = authData
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />,
    }
  })

  const isAuthorised = auth.isAuthenticated

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    }
  })

  return [
    {
      value: '/home',
      visible: isAuthorised || false,
      primaryText: intl.formatMessage({ id: 'home' }),
      leftIcon: <DashboardIcon />,
    },
    {
      value: '/planning',
      visible: isAuthorised || false,
      primaryText: intl.formatMessage({ id: 'planning' }),
      leftIcon: <CalendarIcon />,
    },
    // {
    //   visible: isAuthorised || false,
    //   primaryText: intl.formatMessage({ id: 'demos', defaultMessage: 'Demos' }),
    //   primaryTogglesNestedList: true,
    //   leftIcon: <Web />,
    //   // nestedItems: [
    //   //   {
    //   //     value: '/dialog_demo',
    //   //     visible: isAuthorised,
    //   //     primaryText: intl.formatMessage({
    //   //       id: 'dialog_demo',
    //   //       defaultMessage: 'Dialog',
    //   //     }),
    //   //     leftIcon: <ChatBubble />,
    //   //   },
    //   //   {
    //   //     value: '/toast_demo',
    //   //     visible: isAuthorised,
    //   //     primaryText: intl.formatMessage({
    //   //       id: 'toast_demo',
    //   //       defaultMessage: 'Toast',
    //   //     }),
    //   //     leftIcon: <QuestionAnswer />,
    //   //   },
    //   //   {
    //   //     value: '/filter_demo',
    //   //     visible: isAuthorised,
    //   //     primaryText: intl.formatMessage({
    //   //       id: 'filter_demo',
    //   //       defaultMessage: 'Filter',
    //   //     }),
    //   //     leftIcon: <FilterList />,
    //   //   },
    //   //   {
    //   //     value: '/list_page_demo',
    //   //     visible: isAuthorised,
    //   //     primaryText: intl.formatMessage({
    //   //       id: 'list_page_demo_menu',
    //   //       defaultMessage: 'List Page',
    //   //     }),
    //   //     leftIcon: <ViewList />,
    //   //   },
    //   //   {
    //   //     value: '/tabs_demo',
    //   //     visible: isAuthorised,
    //   //     primaryText: intl.formatMessage({
    //   //       id: 'tabs_demo',
    //   //       defaultMessage: 'Tabs Page',
    //   //     }),
    //   //     leftIcon: <Tab />,
    //   //   },
    //   // ],
    // },
    {
      value: '/about',
      visible: true,
      primaryText: intl.formatMessage({ id: 'about' }),
      leftIcon: <InfoOutlined />,
    },
    { divider: true },
    {
      primaryText: intl.formatMessage({ id: 'settings' }),
      primaryTogglesNestedList: true,
      leftIcon: <SettingsIcon />,
      nestedItems: [
        {
          primaryText: intl.formatMessage({ id: 'theme' }),
          secondaryText: intl.formatMessage({ id: themeID }),
          primaryTogglesNestedList: true,
          leftIcon: <StyleIcon />,
          nestedItems: themeItems,
        },
        {
          primaryText: intl.formatMessage({ id: 'language' }),
          secondaryText: intl.formatMessage({ id: locale }),
          primaryTogglesNestedList: true,
          leftIcon: <LanguageIcon />,
          nestedItems: localeItems,
        },
        {
          visible: !!isDesktop,
          onClick: () => {
            toggleThis('isMiniSwitchVisibility')
          },
          primaryText: intl.formatMessage({
            id: 'menu_mini_mode',
          }),
          leftIcon: isMiniSwitchVisibility ? (
            <MenuOpenIcon />
          ) : (
            <ChromeReaderMode />
          ),
        },
      ],
    },
    { divider: true },
    {
      value: '/login',
      visible: true,
      primaryText: isAuthorised || false
        ? intl.formatMessage({ id: 'sign_out' })
        : intl.formatMessage({ id: 'sign_in' }),
      onClick: isAuthorised
        ? () => {
          setAuth({ isAuthenticated: false })
        }
        : () => {},
      leftIcon: isAuthorised || false ? <ExitToAppIcon /> : <LockIcon />,
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ]
}
export default getMenuItems

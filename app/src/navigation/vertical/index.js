import {Mail, Home, User, Shield, Circle} from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'users',
    title: 'User',
    icon: <User/>,
    children: [
      {
        id: 'list',
        title: 'List',
        icon: <Circle size={12} />,

        navLink: '/user/list'

      },
      {
        id: 'permissions',
        title: 'Permissions',
        icon: <Circle size={12} />,

        navLink: '/user/permissions'
      }
    ]
  },
]

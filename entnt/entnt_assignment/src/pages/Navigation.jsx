import React from 'react'
import { MdSpaceDashboard } from 'react-icons/md'
import {LuShip} from 'react-icons/lu'
import { MdSettingsInputComponent } from "react-icons/md";
import { BsPersonWorkspace } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";

export const DASHBOARD_SIDEBAR_LINKS=[
  {
    key:'dashboard',
    label:'Dashboard',
    path:'/dashboard',
    icon:<MdSpaceDashboard color='white'/>
  },
  {
    key:'ships',
    label:'Ship',
    path:'/dashboard/ships',
    icon:<LuShip color='white'/>
  },
  {
    key:'components',
    label:'Components',
    path:'/dashboard/components',
    icon:<MdSettingsInputComponent color='white'/>
  },
  {
    key:'jobs',
    label:'Jobs',
    path:'/dashboard/jobs',
    icon:<BsPersonWorkspace color='white'/>
  },
  {
    key:'calendar',
    label:'Calendar',
    path:'/dashboard/calendar',
    icon:<IoCalendarOutline color='white'/>
  },

]

export default Navigation;
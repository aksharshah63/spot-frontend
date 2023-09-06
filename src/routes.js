import HomeComponent from './components/HomeComponent.vue'
import UserLogin from './components/Auth/UserLogin.vue'
import EventLogin from './components/Auth/EventLogin.vue'
import AddMemory from './components/Momory/AddMemory.vue'
import SingleMemory from './components/Momory/SingleMemory.vue'
import SingleViewMemory from './components/Momory/SingleViewMemory.vue'
import MyContributions from './components/User/MyContributions.vue'
import EventDetails from './components/User/EventDetails.vue'
import Layout from '@/components/Layout/LayoutComponent';
import Login from "@/pages/Login/LoginComponent";
import Memory from '@/pages/Memories/MemoryComponent'
import Code from '@/pages/Code/CodeComponent'
import Event from '@/pages/Events/EventComponent'
import AddEvent from '@/pages/Events/AddEventComponent'
import ViewEvent from '@/pages/Events/ViewEventComponent'
import EditEvent from '@/pages/Events/EditEventComponent'
import EventType from '@/pages/EventTypes/EventTypeComponent'
import AddEventType from '@/pages/EventTypes/AddEventTypeComponent'
import EditEventType from '@/pages/EventTypes/EditEventTypeComponent'
import CGV from '@/pages/cgv/CGVComponent'
import EventMemoryModeration from '@/pages/EventMemoryModeration/EventMemoryModerationComponent'
import BonusPlanComponent from './components/BonusPlanComponent.vue'
import AllMemoryComponent from './components/AllMemoryComponent.vue'
import AdminAllMemories from './components/AdminAllMemoriesComponent.vue'

// Pages
// import Dashboard from '@/pages/Dashboard/DashboardComponent';

export const routes = [
  {
    name: 'HomeComponent',
    path: '/',
    component: HomeComponent,
  },
  {
    name: 'BonusPlanComponent',
    path: '/bonus-plan',
    component: BonusPlanComponent,
  },
  {
    name: 'AllMemoryComponent',
    path: '/all-memory',
    component: AllMemoryComponent,
  },
  {
    name: 'AdminAllMemories',
    path: '/all-memories/:id',
    component: AdminAllMemories
  },
  {
    name: 'UserLogin',
    path: '/login',
    component: UserLogin,
  },
  {
    name: 'EventLogin',
    path: '/:code/',
    component: EventLogin,
  },
  {
    name: 'AddMemory',
    path: '/addmemory',
    component: AddMemory,
  },
  {
    name: 'SingleMemory',
    path: '/singlememory/:id',
    component: SingleMemory,
  },
  {
    name: 'SingleViewMemory',
    path: '/singleViewmemory',
    component: SingleViewMemory,
  },
  {
    name: 'MyContributions',
    path: '/mycontributions',
    component: MyContributions,
  },
  {
    name: 'EventDetails',
    path: '/details',
    component: EventDetails,
  },
  {
    name: '404',
    path: '*',
    component: HomeComponent,
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: Login
  },
  {
  path: '/',
  redirect: 'login',
  name: 'Layout',
  component: Layout,
  children: [
    // {
    //   path: '/admin/dashboard',
    //   name: 'Dashboard',
    //   beforeEnter: checkAdminRights,
    //   component: Dashboard,
    // },
    {
      path: '/admin/memories',
      name: 'Memories',
      // beforeEnter: checkAdminRights,
      component: Memory
    },
    {
      path: '/admin/events/:id?',
      name: 'Events',
      // beforeEnter: checkAdminRights,
      component: Event
    },
    {
      path: '/admin/event/create',
      name: 'AddEvent',
      // beforeEnter: checkAdminRights,
      component: AddEvent
    },
    {
      path: '/admin/event/code/create/:event_code/:id',
      name: 'EventCreateUser',
      // beforeEnter: checkAdminRights,
      component: Code
    },
    {
      path: '/admin/event/view/:id',
      name: 'ViewEvent',
      // beforeEnter: checkAdminRights,
      component: ViewEvent
    },
    {
      path: '/admin/event/edit/:id',
      name: 'EditEvent',
      // beforeEnter: checkAdminRights,
      component: EditEvent
    },
    {
      path: '/admin/event_types',
      name: 'EventTypes',
      // beforeEnter: checkAdminRights,
      component: EventType
    },
    {
      path: '/admin/eventtype/create',
      name: 'AddEventType',
      // beforeEnter: checkAdminRights,
      component: AddEventType
    },
    {
      path: '/admin/eventtype/edit/:id',
      name: 'EditEventType',
      // beforeEnter: checkAdminRights,
      component: EditEventType
    },
    {
      path: '/admin/event-memory-moderation/:id',
      name: 'EventMemoryModeration',
      // beforeEnter: checkAdminRights,
      component: EventMemoryModeration
    },
    {
      path: '/admin/cgv',
      name: 'cgv',
      // beforeEnter: checkAdminRights,
      component: CGV
    },
  ],
}
]

// function checkAdminRights(to, from, next) {
//   // check if the user is admin
//   if(localStorage.getItem("is_admin") == "true") {
//       next();       
//   } 
//   else {
//       next({ path: '/'});
//   }
// }

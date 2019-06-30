import MainPage       from '../views/main.vue'
import Home           from '../views/home.vue'
import Services       from '../views/services/services.vue'
// import ServiceDetail  from '../views/services/service_detail.vue'
// import ServiceEdit    from '../views/services/service_edit.vue'
import IterPlan       from '../views/tasks/iterplans/iterplans.vue'
// import IterPlanEdit   from '../views/tasks/iterplans/iterplan_edit.vue'
// import IterPlanDetail from '../views/tasks/iterplans/iterplan_detail.vue'
import AppTask        from '../views/tasks/apptasks/apptasks.vue'
// import AppTaskDetail  from '../views/tasks/apptasks/apptask_detail.vue'
// import ConfTask       from '../views/tasks/conftask.vue'

const routes = [
    { path: '/',
       component: MainPage,
        children: [
            { path: 'home',              component: Home },
            // { path: 'services/add',      component: ServiceEdit },
            // { path: 'services/:id',      component: ServiceDetail },
            // { path: 'services/:id/edit', component: ServiceEdit },
            { path: 'services',          component: Services },
            { path: 'iterplan',          component: IterPlan },
            // { path: 'iterplan/add',      component: IterPlanEdit },
            // { path: 'iterplan/:id',      component: IterPlanDetail },
            // { path: 'iterplan/:id/edit', component: IterPlanEdit },
            // { path: 'apptask/:id',       component: AppTaskDetail},
            { path: 'apptask'  ,         component: AppTask },
            // { path: 'conftask' ,         component: ConfTask },
        ],
      redirect: '/home'
    },
]

export default routes;

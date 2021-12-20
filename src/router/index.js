import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login/page/login.vue";
import AdminHome from "../views/Admin/page/admin-home.vue";
import CourseManagement from "../views/Courses/page/Course-management.vue";
import CourseAdd from "../views/Courses/page/Course-add.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/auth",
    name: "AdminHome",
    component: AdminHome,
  },
  {
    path: "/course",
    name: "Course-Management",
    component: CourseManagement,
  },
  {
    path: "/course/add",
    name: "CourseAdd",
    component: CourseAdd,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const togo = to.name;
  const forbidRoutes = ["Login"];

  const authEnable = (togo, forbidRoutes) => {
    console.log({ togo });
    return forbidRoutes.includes(togo);
  };

  const NoNeedAuth = authEnable(togo, forbidRoutes);

  console.log(NoNeedAuth);
  if (to.name !== "Login" && !localStorage.token) {
    if (NoNeedAuth) {
      return next();
    }
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;

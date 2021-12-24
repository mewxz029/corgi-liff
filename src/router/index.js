import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login/page/login.vue";
import AdminHome from "../views/Admin/page/admin-home.vue";
import CourseManagement from "../views/Courses/page/Course-management.vue";
import CourseAdd from "../views/Courses/page/Course-add.vue";
import CourseDetail from "../views/Courses/page/Course-detail-management.vue";
import CourseScheduleEdit from "../views/Courses/page/Course-schedule-edit.vue";
import CourseEdit from "../views/Courses/page/Course-edit.vue";
import RegisterForm from "../views/Register/page/RegisterForm.vue";
import StudentManagement from "../views/Students/page/Student-management.vue";
import CourseStudent from "../views/Courses/page/Course-student-management.vue";
import CourseStudentAdd from "../views/Courses/page/Course-student-add.vue";
import Welcome from "../views/Welcome/page/Welcome.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Welcome,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
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
  {
    path: "/course/:courseId",
    name: "CourseDetail",
    component: CourseDetail,
  },
  {
    path: "/course/schedule/edit/:courseId",
    name: "CourseScheduleEdit",
    component: CourseScheduleEdit,
  },
  {
    path: "/course/edit/:courseId",
    name: "CourseEdit",
    component: CourseEdit,
  },
  {
    path: "/register",
    name: "RegisterForm",
    component: RegisterForm,
  },
  {
    path: "/student",
    name: "Student-Management",
    component: StudentManagement,
  },
  {
    path: "/course/student/:courseId",
    name: "CourseStudent",
    component: CourseStudent,
  },
  {
    path: "/course/student/add/:courseId",
    name: "CourseStudentAdd",
    component: CourseStudentAdd,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const togo = to.name;
  const forbidRoutes = ["Login", "RegisterForm", "Home"];

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

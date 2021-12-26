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
import CourseStudent from "../views/Courses/page/Course-student-management.vue";
import CourseStudentAdd from "../views/Courses/page/Course-student-add.vue";

import StudentManagement from "../views/Students/page/Student-management.vue";
import StudentDetail from "../views/Students/page/Student-detail.vue";

import Welcome from "../views/Welcome/page/Welcome.vue";
import RegisterForm from "../views/Register/page/RegisterForm.vue";
import CourseCheck from "../views/Welcome/page/Course-check";
import CourseScheduleCheck from "../views/Welcome/page/Course-schedule.vue";
import CoursePlayback from "../views/Welcome/page/Course-playback.vue";

Vue.use(VueRouter);

const routes = [
  // LIFF USER Route
  {
    path: "/",
    name: "Home",
    component: Welcome,
  },
  {
    path: "/register",
    name: "RegisterForm",
    component: RegisterForm,
  },
  {
    path: "/check-course",
    name: "CheckCourse",
    component: CourseCheck,
  },
  {
    path: "/check-schedule",
    name: "CheckCourseSchedule",
    component: CourseScheduleCheck,
  },
  {
    path: "/check-playback",
    name: "CheckCoursePlayback",
    component: CoursePlayback,
  },
  // Admin Management Route
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
  // Course Management Route
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
    path: "/course/student/:courseId",
    name: "CourseStudent",
    component: CourseStudent,
  },
  {
    path: "/course/student/add/:courseId",
    name: "CourseStudentAdd",
    component: CourseStudentAdd,
  },
  // Student Management Route
  {
    path: "/student",
    name: "Student-Management",
    component: StudentManagement,
  },
  {
    path: "/student/:studentId",
    name: "StudentDetail",
    component: StudentDetail,
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
  const forbidRoutes = [
    "Login",
    "RegisterForm",
    "Home",
    "CheckCourse",
    "CheckCourseSchedule",
    "CheckCoursePlayback",
  ];

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

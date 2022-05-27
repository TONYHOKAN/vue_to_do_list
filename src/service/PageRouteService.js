import HomeView from "../views/HomeView.vue";
import CalculatorView from "../views/CalculatorView.vue";
import NotFound from "../views/NotFound.vue";
import NotAuthorized from "../views/NotAuthorized.vue";

const PageAccessPermissionService = {
  isAllowAccess(viewName, userRoleList) {
    console.log("viewName: " + viewName);
    const viewAccessPermission = this.getPagePermissionByViewName(viewName);
    console.log("viewAccessPermission: " + viewAccessPermission);
    // if viewAccessPermission not defined, everyone can access
    const isAllow =
      viewAccessPermission === undefined
        ? true
        : viewAccessPermission.filter((e) => userRoleList.includes(e))
            .length === 0
        ? false
        : true;
    console.log("isAllowAccess: " + isAllow);
    return isAllow;
  },
  getPagePermissionByViewName(viewName) {
    return this.getAllRoute()[viewName].viewAccessPermission;
  },
  getAllRoute() {
    return {
      [HomeView.name]: {
        path: "/",
        name: HomeView.name,
        component: HomeView,
        viewAccessPermission: ["ROLE_ADMIN"],
      },
      aboutView: {
        path: "/about",
        name: "aboutView",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
        viewAccessPermission: ["ROLE_ADMIN"],
      },
      [CalculatorView.name]: {
        path: "/calculator/:number",
        name: CalculatorView.name,
        component: CalculatorView,
        props: true,
        viewAccessPermission: ["ROLE_TEST"],
      },
      [NotAuthorized.name]: {
        path: "/notAuthorized",
        name: NotAuthorized.name,
        component: NotAuthorized,
      },
      [NotFound]: {
        path: "/:pathMatch(.*)*",
        name: NotFound.name,
        component: NotFound,
      },
    };
  },
};

export default PageAccessPermissionService;

import { createRouter, createWebHistory } from "vue-router";
import PageAccessPermissionService from "../service/PageRouteService";

const allRoute = PageAccessPermissionService.getAllRoute();
const routes = Object.keys(allRoute).map((e) => allRoute[e]);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const isAllow = PageAccessPermissionService.isAllowAccess(to.name, [
    "ROLE_ADMIN",
    "ROLE_TEST",
  ]);
  console.log("isAllow:" + isAllow);
  if (!isAllow) {
    router.push(PageAccessPermissionService.getAllRoute().notAuthorized.path);
  }
  return isAllow;
});

export default router;

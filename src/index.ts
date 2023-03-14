import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import Router from './utils/Router';
import { ProfilePage } from './pages/Profile';
import store from './utils/Store';
import AuthController from './controllers/AuthController';
declare global {
  interface Window {
    goToPage:any;
  }
}

enum Routes {
  Login = '/',
  Register = '/register',
  Profile = '/profile'
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Login, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, ProfilePage)

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Login:
    case Routes.Register:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Login);
    }
  }

});


import { LoginPage } from './pages/Login';
import { RegistrationPage } from './pages/Registration';
import Router from './utils/Router';
import { ProfilePageIsNotSave, ProfilePageIsSave } from './pages/Profile';
import AuthController from './controllers/AuthController';
import { ProfileSavePassword } from './pages/ProfileSavePassword';
import { ErrorPage } from './pages/Error';
import { MessengerPage } from './pages/Messenger';


enum Routes {
  Login = '/',
  Register = '/register',
  Profile = '/profile',
  ProfileSave = '/profilesave',
  ProfileSavePassword = '/profilesavepassword',
  Error = '/error',
  Messenger = '/messenger',
  AddRemoveUser = '/addremoveuser',
  Attach = '/attach',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Login, LoginPage)
    .use(Routes.Register, RegistrationPage)
    .use(Routes.Profile, ProfilePageIsNotSave)
    .use(Routes.ProfileSave, ProfilePageIsSave)
    .use(Routes.ProfileSavePassword, ProfileSavePassword)
    .use(Routes.Error, ErrorPage)
    .use(Routes.Messenger, MessengerPage)

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


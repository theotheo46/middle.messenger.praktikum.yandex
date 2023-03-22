import router from '../utils/Router';
import store from '../utils/Store';
import API, { ResourcesAPI} from '../api/ResourcesAPI';
import MessagesController from './MessagesController';


export class ResourcesController {
  private readonly api: ResourcesAPI;

  constructor() {
    this.api = API;
  }

  async saveresource(data: FormData) {
    try {
      const resInfo = await this.api.saveresource(data);
      const fullServerPath = this.api.get_res_url() + resInfo.path;
      const state = store.getState();
      MessagesController.sendMessage(state.selectedChat!, fullServerPath);

    } catch (e: any) {
        let errorText = 'Internal sever error';
        if ('response' in e && 'reason' in e.response) {
          errorText = e.response.reason;
        }
        store.set('error', {errorCode: e.status, errorText: errorText, to: '/messenger'});
        router.go('/error');
    }
  }

}

export default new ResourcesController();

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
      MessagesController.sendMessage(state.selectedChat, fullServerPath);

    } catch (e: any) {
        let errorText = 'Internal sever error';
        if ('response' in e && 'reason' in e.response) {
          errorText = e.response.reason;
        }
        alert(`Ошибка\nStatus:${e.status}\n${errorText}`);
    }
  }

}

export default new ResourcesController();

import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';
import router from '../utils/Router';
import userAPI, { UserAPI} from '../api/UserAPI';

class ChatsController {
  private readonly api: ChatsAPI;
  private readonly userapi: UserAPI;

  constructor() {
    this.api = API;
    this.userapi = userAPI;
  }

  async create(title: string) {
    try {
      await this.api.create(title);
      this.fetchChats();
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      store.set('error', { errorCode: e.status, errorText: errorText, to: '/messenger'});
      router.go('/error');
    }
  }

  async fetchChats() {
    const chats = await this.api.read();
    chats.map(async (chat) => {
      const token = await this.getToken(chat.id);

      await MessagesController.connect(chat.id, token);
    });

    store.set('chats', chats);
  }

 async addUserToChat(id: number, user: string) {
    try {
      //console.log(`addUserToChat: id=${id} user=${user}`)
      const user1 = await this.userapi.search({login: user});
      this.api.addUsers(id, [user1.id]);
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      store.set('error', { errorCode: e.status, errorText: errorText , to: '/messenger'});
      router.go('/error');
    }
  }

  async removeUserFromChat(id: number, user: string) {
    try {
      //console.log(`addUserToChat: id=${id} user=${user}`)
      const user1 = await this.userapi.search({login: user});
      this.api.deleteUsers(id, [user1.id]);
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      store.set('error', { errorCode: e.status, errorText: errorText , to: '/messenger'});
      router.go('/error');
    }
  }

  async delete(id: number) {
    try {
      await this.api.delete(id);
      this.fetchChats();
    } catch (e: any) {
      let errorText = 'Internal sever error';
      if ('response' in e && 'reason' in e.response) {
        errorText = e.response.reason;
      }
      store.set('error', { errorCode: e.status, errorText: errorText, to: '/messenger' });
      router.go('/error');
    }
  }

  getToken(id: number) {
    return this.api.getToken(id);
  }

  selectChat(id: number) {
    store.set('selectedChat', id);
  }

  unselectChat() {
    store.set('selectedChat', undefined);
  }

}

const controller = new ChatsController();

export default controller;

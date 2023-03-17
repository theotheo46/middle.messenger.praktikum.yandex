import API, { ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import MessagesController from './MessagesController';
import router from '../utils/Router';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
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

  addUserToChat(id: number, userId: number) {
    try {
      this.api.addUsers(id, [userId]);
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
}

const controller = new ChatsController();

export default controller;

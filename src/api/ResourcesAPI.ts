import BaseAPI from './BaseAPI';

export interface ResourceInfo {
  id: number;
  user_id: number,
  path: string,
  filename: string,
  content_type: string,
  content_size: number,
  upload_date: string
}

export class ResourcesAPI extends BaseAPI {
  constructor() {
    super('/resources');
  }

  get_res_url() : string { return 'https://ya-praktikum.tech/api/v2/resources/'}

  saveresource(data: FormData): Promise<ResourceInfo> {
    return this.http.post('/', data);
  }

  
  read = undefined;
  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ResourcesAPI();

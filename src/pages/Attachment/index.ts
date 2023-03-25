import Block from '../../utils/Block';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import template from './attachment.hbs';
import * as styles from '../../styles.module.pcss';
import store, { withStore } from '../../utils/Store';
import { AddChatProps } from '../AddChat';
import ResourcesController from '../../controllers/ResourcesController';




 class AttachmentBase extends Block<AddChatProps> {
    constructor(props: AddChatProps) {
        super(props);
      }
  
  
   init() {

     this.props.showModal = false;
  
      this.children.inputPictureAttach = new Input({
        name: 'image_attach',
        type: 'file',
        accept: "image/png, image/jpeg"
      });

      this.children.inputFileAttach = new Input({
        name: 'file_attach',
        type: 'file',
        accept: ".*"
      });

      this.children.buttonOK = new Button({
        label: 'OK',
        events: {
            click: () => this.onOK()
        }
      })
  
      this.children.buttonCancel = new Button({
        label: 'Cancel',
        events: {
            click: () => this.onCancel()
        }
      })
    }
   
    onOK() {
      const photoFiles = ((this.children.inputPictureAttach as Input).getContent() as HTMLInputElement).files;
      const videoFiles = ((this.children.inputFileAttach as Input).getContent() as HTMLInputElement).files;
      if (!photoFiles) {
        throw new Error('photoFiles is not defined');  
        }
        if (!videoFiles) {
          throw new Error('videoFiles is not defined');  
        }
      if (photoFiles.length == 0 && videoFiles.length == 0) {
        alert('Выберите хотя бы один файл для аттачмента');
        return;
      }
      if (photoFiles.length > 0) {
        const fileAvatar = photoFiles.item(0);
        const fData = new FormData();
        fData.append('resource', fileAvatar as Blob);
        ResourcesController.saveresource(fData);
        const state = store.getState();
        store.set('showModalAttachment', !state.showModalAttachment);
      }
      if (videoFiles.length > 0) {
        const fileAvatar = videoFiles.item(0);
        const fData = new FormData();
        fData.append('resource', fileAvatar as Blob);
        ResourcesController.saveresource(fData);
        const state = store.getState();
        store.set('showModalAttachment', !state.showModalAttachment);
      }
    }
           
    onCancel() {
        const state = store.getState();
        store.set('showModalAttachment', !state.showModalAttachment);
    }
    

  
    render() {
      return this.compile(template, { ...this.props, styles });
    }
  }

  const withShowModal = withStore((state) => ({showModal: state.showModalAttachment, selectedChat: state.selectedChat}))
  
  export const Attachment = withShowModal(AttachmentBase);

  

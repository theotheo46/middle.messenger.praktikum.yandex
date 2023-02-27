import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import {Button} from '../../components/Button';
import template from './fileUpload.hbs';
import * as styles from '../../styles.module.pcss';

interface FileUploadPageProps {
  caption: string;
  isFileUpload : boolean;   //if true - FileUpload dialog, else - FileUploaded
  fileName? : string;
  errorText? : string;
  fileLink : LinkProps;
  buttonCaption : string;
}

export class FileUploadPage extends Block<FileUploadPageProps> {
  constructor(props: FileUploadPageProps) {
    super(props);
  }

  protected init() {

    if (this.props.isFileUpload) {
      this.children.fileLink = new Link(this.props.fileLink);
    }


    this.children.button = new Button({
      label: this.props.buttonCaption,
      events: {
        click: () => this.log()
      },
    });

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

  log() {
    console.log('Click!');
  }

}
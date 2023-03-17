import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import template from './error.hbs';
import * as styles from '../../styles.module.pcss';
import { withStore } from '../../utils/Store';


export class ErrorPageProto extends Block {
  
  protected init() {
    this.children.link = new Link({
      label: 'Назад',
      to: this.props.to
    });

  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withError = withStore((state) => ({ ...state.error }))

export const ErrorPage = withError(ErrorPageProto);

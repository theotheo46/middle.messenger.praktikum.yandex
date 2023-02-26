import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import template from './error.hbs';
import * as styles from '../../styles.module.pcss';

interface ErrorPageProps {
  errorText: string;
  errorCode: number;
  link : LinkProps;
}

export class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps) {
    super(props);
  }

  protected init() {
    this.children.link = new Link(this.props.link);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
import Block from '../../utils/Block';
import template from './link.hbs';
import * as styles from '../../styles.module.pcss';

export interface LinkProps {
  label?: string;
  href : string;
  image? : any;
  name? : string;
  alt? : string;
}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}


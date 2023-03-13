import Block from '../../utils/Block';
import template from './link.hbs';
import * as styles from '../../styles.module.pcss';

export interface LinkProps {
  image? : unknown;
  name? : string;
  alt? : string;
  to: string;
  label?: string;
  events?: {
    click: () => void;
  };

}

export class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    console.log('In navigate');
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}


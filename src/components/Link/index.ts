import Block from '../../utils/Block';
import template from './link.hbs';
import { PropsWithRouter, withRouter } from '../../utils/withRouter';
import * as styles from '../../styles.module.pcss';

export interface LinkProps extends PropsWithRouter {
  image? : unknown;
  name? : string;
  alt? : string;
  to: string;
  label?: string;
  events?: {
    click: () => void;
  };

}

export class LinkProto extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.to);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(LinkProto);

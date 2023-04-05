import Block from '../../utils/Block';
import template from './link.hbs';
import { PropsWithRouter, withRouter } from '../../utils/withRouter';
import styles from '../../styles.module.pcss';

export interface LinkProps extends PropsWithRouter {
  image? : unknown;
  name? : string;
  alt? : string;
  to: string;
  label?: string;
  isBack?: boolean;
  noNavigate?: boolean;
  events?: {
    click: () => void;
  };

}

export class LinkProto extends Block<LinkProps> {
  constructor(props: LinkProps) {
      if (props.noNavigate === undefined || props.noNavigate == false) {
        super({...props,
            events: {
              click: () => this.navigate()
            },
          });
    }
    else {
      super(props);
    }
  }

  navigate() {
    if ((this.props.isBack===undefined) || (!this.props.isBack)) {
      this.props.router.go(this.props.to);
    }
    else {
      this.props.router.back();
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(LinkProto);

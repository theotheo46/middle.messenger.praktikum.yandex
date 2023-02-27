import Block from '../../utils/Block';
import {Link, LinkProps} from '../../components/Link';
import template from './refpicpopup.hbs';
import * as styles from '../../styles.module.pcss';

interface RefPicPopupProps {
    links: LinkProps[];
}

export class RefPicPopup extends Block<RefPicPopupProps> {
  constructor(props: RefPicPopupProps) {
    super(props);
  }

  protected init() {

    this.children.links = [];
    for (const linkProp of this.props.links) {
      this.children.links.push(new Link(linkProp));
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
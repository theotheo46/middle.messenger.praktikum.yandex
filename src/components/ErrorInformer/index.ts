import Block from '../../utils/Block';
import template from './errorinformer.hbs';
import * as styles from '../../styles.module.pcss';

interface ErrorInformerProps {
  text: string;
}

export class ErrorInformer extends Block<ErrorInformerProps> {
  constructor(props: ErrorInformerProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

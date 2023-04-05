import { Link } from './index';
import { expect } from 'chai';
import Router from '../../utils/Router';
import sinon from 'sinon';

describe('Link', () => {

  it('element should return span', () => {
    const link = new Link({ to: '/' });
    const element = link.element;
    expect(element).to.be.instanceof(window.HTMLDivElement)
  });

  it('element should render defined label', () => {
    const label = 'Some label';
    const link = new Link({ to: '/', label  });
    const element = link.element;
    expect(element?.textContent?.trim()).to.eq(label);
  });

  it('element should render defined image string', () => {
    const image = 'icon.ico';
    const link = new Link({ to: '/', image  });
    const element = link.element;
    expect(element?.getElementsByTagName('img')[0].getAttribute('src')).to.eq(image);
  });

  it('should go to passed route on click', () => {
    const link = new Link({ to: '/' });
    const spy = sinon.spy(Router, 'go');
    const element = link.element as HTMLDivElement;

    element.click();

    expect(spy.calledOnce).to.eq(true);
  });
});

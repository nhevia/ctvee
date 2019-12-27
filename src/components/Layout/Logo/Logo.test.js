import React from 'react';
import { shallow } from 'enzyme';
import Logo from './Logo';

const setUp = (props = {}) => {
  const component = shallow(<Logo {...props} />);
  return component;
};

describe('Logo component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render an image', () => {
    const wrapper = component.find('img');
    expect(wrapper.length).toBe(1);
  });

  it('Should have className LogoHome', () => {
    const component = shallow(<Logo isHome />);
    const wrapper = component.find('.LogoHome');
    expect(wrapper.length).toBe(1);
  });

  it('Should have className LogoSmall', () => {
    const component = shallow(<Logo isHome={false} />);
    const wrapper = component.find('.LogoSmall');
    expect(wrapper.length).toBe(1);
  });
});

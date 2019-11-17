import React from 'react'
import { shallow } from 'enzyme'
import Logo from './Logo'

describe('Logo component', () => {
  it('Should render without errors', () => {
    const component = shallow(<Logo />)
    const wrapper = component.find('img')
    expect(wrapper.length).toBe(1)
  })
})
import React from 'react';
import { DriverApplication } from '../src/screens/driver-application';
import renderer from 'react-test-renderer';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('react-native-aws3', () => { return { Request: { FormData: { } } }; });

const testProps = (props: { }): { } => ({
  navigation: {
	navigate: jest.fn()
  },
  ...props
});

configure({ adapter: new Adapter() });

describe('DriverApplication Screen', () => {
  // tslint:disable-next-line:no-any
  let props: any;
  let component: ShallowWrapper;
  let instance: React.Component<DriverApplication>;

  beforeEach(() => {
	props = testProps({ });
	component = shallow(<DriverApplication { ...props } />);
	instance = component.instance() as React.Component<DriverApplication>;
  });

  it('renders correctly', () => {
	expect(component.exists()).toBe(true);
  });

  it('matches snapshot', () => {
	const tree = renderer.create(<DriverApplication { ...props } />).toJSON();
	expect(tree).toMatchSnapshot();
  });
});

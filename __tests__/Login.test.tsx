import React from 'react';
import { Login } from '../src/screens/login';
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

describe('Login Screen', () => {
  // tslint:disable-next-line:no-any
  let props: any;
  let component: ShallowWrapper;
  let instance: React.Component<Login>;

  beforeEach(() => {
	props = testProps({ });
	component = shallow(<Login { ...props } />);
	instance = component.instance() as React.Component<Login>;
  });

  it('renders correctly', () => {
	expect(component.exists()).toBe(true);
  });

  it('matches snapshot', () => {
	const tree = renderer.create(<Login { ...props } />).toJSON();
	expect(tree).toMatchSnapshot();
  });
});

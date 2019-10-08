import React from 'react';
import { SignUp } from '../src/screens/signup';
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

describe('SignUp Screen', () => {
  // tslint:disable-next-line:no-any
  let props: any;
  let component: ShallowWrapper;
  let instance: React.Component<SignUp>;

  beforeEach(() => {
	props = testProps({ });
	component = shallow(<SignUp { ...props } />);
	instance = component.instance() as React.Component<SignUp>;
  });

  it('renders correctly', () => {
	expect(component.exists()).toBe(true);
  });

  it('matches snapshot', () => {
	const tree = renderer.create(<SignUp { ...props } />).toJSON();
	expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import mockData from './test/MockData';
import store from './store';
import { testMockUp } from './test/Functions';
import renderer from 'react-test-renderer';
import Navigation from './components/navigation/Navigation';
import CalendarHOC from './components/calendar/CalendarHOC';
import { shallow } from 'enzyme';
import Calendar from './components/calendar/Calendar';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CalendarHOCWrapper from './components/calendar/CalendarHOC';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('testing with mock data', () => {
  const actual = testMockUp(mockData[0].markedDate);
  expect(actual).toBe(store.getState().markedDates['1-10-2019']);
});

/* Snapshot */

it('render CalendarHOC', () => {

  const tree = renderer
    .create(<CalendarHOC />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('render CalendarHOC', () => {
  const mockCallBack = jest.fn();
  const buttons = mount((<Navigation />));
  buttons.find('Button').at(0).simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(0);
});

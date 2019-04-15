import React from 'react';
import ReactDOM from 'react-dom';
import HireCar from './HireCar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HireCar />, div);
  ReactDOM.unmountComponentAtNode(div);
});

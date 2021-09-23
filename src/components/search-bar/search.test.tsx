import React from 'react';
import ReactDOM from 'react-dom';
import Components/search-bar/search from './Components/search-bar/search';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Components/search-bar/search />, div);
  ReactDOM.unmountComponentAtNode(div);
});
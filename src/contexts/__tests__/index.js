import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Context from '../';

describe('src/contexts', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<Context />);
    expect(tree).toMatchSnapshot();
  });
});

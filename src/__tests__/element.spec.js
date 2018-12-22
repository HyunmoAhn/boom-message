import {
  createButton, createSelect,
} from '../element';

describe('test element.js', () => {
  it('should test createButton', () => {
    const wrapper = createButton('mock');

    expect(wrapper).toMatchSnapshot();
  });

  it('should test createSelect', () => {
    const wrapper = createSelect([
      {
        value: 3,
        text: '3초',
      },
      {
        value: 5,
        text: '5초',
      },
      {
        value: '2-times',
        text: '2배',
      },
      {
        value: '3-times',
        text: '3배',
      },
    ]);

    expect(wrapper).toMatchSnapshot();
  });
});

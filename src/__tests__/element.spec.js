import {
  createButton, createMessage, createSelect,
} from '../element';

describe('test element.js', () => {
  it('should match to snapshot about createButton', () => {
    const wrapper = createButton('mock');

    expect(wrapper).toMatchSnapshot();
  });

  it('should match to snapshot about createSelect', () => {
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

  it('should match to snapshot about createMessage', () => {
    const wrapper = createMessage('mock-id', 'mock-msg', 10);

    expect(wrapper).toMatchSnapshot();
  });

  describe('test createMessage onClick', () => {
    const mockStore = {
      deleteMessage: jest.fn(),
      updateTime: jest.fn(),
    };

    beforeEach(() => {
      mockStore.deleteMessage.mockClear();
      mockStore.updateTime.mockClear();
    });

    it('should test plusBtn click', () => {
      const wrapper = createMessage('mock-id', 'mock-msg', 10, mockStore);

      const plusSelect = wrapper.querySelector('.time-plus-select');
      const plusBtn = wrapper.querySelector('.time-plus-btn');
      plusSelect.value = 5;

      plusBtn.onclick();

      expect(mockStore.updateTime).toHaveBeenCalledTimes(1);
      expect(mockStore.updateTime).toHaveBeenCalledWith('mock-id', "5");
    });

    it('should test minusBtn click', () => {
      const wrapper = createMessage('mock-id', 'mock-msg', 10, mockStore);

      const minusSelect = wrapper.querySelector('.time-minus-select');
      const minusBtn = wrapper.querySelector('.time-minus-btn');
      minusSelect.value = -5;

      minusBtn.onclick();

      expect(mockStore.updateTime).toHaveBeenCalledTimes(1);
      expect(mockStore.updateTime).toHaveBeenCalledWith('mock-id', "-5");
    });

    it('should test deleteBtn click', () => {
      const wrapper = createMessage('mock-id', 'mock-msg', 10, mockStore);

      const deleteBtn = wrapper.querySelector('.message-delete-btn');

      deleteBtn.onclick();

      expect(mockStore.deleteMessage).toHaveBeenCalledTimes(1);
      expect(mockStore.deleteMessage).toHaveBeenCalledWith('mock-id');
    });
  });
});

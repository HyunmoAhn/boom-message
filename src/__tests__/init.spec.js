import * as module from '..';
import Store from '../store';

jest.mock('../store');

describe('test index.js', () => {
  const store = Store.mock.instances[0];
  // const addMessage = jest.fn();
  // store.addMessage = addMessage;

  beforeEach(() => {
    store.addMessage.mockClear();
  });

  describe('should test createMessage', () => {
    const createMessage = module.createMessage;

    it('when message.length < 3', () => {
      const input = document.getElementById('input-text');
      input.value = '12';

      createMessage();

      expect(input.value).toBe('12');
    });

    it('when message.length >= 3', () => {
      const input = document.getElementById('input-text');
      input.value = '12345';

      createMessage();

      expect(input.value).toBe('');
      expect(store.addMessage).toHaveBeenCalledTimes(1);
      expect(store.addMessage).toHaveBeenCalledWith('12345', "50", store);
    });
  });

  describe('should test init function', () => {
    const init = module.init;

    it('should handle add-btn click event', () => {
      const addBtn = document.getElementById('add-btn');
      const addEventListener = jest.spyOn(addBtn, 'addEventListener');

      init();

      expect(addEventListener).toHaveBeenCalledTimes(1);
      expect(addEventListener).toHaveBeenCalledWith('click', module.createMessage);
    });

    describe('should handle input keydown event', () => {
      const input = document.getElementById('input-text');
      const addEventListener = jest.spyOn(input, 'addEventListener');

      init();

      expect(addEventListener).toHaveBeenCalledTimes(1);
      expect(addEventListener).toHaveBeenCalledWith('keydown', expect.any(Function));

      const cb = addEventListener.mock.calls[0][1];

      it('when keyCode === 13', () => {
        const input = document.getElementById('input-text');
        input.value = '12345';

        cb({ keyCode: 13 });

        expect(store.addMessage).toHaveBeenCalledTimes(1);
      });

      it('when keyCode !== 13', () => {
        const input = document.getElementById('input-text');
        input.value = '12345';

        cb({ keyCode: 15 });

        expect(store.addMessage).toHaveBeenCalledTimes(0);
      });
    });

    it('test setInterval', () => {
      const setInterval = jest.spyOn(window, 'setInterval');

      init();

      expect(setInterval).toHaveBeenCalledTimes(1);
      expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);

      const cb = setInterval.mock.calls[0][0];

      cb();

      expect(store.tickTime).toHaveBeenCalledTimes(1);
    });
  });
});

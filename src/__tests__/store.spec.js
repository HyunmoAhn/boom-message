import * as uuid from 'uuid';
import Store from '../store.js';
import Painter from '../Painter.js';

jest.mock('uuid');
jest.mock('../Painter.js');

describe('test store.js', () => {
  const mockMessages = {
    '1': {
      id: '1',
      message: 'mock-message-1',
      time: 10,
    },
    '2': {
      id: '2',
      message: 'mock-message-2',
      time: 150,
    },
    '3': {
      id: '3',
      message: 'mock-message-3',
      time: 30,
    },
  };

  it('should test addMessage method', () => {
    const store = new Store();
    const getIndexOfTarget = jest.fn(() => 5);
    store.getIndexOfTarget = getIndexOfTarget;
    const addNewMessage = jest.spyOn(Painter, 'addNewMessage');
    const v4 = jest.spyOn(uuid, 'v4');
    const mockId = 'mock-id';
    const mockMessage = 'mock-message';
    const mockTime = '30';
    v4.mockImplementation(() => mockId);

    const nextMessageObj = {
      id: mockId,
      message: mockMessage,
      time: Number(mockTime),
    };

    expect(store.messages).toEqual({});
    store.addMessage(mockMessage, mockTime);
    expect(store.messages).toEqual({
      [mockId]: nextMessageObj,
    });
    expect(getIndexOfTarget).toHaveBeenNthCalledWith(1, 'mock-id');
    expect(addNewMessage).toHaveBeenCalledTimes(1);
    expect(addNewMessage).toHaveBeenCalledWith(
      nextMessageObj,
      5,
      store,
    );
  });

  it('should test deleteMessage method', () => {
    const store = new Store();
    store.messages = JSON.parse(JSON.stringify(mockMessages));
    const getIndexOfTarget = jest.fn(() => 5);
    store.getIndexOfTarget = getIndexOfTarget;

    const removeMessage = jest.spyOn(Painter, 'removeMessage');

    store.deleteMessage('2');

    expect(getIndexOfTarget).toHaveBeenNthCalledWith(1, '2');
    expect(removeMessage).toHaveBeenNthCalledWith(1, 5);
    expect(store.messages).toEqual({
      '1': {
        id: '1',
        message: 'mock-message-1',
        time: 10,
      },
      '3': {
        id: '3',
        message: 'mock-message-3',
        time: 30,
      },
    });
  });

  describe('should test updateTime method', () => {
    const store = new Store();
    const getIndexOfTarget = jest.fn(() => 5);
    const deleteMessage = jest.fn();
    store.getIndexOfTarget = getIndexOfTarget;
    store.deleteMessage = deleteMessage;

    const updateTime = jest.spyOn(Painter, 'updateTime');
    beforeEach(() => {
      store.messages = JSON.parse(JSON.stringify(mockMessages));
      getIndexOfTarget.mockClear();
      getIndexOfTarget.mockImplementationOnce(() => 3);
      updateTime.mockClear();
    });

    it('when execute time to plus value', () => {
      expect(store.messages[2].time).toBe(150);

      store.updateTime('2', '5');

      expect(store.messages[2].time).toBe(155);
      expect(getIndexOfTarget).toHaveBeenNthCalledWith(1, '2');
      expect(getIndexOfTarget).toHaveBeenNthCalledWith(2, '2');
      expect(updateTime).toHaveBeenNthCalledWith(1, 3, 5, 155);
    });

    it('when execute time to multiple value', () => {
      expect(store.messages[2].time).toBe(150);

      store.updateTime('2', '3-times');

      expect(store.messages[2].time).toBe(450);
      expect(getIndexOfTarget).toHaveBeenNthCalledWith(1, '2');
      expect(getIndexOfTarget).toHaveBeenNthCalledWith(2, '2');
      expect(updateTime).toHaveBeenNthCalledWith(1, 3, 5, 450);
    });

    it('when execute time to minus value then time is under the 0', () => {
      expect(store.messages[2].time).toBe(150);

      store.updateTime('2', '-155');

      expect(deleteMessage).toHaveBeenNthCalledWith(1, '2');
      expect(getIndexOfTarget).toHaveBeenCalledTimes(0);
      expect(updateTime).toHaveBeenCalledTimes(0);
    });
  });

  it('should test tickTime method', () => {
    const store = new Store();
    const updateTime = jest.fn();
    store.updateTime = updateTime;
    store.messages = JSON.parse(JSON.stringify(mockMessages));

    store.tickTime();

    expect(updateTime).toHaveBeenCalledTimes(3);
    expect(updateTime).toHaveBeenCalledWith('1', 0);
    expect(updateTime).toHaveBeenCalledWith('2', 0);
    expect(updateTime).toHaveBeenCalledWith('3', 0);
  });

  it('should test getIndexOfTarget method', () => {
    const store = new Store();
    const getOrderedList = jest.fn(() => ['mock-id-1', 'mock-id-2', 'mock-id-3']);
    store.getOrderedList = getOrderedList;

    const result = store.getIndexOfTarget('mock-id-2');

    expect(getOrderedList).toHaveBeenCalledTimes(1);
    expect(result).toBe(1);
  });

  it('should test getOrderedList method', () => {
    const store = new Store();
    store.messages = JSON.parse(JSON.stringify(mockMessages));

    const result = store.getOrderedList();

    expect(result).toEqual(['2', '3', '1']);
  });
});

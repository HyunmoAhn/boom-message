import Painter from '../Painter';

describe('test Painter.js', () => {
  const body = document.getElementsByTagName('body')[0]
  const messageList = document.createElement('div');
  messageList.id = 'message-list';
  body.appendChild(messageList);

  describe('should test addNewMessage', () => {
    it('when add message in empty list', () => {
      expect(messageList).toMatchSnapshot();

      Painter.addNewMessage({
        id: 'mock-id-1',
        message: 'mock-message-1',
        time: 10,
      }, 0);

      expect(messageList).toMatchSnapshot();
    });

    it('when add message in last index of list', () => {
      expect(messageList).toMatchSnapshot();

      Painter.addNewMessage({
        id: 'mock-id-2',
        message: 'mock-message-2',
        time: 15,
      }, 1);

      expect(messageList).toMatchSnapshot();
    });

    it('when add message in middle of list', () => {
      expect(messageList).toMatchSnapshot();

      Painter.addNewMessage({
        id: 'mock-id-3',
        message: 'mock-message-3',
        time: 12,
      }, 1);

      expect(messageList).toMatchSnapshot();
    });
  });

  describe('should test updateTime', () => {
    it('when swap message from 1 to 3', () => {
      expect(messageList).toMatchSnapshot();

      Painter.updateTime(0, 2, 30);

      expect(messageList).toMatchSnapshot();
    });

    it('when swap message from 2 to 1', () => {
      expect(messageList).toMatchSnapshot();

      Painter.updateTime(1, 0, 10);

      expect(messageList).toMatchSnapshot();
    });

    it('when doesn\'t swap message but change ', () => {
      expect(messageList).toMatchSnapshot();

      Painter.updateTime(1, 1, 20);

      expect(messageList).toMatchSnapshot();
    });
  });

  it('should test removeMessage', () => {
    expect(messageList).toMatchSnapshot();

    Painter.removeMessage(1);

    expect(messageList).toMatchSnapshot();
  });
});

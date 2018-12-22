import { createMessage } from './element';

class Painter {
  static addNewMessage(messageObj, index, store) {
    const { id, message, time }  = messageObj;
    const listDOM = document.getElementById('message-list');
    const newMessageDOM = createMessage(id, message, time, store);
    const NThMessage = listDOM.getElementsByClassName('message')[index];

    if (!NThMessage) {
      listDOM.appendChild(newMessageDOM);
    } else {
      listDOM.insertBefore(newMessageDOM, NThMessage);
    }
  }

  static removeMessage(index) {
    const listDOM = document.getElementById('message-list');
    const indexThMessage = listDOM.getElementsByClassName('message')[index];

    indexThMessage.remove();
  }

  static updateTime(prevIndex, nextIndex, time) {
    const listDOM = document.getElementById('message-list');
    const targetDOM = listDOM.getElementsByClassName('message')[prevIndex];
    const resultIndex = prevIndex > nextIndex ? nextIndex : nextIndex + 1;

    targetDOM.getElementsByClassName('message-time')[0].innerHTML = time;
    const NThMessage = listDOM.getElementsByClassName('message')[resultIndex];

    listDOM.insertBefore(targetDOM, NThMessage);
  }
}

export default Painter;

import { v4 } from 'uuid';
import Painter from './Painter';

class Store {
  constructor() {
    this.messages = {};
  }

  addMessage(message, time) {
    const id = v4();
    const messageObj = {
      id,
      message,
      time: Number(time),
    };

    this.messages[id] = messageObj;

    const targetIndex = this.getIndexOfTarget(id);
    Painter.addNewMessage(messageObj, targetIndex, this);
  }

  deleteMessage(id) {
    const targetIndex = this.getIndexOfTarget(id);

    Painter.removeMessage(targetIndex);
    delete this.messages[id];
  }

  updateTime(id, addTime) {
    const currentTime = this.messages[id].time;
    let nextTime;
    if (parseInt(addTime) === Number(addTime)) {
      nextTime = currentTime + parseInt(addTime)
    } else { // n-times calculation
      nextTime = currentTime * parseInt(addTime)
    }

    if (nextTime <= 0) {
      this.deleteMessage(id);
      return;
    }

    const prevIndex = this.getIndexOfTarget(id);
    this.messages[id].time = nextTime;
    const nextIndex = this.getIndexOfTarget(id);

    Painter.updateTime(prevIndex, nextIndex, nextTime);
  }

  tickTime() {
    Object.keys(this.messages).forEach((v) => {
      this.updateTime(v, -1);
    });
  }

  getIndexOfTarget(id) {
    const orderedList = this.getOrderedList();

    return orderedList.indexOf(id);
  }

  getOrderedList() {
    const { messages } = this;
    return Object.keys(this.messages).sort((a, b) => messages[a].time - messages[b].time);
  }
}

export default Store;

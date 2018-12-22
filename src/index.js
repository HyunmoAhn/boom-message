import Store from './store.js';

const store = new Store();

export function createMessage() {
  const input = document.getElementById('input-text');
  const select = document.getElementById('select-time');
  const message = input.value;
  const time = select.value;

  if (message.length < 3) {
    return;
  }

  store.addMessage(message, time, store);
}

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', createMessage);
setInterval(() => store.tickTime(), 1000);

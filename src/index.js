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
  input.value = '';
}

export function init() {
  const addBtn = document.getElementById('add-btn');
  const input = document.getElementById('input-text');

  addBtn.addEventListener('click', createMessage);
  input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
      createMessage();
    }
  });
  setInterval(() => store.tickTime(), 1000);
}

init();


export function createButton(text) {
  const btn = document.createElement('button');
  btn.textContent = text;

  return btn;
}

/**
 * Select Element를 만들어준다.
 *
 * @param info: [{
 *   value(@string): select를 선택했을때의 값
 *   text(@string): select에 보여줄 텍스트
 * }]
 */
export function createSelect(info) {
  const select = document.createElement('select');

  info.forEach(v => {
    const option = document.createElement('option');
    option.value = v.value;
    option.textContent = v.text;

    select.appendChild(option);
  });

  return select;
}

export function createMessage(id, msg, time, store) {
  const container = document.createElement('div');
  container.classList.add('message');

  const messageContainer = document.createElement('p');
  const message = document.createTextNode(msg);
  const timeScript = document.createTextNode(' 남은시간: ');
  messageContainer.appendChild(message);
  messageContainer.appendChild(timeScript);

  // Create Time DOM
  const timeContainer = document.createElement('span');
  timeContainer.classList.add('message-time');
  const timeText = document.createTextNode(time);
  timeContainer.appendChild(timeText);
  messageContainer.appendChild(timeContainer);

  container.appendChild(messageContainer);

  // Create Controller
  const controllerContainer = document.createElement('p');
  controllerContainer.classList.add('message-controller');
  const plusSelect = createSelect([
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
  plusSelect.classList.add('time-plus-select');
  const plusBtn = createButton('시간 추가');
  plusBtn.classList.add('time-plus-btn');
  plusBtn.onclick = () => store.updateTime(id, plusSelect.value);
  const minusSelect = createSelect([
    {
      value: -3,
      text: '-3초',
    },
    {
      value: -5,
      text: '-5초',
    },
  ]);
  minusSelect.classList.add('time-minus-select');
  const minusBtn = createButton('시간 감소');
  minusBtn.classList.add('time-minus-btn');
  minusBtn.onclick = () => store.updateTime(id, minusSelect.value);
  const deleteBtn = createButton('삭제');
  deleteBtn.classList.add('message-delete-btn');
  deleteBtn.onclick = () => store.deleteMessage(id);

  controllerContainer.append(plusSelect);
  controllerContainer.append(plusBtn);
  controllerContainer.append(minusSelect);
  controllerContainer.append(minusBtn);
  controllerContainer.append(deleteBtn);

  container.appendChild(controllerContainer);

  return container;
}

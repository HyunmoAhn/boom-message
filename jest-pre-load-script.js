const body = document.getElementsByTagName('body')[0];
const button = document.createElement('button');
button.id = 'add-btn';
const input = document.createElement('input');
input.id = 'input-text';
const select = document.createElement('select');
const option = document.createElement('option');
option.value = 50;
select.appendChild(option);
select.id = 'select-time';

body.appendChild(button);
body.appendChild(input);
body.appendChild(select);

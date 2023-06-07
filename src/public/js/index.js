const socket = io();
socket.emit('message', 'Hola, me estoy comunicando desde un websocket')
socket.on('anotherMessage', data =>console.log(data))
socket.on('anotherMessageButNotForEveryone', data => console.log(data));

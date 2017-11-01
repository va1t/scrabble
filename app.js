// app.js

document.getElementById('send').addEventListener('click', function(e) {
  e.preventDefault();
  
  var input = document.getElementById('word').value;
  var inputLength = input.length;

  if(inputLength > 0 && inputLength < 8) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/scrabble');
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(JSON.stringify({'input': input}));

    document.getElementById('alert').innerHTML = '';
    document.getElementById('output').innerHTML = input;
  } else {
    document.getElementById('alert').innerHTML = 'Input word needs to be between 1 & 7 letters.';
  }

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:3000');
  xhr.send({
    
  });
});
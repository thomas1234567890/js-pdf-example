function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// toDataURL('https://avatars.githubusercontent.com/u/11679069?s=400&u=6fa22fb7fa7bd50a89a5ecd20f2a1cefeeabd32c&v=4', function(dataUrl) {
//   console.log('RESULT:', dataUrl)
// })

export { toDataURL };

const density = '*@%#:.  ';
let video;
let asciiDiv;

function setup() {
  dom = select('#canvas');

  htmlDom = document.querySelector('#canvas');
  noCanvas();
  video = createCapture(VIDEO, function () {
    video.elt.setAttribute('playsinline', ''); // iOS에서 영상이 인라인으로 재생되도록 설정
    video.size(130, 95); // 카메라의 종횡비에 맞게 크기 조절
  });

  asciiDiv = createDiv();
  asciiDiv.style('font-family', 'monospace');
  asciiDiv.style('white-space', 'pre');
  asciiDiv.style('font-size', '16px');
  asciiDiv.style('background-color', 'black');
  asciiDiv.style('color', '#ff00ff');
  asciiDiv.style('margin', '4px');
  asciiDiv.style('border', '6px solid #e8e8d8');
  asciiDiv.style('border-bottom', '46px solid #e8e8d8');
  asciiDiv.style('padding', '2px ');
}

function draw() {
  video.loadPixels();
  let asciiImage = '';
  for (let j = 0; j < video.height; j += 4) {
    for (let i = video.width; i > 0; i -= 2) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      asciiImage += c;
    }
    asciiImage += '\n';
  }
  asciiDiv.html(asciiImage);
}

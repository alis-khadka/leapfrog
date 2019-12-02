var IMAGE_WIDTH = 400;
var imageIndex = 1;
var i = 0;
var ul;
var slide;
var transition;
var currentMarginLeft;
var startPoint;
var stopPoint;
var nextImage;

function carousel() {
  var sliderContainer = document.getElementById('slider-container');
  var imageContainer = document.getElementById('image-container');
  var previousButton = document.getElementById('prev');
  var nextButton = document.getElementById('next');
  var li;

  sliderContainer.setAttribute('class', 'clearfix');
  sliderContainer.style.overflow = 'hidden';

  var numOfImg = imageContainer.childElementCount;

  imageContainer.style.width = (numOfImg * IMAGE_WIDTH) + 'px';

  // Arrow Buttons
  previousButton.style.position = 'absolute';
  previousButton.style.backgroundSize = 'contain';
  previousButton.style.width = '10%';
  previousButton.style.height = '10%';
  previousButton.style.position = 'center';
  previousButton.style.borderRadius = '20%';
  previousButton.style.backgroundRepeat = 'no-repeat';
  previousButton.style.top = (IMAGE_WIDTH / 2 - 50) + 'px';
  previousButton.style.left = '0px';
  previousButton.style.cursor = 'pointer';

  nextButton.style.position = 'absolute';
  nextButton.style.backgroundSize = 'contain';
  nextButton.style.width = '10%';
  nextButton.style.height = '10%';
  nextButton.style.position = 'center';
  nextButton.style.borderRadius = '20%';
  nextButton.style.backgroundRepeat = 'no-repeat';
  nextButton.style.top = (IMAGE_WIDTH / 2 - 50) + 'px';
  nextButton.style.right = '0px'
  nextButton.style.cursor = 'pointer';

  nextButton.addEventListener('click', rightImage);
  previousButton.addEventListener('click', leftImage);

  // Navigation through arrow buttons
  function rightImage() {
    if (imageIndex < numOfImg) {
      ++i;
      slideImage();
    } else if (imageIndex >= numOfImg) {
      i = 0;
      slideImage();
    }
    clearInterval(slide);
    slideShow();
  }

  function leftImage() {
    if (imageIndex > 1) {
      --i;
      slideImage();
    } else if (imageIndex == 1) {
      i = (numOfImg - 1);
      slideImage();
    }
    clearInterval(slide);
    slideShow();
  }

  // Indicators 
  (function drawIndicator() {
    var indicator = document.getElementById('indicator');
    indicator.style.position = 'absolute';
    indicator.style.height = '25px';
    indicator.style.width = '100%';
    indicator.style.bottom = '10px';
    indicator.style.textAlign = 'center';
    ul = document.createElement('ul');
    ul.setAttribute('class', 'clearfix');
    ul.style.paddingLeft = IMAGE_WIDTH / 3 + 'px'
    indicator.appendChild(ul);

    function currentValue(currentJ) {
      li.addEventListener(
        'click',
        (function () {
          i = currentJ;

          slideImage();
          clearInterval(slide);
          // clearInterval(transition);
          slideShow();
        })
      );
    }

    for (var j = 0; j < numOfImg; j++) {
      console.log('j', j);
      li = document.createElement('li');
      li.setAttribute('id', (j + 1));
      currentValue(j);

      li.style.cssFloat = 'left';
      li.style.height = '10px';
      li.style.width = '10px';
      li.style.borderRadius = '100%';
      li.style.backgroundColor = 'rgba(192, 192, 192, 0.6)';
      li.style.display = 'inline-block';
      li.style.margin = '0 10px';
      li.setAttribute('class', 'indicator');
      li.style.cursor = 'pointer';

      ul.appendChild(li);
    }
  })();


  console.log('i = ', i);

  function slideShow() {

    slide = setInterval(rightImage, 3000);
  }

  slideShow();

  function transform() {
    clearInterval(slide);

    if (stopPoint != 0 && stopPoint < startPoint) {  
      startPoint -= 1;
    } else if (stopPoint == 0) {
      startPoint += 2;
    }

    nextImage = (startPoint) + 'px';

    imageContainer.style.marginLeft = nextImage;

    if (startPoint == stopPoint) {
      clearInterval(transition);
      slideShow();
    }
  }

  function slideImage() {
    imageIndex = i + 1;
    console.log('Image index: ', imageIndex);
    currentMarginLeft = -(i * IMAGE_WIDTH);

    stopPoint = currentMarginLeft;
    if (stopPoint != 0) {
      startPoint = currentMarginLeft + IMAGE_WIDTH;
    } else if (stopPoint == 0) {
      startPoint = -(numOfImg - 1) * IMAGE_WIDTH;
    }
    transition = setInterval(transform, 10);


    //Current image's corresponding indicator gets highlighted
    li = document.getElementById(imageIndex);
    li.style.backgroundColor = 'rgba(255, 255, 255, 1)';

    li = document.getElementsByClassName('indicator');

    // Rest indicators become default
    for (var k = 1; k <= numOfImg; k++) {
      if (k != imageIndex) {
        li[k - 1].style.backgroundColor = 'rgba(192, 192, 192, 0.6)';
      }
    }

    if (i >= numOfImg) {
      i = 0;
    }
  }
}

var ram = new carousel();
// var shyam = new carousel();

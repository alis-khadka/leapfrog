class DataImage {

  constructor() {
    this.img = document.getElementById('uploaded-image');
    this.uploadButton = document.getElementById('upload-button')

    // Canvas to draw the image
    this.canvas = document.getElementById('uploaded-image-canvas');
    this.context = this.canvas.getContext('2d');
    // canvas.style.margin = '0 auto';

    // Canvas for Grayscaling
    this.grayscaleCanvas = document.getElementById('grayscale-image');
    this.grayscaleContext = this.grayscaleCanvas.getContext('2d');

    // Canvas for Binary Image (Thresholding)
    this.thresholdCanvas = document.getElementById('threshold-image');
    this.thresholdContext = this.thresholdCanvas.getContext('2d');

    // Headings
    this.uploadHeading = document.getElementById('upload-heading');
    this.grayscaleHeading = document.getElementById('grayscale-heading');
    this.thresholdHeading = document.getElementById('threshold-heading');

    this.uploadHeading.style.display = 'none';
    this.grayscaleHeading.style.display = 'none';
    this.thresholdHeading.style.display = 'none';

    this.imageData;
    this.grayscaleData;
    this.thresholdData;

  }

  initializeCanvas(canvas, sourceImage) {
    canvas.width = sourceImage.img.naturalWidth;
    canvas.height = sourceImage.img.naturalHeight;
    canvas.style.display = 'block';
    canvas.style.margin = '0 auto';

  }

  initializeHeading(heading) {
    heading.style.display = 'block';
    heading.style.textAlign = 'center';
  }

  changeTo2dArray(imageData) {
    let width = imageData.width * 4; // Pixel = RGBA value
    let height = imageData.height;

    let pixels = imageData.data;

    let array2D = new Array(height);

    for (let i = 0; i < height; i++) {
      array2D[i] = new Array(width);

      for (let j = 0; j < width; j += 4) {
        array2D[i][j] = pixels[(i * width) + (j)]; // Red Pixel
        array2D[i][j + 1] = pixels[(i * width) + (j + 1)]; // Green Pixel
        array2D[i][j + 2] = pixels[(i * width) + (j + 2)]; // Blue Pixel
        array2D[i][j + 3] = pixels[(i * width) + (j + 3)]; // Alpha Pixel

      }
    }

    return array2D;

  }

  changeTo1dArray(array2D) {
    let width = array2D[0].length;
    let height = array2D.length;

    let array1D = new Uint8ClampedArray(width * height);

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j += 4) {
        array1D[(i * width) + (j)] = array2D[i][j]; // Red Pixel
        array1D[(i * width) + (j + 1)] = array2D[i][j + 1]; // Green Pixel
        array1D[(i * width) + (j + 2)] = array2D[i][j + 2]; // Blue Pixel
        array1D[(i * width) + (j + 3)] = array2D[i][j + 3]; // Alpha Pixel

      }
    }

    return array1D;

  }

  assign1dToImageData(imageData, array1D) {
    let pixels = imageData.data;
    let len = pixels.length;

    for (let i = 0; i < len; i += 4) {
      pixels[i] = array1D[i]; // Red Pixel
      pixels[i + 1] = array1D[i + 1]; // Green Pixel
      pixels[i + 2] = array1D[i + 2]; // Blue Pixel
      pixels[i + 3] = array1D[i + 3]; // Alpha Pixel

    }

  }

  // Converting into Grayscale Value
  getGrayscaleValue(sourceImage) {
    let pixels2D = this.changeTo2dArray(sourceImage.imageData);
    let grayscalePixels2D = this.changeTo2dArray(sourceImage.grayscaleData);

    let width = pixels2D[0].length;
    let height = pixels2D.length;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j += 4) {
        let redPixel = pixels2D[i][j];
        let greenPixel = pixels2D[i][j + 1];
        let bluePixel = pixels2D[i][j + 2];
        let alphaPixel = pixels2D[i][j + 3];

        let grayscaleMax = Math.max(redPixel, greenPixel, bluePixel);
        let grayscaleMin = Math.min(redPixel, greenPixel, bluePixel);
        let grayscaleValue = (grayscaleMax + grayscaleMin) / 2;

        grayscalePixels2D[i][j] = grayscaleValue;
        grayscalePixels2D[i][j + 1] = grayscaleValue;
        grayscalePixels2D[i][j + 2] = grayscaleValue;
        grayscalePixels2D[i][j + 3] = alphaPixel;

      }
    }

    let grayscalePixels1D = this.changeTo1dArray(grayscalePixels2D);
    this.assign1dToImageData(sourceImage.grayscaleData, grayscalePixels1D);

  }

  // After image is loaded
  imageIsLoaded(sourceImage) {
    this.initializeHeading(sourceImage.uploadHeading);
    this.initializeCanvas(sourceImage.canvas, sourceImage);

    //Drawing the received Image on Canvas
    sourceImage.context.drawImage(
      sourceImage.img,
      0,
      0,
      sourceImage.img.naturalWidth,
      sourceImage.img.naturalHeight
    );

    // Get Image Data
    sourceImage.imageData = sourceImage.context.getImageData(
      0,
      0,
      sourceImage.img.naturalWidth,
      sourceImage.img.naturalHeight
    );
    console.log(sourceImage.imageData.data.length);

    // Create Grayscale Data
    sourceImage.grayscaleData = sourceImage.grayscaleContext.createImageData(sourceImage.imageData);

    this.getGrayscaleValue(sourceImage);
    this.initializeHeading(sourceImage.grayscaleHeading);

    console.log(sourceImage.imageData);
    console.log(sourceImage.grayscaleData);

    this.initializeCanvas(sourceImage.grayscaleCanvas, sourceImage);

    sourceImage.grayscaleContext.putImageData(sourceImage.grayscaleData, 0, 0);

    // Create Threshold Data
    sourceImage.thresholdData = sourceImage.thresholdContext.createImageData(sourceImage.grayscaleData);

    // Get thresholding
    // this.getThresholdingValue(sourceImage, 175);
    this.getLocalThresholdingValue(sourceImage, 5);

    console.log(sourceImage.thresholdData);

    // Binary Image
    this.initializeHeading(sourceImage.thresholdHeading);
    this.initializeCanvas(sourceImage.thresholdCanvas, sourceImage);

    sourceImage.thresholdContext.putImageData(sourceImage.thresholdData, 0, 0);

  }

  getNoiseReduction()

  getThresholdingValue(sourceImage, threshold) {
    let grayscalePixels2D = this.changeTo2dArray(sourceImage.grayscaleData);
    let binaryPixels2D = this.changeTo2dArray(sourceImage.thresholdData);

    let width = grayscalePixels2D[0].length;
    let height = grayscalePixels2D.length;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j += 4) {
        let binaryValue = (grayscalePixels2D[i][j] >= threshold) ? 255 : 0;

        binaryPixels2D[i][j] = binaryValue;
        binaryPixels2D[i][j + 1] = binaryValue;
        binaryPixels2D[i][j + 2] = binaryValue;
        binaryPixels2D[i][j + 3] = grayscalePixels2D[i][j + 3];

      }
    }

    let binaryPixels1D = this.changeTo1dArray(binaryPixels2D);
    this.assign1dToImageData(sourceImage.thresholdData, binaryPixels1D);

  }

  getLocalThresholdingValue(sourceImage, windowSize) {
    let grayscalePixels2D = this.changeTo2dArray(sourceImage.grayscaleData);
    let binaryPixels2D = this.changeTo2dArray(sourceImage.thresholdData);

    let width = grayscalePixels2D[0].length;
    let height = grayscalePixels2D.length;

    let windowWidth = windowSize * 4;
    let windowHeight = windowSize;

    let numOfPixels = windowSize * windowSize;

    for (let i = 0; i < height; i += windowHeight) {
      let sum = 0;
      
      if (i >= (height - windowHeight)) {
        i = (height - windowHeight);
      }

      for (let j = 0; j < width; j += windowWidth) {

        if (j >= (width - windowWidth)) {
          j = (width - windowWidth);
        }

        for (let m = i; m < (i + windowHeight); m++) {

          for (let n = j; n < (j + windowWidth); n += 4) {
            sum += grayscalePixels2D[m][n];
          }

        }
        console.log('grayscale: ', grayscalePixels2D);
        let localThreshold = (sum / numOfPixels);
        sum = 0;
        console.log('local threshold', localThreshold);

        for (let m = i; m < (i + windowHeight); m++) {

          for (let n = j; n < (j + windowWidth); n += 4) {
            let binaryValue = (grayscalePixels2D[m][n] >= localThreshold) ? 255 : 0;

            binaryPixels2D[m][n] = binaryValue;
            binaryPixels2D[m][n + 1] = binaryValue;
            binaryPixels2D[m][n + 2] = binaryValue;
            binaryPixels2D[m][n + 3] = grayscalePixels2D[m][n + 3];
          }

        }



      }
    }

    let binaryPixels1D = this.changeTo1dArray(binaryPixels2D);
    this.assign1dToImageData(sourceImage.thresholdData, binaryPixels1D);


  }

  eventListener(sourceImage) {
    this.uploadButton.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        // console.log(image.img);
        sourceImage.img.src = URL.createObjectURL(this.files[0]); // set src to blob url
        sourceImage.img.onload = function () {
          sourceImage.imageIsLoaded(sourceImage);
        };
      }
    });

  }

}
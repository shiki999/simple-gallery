const imageContainer = document.getElementById('image-container');
const loading = document.querySelector('.loader');

let limit = 6;
let page = 1;

// fetch image
async function getImage() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`);

  const data = await res.json();

  return data;
}

// show image

async function showImage() {
  images = await getImage();

  images.forEach(image => {
    const imageEl = document.createElement('div');
    imageEl.classList.add('image');
    imageEl.innerHTML = `
      <div class="number">${image.id}</div>
      <div class="image-detail">
        <h3 class="image-title">${image.title}</h2>
        <img class="image-url" src="${image.url}" alt="${image.title}">
      </div>
    `;

    imageContainer.appendChild(imageEl);
  });
}

function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showImage();
    }, 300);
  }, 1000);
}

showImage();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5 ) {
    showLoading();
  }
});
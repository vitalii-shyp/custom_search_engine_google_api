// Google staff
// const key = 'AIzaSyBgnTT25PKtS3AgpFnbuFGtN8em-Hp3xPw';
const key = 'AIzaSyBJ8uyFQvr8j05Vakp3w6TfkFQVlgmUcFo';
// const cx = '009543767815085674492:84zobqtjv28';
const cx = '009543767815085674492:1xyo8bz1b2d';

const num = '10';
const itemPerPage = 4;
var currentPage = 1;
const pages = Math.ceil(num / itemPerPage);
const numImg = '9';

// Output
document.getElementById('button1').addEventListener('click', function (event) {
  event.preventDefault();
  const input = document.getElementById('search-input').value;
  document.getElementById('output-links').innerHTML = '';
  document.getElementById('buttons').innerHTML = '';
  document.getElementById('grid-img').innerHTML = '';

  // FETCHING IMG
  fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${input}&num=${numImg}&searchType=image`)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      // console.log(data.items);
      data.items.forEach(function (el, i) {
        let img = document.createElement('img');
        // console.log(el);
        // img.src = el.image.thumbnailLink;
        img.src = el.link;
        img.className = `img img-${i + 1}`;
        // document.getElementById('grid-img').append(img);
        let imgLink = document.createElement('a');
        imgLink.href = `${el.link}`;
        imgLink.appendChild(img);
        imgLink.setAttribute('target', '_blank');
        document.getElementById('grid-img').append(imgLink);
      });
      let margin = document.createElement('div');
      margin.id = 'margin';
      document.getElementById('grid-img').append(margin);

    });

  // FETCHING LINKS
  fetch(`https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${input}&num=${num}`)
    .then(function (res) {
      return res.json()
    })
    .then(function (data) {
      // console.log(data.items);
      let output = '';

      for (let i = 0; i < pages; i++) {
        output += `<div id="page${i + 1}">`;
        for (let j = i * itemPerPage; j < itemPerPage * (i + 1) && j < num; j++) {
          // console.log(data.items, j);
          let link = data.items[j];
          output += `<a href="${link.link}" target="_blank">
                      <h5 class="title-link"> ${link.htmlTitle}</h5>
                      <h6 class="link-link"> ${link.link}</h6>
                     </a>
                     <h6 class="snippet-link"> ${link.htmlSnippet}</h6>
                     <br>`;
        }
        output += `</div>`;
      }


      document.getElementById('output-links').innerHTML = output;
      pagination(currentPage);
      buttons();
    });

})

function pagination(page) {
  for (let i = 1; i < pages + 1; i++) {
    document.getElementById(`page${i}`).style.display = "none";
  }
  document.getElementById(`page${page}`).style.display = "block";
}

function buttons() {
  for (let i = 1; i < pages + 1; i++) {
    let btn = document.createElement(`a`);
    btn.setAttribute('data-js', i);
    btn.innerHTML = `${i}`;
    btn.className = 'button';
    btn.addEventListener('click', setPage);

    document.getElementById('buttons').append(btn);
  }
}

function setPage() {
  pagination(this.getAttribute('data-js'));
}
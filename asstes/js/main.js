/*---Du lieu co san tu back-end ----*/
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'


/*----Buoc 1: Goi database----*/
async function getMovie(API_URL) {
  const res = await axios.get(API_URL);
  const data = await res.data.results
  showMovie(data)

}
getMovie(API_URL);


/*----Buoc 2: Hien thi du lieu ra front-end -----*/
function showMovie(movie) {
  let htmlCode = ``;
  movie.forEach((value, index) => {
    htmlCode += `
        <div class="col-6 col-sm-3 col-md-3">
            <div class="item">
                <div class="box-image">
                    <img src="${IMG_PATH + value.poster_path}" />
                </div>
                <div class="box-content">
                    <h3 class="title-film">${value.title}</h3>
                    <p class="rating ${colorRating(value.vote_average)}">${value.vote_average}</p>
                </div>
                <div class="box-description">
                    <h4>Overview</h4>
                    <p>${value.overview}</p>
            </div>
        </div>
      </div>`;
      //Truy cap phan tu
      const content = document.querySelector('.listing-product .row');
      // Ghi noi dung
      content.innerHTML = htmlCode
  });
}
/*---Buoc 3: Thay doi mau rating---*/
function colorRating(vote){
  if(vote > 8) {
    return 'good';
  }else if(vote > 5){
    return 'normal';
  }else {
    return 'bad';
  }
}

/*--Buoc 4: Them o tim kiem--*/
// Truy cap phan
const formSearch = document.querySelector('.form-search');
const inputSearch = document.querySelector('.input-search');

// add su kien submit
formSearch.addEventListener('submit', function(event){
  event.preventDefault();
  // lay gia tri nhap vao o input
  const valueInput = inputSearch.value
  // console.log(valueInput);
  
  if(valueInput && valueInput !== "") {
    getMovie(SEARCH_API + valueInput);
  }else {
    window.location.reload();
  }

})
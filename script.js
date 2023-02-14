const inputMovies = document.getElementById('input-movie')
const boxMovieList = document.getElementById('boxSearch')
const results = document.getElementById('results')
const noImage = './assets/noImageAvailable.png'
const initialPoster = './assets/initialPoster.svg'
const inputNames = document.getElementById('input-name')
const conteinerLists = document.getElementById('container-lists')

var resultToDB


const loadMovies = async (searchTerm) => {
    peopleName = inputNames.value

    const url = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=448ef811`
    const res = await fetch(url);
    const data = await res.json()
        
    if(data.Response == 'True') {displayMovieList(data.Search)}
  }

function findMovies(){
    let searchTerm = (inputMovies.value).trim()
    if (searchTerm.length > 0) {
        boxMovieList.classList.remove('invisible-class')
        loadMovies(searchTerm)
    } else { boxMovieList.classList.add('invisible-class') }
}

function displayMovieList(movies){
    boxMovieList.innerHTML = ""
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div')
        movieListItem.dataset.id = movies[idx].imdbID
        movieListItem.classList.add('boxMovieList')
        
        if(movies[idx].Poster != 'N/A'){
            moviePoster = movies[idx].Poster
        } else {
            moviePoster = noImage
        }
        
        movieTitle = movies[idx].Title
        movieYear = movies[idx].Year
        
        movieListItem.innerHTML = `
            <div>
                <img class="thumbnail" src="${moviePoster}" alt="poster thumbnail">
            </div>
            <div>
                <h3 class="titleBoxList">${movieTitle}</h3>
                <p class="yearBoxList">${movieYear}</p>
            </div>
        `
        boxMovieList.appendChild(movieListItem)
    }

    loadMovieDetails()
}

function loadMovieDetails(){
    const eachListMovies = boxMovieList.querySelectorAll('.boxMovieList')
    eachListMovies.forEach(movie =>{
        movie.addEventListener('click', async () => {
            boxMovieList.classList.add('invisible-class')
            inputMovies.value = ''
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=448ef811`)
            const movieDetails = await result.json()
            resultToDB = movieDetails
            //console.log(movieDetails)
            displayMovieDetails(resultToDB)

        })
    })
}

function displayMovieDetails(details){
    results.innerHTML = `
    <div>
        <img class="image-result" src="${(details.Poster != 'N/A') ? details.Poster : noImage}" alt="movie poster">
        <button class="button-recomedation" type="submit" onclick="postToAPI(peopleName, resultToDB)">Recomendar</button>
    </div>

    <div class="box-details">
        <h2 class="title-result">${details.Title}</h2>
        <div class="details-result">
            <span class="year-result">Year: ${details.Year} </span>
            <span class="rating-result">OMDB: ${details.imdbRating}/10</span>
        </div>

        <span class="gender-result">Gender: ${details.Genre}</span>
        <span class="sinopse-result">
            Sinopse: ${details.Plot}
        </span>
    </div>

    `

}

/* ------------------ CARREGANDO A LISTA ----------------- */



const loadLists = async () => {
    const url_list = ' http://127.0.0.1:3333/lists/information'
    const response = await fetch(url_list)
    const lists = await response.json()
    displayLists(lists.result)
    
}

function displayLists(listResult){
    conteinerLists.innerHTML = ''
    for (index = 0; index < listResult.length; index++){
        let indivList = document.createElement('div')
        console.log(indivList)
        indivList.classList.add('individual-list')
        indivList.innerHTML = ` 

        <strong style="width: 200px;" >${listResult[index].title}</strong>
        <p > Indicated by:  <strong> ${listResult[index].autor} </strong></p>
        <p ">Gênero: <strong>${listResult[index].gender} </strong></p>
        <p>IMDb: <strong> ${listResult[index].rating}/10 <strong></p>
        <div class="overview"><p>Plot: </br> <strong> ${listResult[index].plot} </strong></p></div>
        

        `
        conteinerLists.appendChild(indivList)
 
    }
}


/* GRAVANDO NO BANCO DE DADOS */

 async function postToAPI(name, resultToDB) {
    if (name == ''){
        alert("Por favor, digite o seu nome!")
        document.location.reload()
        
    } else {
     const save = {
        title: resultToDB.Title,
        autor: name,
        gender: resultToDB.Genre,
        rating: parseFloat(resultToDB.imdbRating),
        plot: resultToDB.Plot
    }

    const option = {
        method: 'POST',
        headers: {
            "Content-Type":'application/json'
        },
        body: JSON.stringify(save)
    }
    
    const resp = await fetch('http://127.0.0.1:3333/lists', option)
    await console.log(resp.json())
    alert("Filme indicado com sucesso!!")

   document.location.reload()
    
}
    

}


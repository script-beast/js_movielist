const add_movie = document.getElementById("add-modal")
const enterMovieBTN = document.querySelector("header button")
const backdropclas = document.getElementById("backdrop")
const cancelMovieBTN = add_movie.querySelector(".btn--passive")
const addMovieBTN = add_movie.querySelector(".btn--success")
const userInput = add_movie.querySelectorAll("input")
const entryTextArea = document.getElementById('entry-text')
const listRoot = document.getElementById('movie-list');
const deletemovemodal = document.getElementById('delete-modal')
const canceldelBTN = deletemovemodal.querySelector('.btn--passive')


let movielist = []

function clearinput()
{
    userInput[0].value = ''
    userInput[1].value = ''
    userInput[2].value = ''
}

// function UIupdate()
// {
//     if (movielist.length == 0)
//         entryTextArea.style.display = 'none'
//     else
//         entryTextArea.style.display = 'block'
// }

function delmovie(MId)
{
    let movieidx = 0
    for (const mov of movielist)
    {
        if (mov.id == MId)
            break;
        movieidx++
    }
    movielist.splice(movieidx , 1)
    listRoot.children[movieidx].remove()
    // listRoot.removeChild(listRoot.children[movieidx])
    displayoff()
    deletemovemodal.classList.remove('visible')
}

function delmoviehandle(movid)
{
    let yesdelBTN = deletemovemodal.querySelector('.btn--danger')

    deletemovemodal.classList.add("visible")
    displayoff()

    yesdelBTN.replaceWith(yesdelBTN.cloneNode(true))
    yesdelBTN = deletemovemodal.querySelector('.btn--danger')

    
    canceldelBTN.removeEventListener('click', cancelbtnhandler)
    yesdelBTN.addEventListener('click', delmovie.bind(null ,movid))
    canceldelBTN.addEventListener('click', cancelbtnhandler)
    // delmovie(movid)
}

function updatemovie(funid ,funtitle , funimgurl , funrating)
{
    const newMovieEle = document.createElement('li')
    newMovieEle.className = 'movie-element'
    newMovieEle.innerHTML = 
    `
    <div class="movie-element__image">
        <img src="${funimgurl}" alt="${funtitle}">
    </div>
    <div class="movie-element__info">
        <h2>${funtitle}</h2>
        <p>${funrating}/5 stars</p>
    </div>
    `
    newMovieEle.addEventListener('click' , delmoviehandle.bind(null,funid))
    listRoot.append(newMovieEle);
}

function closemoviemod()
{
    deletemovemodal.classList.remove("visible")
    add_movie.classList.remove("visible")
    displayoff()
}

function displayoff()
{
    backdropclas.classList.toggle("visible")
}

const toggleEnterMovie = () =>
{
    add_movie.classList.add("visible")
    displayoff()
}

function cancelbtnhandler()
{
    closemoviemod()
    clearinput()
}

function inputval()
{
    const titleval = userInput[0].value
    const imgurlval = userInput[1].value
    const ratingval = userInput[2].value

    if(!titleval.trim() || !imgurlval.trim() || !ratingval.trim() ||ratingval > 5 || ratingval < 1)
    {
        alert('Invalid Input')
        return 
    }

    const newmov = 
    {
        id : Math.random().toString(),
        Title : titleval,
        Image : imgurlval,
        Rating : ratingval
    }

    movielist.push(newmov)
    // toggleEnterMovie()
    closemoviemod()
    updatemovie(newmov.id, titleval,imgurlval,ratingval)
    clearinput()
    // UIupdate()
    console.log(movielist)
}

function afun ()
{
    alert("hi")
}

// UIupdate()
enterMovieBTN.addEventListener('click' , toggleEnterMovie)
backdropclas.addEventListener('click' , closemoviemod)
cancelMovieBTN.addEventListener('click' , cancelbtnhandler)
addMovieBTN.addEventListener('click' , inputval)
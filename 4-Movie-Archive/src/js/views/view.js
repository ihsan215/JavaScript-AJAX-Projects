import { AJAX } from "../auxiliary/helper.js";
import { getMovieList } from "../model.js";
import { getMovieInfo } from "../model.js";

class View {
  _movieTxt = document.querySelector("#movieName");
  _movieForm = document.querySelector("#MovieForm");
  _movieListArea = document.querySelector(".movie-area-ui");
  _overlayArea = document.querySelector(".overlay");
  _modalWindow = document.querySelector(".modal-window");
  movieName = "";
  movieList = [];
  movieInfo = undefined;

  constructor() {
    this.addFormHandler(this._handlerFunc.bind(this));
    this.addItemHandler(this.getmovieInfo.bind(this));
    this._overlayArea.addEventListener(
      "click",
      this.addCloseHandler.bind(this)
    );
  }

  addCloseHandler() {
    this._overlayArea.classList.add("hidden");
    this._modalWindow.classList.add("hidden");
  }

  addItemHandler(handler) {
    this._movieListArea.addEventListener("click", function (e) {
      e.preventDefault();
      const movieItem = e.target.closest(".movie-item");
      if (!movieItem) return;
      handler(movieItem.innerHTML);
    });
  }

  async getmovieInfo(movieItemTitle) {
    const Selectedmovie = this.movieList.find(
      (el) => el.title === movieItemTitle
    );
    this.movieInfo = await getMovieInfo(Selectedmovie.imdb_id);
    await this.renderInfo();
  }

  renderInfo() {
    this._overlayArea.classList.remove("hidden");
    this._modalWindow.classList.remove("hidden");
    const html = this._generateMarkup();
    this._modalWindow.innerHTML = "";
    this._modalWindow.insertAdjacentHTML("afterbegin", html);
  }

  _generateMarkup() {
    console.log(this.movieInfo);
    return `<div class="row no-gutters">
    <div class="col-md-4">
      <img
        src="${this.movieInfo.image_url}"
        class="card-img mt-5"
        alt="movie"
      />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title font-set">${this.movieInfo.title}</h5>
        <p class="card-text font-set-2">
        ${this.movieInfo.description}
        </p>
        <p class="card-text">
          <small class="text-muted font-set-3">Release: ${this.movieInfo.release}</small>
        </p>
        <a href="${this.movieInfo.trailer}" class="trailer"
          >Trailer</a
        >
      </div>
    </div>
  </div>`;
  }

  addFormHandler(handler) {
    this._movieForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }

  async _handlerFunc() {
    this.movieName =
      this._movieTxt.value.toLowerCase().split(" ").join("%20") + "/";
    if (!this._movieTxt.value) {
      this._movieTxt.value = "";
      return;
    }
    this.movieList = await getMovieList(this.movieName);
    this.renderMovieList();
    this._movieTxt.value = "";
  }

  renderMovieList() {
    this._movieListArea.innerHTML = "";

    this.movieList.forEach((el) => {
      const html = ` <li class="list-group-item movie-item">${el.title}</li>`;
      this._movieListArea.insertAdjacentHTML("afterbegin", html);
    });
  }
}

export default new View();

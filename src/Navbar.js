import './App.css';
import React, {useRef} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  useHistory 
} from "react-router-dom";
import songList from "./song";

function Navbar() {
  return (
    <Router>
      <div>
        <div className="logo"> Check Ponit </div>  
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add new song</Link>
          </li>
          <li>
            <Link to="/songs">Songs</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route exact path="/songs">
            <Songs />
          </Route>
          <Route path="/songs/:id">
            <Song />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Welcome to homepage</h2>
    </div>
  );
}

function Add() {
  const history = useHistory();
  const inputTitle = useRef();
  const inputAuthor = useRef();
  const inputPublishDate = useRef();
  const inputLyric = useRef();
   
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = inputTitle.current.value;
    const author = inputAuthor.current.value;
    const publishDate = inputPublishDate.current.value;
    const lyric = inputLyric.current.value;
    const id = Math.floor(Math.random() * 100);
    songList.push({id:id.toString(),author:author,publishedDate:publishDate,title:title,lyric:lyric});
    alert("Add successful !");
    history.push(`/songs/${id}`);
  }

  return (
    <div>
      <form>
        <p>Title: </p><input ref={inputTitle}></input>
        <p>Author:</p><input ref={inputAuthor}></input>
        <p>Published at: </p><input ref={inputPublishDate} type="date"></input>
        <p>Short lyric: </p><input ref={inputLyric}></input>
        <br />
        <button onClick={handleSubmit}>Add</button>        
      </form>
    </div>
  );
}

function Songs() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      {songList.sort((a,b) => {
        return new Date(b.publishedDate) - new Date(a.publishedDate)
      }).map(song => (
        <h3 key={song.id}><Link to={`${url}/${song.id}`}>{song.title}</Link></h3>  
      ))}

      <Switch>
        <Route exact path={path}>
          <h3>Please select a song.</h3>
        </Route>
        <Route path={`${path}/:id`}>
          <Song />
        </Route>  
      </Switch>
    </div>
    
  );
}

function Song() {
  let { id } = useParams();
  const currentSong = songList.filter(song => song.id === id);
  const currentAuthor = currentSong[0].author;
  return (
    <div>
      {songList.filter(function(song){return song.id === id}).map(song => (
        <div key={song.id}>
          <h3>Title: {song.title}</h3>
          <h3>Author: {song.author}</h3>
          <h3>Published at: {song.publishedDate}</h3>
          <h3>Short lyric: {song.lyric}</h3>
          <h3>Other songs of {song.author}: </h3>
          {songList.filter(song => song.author === currentAuthor && song.id !== id).map(song => (
            <h3 key={song.id}><Link to={`${song.id}`}>{song.title}</Link></h3>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
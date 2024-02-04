/* eslint-disable jsx-a11y/anchor-is-valid */
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Alldocuments from "./component/Alldocument";
import "./App.css";
import Adddocument from "./component/Adddocument";
import Updatedocument from "./component/Updatedocument";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Home from "./component/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#my-navbar"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="my-navbar">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/adddocument">
                    Add Document
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/alldocuments">
                    All Documents
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/adddocument" element={<Adddocument />}></Route>
          <Route path="/alldocuments" element={<Alldocuments />}></Route>
          <Route path="/updatedocument/:id" element={<Updatedocument />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

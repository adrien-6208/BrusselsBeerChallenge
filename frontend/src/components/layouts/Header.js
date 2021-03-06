function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">Brussels Beer Challenge</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/register">Registre des bières</a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/result">Résultat</a>
              </li>
            </ul>
          </div>
        </nav>
    );
  }
  
  export default Header;
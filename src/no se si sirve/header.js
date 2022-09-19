export default function Header(){
    return(
      <div>
        <nav class="navbar navbar-expand-lg bg-black">
          <div class="container-fluid">
            <a class="navbar-brand text-light" href="/">Chat'sApp
            </a>
            <button class="navbar-toggler bg-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <a class="nav-link text-light" href="#">Features</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link text-light" href="#">Ingresar</a>
                  </li>
                </ul>
              </div>
          </div>
        </nav>
      </div>
    )
  } 
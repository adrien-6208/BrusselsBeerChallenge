import Beers from '../components/Beers';
import Breweries from '../components/Breweries';
import { useState } from 'react';

function Register() {
  const [idBrewery, setIdBrewery] = useState('all');

  return (
    <div className="row">
      <div className="col-md-2 pb-2 pt-2">
        <h5>Recherche :</h5>
          <Breweries onChange={value => setIdBrewery(value)}/>
      </div>
      <div className="col-md-10">
          <Beers idBrewery={idBrewery}/>
      </div>
    </div>
  );
}

export default Register;
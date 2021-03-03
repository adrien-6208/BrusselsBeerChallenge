import Beers from './Beers';
import BreweriesForm from './BreweriesForm';
import MedalsForm from './MedalForm';
import BeerName from './BeerNameForm';
import { useState } from 'react';

function Register() {
  const [idBrewery, setIdBrewery] = useState('all');
  const [idMedal, setIdMedal] = useState('all');
  const [nameBeer, setNameBeer] = useState('');

  return (
    <section className="container">
      <div className="m-5">
        <h1 className="text-center">Résultats 2020</h1>
      </div>
      <div>
        <BeerName onChange={value => setNameBeer(value)}/>
        <div className="row">
          <div className="col-md-6">
            <BreweriesForm onChange={value => setIdBrewery(value)}/>
          </div>
          <div className="col-md-6">
            <MedalsForm onChange={value => setIdMedal(value)}/>
          </div>
        </div>
        <Beers idBrewery={idBrewery} idMedal={idMedal} nameBeer={nameBeer}/>
      </div>
    </section>
  );
}

export default Register;
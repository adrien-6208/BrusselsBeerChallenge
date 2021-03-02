import { Card } from 'react-bootstrap';

function Beer({dataBeer}) {
    return (
      <div className="col-md-3 pb-2 pt-2" key={dataBeer.id}>
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>{dataBeer.name}</p>
              <footer className="blockquote-footer">{dataBeer.alcohol}% - <cite title="Source Title">{dataBeer.brewery.name}</cite></footer>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    );
}

export default Beer;
function Beer({dataBeer}) {
  return (
    <div className="col-md-4 pb-2 pt-2" key={dataBeer.id}>
      <div className="card">
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{dataBeer.name}</p>
            <footer className="blockquote-footer">{dataBeer.alcohol}% - <cite title="Source Title">{dataBeer.brewery.name}</cite></footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default Beer;
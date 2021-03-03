
const BeerName = props => {
  return (
    <input className="form-control mb-2" onChange={event => props.onChange(event.target.value)} placeholder="Nom de la bière" />
  )   
}

export default BeerName;
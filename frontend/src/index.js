import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Beers from './components/Beers';
import Breweries from './components/Breweries';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { uriDev, uriProd } from './config';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? uriDev : uriProd,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
      <Breweries />
      <Beers />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById('root')
);

reportWebVitals();
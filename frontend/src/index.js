import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { uriDev, uriProd } from './config';
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? uriDev : uriProd,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,

  document.getElementById('root')
);

reportWebVitals();
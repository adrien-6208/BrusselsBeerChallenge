import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { uriDev, uriProd } from './config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './components/config/Routes';
import Header from './components/layouts/Header';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: process.env.NODE_ENV === 'development' ? uriDev : uriProd,
  cache: new InMemoryCache()
});

const App = () => (
  <ApolloProvider client={client}>
    <Header />
    <Routes />
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
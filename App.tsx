import * as React from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import './style.css';

function Bold(name) {
  return <b>{name}</b>;
}

export default function App() {
  const initialHerbs = ['Mate', 'Preto', 'Camomila', 'Maracujá'];
  let [herbs, setHerbs] = React.useState(initialHerbs);
  let [name, setName] = React.useState('');

  function searchHerb(e) {
    setName(e.target.value);
    setHerbs(herbs.filter((herb) => herb.includes(name)));

    if (!herbs.some((herb) => herb.includes(e.target.value))) {
      setHerbs(initialHerbs);
    }

    if (e.target.value === '') {
      setHerbs(initialHerbs);
    }
  }

  function cleanSearch(e) {
    e.preventDefault();
    setName('');
    setHerbs(initialHerbs);
  }

  return (
    <div className="container">
      <h1 style={{ 'text-align': 'center', margin: '3rem 0' }}>
        Inventário de ervas para chá
      </h1>

      <div style={{ display: 'flex' }}>
        <InputGroup>
          <Form.Control
            onChange={(e) => searchHerb(e)}
            placeholder="Erva"
            aria-label="Erva"
            aria-describedby="basic-addon1"
            value={name}
          />
        </InputGroup>

        <Button
          style={{ marginLeft: '5px' }}
          variant="danger"
          className="btn-sm"
          onClick={(e) => cleanSearch(e)}
        >
          Limpar
        </Button>
      </div>

      <p className="mt-2">
        {name ? 'Você esta procurando por: ' : ''}
        {name ? <b>{name}</b> : ''}
      </p>

      <hr />

      <ul>
        {herbs.map((herb) => (
          <li>{herb}</li>
        ))}
      </ul>
    </div>
  );
}

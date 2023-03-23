import * as React from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import MiniSearch from 'minisearch';

import './style.css';

function Bold(name) {
  return <b>{name}</b>;
}

export default function App() {
  const initialHerbs = [
    'Lavanda',
    'Lúcia-lima',
    'Hortelã',
    'Erva-cidreira',
    'Gengibre',
    'Tomilho',
    'Camomila',
    'Jasmim',
    'Stévia',
    'Manjerona',
    'Coentro',
    'Alecrim',
    'Erva-doce',
    'Erva-de-São-João',
    'Sálvia',
    'Amor-perfeito',
    '(Viola',
    'tricolor)',
    'Manjericão',
    'Erva-gateira',
    'Capim-limão',
  ].map((tea, id) => ({ id: id + 1, name: tea }));

  const teas = new MiniSearch({
    fields: ['name'],
    storeFields: ['name'],
    searchOptions: {
      boost: { title: 2 },
      fuzzy: 0.2,
    },
  });

  teas.addAll(initialHerbs);

  let [name, setName] = React.useState('');
  let [herbs, setHerbs] = React.useState(teas.search(name));

  function searchHerb(e) {
    setName(e.target.value);
    setHerbs(teas.search(name));

    if (e.target.value === '') {
      setHerbs(teas.search(name));
    }
  }

  function cleanSearch(e) {
    e.preventDefault();
    setName('');
    setHerbs(teas.search(name));
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

      <ListGroup>
        {teas.search(name).length === 0
          ? initialHerbs.map((herb) => (
              <ListGroup.Item>{herb.name}</ListGroup.Item>
            ))
          : teas
              .search(name)
              .map((herb) => <ListGroup.Item>{herb.name}</ListGroup.Item>)}
      </ListGroup>
    </div>
  );
}

import * as React from 'react';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import './style.css';

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
      <h1>Inventário de ervas para chá</h1>
      <InputGroup className="mb-3">
        <Form.Control
          onChange={(e) => searchHerb(e)}
          placeholder="Erva"
          aria-label="Erva"
          aria-describedby="basic-addon1"
          value={name}
        />
      </InputGroup>

      <Button onClick={(e) => cleanSearch(e)}>Limpar busca</Button>

      <p>{name ? 'Você esta procurando por: ' + name : ''}</p>
      <ul>
        {herbs.map((herb) => (
          <li>{herb}</li>
        ))}
      </ul>
    </div>
  );
}

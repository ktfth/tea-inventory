import * as React from 'react';

import Button from 'react-bootstrap/Button';

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
    <div>
      <h1>Inventário de ervas para chá</h1>
      <input
        className="tea-search"
        type="text"
        placeholder="Erva"
        onChange={(e) => searchHerb(e)}
        value={name}
      />
      <span>
        {' '}
        <a href="#" onClick={(e) => cleanSearch(e)}>
          Limpar busca
        </a>
      </span>
      <p>{name ? 'Você esta procurando por: ' + name : ''}</p>
      <ul>
        {herbs.map((herb) => (
          <li>{herb}</li>
        ))}
      </ul>

      <Button>Click me</Button>
    </div>
  );
}

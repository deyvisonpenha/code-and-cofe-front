import React, { useState, useMemo } from 'react';
import api from '../../services/api';

import camera from '../../assets/camera.svg';
import './styles.css';

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [site, setSite] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem('user_id');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);
    data.append('site', site);

    await api.post('/spots', data, {
      headers: { user_id },
    });

    history.push('/dashboard');

  }

  function handleCancel() {
    history.push('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="company">SITE *</label>
      <input
        id="site"
        placeholder="Sua site incrível"
        value={site}
        onChange={event => setSite(event.target.value)}
      />
      <label htmlFor="techs">TECNOLOGIAS * <span>(Separadas por virgula)</span></label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price">VALOR DA DIARIA * <span>(Em branco para GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Valor cobrado por dia"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <div className="row-buttons">
        <button className="btn-new" onClick={handleCancel} >Cancelar</button>
        <button type="submit" className="btn-new">Cadastrar</button>
      </div>
    </form >
  );
}
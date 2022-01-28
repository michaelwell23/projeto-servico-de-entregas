import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import DeliverymenItem from './DeliverymenItem';

import { Container, Title, Content, Table, Thead } from './styles';

export default function Devilerymen() {
  const [deliverymen, setDeliverymen] = useState([]);

  async function loadDeliverymen() {
    const response = await api.get('deliverymen');

    setDeliverymen(response.data);
  }

  useEffect(() => {
    loadDeliverymen();
  }, []);

  async function handleSearchDeliverymen(e) {
    const response = await api.get('/deliverymen', {
      params: {
        q: e.target.value,
      },
    });

    setDeliverymen(response.data);
  }

  return (
    <Container>
      <Content>
        <Title>Entregadores</Title>
        <div>
          <div>
            <input
              type="text"
              placeholder="Pesquisar"
              onChange={handleSearchDeliverymen}
            />
            <MdSearch size={20} color="#fff" />
          </div>
          <button
            type="button"
            onClick={() => history.push('/deliverymen/register')}
          >
            <MdAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </button>
        </div>
      </Content>
      <Table>
        <Thead>
          <span className="id">ID</span>
          <span>Foto</span>
          <span className="name">Nome</span>
          <span>Email</span>
          <span className="action">Ações</span>
        </Thead>
        {deliverymen.map(deliveryman => (
          <DeliverymenItem
            key={deliveryman.id}
            deliveryman={deliveryman}
            loadDeliverymen={loadDeliverymen}
          />
        ))}
      </Table>
    </Container>
  );
}

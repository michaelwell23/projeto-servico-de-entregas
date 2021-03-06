import React, { useState, useEffect } from 'react';

import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';
import dataWithStatus from '~/utils/dataWithStatus';

import DeliveryItem from './DeliveryItem';

import { Container, Title, Content, Table, Thead } from './styles';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);

  async function loadDeliveries() {
    const response = await api.get('deliveries');

    const data = dataWithStatus(response);

    setDeliveries(data);
  }

  useEffect(() => {
    loadDeliveries();
  }, []);

  async function handleSearchDelivery(e) {
    const response = await api.get('/deliveries', {
      params: {
        q: e.target.value,
      },
    });

    const data = dataWithStatus(response);
    setDeliveries(data);
  }

  return (
    <Container>
      <Content>
        <Title>Encomendas</Title>
        <div>
          <div>
            <input
              type="text"
              onChange={handleSearchDelivery}
              placeholder="Pesquisar"
            />
            <MdSearch color="#999" size={16} />
          </div>
          <button
            type="button"
            onClick={() => history.push('/deliveries/register')}
          >
            <MdAdd size={20} color="#fff" />
            <span>CADASTRAR</span>
          </button>
        </div>
      </Content>
      <Table>
        <Thead>
          <span className="id">ID</span>
          <span>Destinatário</span>
          <span>Entregador</span>
          <span>Cidade</span>
          <span className="state">Estado</span>
          <span>Status</span>
          <span className="action">Ações</span>
        </Thead>

        {deliveries.map(delivery => (
          <DeliveryItem
            key={delivery.id}
            loadDeliveries={loadDeliveries}
            delivery={delivery}
          />
        ))}
      </Table>
    </Container>
  );
}

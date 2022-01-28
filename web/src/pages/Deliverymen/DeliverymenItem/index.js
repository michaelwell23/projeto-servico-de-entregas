import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import { MdEdit, MdDeleteForever } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import ActionButton from '~/components/ActionButton';

import { Container, ActionContainer } from './styles';

export default function DeliverymanItem({ deliveryman, loadDeliverymen }) {
  async function handleDelete() {
    const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

    if (!confirm) {
      toast.error('Encomenda não apagada!');
      return;
    }

    try {
      await api.delete(`/deliverymen/${deliveryman.id}`);
      loadDeliverymen();
      toast.success('Dados do entregador apagados com sucesso!');
    } catch (err) {
      toast.error('Dados do entregador foram apagados!');
    }
  }

  return (
    <Container>
      <div className="id">
        <span>#{deliveryman.id}</span>
      </div>
      <div>
        <img
          src={
            deliveryman.avatar.url ||
            'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt="Avatar"
        />
      </div>
      <div>
        <span>{deliveryman.name}</span>
      </div>
      <div>
        <span>{deliveryman.email}</span>
      </div>
      <div className="action">
        <ActionButton>
          <ActionContainer>
            <div>
              <button
                type="button"
                onClick={() =>
                  history.push(`/deliverymen/edit/${deliveryman.id}`)
                }
              >
                <MdEdit size={20} color="#4D85EE" />
                <span>Editar</span>
              </button>
            </div>
            <div>
              <button type="button" onClick={handleDelete}>
                <MdDeleteForever size={20} color="#DE3B3B" />
                <span>Excluir</span>
              </button>
            </div>
          </ActionContainer>
        </ActionButton>
      </div>
    </Container>
  );
}

DeliverymanItem.propTypes = {
  loadDeliverymen: PropTypes.func.isRequired,
  deliveryman: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

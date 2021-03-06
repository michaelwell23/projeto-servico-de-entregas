/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable-next-line jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useRef, useEffect } from 'react';
import * as Yup from 'yup';

import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import history from '~/services/history';
import api from '~/services/api';

import SimpleInput from '~/components/SimpleInput';

import { Container, Content, Title, FormContainer } from './styles';

export default function RecipientEdit({ match }) {
  const formRef = useRef(null);

  const { id } = match.params;

  useEffect(() => {
    async function loadInitialData(recipientId) {
      const response = await api.get(`/recipients/${recipientId}`);

      formRef.current.setData(response.data);
    }
    loadInitialData(id);
  }, [id]);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do destinatário é obrigatório'),
        street: Yup.string().required('A rua do destinatário é obrigatória'),
        number: Yup.string().required('O número do destinatário é obrigatório'),
        city: Yup.string().required('A cidade do destinatário é obrigatória'),
        state: Yup.string().required('O estado do destinatário é obrigatório'),
        zipcode: Yup.string().required('O CEP do destinatário é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/recipients/${id}`, data);

      toast.success('Destinatário editado com sucesso!');
      history.push('/recipients');
    } catch (err) {
      toast.error('Não foi possível editar o destinatário');
    }
  }

  return (
    <Container>
      <Content>
        <div>
          <Title>Cadastro de destinatários</Title>
          <div>
            <button
              type="button"
              id="return"
              onClick={() => history.push('/recipients')}
            >
              <MdKeyboardArrowLeft size={20} color="#fff" /> VOLTAR
            </button>
            <button
              type="button"
              id="save"
              onClick={() => formRef.current.submitForm()}
            >
              <MdCheck size={20} color="#fff" /> SALVAR
            </button>
          </div>
        </div>
        <FormContainer ref={formRef} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              <strong>Nome</strong>
              <SimpleInput
                type="text"
                id="name"
                name="name"
                placeholder="Nome"
              />
            </label>
          </div>
          <div>
            <label htmlFor="street" id="street">
              <strong>Rua</strong>
              <SimpleInput
                type="text"
                id="street"
                name="street"
                placeholder="Rua"
              />
            </label>
            <label htmlFor="number" id="number">
              <strong>Número</strong>
              <SimpleInput
                type="text"
                id="number"
                name="number"
                placeholder="Numero"
              />
            </label>
            <label htmlFor="add_on" id="add_on">
              <strong>Complemento</strong>
              <SimpleInput
                type="text"
                id="add_on"
                name="add_on"
                placeholder="Complemento"
              />
            </label>
          </div>
          <div>
            <label htmlFor="city" id="city">
              <strong>Cidade</strong>
              <SimpleInput
                type="text"
                id="city"
                name="city"
                placeholder="cidade"
              />
            </label>
            <label htmlFor="state" id="state">
              <strong>Estado</strong>
              <SimpleInput
                type="text"
                id="state"
                name="state"
                placeholder="Estado"
              />
            </label>
            <label htmlFor="zipcode" id="zipcode">
              <strong>CEP</strong>
              <SimpleInput
                type="text"
                id="zipcode"
                name="zipcode"
                placeholder="CEP"
              />
            </label>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
}

RecipientEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

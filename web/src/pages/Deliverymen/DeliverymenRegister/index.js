/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable-next-line jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useRef } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import SimpleInput from '~/components/SimpleInput';
import AvatarInput from '~/components/AvatarInput';

import { Container, Content, Title, FormContainer } from './styles';

export default function DeliverymenRegister() {
  const formRef = useRef(null);

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('O nome do entregador é obrigatório'),
        email: Yup.string().required('O email do entregador é obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const dataFile = new FormData();

      dataFile.append('file', data.avatar);

      const responseFile = data.avatar
        ? await api.post('files', dataFile)
        : null;

      await api.post('deliverymen', {
        name: data.name,
        email: data.email,
        avatar_id: responseFile.data.id,
      });

      toast.success('Entregador registrado com sucesso!');
    } catch (err) {
      toast.error('Não foi possível registrar o entregador');
    }
  }

  return (
    <Container>
      <Content>
        <div>
          <Title>Cadastro de entregadores</Title>
          <div>
            <button
              type="button"
              id="return"
              onClick={() => history.push('/deliverymen')}
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
          <AvatarInput name="avatar" />
          <label htmlFor="name">
            <strong>Nome</strong>
            <SimpleInput
              type="text"
              id="name"
              name="name"
              placeholder="Nome do entregador"
            />
          </label>
          <label htmlFor="email">
            <strong>Email</strong>
            <SimpleInput
              type="text"
              id="email"
              name="email"
              placeholder="E-mail do entregador"
            />
          </label>
        </FormContainer>
      </Content>
    </Container>
  );
}

import React from 'react';

import PropTypes from 'prop-types';
import { parseISO, format } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import StatusLine from './StatusLine';

import {
  Container,
  Content,
  Header,
  Title,
  Footer,
  Group,
  Field,
  Value,
  LookDetailsButton,
  Text,
} from './styles';

export default function Delivery({ data, navigation }) {
  const formattedDate = format(parseISO(data.createdAt), 'dd/MM/yyyy');

  return (
    <Container>
      <Content>
        <Header>
          <Icon size={25} name="local-shipping" color="#dc134c" />
          <Title>{`Encomenda ${data.id}`}</Title>
        </Header>
        <StatusLine start={data.start_date} end={data.end_date} />
      </Content>
      <Footer>
        <Group>
          <Field>Data</Field>
          <Value>{formattedDate}</Value>
        </Group>
        <Group>
          <Field>Cidade</Field>
          <Value>{data.recipient.city}</Value>
        </Group>
        <LookDetailsButton
          onPress={() => navigation.navigate('Details', { data })}
        >
          <Text>Ver detalhes</Text>
        </LookDetailsButton>
      </Footer>
    </Container>
  );
}

Delivery.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    createdAt: PropTypes.string,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    recipient: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

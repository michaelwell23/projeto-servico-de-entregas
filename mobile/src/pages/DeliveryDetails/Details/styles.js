import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

export const Container = styled.View`
  position: relative;
  background: #fff;
  flex: 1;
`;

export const HeaderBackground = styled.View`
  position: absolute;
  background: #dc134c;
  height: 205px;
  width: ${Dimensions.get('window').width}px;
`;

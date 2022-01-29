import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: column;
  align-self: stretch;
  margin-top: 30px;
  padding: 0 10px;
`;

export const Line = styled.View`
  height: 1px;
  background: #dc134c;
  border: 1px solid #dc134c;
  margin: 0 24px;
`;

export const StatusContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: -7px;
`;

export const Dot = styled.View`
  width: 12px;
  height: 12px;
  border: 1px solid #dc134c;
  border-radius: 6px;
  background: ${props => (props.filled ? '#dc134c' : '#FFFFFF')};
  margin-bottom: 5px;
`;

export const LabelContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.Text`
  color: #999;
  font-weight: bold;
  font-size: 9px;
  max-width: 60px;
  text-align: center;
`;

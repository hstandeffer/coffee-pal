import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: 1em;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ open }) => open && !!open ? '#383838' : '#383838' };
  padding: 0;
  font-weight: 600;
`
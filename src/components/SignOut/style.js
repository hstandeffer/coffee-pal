import styled from 'styled-components';

export const StyledButton = styled.button`
  font-size: 1em;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ open }) => open && !!open ? '#4A4A4A' : '#fff' };
  padding: 0;
  font-weight: 600;
`
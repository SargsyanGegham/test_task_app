import { Button } from '@mui/material';
import styled, { css } from 'styled-components';

interface LogOutButtonProps {
  isAuth: boolean;
}

export const LogOutButton = styled(Button)<LogOutButtonProps>`
  position: fixed;
  right: 10px;
  top: 10px;
  ${(props) =>
    !props.isAuth &&
    css`
      display: none;
    `}
`;

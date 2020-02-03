import * as React from "react";
import { useRef } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 20px;
  height: 20px;
  margin: 5px;
  padding: 10px;
  border: 1px solid lightgrey;

  & input {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    border-bottom: 2px solid darkgrey;
    text-align: center;
    color: transparent;
    text-shadow: 0 0 0 gray;

    &:focus {
      outline: none;
    }

    /* Chrome, Safari, Edge, Opera */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type="number"] {
      -moz-appearance: textfield;
    }
  }

  ${props =>
    props.active &&
    css`
      border-color: black;
      & input {
        border-color: black;
      }
    `}
`;

interface Props {
  active: boolean;
  onKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

function Digit(props: Props) {
  const { active, onKeyUp, onClick, onFocus } = props;
  const ref = useRef<HTMLInputElement>(null);

  if (active && ref.current) {
    ref.current.focus();
  }

  return (
    <Wrapper active={active} onClick={onClick}>
      <input
        ref={ref}
        type="text"
        maxLength={1}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
      />
    </Wrapper>
  );
}

export { Digit };

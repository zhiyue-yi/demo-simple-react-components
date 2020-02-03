import * as React from "react";
import { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { Digit } from "./digit";

enum Key {
  BACKSPACE = 8,
  ARROW_LEFT = 37,
  ARROW_UP = 38,
  ARROW_RIGHT = 39,
  ARROW_DOWN = 40
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

interface Props {
  digits: number;
}

function SimpleOtp(props: Props) {
  const { digits = 1 } = props;
  const [activeKey, setActiveKey] = useState(0);

  const decrement = () => {
    if (activeKey > 0) {
      setActiveKey(activeKey - 1);
    }
  };

  const increment = () => {
    if (activeKey < digits - 1) {
      setActiveKey(activeKey + 1);
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");

    switch (e.keyCode) {
      case Key.BACKSPACE:
      case Key.ARROW_LEFT:
        decrement();
        break;
      case Key.ARROW_RIGHT:
        increment();
        break;
      case Key.ARROW_UP:
        setActiveKey(0);
        break;
      case Key.ARROW_DOWN:
        setActiveKey(digits - 1);
        break;
      default:
        // Handle numeric input
        if (/[0-9]/.test(target.value)) {
          increment();
        }
    }
  };

  const inputs = [];
  for (let i = 0; i < digits; i++) {
    inputs.push(
      <Digit
        key={i}
        active={activeKey === i}
        onKeyUp={handleKeyUp}
        onFocus={() => setActiveKey(i)}
        onClick={() => setActiveKey(i)}
      />
    );
  }

  return <Wrapper>{inputs.map(input => input)}</Wrapper>;
}

export { SimpleOtp };

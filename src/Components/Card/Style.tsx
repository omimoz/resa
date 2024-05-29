import { css } from "@emotion/css";

const Style = css`
  .wrapper {
    padding: var(--container);
    color: var(--primary-txt);
    &:hover {
      background: var(--secondary-bg);
    }
    transition: all 0.5s;
    cursor: pointer;
  }
  .container {
    display: flex;
    justify: space-between;
    align-items: center;
  }
  .section {
    display: flex;
    gap: var(--container);
    flex-direction: column;
    flex-grow: 1;
  }
  .items-end {
    align-items: flex-end;
  }
  .bold {
    font-weight: bold;
  }
  .sub {
    color: var(--secondary-txt);
    font-size: 12px;
  }
  .precentage {
    font-size: 12px;
  }
  .price {
    transition: all .2s ease;
    .decreaseAnimated {
      color: red;
    }
    .increaseAnimated {
      color: green;
    }
  }
`;
export default Style;

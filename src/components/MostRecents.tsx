import React, { Props, useContext } from "react";
import styled from "styled-components";
import PaginationContext, { PaginationContextProps } from "./pagination";

const MostRecentStyled = styled.div`
  display: grid;
  grid-template-columns: 50px auto 50px;
  grid-template-areas: "left_arrow content right_arrow";
  max-width: 600px;
  margin: auto;
  max-width: 900px;
  align-items: center;

  .container {
    display: grid;
    min-height: 600px;
    padding: auto;
    /* grid-template-columns: 1fr 1fr 1fr; */
    grid-template-rows: 180px auto;
    align-items: center;
    grid-area: content;
  }

  .slider-arrow {
    color: #fff;
    height: 50px;
    width: 50px;
    /* position: absolute; */
    transition: all 0.4s ease;
    border-radius: 50%;
    padding: 10px;
    /* display: none; */
  }

  .slider-arrow.disabled {
    opacity: 0.3;
  }

  .slider-arrow:not(.disabled) {
    cursor: pointer;
  }

  .slider-arrow:not(.disabled):hover {
    transform: scale(1.3);
    background-color: #1e1c1d;
  }
  .slider-arrow-left {
    grid-area: left_arrow;
  }
  .slider-arrow-right {
    grid-area: right_arrow;
  }
`;

export const MostRecent = <T extends object>({ children }: Props<T>) => {
  const { numberOfPages, pageSelected, previous, next } = useContext(
    PaginationContext
  ) as Required<PaginationContextProps>;

  return (
    <MostRecentStyled>
      <svg
        onClick={previous}
        className={`slider-arrow slider-arrow-left ${pageSelected === 0 &&
          "disabled"}`}
      >
        <svg id="arrow-left" viewBox="0 0 477.175 477.175">
          <path
            stroke="currentColor"
            fill="currentColor"
            d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
          />
          //{" "}
        </svg>
      </svg>
      <svg
        onClick={next}
        className={`slider-arrow slider-arrow-right ${pageSelected >=
          numberOfPages - 1 && "disabled"}`}
      >
        <svg id="arrow-right" viewBox="0 0 477.175 477.175">
          <path
            stroke="currentColor"
            fill="currentColor"
            d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"
          />
        </svg>
      </svg>
      <div className="container">{children}</div>
    </MostRecentStyled>
  );
};

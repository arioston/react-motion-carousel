import React, { useContext } from "react";
import styled from "styled-components";
import { range } from "ramda";
import PaginationContext, { PaginationContextProps } from "./pagination";

export const Circle = ({ index, handlerCircleClick, pageSelected }: any) => {
  return (
    <div
      onClick={() => handlerCircleClick(index)}
      key={index}
      className="page-circle-container"
    >
      <div
        className={`page-circle page-circle-${index} ${
          index === pageSelected ? "active" : ""
        }`}
      />
    </div>
  );
};

const TitleHeader = styled.div`
  font-size: 1.8em;
  height: 42px;
  line-height: 42px;
  font-weight: 900;
  display: flex;

  @media print, screen and (min-width: 40em) {
    background-image: linear-gradient(#7c7b7b 33%, hsla(0, 0%, 100%, 0) 0);
    background-position: 100%;
    background-size: 1.5px 4px;
    background-repeat: repeat-y;
  }
`;

const PaginationStyled = styled.div`
  display: flex;
  align-self: center;
  justify-content: space-between;
  text-align: center;
  align-items: center;

  .circles {
    display: inline-block;
    margin-left: 30px;

    .page-circle-container {
      cursor: pointer;
      display: inline-block;
      vertical-align: middle;
      margin: 5px;
      width: 15px;
      height: 15px;
      position: relative;
    }

    .page-circle {
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
      margin: auto;
      background-color: #5a5953;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      transition: all 0.2s linear;
      border: 0 solid;
      will-change: height width;

      &.active {
        width: 12px;
        height: 12px;
        border: 2px solid #fff;
        background-color: transparent;
      }
    }
  }
  .counter {
    color: #5a5953;
    font-weight: 900;
    font-size: 16px;
  }
`;

const SubTitleStyled = styled.div`
  display: flex;
  padding: 0 50px;
  background-image: linear-gradient(#7c7b7b 33%, hsla(0, 0%, 100%, 0) 0);
  color: #7c7b7b;
  font-weight: 900;
  font-size: 12px;
  text-transform: uppercase;
  -ms-flex-align: center;
  align-items: center;
  letter-spacing: 3px;
  height: 42px;

  background-position: 100%;
  background-size: 1.5px 4px;
  background-repeat: repeat-y;
  /*
  @media print, screen and (min-width: 40em) {
    display: -ms-flexbox;
    display: flex;
  }

  @media print, screen and (min-width: 60em) {
    padding: 0 50px;
  } */
`;

const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  @media print, screen and (max-width: 40em) {
    ${TitleHeader} {
      grid-column: span 2;
    }
    ${PaginationStyled}, ${SubTitleStyled} {
      display: none;
    }
  }
`;

export const Header = ({ handlerCircleClick }: any) => {
  const pagination = useContext(PaginationContext) as Required<
    PaginationContextProps
  >;

  const circleList = range(0, pagination.numberOfPages);
  return (
    <StyledHeader>
      <TitleHeader className="title">Most Recent</TitleHeader>
      <SubTitleStyled className="sub-title">
        Blog posts, Publications and talks
      </SubTitleStyled>
      <PaginationStyled className="pagination">
        <div className="circles">
          {circleList.map((index: number) => (
            <Circle
              key={index}
              index={index}
              handlerCircleClick={handlerCircleClick}
              pageSelected={pagination.pageSelected}
            />
          ))}
        </div>
        <div className="counter" id="homeCounter">
          <span className="slide-count">{`0${pagination.pageSelected +
            1}`}</span>{" "}
          /{" "}
          <span className="slide-total">{`0${pagination.numberOfPages}`}</span>
        </div>
      </PaginationStyled>
    </StyledHeader>
  );
};

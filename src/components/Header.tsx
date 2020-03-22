import React, { useContext } from "react";
import styled from "styled-components";
import { range } from "ramda";
import PaginationContext from "./pagination";

const StyledHeader = styled.div`
  display: flex;
  position: relative;
  padding-top: 50px;
  padding-bottom: 20px;

  .title {
    font-size: 40px;
    height: 42px;
    line-height: 42px;
    font-weight: 900;
    display: flex;
    background-image: linear-gradient(#7c7b7b 33%, hsla(0, 0%, 100%, 0) 0);
  }

  .sub-title {
    display: flex;
    background-image: linear-gradient(#7c7b7b 33%, hsla(0, 0%, 100%, 0) 0);
    color: #7c7b7b;
    font-weight: 900;
    font-size: 12px;
    text-transform: uppercase;
    display: none;
    -ms-flex-align: center;
    align-items: center;
    letter-spacing: 3px;
    height: 42px;
  }

  .title,
  .sub-title {
    width: 33%;
    background-position: 100%;
    background-size: 1.5px 4px;
    background-repeat: repeat-y;
  }

  .pagination {
    width: 33%;
    display: flex;
    align-self: center;
    justify-content: space-between;
    text-align: center;
    align-items: center;
  }

  .counter {
    color: #5a5953;
    font-weight: 900;
    font-size: 16px;
  }

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

  @media print, screen and (min-width: 40em) {
    .sub-title {
      display: -ms-flexbox;
      display: flex;
    }
  }

  @media print, screen and (min-width: 60em) {
    .sub-title {
      padding: 0 50px;
    }
  }
`;

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

export const Header = ({ handlerCircleClick }: any) => {
  const pagination = useContext(PaginationContext);
  const numberOfPages = Math.max(0, Math.trunc(pagination.cards.length / 3));
  const circleList = range(0, numberOfPages);
  return (
    <StyledHeader className="row">
      <div className="title">Most Recent</div>
      <div className="sub-title">Blog posts, Publications and talks</div>
      <div className="pagination">
        <div className="circles">
          {circleList.map((index: number) => (
            <Circle
              index={index}
              handlerCircleClick={handlerCircleClick}
              pageSelected={pagination.pageSelected}
            />
          ))}
        </div>
        <div className="counter" id="homeCounter">
          <span className="slide-count">{`0${pagination.pageSelected +
            1}`}</span>{" "}
          / <span className="slide-total">{`0${numberOfPages}`}</span>
        </div>
      </div>
    </StyledHeader>
  );
};

import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import {PaginationContext} from './pagination'

const SliderStyled = styled.div`
  position: relative;

  .slider-arrow {
    color: #fff;
    height: 50px;
    width: 50px;
    position: absolute;
    transition: all 0.4s ease;
    border-radius: 50%;
    padding: 10px;
    display: none;
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

  @media print, screen and (min-width: 40em) {
    .slider-arrow {
      display: block;
    }
  }

  @media print, screen and (min-width: 40em) {
    .slider-arrow.slider-arrow-left {
      top: -90px;
      bottom: 0;
      right: 150px;
    }

    .slider-arrow.slider-arrow-right {
      top: -90px;
      bottom: 0;
      right: 50px;
    }
  }

  @media print, screen and (min-width: 60em) {
    .slider-arrow.slider-arrow-left {
      top: 100px;
      bottom: 0;
      left: -50px;
    }

    .slider-arrow.slider-arrow-right {
      top: 100px;
      bottom: 0;
      right: -50px;
    }
  }

  @media screen and (min-width: 75em) {
    .slider-arrow.slider-arrow-left {
      top: 100px;
      bottom: 0;
      left: -100px;
    }

    .slider-arrow.slider-arrow-right {
      top: 100px;
      bottom: 0;
      right: -100px;
    }
  }
`;

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

export const SliderContainer = ({ children }) => {
  const pagination = useContext(PaginationContext)
  useEffect(() => {
    pagination.initializeCards(children);
  }, [true])

  return (
    <SliderStyled className="row slider dark">
      <svg
          onClick={() => pagination.previous()}
          className={`slider-arrow slider-arrow-left ${pagination.pageSelected ===
            0 && "disabled"}`}
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
          onClick={() => pagination.next()}
          className={`slider-arrow slider-arrow-right ${pagination.pageSelected ===
            pagination.upperBound && "disabled"}`}
        >
          <svg id="arrow-right" viewBox="0 0 477.175 477.175">
            <path
              stroke="currentColor"
              fill="currentColor"
              d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"
            />
          </svg>
        </svg>
      <AnimatePresence initial={false}>
        {pagination.cards}
      </AnimatePresence>
    </SliderStyled>
  );
};

import React, { useState, useEffect, useContext, Props } from "react";
import styled from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { PaginationContext, PaginationContextProps } from "./pagination";

const SliderStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;

  @media print, screen and (max-width: 40em) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;

    .card:first-of-type {
      grid-column: 1 / span 2;
    }

    min-height: 830px;
  }
`;

export const SliderContainer = <P extends object>({ children }: Props<P>) => {
  const pagination = useContext(PaginationContext) as Required<
    PaginationContextProps
  >;

  useEffect(() => {
    pagination.initializeCards(children);
  }, [true]);

  return (
    <SliderStyled className="dark">
      <AnimatePresence initial={false} exitBeforeEnter>
        {pagination.cards}
      </AnimatePresence>
    </SliderStyled>
  );
};

import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Container } from "./Container";
import { Header } from "./Header";
import { SliderContainer } from "./Slider";
import { Card } from "./Card";

import { cards } from "../data/cards";
import { PaginationProvider } from "./pagination";
import { MostRecent } from "./MostRecents";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size:  120%;
  }

  *,:after,:before {
    box-sizing: inherit
  }

  body {
    margin: 0;
    padding: 0;
    background: #f5f8fa;
    font-family: Lato,sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: #232122;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .row {
    max-width: 50rem;
    margin-right: auto;
    margin-left: auto;

    &:after {
      clear: both
    }

    &:after, &:before {
      display: table;
      content: " ";
    }
  }

  .column, .columns {
    width: 100%;
    float: left;
    padding-right: 0;
    padding-left: 0;
  }

  .dark .card-content {
    box-shadow: 0 30px 30px 0 rgba(0, 0, 0, 0.5);
    background-color: #232122;
  }

  .large-4 {
    width: 33.33%;
  }

  .medium-12 .card-image {
    height: 180px!important;
    width: 100%;
  }

  .medium-12 .card-image img {
    height: 180px!important;
  }

  @media screen and (max-width: 59.9375em) {
  .show-for-large {
      display:none!important
    }
  }

  @media screen and (min-width: 60em) {
    .hide-for-large-only {
        display:none!important
    }
  }

  @media screen and (max-width: 59.9375em) {
    .show-for-large-only {
        display:none!important
    }
  }
`;

const theme = {
  background: "#232122",
  color: "#fff"
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <PaginationProvider>
          <MostRecent>
            <Header />
            <SliderContainer>
              {cards.map((c, i) => (
                <Card
                  custom={i}
                  key={String(c.id)}
                  imageUrl={c.imageUrl}
                  title={c.title}
                  category={c.category}
                  type={c.type}
                  date={c.date}
                />
              ))}
            </SliderContainer>
          </MostRecent>
        </PaginationProvider>
      </Container>
      <GlobalStyle />
    </ThemeProvider>
  );
};

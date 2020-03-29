import React, { Props, useState, useEffect, useCallback } from "react";

export type Direction = "right" | "left";

export type PaginationContextProps = {
  next: () => void;
  previous: () => void;
  setCards: (arr: unknown[]) => void;
  pageSelected: number;
  upperBound: number;
  cards: unknown[];
  setPageSelected: (page: number) => void;
  isInRange: (index: number) => boolean;
  initializeCards: (newCards: unknown[] | unknown) => void;
  numberOfPages: number;
  exitDirection: Direction;
};

export const PaginationContext = React.createContext<
  Partial<PaginationContextProps>
>({});

let cardList: unknown[] = [];
export const PaginationProvider = <T extends object>({
  children,
  ..._rest
}: Props<T>) => {
  const [pagination, setPageSelected] = useState<{
    pageSelected: number;
    cards: unknown[];
    exitDirection: Direction;
  }>({ pageSelected: 0, exitDirection: "right", cards: [] });
  const { pageSelected, exitDirection, cards } = pagination;
  const [upperBound, setUpperBound] = useState(0);

  const getExitDirection = (newPagenumber: number): Direction => {
    console.log(pageSelected, newPagenumber, upperBound);
    if (pageSelected == 0) {
      return "left";
    } else if (pageSelected == upperBound - 1) {
      return "right";
    }
    return newPagenumber > pageSelected ? "left" : "right";
  };

  const next = () => {
    const nextPage = pageSelected + 1;
    if (nextPage < upperBound) {
      setPageSelected({
        exitDirection: getExitDirection(nextPage),
        pageSelected: pageSelected + 1,
        cards: cardList.filter((_, i) => isInRange(i, pageSelected + 1))
      });
    }
  };

  const previous = () => {
    const nextPage = pageSelected - 1;
    if (nextPage >= 0) {
      setPageSelected({
        exitDirection: getExitDirection(nextPage),
        pageSelected: pageSelected - 1,
        cards: cardList.filter((_, i) => isInRange(i, pageSelected - 1))
      });
    }
  };

  const isInRange = (index: number, currentPageSelected = pageSelected) => {
    return (
      index >= currentPageSelected * 3 && index < currentPageSelected * 3 + 3
    );
  };

  const initializeCards = (newCards: unknown[] | unknown) => {
    cardList = Array.isArray(newCards) ? [...newCards] : [newCards];
    setPageSelected({
      exitDirection: getExitDirection(0),
      pageSelected: 0,
      cards: cardList.filter((_, i) => isInRange(i, 0))
    });
    setUpperBound(Math.round(cardList.length / 3));
  };

  return (
    <PaginationContext.Provider
      value={{
        next,
        previous,
        initializeCards,
        cards,
        pageSelected,
        setPageSelected: (page: number) =>
          setPageSelected({
            exitDirection: getExitDirection(page),
            pageSelected: page,
            cards: cardList.filter((_, i) => isInRange(i, page))
          }),
        isInRange,
        numberOfPages: upperBound,
        exitDirection: exitDirection
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const withPagination = <P extends object>(
  Component: React.ComponentType<P>
) => (props: P) => (
  <PaginationContext.Consumer>
    {pagination => <Component {...props} pagination={pagination} />}
  </PaginationContext.Consumer>
);

export default PaginationContext;

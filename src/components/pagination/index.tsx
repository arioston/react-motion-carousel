import React, { Props, useState, useEffect, useCallback } from "react";

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
  }>({ pageSelected: -1, cards: [] });
  const { pageSelected, cards } = pagination;
  const [upperBound, setUpperBound] = useState(0);

  const next = () => {
    if (pageSelected + 1 < upperBound) {
      setPageSelected({
        pageSelected: pageSelected + 1,
        cards: cardList.filter((_, i) => isInRange(i, pageSelected + 1))
      });
      console.log(
        "next",
        cardList,
        cardList.filter((_, i) => isInRange(i, pageSelected + 1))
      );
    }
  };

  const previous = () => {
    if (pageSelected - 1 >= 0) {
      setPageSelected({
        pageSelected: pageSelected - 1,
        cards: cardList.filter((_, i) => isInRange(i, pageSelected - 1))
      });
      console.log(
        "previous",
        cardList,
        cardList.filter((_, i) => isInRange(i, pageSelected - 1))
      );
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
      pageSelected: 0,
      cards: cardList.filter((_, i) => isInRange(i, 0))
    });
    setUpperBound(Math.round(cardList.length / 3));
    console.log("initializeCards", cardList);
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setPageSelected({
  //       pageSelected,
  //       cards: cardList.filter((_, i) => isInRange(i))
  //     });
  //     console.log("useEffect", pageSelected, cards);
  //   }, 100);
  // }, [pageSelected]);

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
            pageSelected: page,
            cards: cardList.filter((_, i) => isInRange(i, page))
          }),
        isInRange,
        numberOfPages: upperBound
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

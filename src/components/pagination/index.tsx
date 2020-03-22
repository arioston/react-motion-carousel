import React, { Props, useState, useEffect } from "react";

type PaginationContextProps = {
  next: () => void;
  previous: () => void;
  setCards: (arr: unknown[]) => void;
  pageSelected: number;
  upperBound: number;
  cards: unknown[];
  setPageSelected: (page: number) => void;
  isInRange: (index: number) => boolean;
  initializeCards: (newCards: unknown[]) => void;
};

export const PaginationContext = React.createContext<
  Partial<PaginationContextProps>
>({});

export const PaginationProvider = <T extends object>({
  children,
  ..._rest
}: Props<T>) => {
  let cardList: unknown[] = [];

  const [[pageSelected, cards], setPageSelectedAndCards] = useState<
    [number, unknown[]]
  >([-1, []]);
  // const [cards, setCards] = useState([]);
  const upperBound = Math.round(cards.length / 3);

  const next = () => {
    if (pageSelected + 1 < upperBound) {
      setPageSelectedAndCards([pageSelected + 1, cards]);
    }
  };

  const previous = () => {
    if (pageSelected - 1 >= 0) {
      setPageSelectedAndCards([pageSelected - 1, cards]);
    }
  };

  const isInRange = (index: number) => {
    return index >= pageSelected * 3 && index < pageSelected * 3 + 3;
  };

  const initializeCards = (newCards: unknown[]) => {
    cardList = [...newCards];
    setPageSelectedAndCards([0, []]);
  };

  useEffect(
    () =>
      setPageSelectedAndCards([
        pageSelected,
        cardList.filter((_, i) => isInRange(i))
      ]),
    [pageSelected]
  );

  return (
    <PaginationContext.Provider
      value={{
        next,
        previous,
        initializeCards,
        cards,
        pageSelected,
        setPageSelected: (page: number) =>
          setPageSelectedAndCards([page, cards]),
        isInRange
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

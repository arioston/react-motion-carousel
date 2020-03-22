import React from "react";
import styled from "styled-components";

export const Container = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 50px;
  min-height: 600px;
  background-color: ${(props: any) => props.theme.background};
  color: ${(props: any) => props.theme.color};
`;

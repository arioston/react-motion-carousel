import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import PaginationContext from "./pagination";

const CardStyled = styled(motion.div)`
  position: relative;
  padding-right: 0;
  margin-bottom: 40px;
  top: 0;
  transition: top 0.3s ease;

  .card-content {
    position: relative;
    width: 85%;
    top: -20px;
    left: 0;
    right: 0;
    z-index: 2;
    background-size: cover;
    background-position: 50%;
    margin: auto;
  }

  &:hover .card-image img {
    transform: scale(1.1);
  }

  .card-content .card-header {
    padding: 20px 25px;
  }

  .card-content .title {
    font-size: 18px;
    font-weight: 700;
    position: relative;
    height: 80px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    display: -webkit-box;
    -webkit-line-clamp: 3;

    &.rainbow {
      transition: color 0.3s ease;
    }
  }

  .card-content .title &.rainbow {
    transition: color 0.3s ease;
  }

  .card-content .category {
    color: #7c7b7b;
    font-size: 12px;
    font-weight: 900;
    letter-spacing: 3px;
    margin-bottom: 10px;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .card-image {
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.6);
    height: 180px;
    position: relative;
    background-size: cover;
  }

  .card-image .card-overlay {
    position: absolute;
    opacity: 0;
    background-color: #000;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1;
    transition: opacity 0.4s ease;
  }

  .card-image img {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    background-size: cover;
    transition: transform 0.3s ease, opacity 1s ease;
  }

  .card-footer {
    padding: 10px;
    padding-left: 25px;
    padding-right: 25px;
    white-space: nowrap;
    overflow: hidden;
    display: block;
  }

  .card-footer .type {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    margin-right: 5px;
  }

  .card-footer .creation-date {
    display: inline-block;
    font-weight: 400;
    font-size: 14px;
    color: #7c7b7b;
    text-overflow: ellipsis;
  }
`;

export const Card = ({
  imageUrl,
  title,
  category,
  type,
  date,
  className,
  style,
  key,
  ..._rest
}) => {
  const pagination = useContext(PaginationContext);
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      y: 0,
      display: pagination.isInRange(i) ? "block" : "none",
      opacity: i + 1,
      transition: {
        delay: i * 0.03 + 0.3
      }
    }));
  }, [true]);

  const item = {
    enter: (index: number) => ({ x: index > 0 ? 1000 : -1000, opacity: 0 }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (index: number) => ({
      zIndex: 0,
      x: index < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <CardStyled
      key={key}
      className="card large-4 medium-12 columns"
      initial="enter"
      animate="center"
      exit="exit"
      {..._rest}
    >
      <div className="card-image">
        <div className="card-overlay" />
        <picture>
          <img src={imageUrl} alt="" />
        </picture>
      </div>
      <div className="card-content">
        <div className="card-header">
          <div className="category">{category}</div>
          <div className="title rainbow">{title}</div>
        </div>
        <div className="card-body" />
        <div className="card-footer">
          <div className="type">{type}</div>
          <div className="creation-date">"20/20"</div>
        </div>
      </div>
    </CardStyled>
  );
};

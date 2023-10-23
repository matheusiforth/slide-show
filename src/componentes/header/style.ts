import styled from "styled-components";
import { customMedia } from "../../util/customMedia";

export const LogoLinha = styled.div`
    font-size: 1rem;
    position: absolute;
    top: 0;

    width: 100%;

    padding: 1rem 0.5rem;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    color: black;
    text-transform: uppercase;

    & > span {
      color: white;
    }
    & > img {
      cursor: pointer;
    }
`

export const Pai = styled.div`
    font-size: 1rem;
    background-color: transparent;
    width: 100vw;
    padding-top: 8vh;
    color: white;
    text-transform: uppercase;

    ${customMedia.lessThan('desktop')`
      padding-top: 10vh;
    `};
`

export const EnglobaSubtitulo = styled.div`
    font-size: 1rem;
    color: white;
    width: 100vw;
    border-radius: 8px;
    border: solid 1px white;
    box-sizing: border-box;
    padding: 0.75rem;
    text-transform: uppercase;
    display: flex;
    justify-content: space-around;
`

export const Img = styled.img`
    color: white;
    width: 200px;
    text-transform: uppercase;

    ${customMedia.greaterThan('tv')`
      width: 200px;
      right: 15px;
      top: 20px;
    `};
`

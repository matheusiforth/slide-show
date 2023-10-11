import styled from "styled-components";
import { customMedia } from "../../util/customMedia";

export const LogoLinha = styled.div`
    background-color: transparent;
    color: black;
    width: 100vw;
    margin-top: 2vh;
    box-sizing: border-box;
    padding: 8px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
    position: absolute;
`

export const Pai = styled.div`
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
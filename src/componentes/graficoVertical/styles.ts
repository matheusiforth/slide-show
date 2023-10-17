import { styled } from "styled-components";
import { customMedia } from "../../util/customMedia";

export const Pai = styled.div`
    height: 100%;
    display: flex;
    /* flex-Direction: column; */
    width: 100%;
    box-sizing: border-box;
    padding: 1vh 3px 0px 3px;
`

export const EnglobaGrafico = styled.div`
    width: 87%;
    height: 40vh;
    /* background: lightyellow; */
    box-sizing: border-box;
    padding: 1rem;
`

export const Titulo = styled.div`
    background: #2C2C57;
    color: white;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* text-transform: uppercase; */
    font-weight: bold;
    font-size: 1.25rem;
    width: 100%;
    border-radius: 8px 8px 0px 0px;
    ${customMedia.greaterThan('tv')`
      font-size: 3rem;
  `};
`

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

export const PaiHeader = styled.div`
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
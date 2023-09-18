//@ts-nocheck

import { css, styled } from "styled-components";
import Select from 'react-select'
import { customMedia } from "../../util/customMedia";
import media from "styled-media-query";

export const Pai = styled.div`
    background-color: #0b0b0b;
    width: 100vw;
    height: 6vh;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    text-transform: uppercase;
    position: absolute;
    cursor: pointer;
    &:hover{
        background-color: #151515;
    }
    /* ${customMedia.greaterThan('tv')`
      // font-size: 2rem;
  `}; */
`

export const Titulo = styled.h1`
    color: white;
    font-size: 1.25rem;
    position: relative;

    ${customMedia.greaterThan('tv')`
        font-size: 2rem;
    `};
`

export const Main = styled.div`
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    position: absolute;
    z-index: 999;
`

export const Sidebar = styled.div`
    box-sizing: border-box;
    background-color: #0b0b0b;
    height: 100vh;
    width: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Header = styled.div`
    box-sizing: border-box;
    height: 8vh;
    padding: 1rem;
    width: 100%;
`

export const Body = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    height: 84vh;
    padding: 0.75rem;
    width: 100%;
    gap: 10px;
`

export const Fechar = styled.span`
    color: white;
    cursor: pointer;
    ${customMedia.greaterThan('tv')`
      font-size: 1.75rem;
  `};
`

export const SelectNomal = styled.select`
    color: white;
    background-color: #171923;
    border-radius: 8px;
    height: 50px;
    width: 100%;
    border: none;
    text-transform: uppercase;
    ${customMedia.greaterThan('tv')`
      font-size: 1.75rem;
  `};
`
// interface ButtonProps {
//     ativo: boolean;
// }

export const Button = styled.button`
    color: white;
    background: ${(props) => (props.ativo ? '#2796e6' : '#1e1923')};
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 8px;
    height: 50px;
    width: 100%;
    border: none;
    &:hover{
        background-color: ${(props) => (props.ativo ? '#63B3ED' : '#493d56')};
    }
    ${customMedia.greaterThan('tv')`
      font-size: 1.75rem;
    `};
    ${media.lessThan('huge')`
      font-size: 0.75rem;
    `};
`

//react selected
export const ReactSelect = styled(Select)`
    color: white;
    text-transform: uppercase;
    ${customMedia.greaterThan('tv')`
      font-size: 1.75rem;
  `};
`

export const EnglobaTurno = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;

    ${media.lessThan('large')`
        flex-direction: column;
     `}
`

export const Img = styled.img`
    color: white;
    width: 110px;
    position: absolute;
    right: 15px;
    text-transform: uppercase;

    ${customMedia.greaterThan('tv')`
      width: 200px;
      right: 15px;
      top: 20px;
    `};
`
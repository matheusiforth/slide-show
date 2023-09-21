import styled from "styled-components";
import { customMedia } from "./util/customMedia";

export const Pai = styled.div`
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: space-between;
`

export const Principal = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`

export const Footer = styled.div`
    box-sizing: border-box;
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: white;

`

export const Button = styled.button`
    box-sizing: border-box;
    text-transform: uppercase;
    border: solid 1px white;
    border-radius: 8px;
    background-color: black;
    color: white;
    width: 7vw;
    height: 5vh;
    margin-top: 1rem;
    text-align: center;
    cursor: pointer;
    &:hover{
        background-color: #161616;
    }

    ${customMedia.lessThan('desktop')`
        width: 11vw;
        height: 7vh;
    `};
`

export const ImgFooter = styled.img`
    color: white;
    width: 80px;
    padding: 8px;
`

export const Img = styled.img`
    color: white;
    width: 200px;

    ${customMedia.greaterThan('tv')`
      width: 200px;
      right: 15px;
      top: 20px;
    `};
`


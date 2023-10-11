import { styled } from "styled-components";
import { customMedia } from "../../util/customMedia";

export const Pai = styled.div`
    height: 100%;
    display: flex;
    flex-Direction: column;
    width: 100%;
    box-sizing: border-box;
    justify-content: center;
    padding: 1vh 3px 0px 3px;
`

export const EnglobaGrafico = styled.div`
    width: 100%;
    height: 90%;
    background: #e2e2ee;
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
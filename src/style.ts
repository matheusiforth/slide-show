import styled from "styled-components";
import { customMedia } from "./util/customMedia";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;


  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  text-align: center;
`

export const WrapperFilter = styled.section`
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: black;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  text-align: center;

  height: 100%;
  width: 100%;
`

export const Footer = styled.div`
  box-sizing: border-box;
  background-color: black;
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  position: fixed;
  bottom: 0px;
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

export const BackToFilter = styled.a`
  color: white;
  text-decoration: underline;

  cursor: pointer;
`

export const ButtonBox = styled.div`
  margin-top: 0.325rem;
  gap: 1rem;
  width: calc(100% - 1.5rem);
  display: flex;
`

export const ButtonNavigation = styled.button`
  width: 100%;
  min-height: 30px;

  border: none;
  border-radius: 3px;

  padding: 0.125rem;

  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

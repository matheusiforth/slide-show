import styled from "styled-components";

export const LogoLine = styled.div`
  font-size: 1rem;
  text-transform: uppercase;

  width: calc(100% - 1.5rem);

  padding: 0.5rem;
  max-height: 100px;

  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > span {
    color: white;
  }
  & > img {
    cursor: pointer;
  }
`

export const Wrapper = styled.div`
  font-size: 1rem;

  width: 100%;

  display: flex;
  justify-content: center;

  color: white;
  text-transform: uppercase;
`

export const BoxSubtitle = styled.div`
  font-size: 1rem;
  color: white;
  text-transform: uppercase;
  height: 3rem;

  width: calc(100% - 1.5rem);

  border-radius: 8px;
  border: solid 1px white;
  box-sizing: border-box;

  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (min-width: 1920px) {
    height: 2rem;
  }
`

export const Image = styled.img`
  width: 200px;
`

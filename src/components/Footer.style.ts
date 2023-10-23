import styled from 'styled-components'

export const Wrapper = styled.div`
  position: relative;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  height: auto;

  background-color: black;

  & > div {
    display: flex;
    align-items: center;
    padding: 15px 0;
  }
`

export const Image = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  color: white;
  width: 70px;
  padding: 8px;
  padding-right: 20px;
`

export const Logos = styled.img`
  height: 10px;
  width: auto;
`

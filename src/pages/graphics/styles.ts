import styled from 'styled-components'

export const TitleGraph = styled.h1`
  font-size: 1rem;
  color: white;
`

export const WrapperPage = styled.section`
  width: 100%;
  height: calc(100vh - 10rem);
`

export const WrapperGraph = styled.div`
  width: 100%;
  height: calc(50vh - 11rem);
`

type ColorProps = {
 color: string
}


export const Legend = {
  Root: styled.section`
    width: 100%;

    gap: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Box: styled.div`
    gap: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  Label: styled.span`
    color: white;
    font-size: 0.85rem;
  `,
  Color: styled.div<ColorProps>`
    width: 15px;
    height: 10px;
    border-radius: 1px;
    border: none;

    background-color: ${(props) => props.color};
  `
}

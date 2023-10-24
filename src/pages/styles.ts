import styled, { css } from 'styled-components'

export const TitleGraph = styled.h1`
  font-size: 1rem;
  color: white;
`

export const WrapperPage = styled.section`
  width: 100%;
  height: auto;
  max-height: calc(100vh - 50px);
`

export const BoxPage = styled(WrapperPage)`
  display: flex;
`

export const WrapperGraph = styled.div`
  width: 100%;
  height: calc(50vh - 11rem);

  @media (min-width: 1920px) {
    height: calc(50vh - 8rem);
  }
`

export const WrapperPizza = styled.div`
  width: 100%;
  height: 100%;
`

type ColorProps = {
 color: string
}

type OrientationProps = {
  orientation?: 'vertical' | 'horizontal'
}

export const Legend = {
  Root: styled.section<OrientationProps>`
    width: 100%;

    gap: 10px;
    display: flex;

    ${({ orientation = 'horizontal' }) => css`
      ${orientation === 'horizontal' && css`
          flex-direction: row;
          justify-content: center;
          align-items: center;
      `}

      ${orientation === 'vertical' && css`
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
      `}
    `}
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

export const Box = {
  Title: styled.h1`
    font-size: 1rem;

    text-align: center;

    border: 1px solid #fff;
    border-radius: 5px;
    padding: 0.5rem;
  `,

  SubTitle: styled.h2`
    font-size: 0.8rem;

    border: 1px solid #fff;
    border-radius: 5px;
    padding: 0.5rem;
  `,

  BoxHours: styled.div`
    width: 100%;
    display: flex;
  `,

  TitleHours: styled.div`
    border: 1px solid transparent;
    border-right: 1px solid #fff;

    margin-top: 1rem;
    padding-right: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
  `,

  TitleValues: styled.div`

    border: 1px solid transparent;

    margin-top: 1rem;
    padding-left: 0.5rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  `,
}

export const AccumulatedBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  height: 40vh;

  @media (min-width: 1920px) {
    height: 30vh;
    width: 100%;
  }
`

import styled, { css } from 'styled-components'
import ReactSelect from 'react-select'

type ActiveProps = {
  active?: boolean
}

export const Form = styled.form`
  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Select = styled(ReactSelect)`
  width: 18.25rem;
  color: black;
  font-family: 'Roboto', sans-serif;

  text-align: left;

  padding: 5px 0;

  &:disabled {
    opacity: 0.5;
    * {
      cursor: not-allowed !important;
    }
  }
`

export const ButtonWrapper = styled.section`
  margin-top: 5px;

  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
`

const ButtonBase = styled.button`
  height: 2.5rem;
  width: 100%;

  border: none;
  border-radius: 3px;

  color: #fff;
  text-transform: uppercase;

  cursor: pointer;
`

export const ButtonPeriod = styled(ButtonBase)<ActiveProps>`
  background-color: #1e1923;

  &:hover {
    background-color: #493d56;
  }

  ${({ active }) => active && css`
    background-color: #2796e6;
    &:hover {
      background-color: #63B3ED;
    }
  `}

`

export const ButtonSubmit = styled(ButtonBase)`
  background-color: #2796e6;
  margin-top: 10px;

  &:hover {
    background-color: #63B3ED;
  }
`

export const MessageError = styled.div`
  width: 100%;

  color: red;
  text-align: left;
  font-size: 0.8rem;
`
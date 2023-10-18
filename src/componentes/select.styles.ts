import * as SelectPrimitive from "@radix-ui/react-select"
import { BsChevronDown } from 'react-icons/bs'

import styled from 'styled-components'

export const Trigger = styled(SelectPrimitive.Trigger)`
  height: 2.5rem; /* 40px */
  width: 100%;
  
  border: 1px solid #f1f1f1;
  border-radius: 0.375rem; /* 6px */
  background-color: black;
  
  padding: 0.5rem 0.75rem; /* 8px 12px */
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  color: #f1f1f1;
  text-transform: uppercase;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const Icon = styled(SelectPrimitive.Icon)`
  height: 100%;
`

export const IconChevronDown =  styled(BsChevronDown)`
  height: 1.2rem; /* 16px */
  width: 1.2rem; /* 16px */

  padding-left: 0.375rem; /* 6px */

  opacity: 0.5;
`

export const Content = styled(SelectPrimitive.Content)`
  position: relative;
  z-index: 50;

  min-width: 8rem; /* 128px */

  border: 1px solid #f1f1f1;
  border-radius: 0.375rem; /* 6px */

  overflow: hidden;

  color: #f1f1f1;

  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

`

export const Label = styled(SelectPrimitive.Label)`

`
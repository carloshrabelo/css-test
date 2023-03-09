import { css, SerializedStyles, Theme } from '@emotion/react';

import styled from '@emotion/styled';
import { Alignment, TabProps, Sizes, Variant } from './ITabs';
import { ITabItemProps } from './TabsV3';

const roundBorder = '0.375em';

const ALIGNMENT: { [key in keyof typeof Alignment]: string } = {
  'left': 'flex-start',
  'centered': 'center',
  'right': 'flex-end',
}

const SIZE: { [key in keyof typeof Sizes]: string } = {
  'small': '.75rem',
  'medium': '1.25rem',
  'large': '1.5rem;',
}

const VARIANT: { [key in keyof typeof Variant]: (p: { theme: Theme }) => SerializedStyles } = {
  'boxed': () => css`
    ${A} {
      border: 1px solid transparent;
      border-radius: 4px 4px 0 0;

      &:hover {
        background-color: #f5f5f5;
        border-bottom-color: #dbdbdb;
      }
    }
  `,
  'toggle': ({ theme }) => css`
    ${Ul} {
      border-bottom: none;
    }

    ${Li}{
      &:first-of-type ${A} {
        border-top-left-radius: ${roundBorder};
        border-bottom-left-radius: ${roundBorder};
      }
    
      &:last-child ${A} {
        border-top-right-radius: ${roundBorder};
        border-bottom-right-radius: ${roundBorder};
      }
    }
    
    ${A} {
      border-color: ${theme.border.color};
      border-style: solid;
      border-width: 1px;
      margin-bottom: 0;
      position: relative;

      &:hover {
        background-color: #f5f5f5;
        border-color: #b5b5b5;
        z-index: 2;
      }
    }
  `,
  'toggle-rounded': ({ theme }) => css`
    ${VARIANT['toggle']({ theme })}
    ${Li}:first-of-type ${A} {
      border-bottom-left-radius: 9999px;
      border-top-left-radius: 9999px;
      padding-left: 1.25em; 
    }

    ${Li}:last-child ${A} {
      border-bottom-right-radius: 9999px;
      border-top-right-radius: 9999px;
      padding-right: 1.25em;
    }
  `
}

const VARIANT_ACTIVE: { [key in keyof typeof Variant]: (p: Pick<TabProps, 'color'> & { theme: Theme }) => SerializedStyles } = {
  'boxed': ({ theme }) => css`
      background-color: ${theme.bg.color} !important;
      border-color: ${theme.border.color} !important;
      border-bottom-color: transparent !important;
    `,
  'toggle': ({ theme, color }) => css`
    &, &:hover{
      background-color: ${color ? theme.colors[color] : theme.colors.primary};
      border-color: ${color ? theme.colors[color] : theme.colors.primary};
    }

    color: #fff;
    z-index: 1;
  `,
  'toggle-rounded': ({ theme, color }) => css`${VARIANT_ACTIVE.toggle({ theme, color })}`
}

export const Icon = styled.span()

export const A = styled.a`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border.color};
  color: ${({ theme }) => theme.text.color};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: -1px;
  padding: 0.5em 1em;
  vertical-align: top;

  &:hover {
    border-bottom-color: #363636;
    color: #363636;
  }
`

export const Ul = styled.ul`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.border.color};
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`

export const Li = styled.li<Pick<ITabItemProps, "active" | "variant"> & Pick<TabProps, 'color'>>`
  display: block;

  ${({ theme, active, color, variant }) => active && css`
    ${A}${A} {
      border-bottom-color: ${color ? theme.colors[color] : theme.colors.primary};
      color: ${color ? theme.colors[color] : theme.colors.primary};
      ${variant && VARIANT_ACTIVE[variant]({ theme, color })}
    }
  `}
`

export const Tabs = styled.div<Partial<TabProps>>`
  -webkit-overflow-scrolling: touch;
  align-items: stretch;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;

  ${p => p.alignment && css`
    ${Ul} {
      justify-content: ${ALIGNMENT[p.alignment]};
    }
  `}
  ${p => p.size && css`
    ${Ul} {
      font-size: ${SIZE[p.size]};
    }
  `}
  
  ${p => p.variant && VARIANT[p.variant](p)}

  ${p => p.fullwidth && css`
    ${Li} {
      flex-grow: 1;
      flex-shrink: 0;
    }`
  }

  ${Icon}:first-of-type {
    margin-right: 0.5em;
  }
`
import { css, SerializedStyles, Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { Alignment, TabProps, Sizes, TabItemProps, Variant } from './ITabs';
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
`

export const Ul = styled.ul<{ active?: boolean }>`
  align-items: center;
  border-bottom: 1px solid ${p => p.theme.border.color};
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
`

const VariantLI: { [key in keyof typeof Variant]: (p: Pick<TabItemProps, 'active'> & Pick<TabProps, 'color'> & { theme: Theme }) => SerializedStyles | null } = {
  'boxed': p => !p.active ? null : css`
      ${A} {
        background-color: ${p.theme.bg.color} !important;
        border-color: ${p.theme.border.color} !important;
        border-bottom-color: transparent !important;
      }
    `,
  'toggle': p => !p.active ? null : css`
    ${A}{
        background-color: ${p.color ? p.theme.colors[p.color] : p.theme.colors.primary};
        border-color: ${p.color ? p.theme.colors[p.color] : p.theme.colors.primary};
        color: #fff;
        z-index: 1;
    }`,
  'toggle-rounded': () => null,
}

export const Li = styled.li<Pick<ITabItemProps, "active" | "variant" > & Pick<TabProps, 'color'>>`
  display: block;

  ${(p) => p.active && css`
    ${A} {
      border-bottom-color: ${p.color ? p.theme.colors[p.color] : p.theme.colors.primary};
      color: ${p.color ? p.theme.colors[p.color] : p.theme.colors.primary};
    }
  `}
  ${p => p.variant === 'toggle-rounded' && VariantLI['toggle'](p)}
  ${p => p.variant && VariantLI[p.variant](p)}
`

const VARIANT: { [key in keyof typeof Variant]: (p: { theme: Theme }) => SerializedStyles } = {
  'boxed': () => css`
    ${A} {
      border: 1px solid transparent;
      border-radius: 4px 4px 0 0;
    }
  `,
  'toggle': p => css`
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
      border-color: ${p.theme.border.color};
      border-style: solid;
      border-width: 1px;
      margin-bottom: 0;
      position: relative;
    }
  `,
  'toggle-rounded': () => css`
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
  
  ${p => p.variant === 'toggle-rounded' && VARIANT['toggle'](p)}
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
import { Theme } from '@emotion/react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export enum Alignment {
  'left' = 'is-left',
  'centered' = 'is-centered',
  'right' = 'is-right',
}

export enum Sizes {
  'small' = 'is-small',
  'medium' = 'is-medium',
  'large' = 'is-large',
}

export enum Variant {
  'boxed' = 'is-boxed',
  'toggle' = 'is-toggle',
  'toggle-rounded' = 'is-toggle-rounded',
}

export enum Colors {
  'primary'= 'is-primary',
  'secondary'= 'is-secondary',
  'error'= 'is-error',
  'success'= 'is-success',
  'warning'= 'is-warning',
  'info'= 'is-info',
}

export interface TabItemProps {
  icon: IconDefinition,
  label: string,
  value?: number | string,
  active?: boolean,
}


export interface TabProps {
  data: TabItemProps[],
  onChange: (value: TabItemProps['value']) => void,
  value?: TabItemProps['value'],
  alignment?: keyof typeof Alignment,
  size?: keyof typeof Sizes,
  variant?: keyof typeof Variant,
  full?: boolean
  color?: keyof Theme['colors']
}

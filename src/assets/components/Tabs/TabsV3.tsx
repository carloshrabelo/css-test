import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TabProps, TabItemProps } from "./ITabs";
import * as S from './Tabs.style';

export type ITabItemProps = TabItemProps & {
  onClick: (value: TabItemProps['value']) => void,
  variant: TabProps['variant']
  color?: TabProps['color']
}

export const TabItem = ({ icon: Icon, label, active, onClick, value, variant, color }: ITabItemProps) => (
  <S.Li active={active} variant={variant} color={color} onClick={() => onClick(value)}>
    <S.A>
      {
        !Icon ? null :
          <S.Icon>
            <FontAwesomeIcon icon={Icon} aria-hidden="true" />
          </S.Icon>
      }
      <span>{label}</span>
    </S.A>
  </S.Li>
)


export const Tabs = ({ data = [], onChange, value, alignment = 'left', size, variant, fullwidth, color }: TabProps) => {

  return !data.length ? null : (
    <S.Tabs
      alignment={alignment}
      size={size}
      variant={variant}
      fullwidth={fullwidth}
      color={color}
    >
      <S.Ul>
        {
          data.map((props, index) => {
            const id = props.value || index;
            return <TabItem color={color} value={id} variant={variant} {...props} active={props.active || id === value} onClick={onChange} key={id} />
          })
        }
      </S.Ul>
    </S.Tabs>
  );
};

export default Tabs;

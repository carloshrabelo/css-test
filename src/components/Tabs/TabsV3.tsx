import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabProps, TabItemProps } from "./ITabs";
import * as S from './Tabs.style';

export type ITabItemProps = TabItemProps & {
  onClick: (value: TabItemProps['value']) => void,
  color?: TabProps['color'],
  variant?: TabProps['variant'],
}

export const TabItem = ({ icon: Icon, label, active, onClick, value, ...props }: ITabItemProps) => (
  <S.Li active={active} onClick={() => onClick(value)} {...props}>
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


export const Tabs = ({ data = [], onChange, value, alignment = 'left', size, variant, full, color, ...props }: TabProps) =>
  !data.length ? null : (
    <S.Tabs
      alignment={alignment}
      size={size}
      variant={variant}
      full={full}
      color={color}
      {...props}
    >
      <S.Ul>
        {
          data.map((props, index) => {
            const id = props.value || index;
            const isActive = props.active || id === value;
            return <TabItem
              value={id}
              {...props}
              active={isActive}
              onClick={onChange}
              color={color}
              variant={variant}
              key={id}
            />
          })
        }
      </S.Ul>
    </S.Tabs>
  );

export default Tabs;

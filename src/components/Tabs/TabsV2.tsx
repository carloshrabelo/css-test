import className from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { TabProps, TabItemProps, Alignment, Sizes, Variant, Colors } from "./ITabs";
import style from "./Tabs.module.scss";

export const TabItem = ({ icon: Icon, label, active, onClick, value }: TabItemProps & {
  onClick: (value: TabItemProps['value']) => void
}) => (
  <li className={className({ [style["is-active"]]: active })} onClick={() => onClick(value)}>
    <a>
      {
        !Icon ? null :
          <span className={style.icon}>
            <FontAwesomeIcon icon={Icon} aria-hidden="true" />
          </span>
      }
      <span>{label}</span>
    </a>
  </li>
)


export const Tabs = ({ data = [], onChange, value, alignment = 'left', size, variant, color, fullwidth }: TabProps) => {

  const toggleRounded: keyof typeof Variant = 'toggle-rounded';

  return !data.length ? null : (
    <div className={className(style.tabs,
      style[Alignment[alignment]],
      size && style[Sizes[size]],
      variant && style[Variant[variant]],
      color && style[Colors[color]],
      {
        [style[Variant.toggle]]: variant === toggleRounded,
        [style['is-fullwidth']]: fullwidth,
      }
    )}>
      <ul>
        {
          data.map((props, index) => {
            const id = props.value || index;
            return <TabItem value={id} {...props} active={props.active || id === value} onClick={onChange} key={id} />
          })
        }
      </ul>
    </div>
  );
};

export default Tabs;

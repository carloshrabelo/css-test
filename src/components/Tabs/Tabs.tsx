import style from "./Tabs.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TabProps, TabItemProps, Alignment, Sizes, Variant, Colors } from "./ITabs";

export const TabItem = ({ icon: Icon, label, active, onClick, value }: TabItemProps & {
  onClick: (value: TabItemProps['value']) => void
}) => (
  <li className={!active ? '' : style["is-active"]} onClick={() => onClick(value)}>
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

  const _alignment = Alignment[alignment]
  const _sizes = size && Sizes[size] && style[Sizes[size]] || '';
  const _variant = variant && Variant[variant] && style[Variant[variant]] || '';
  const _color = color && Colors[color] && style[Colors[color]] || '';
  const toggleRounded: keyof typeof Variant = 'toggle-rounded';
 
  return !data.length ? null : (
    <div className={`${style.tabs} ${style[_alignment]} ${_sizes} ${_variant} ${_color} ${!fullwidth ? '' : style['is-fullwidth']} ${variant !== toggleRounded ? '' : style[Variant.toggle]}`}>
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

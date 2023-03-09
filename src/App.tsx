import { useState } from 'react'
import './App.scss'
import { Alignment, Sizes, TabItemProps, TabProps, Variant } from './components/Tabs'

import Tabs from './components/Tabs/Tabs';
import TabsV2 from './components/Tabs/TabsV2';
import TabsV3 from './components/Tabs/TabsV3';
import theme from './assets/themes/theme';
import { faFileAlt, faFilm, faImage, faMusic } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from '@emotion/react'
import 'bootstrap-css/lib/forms.css';
import 'bootstrap-css/lib/grid.css';

interface Modifiers {
  alignment: TabProps['alignment'],
  size?: TabProps['size'],
  variant?: TabProps['variant'],
  full?: TabProps['full'],
  color?: TabProps['color']
}

const data: TabItemProps[] = [
  {
    icon: faImage,
    label: "Pictures",
    value: uuidv4(),
  },
  {
    icon: faMusic,
    label: "Music",
    value: uuidv4(),
  },
  {
    icon: faFilm,
    label: "Videos",
    value: uuidv4(),
  },
  {
    icon: faFileAlt,
    label: "Documents",
    value: uuidv4(),
  }
]
//.map((item, index) => ({ ...item, value: index }))

function App() {
  const selected = +(Math.random() * data.length).toFixed();
  const [value, setValue] = useState<TabItemProps['value']>(data[selected]['value']);
  const [modifiers, setModifiers] = useState<Modifiers>({
    alignment: 'left',
    size: undefined,
    variant: undefined,
    full: false,
    color: undefined,
  });

  const selects: [{ [x: string]: string }, keyof Modifiers, boolean?][] = [
    [Alignment, 'alignment'],
    [Sizes, 'size', true],
    [Variant, 'variant', true],
    [theme.colors, 'color', true],
  ]

  const onChange = (value: TabItemProps['value']) => {
    setValue(value);
  }
  const changeVariant = ({ target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setModifiers(e => ({ ...e, [target.name]: (target as HTMLInputElement)?.checked === undefined ? target.value : (target as HTMLInputElement).checked }))
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{
        borderColor: modifiers.color && theme.colors[modifiers.color] || theme.colors.primary,
        ...(!modifiers.color ? {} : {
          boxShadow: `0 0.5rem 1rem ${theme.colors[modifiers.color]}, inset 0 -1px 0 ${theme.colors[modifiers.color]}`
        }),
      }}>
        <form className="row">
          {selects.map(([options, key, hasEmpty]) => (
            <div className="form-group col" key={key}>
              <div>
                <label htmlFor={key}>{key}</label>
                <select className="form-control" id={key} name={key} onChange={changeVariant} value={modifiers[key] as string} >
                  {!hasEmpty ? null : <option value="" ></option>}
                  {Object.keys(options).map(value => <option key={value} value={value}>{value}</option>)}
                </select>
              </div>
            </div>)
          )}
          <div className="form-group col" style={{
            display: 'grid',
            alignItems: 'end'
          }}>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onChange={changeVariant} id="full" name="full" />
              <label htmlFor="full">
                Full Width
              </label>
            </div>
          </div>
        </form>

        <Tabs {...modifiers} data={data} onChange={onChange} value={value}></Tabs>
        <TabsV2 {...modifiers} data={data} onChange={onChange} value={value}></TabsV2>
        <TabsV3 {...modifiers} data={data} onChange={onChange} value={value}></TabsV3>
      </div >
    </ThemeProvider >
  )
}

export default App

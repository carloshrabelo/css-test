import { useState } from 'react'
import './App.css'
import { Alignment, Sizes, TabItemProps, TabProps, Variant } from './assets/components/Tabs'

import Tabs from './assets/components/Tabs/Tabs';
import TabsV2 from './assets/components/Tabs/TabsV2';
import TabsV3 from './assets/components/Tabs/TabsV3';
import theme from './assets/themes/theme';
import { faFileAlt, faFilm, faImage, faMusic } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider } from '@emotion/react'
import "reset-css";

interface Modifiers {
  alignment: TabProps['alignment'],
  size: TabProps['size'],
  variant: TabProps['variant'],
  fullwidth: TabProps['fullwidth'],
  color: TabProps['color']
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
].map((item, index) => ({ ...item, value: index }))

function App() {
  const selected = +(Math.random() * data.length).toFixed();
  const [value, setValue] = useState<TabItemProps['value']>(selected !== data.length ? selected : selected - 1);
  const [modifiers, setModifiers] = useState<Modifiers>({
    alignment: 'left',
    size: undefined,
    variant: undefined,
    fullwidth: false,
    color: undefined,
  });

  const onChange = (value: TabItemProps['value']) => {
    setValue(value);
  }
  const changeVariant = ({ target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setModifiers(e => ({ ...e, [target.name]: (target as HTMLInputElement)?.checked === undefined ? target.value : (target as HTMLInputElement).checked }))
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="columns">
          <div className="column">
            <label htmlFor="alignment">Alignment:</label>
            <div className="select">
              <select id="alignment" name="alignment" onChange={changeVariant} >
                {Object.keys(Alignment).map(alignment => <option key={alignment} value={alignment} >{alignment}</option>)}
              </select>
            </div>
          </div>
          <div className="column">
            <label htmlFor="size">Size:</label>
            <div className="select">
              <select id="size" name="size" onChange={changeVariant} >
                <option value="" ></option>
                {Object.keys(Sizes).map(size => <option key={size} value={size} >{size}</option>)}
              </select>
            </div>
          </div>
          <div className="column">
            <label htmlFor="variant">Variant:</label>
            <div className="select">
              <select id="variant" name="variant" onChange={changeVariant} >
                <option value="" ></option>
                {Object.keys(Variant).map(variant => <option key={variant} value={variant} >{variant}</option>)}
              </select>
            </div>
          </div>
          <div className="column">
            <label htmlFor="color">Colors: WIP</label>
            <div className="select">
              <select id="color" name="color" onChange={changeVariant} >
                <option value="" ></option>
                {Object.keys(theme.colors).map(color => <option key={color} value={color} >{color}</option>)}
              </select>
            </div>
          </div>
          <div className="column">
            <br/>
            <label className="checkbox">
              <input type="checkbox" name="fullwidth" onChange={changeVariant} />
              fullwidth
            </label>
          </div>
        </div>

        <Tabs color={modifiers.color} alignment={modifiers.alignment} variant={modifiers.variant} size={modifiers.size} fullwidth={modifiers.fullwidth} data={data} onChange={onChange} value={value}></Tabs>
        <TabsV2 color={modifiers.color} alignment={modifiers.alignment} variant={modifiers.variant} size={modifiers.size} fullwidth={modifiers.fullwidth} data={data} onChange={onChange} value={value}></TabsV2>
        <TabsV3 color={modifiers.color} alignment={modifiers.alignment} variant={modifiers.variant} size={modifiers.size} fullwidth={modifiers.fullwidth} data={data} onChange={onChange} value={value}></TabsV3>
      </div>
    </ThemeProvider>
  )
}

export default App

import { useState, useContext } from 'react';
import { ThemeContext, TThemeContext } from '../services/context/ThemeContext';

interface IProps {
  selector: string;
}

export default function ColorPicker() {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  function handleRedChange(e: React.FormEvent<HTMLInputElement>): void {
    const target: any = e.target;
    setRed(target.value);
  }
  function handleGreenChange(e: React.FormEvent<HTMLInputElement>): void {
    const target: any = e.target;
    setGreen(target.value);
  }
  function handleBlueChange(e: React.FormEvent<HTMLInputElement>): void {
    const target: any = e.target;
    setBlue(target.value);
  }

  console.log(`${red}-${green}-${blue}`);

  const {
    displayThemeSelector,
    themeBackgroundColor,
    setThemeBackgroundColor,
  }: any = useContext(ThemeContext);

  setThemeBackgroundColor(`rgb(${red} ${green} ${blue})`);
  return (
    <div
      style={{
        display: displayThemeSelector,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: themeBackgroundColor,
        color: 'white',
      }}
    >
      <table>
        <tbody>
          <tr>
            <th>Red</th>
            <th>Green</th>
            <th>Blue</th>
          </tr>
          <tr>
            <td id="valRed">{red}</td>
            <td id="valGreen">{green}</td>
            <td id="valBlue">{blue}</td>
          </tr>
          <tr>
            <td
              id="red"
              style={{ height: '40px', backgroundColor: 'red' }}
            ></td>
            <td id="green" style={{ backgroundColor: 'green' }}></td>
            <td id="blue" style={{ backgroundColor: 'blue' }}></td>
          </tr>
          <tr>
            <td>
              <input
                value={red}
                onInput={(e) => handleRedChange(e)}
                onChange={(e) => handleRedChange(e)}
                type="range"
                id="slideRed"
                name="slideRed"
                min="0"
                max="255"
              />
            </td>
            <td>
              <input
                value={green}
                onInput={(e) => handleGreenChange(e)}
                onChange={(e) => handleGreenChange(e)}
                type="range"
                id="slideGreen"
                name="slideGreen"
                min="0"
                max="255"
              />
            </td>
            <td>
              <input
                value={blue}
                onInput={(e) => handleBlueChange(e)}
                onChange={(e) => handleBlueChange(e)}
                type="range"
                id="slideBlue"
                name="slideBlue"
                min="0"
                max="255"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

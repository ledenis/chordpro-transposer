import { useState } from 'react';
import sample from './sample';
import { transposeChordpro } from './chordPro';

function App() {
  const [chordpro, setChordpro] = useState(sample);
  const [preferFlat, setPreferFlat] = useState(false);

  function handleTranspose(increment: number) {
    const transposed = transposeChordpro(chordpro, increment, preferFlat);
    setChordpro(transposed);
  }

  function handlePreferFlatChange(preferFlat: boolean) {
    setPreferFlat(preferFlat);

    const transposed = transposeChordpro(chordpro, 0, preferFlat);
    setChordpro(transposed);
  }

  return (
    <div>
      <div>
        <button onClick={() => handleTranspose(1)}>Higher</button>
        <button onClick={() => handleTranspose(-1)}>Lower</button>
        <label>
          <input
            type="checkbox"
            checked={preferFlat}
            onChange={(event) => handlePreferFlatChange(event.target.checked)}
          />
          Prefer flats ♭
        </label>
      </div>
      <textarea
        value={chordpro}
        onChange={(event) => setChordpro(event.target.value)}
        style={{
          width: '800px',
          height: '600px',
        }}
      />
    </div>
  );
}

export default App;

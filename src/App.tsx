import { FormEvent, useState } from 'react';
import sample from './sample';
import { transposeChordpro } from './chordPro';

function App() {
  const [chordpro, setChordpro] = useState(sample);
  const [preferFlat, setPreferFlat] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');

  function handleTranspose(increment: number) {
    const transposed = transposeChordpro(chordpro, increment, preferFlat);
    setChordpro(transposed);
  }

  function handlePreferFlatChange(preferFlat: boolean) {
    setPreferFlat(preferFlat);

    const transposed = transposeChordpro(chordpro, 0, preferFlat);
    setChordpro(transposed);
  }

  async function handleLoadFromUrl(event: FormEvent) {
    event.preventDefault();
    let response;
    try {
      response = await fetch(
        '/api/load?sourceUrl=' + encodeURIComponent(sourceUrl)
      );
    } catch (error) {
      console.warn('Failed to load from url', error);
      return;
    }
    if (response.ok) {
      const loadedChordPro = await response.text();
      setChordpro(loadedChordPro);
    } else {
      console.warn('Failed to load from url');
    }
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
        <form onSubmit={handleLoadFromUrl}>
          <label>
            Load from URL
            <input
              value={sourceUrl}
              onChange={(event) => setSourceUrl(event.target.value)}
            />
          </label>
          <button>Load</button>
        </form>
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

export function transposeChordpro(
  chordpro: string,
  increment: number,
  preferFlat: boolean
) {
  const bracketChordsReplaced = chordpro.replace(
    /\[([A-G][#b]?)([A-Za-z0-9]*)\]/g,
    (_match, chordNote, chordQuality) => {
      const transposedNote = transpose(chordNote, increment, preferFlat);
      return `[${transposedNote}${chordQuality}]`;
    }
  );

  return bracketChordsReplaced.replace(
    /{key:([A-G][#b]?)(m?)}/g,
    (_match, chordNote, chordQuality) => {
      const transposedNote = transpose(chordNote, increment, preferFlat);
      return `{key:${transposedNote}${chordQuality}}`;
    }
  );
}

function transpose(note: string, increment: number, preferFlat: boolean) {
  const sharpNotes = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
  ];
  const flatNotes = [
    'A',
    'Bb',
    'B',
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
    'Ab',
  ];

  let noteIndex = sharpNotes.indexOf(note);
  if (noteIndex === -1) {
    noteIndex = flatNotes.indexOf(note);
  }
  if (noteIndex === -1) {
    throw new Error(`Could not transpose invalid note: "${note}"`);
  }

  const transposedIndex =
    (noteIndex + increment + flatNotes.length) % flatNotes.length;
  return preferFlat ? flatNotes[transposedIndex] : sharpNotes[transposedIndex];
}

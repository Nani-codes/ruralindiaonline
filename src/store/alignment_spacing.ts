import { AlignmentStyles } from '@/types/alignment_spacing_types';
import { atom, useAtom } from 'jotai';


// Create an atom to hold the language styles state
const AlignmentStylesAtom = atom<AlignmentStyles | null>(null);

export const useAlignStyles = () => useAtom(AlignmentStylesAtom);
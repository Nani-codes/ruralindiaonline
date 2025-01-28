import { LanguageStyles } from '@/types/langauge_styles_types';
import { atom, useAtom } from 'jotai';


// Create an atom to hold the language styles state
const languageStylesAtom = atom<LanguageStyles | null>(null);
const sizeModifier = atom<number>(1);

export const useLnStyles = () => useAtom(languageStylesAtom);
export const useSizeModifier = () => useAtom(sizeModifier);
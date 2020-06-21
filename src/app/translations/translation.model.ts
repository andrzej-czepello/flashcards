export interface Translation {
  wordToTranslate: string;
  suggestedWord: string;
  translation: string;
  isChecked: boolean;
  languageFrom: string;
  languageTo: string;
}

type Styles = {
  "font_family": string;
  "font_size":number;
  "line_height":number;
  "font_weight":number;
  "letter_spacing":number;
  "introCard_Category_margin":number;
  "introCard_title_margin":number;
  "introCard_Content_margin":number

}

type Components = {
  Title: Styles;
  Description: Styles;
  Text: Styles;
  Quote: Styles;
  Caption: Styles;
  Credits: Styles;
  IntroCard_Spacing: Styles
}

export type LanguageStyles = {
  xs: Components;
  sm: Components;
  md: Components;
  lg: Components;
  xl: Components;
  xl2: Components;
}
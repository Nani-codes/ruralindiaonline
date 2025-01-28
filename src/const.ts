export enum StatusCodes {
  NotFound = 404,
  Success = 200,
  Accepted = 202,
  BadRequest = 400,
}

export enum ModuleComponents {
  Text = "modular-content.text",
  QuoteWithText = "modular-content.quote-with-text",
  FullWidthQuote = "modular-content.full-width-quote",
  VideoWithQuote = "modular-content.video-with-quote",
  ImageWithQuote = "modular-content.text-quote-image",
  FullWidthImage = "modular-content.full-width-image",
  ColumnarText = "modular-content.columnar-text",
  PageReferenceWithText = 'modular-content.page-reference-with-text',
  ColumnarImagesWithText = "modular-content.columnar-images-with-text",
  EmbbedWithText = "modular-content.columnar-images-with-text",
  Video = "modular-content.video-embed-url1",
  Audio = "modular-content.audio-content",
  Mui = 'modular-content.single-caption-mul-img',
  EmbbedText = 'modular-content.embed-with-text',
  Map = 'modular-content.map-with-text-content',
}

export const locales = [
  {
    id: 1,
    name: "English",
    code: "en",
  },
  {
    id: 14,
    name: "हिंदी",
    code: "hi",
  },
  {
    id: 15,
    name: "తెలుగు",
    code: "te",
  },
  {
    id: 16,
    name: "मराठी",
    code: "mr",
  },
  {
    id: 17,
    name: "ગુજરાતી",
    code: "gu",
  },
  {
    id: 18,
    name: "ଓଡ଼ିଆ",
    code: "bn",
  },
  {
    id: 19,
    name: "ಕನ್ನಡ",
    code: "kn",
  },
  {
    id: 20,
    name: "ਪੰਜਾਬੀ",
    code: "pa",
  },
  {
    id: 21,
    name: "অসমীয়া",
    code: "as",
  },
  {
    id: 22,
    name: "മലയാളം",
    code: "ml",
  },
  {
    id: 23,
    name: "اردو",
    code: "ur",
  },
  {
    id: 24,
    name: "தமிழ்",
    code: "ta",
  },
  {
		id: 25,
		name: 'भोजपुरी',
		code: 'bho',
	},
	{
		id: 26,
		name: 'छत्तीसगढ़ी',
		code: 'hne',
	}
];

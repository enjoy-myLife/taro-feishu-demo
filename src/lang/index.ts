export enum LanguageEnum{
  Zh='zh',
}

// 本地语言包
import zhCnLocale from './zh-cn';

const messages = {
	[LanguageEnum.Zh]: {
		...zhCnLocale
	}
};

export const local={
	legacy: false,
	locale: LanguageEnum.Zh,
	messages: messages
};
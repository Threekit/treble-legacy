import http from '../http';

type ITranslation = Record<string, string | undefined>;
export type ITranslationMap = Record<string, ITranslation>;

export const fetchTranslations = () =>
  new Promise<ITranslationMap>(async resolve => {
    const translations = await http.products.getTranslations();
    const csvData = translations.data
      .replace(/"/g, '')
      .split('\n')
      .map(el => el.split(','));
    const languages = csvData[0];
    const translationMap = csvData.reduce((output, row, idx) => {
      if (!idx) return output;
      output[row[0]] = row.reduce((result, el, i) => {
        if (!i) return result;
        return Object.assign(result, {
          [languages[i]]: el.length ? el : undefined,
        });
      }, {} as ITranslation);

      return output;
    }, {} as ITranslationMap);
    resolve(translationMap);
  });

import http from '../http';
import { isJsonString } from '../utils';
import { DATATABLE_FORMATS } from '../constants';

interface IDatatableConfig {
  format: string;
}

export const getDatatable = async (
  datatableId: string,
  config: IDatatableConfig
) => {
  let message;
  if (!datatableId) message = 'Requires a datatable ID';
  if (message) return Promise.resolve(undefined);

  const { format } = Object.assign({ format: DATATABLE_FORMATS.json }, config);

  const response = await http.datatables.getDatatable(datatableId);

  if (response.status !== 200) return Promise.resolve(undefined);

  if (format.toLowerCase() === DATATABLE_FORMATS.csv)
    return Promise.resolve(response.data);
  const csvData = response.data
    .replace(/"/g, '')
    .split('\n')
    .map(el => el.split(','));
  const headings = csvData[0];
  const datatableJson = csvData.reduce((output, row, idx) => {
    if (!idx) return output;
    const rowOutput = row.reduce((result, el, i) => {
      if (!i) return result;
      return Object.assign(result, {
        [headings[i]]: el.length
          ? isJsonString(el)
            ? JSON.parse(el)
            : el
          : undefined,
      });
    }, {});
    output.push(rowOutput);
    return output;
  }, [] as Array<{ [key: string]: any }>);

  return Promise.resolve(datatableJson);
};

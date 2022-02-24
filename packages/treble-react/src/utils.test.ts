import { isJsonString } from './utils';

test('should return true when provided a valid json string', () => {
  const validJsonString = JSON.stringify({ alice: 'bob' });

  const result = isJsonString(validJsonString);

  expect(result).toEqual(true);
});

test('should return false when provided an invalid json string', () => {
  const invalidJsonString = 'bob';

  const result = isJsonString(invalidJsonString);

  expect(result).toEqual(false);
});

test('should return false when provided a non-string type', () => {
  const invalidJson = { alice: 'bob' };

  const result = isJsonString(invalidJson);

  expect(result).toEqual(false);
});

import { ThreekitConnection } from './connection';

test('should require an auth token', () => {
  const connection = new ThreekitConnection();

  const orgId = 'bob';
  const assetId = 'bob';
  const threekitDomain = 'preview.threekit.com';

  connection.connect({
    orgId,
    assetId,
    threekitDomain,
  });
  expect(() => connection.getConnection()).toThrow(
    'Connection has not been established'
  );
});

test('should default to admin-fts', () => {
  const connection = new ThreekitConnection();

  const authToken = 'bob';
  const orgId = 'bob';
  const assetId = 'bob';

  connection.connect({
    authToken,
    orgId,
    assetId,
  });

  const connectionObj = connection.getConnection();

  expect(connectionObj.threekitDomain).toEqual(
    `https://admin-fts.threekit.com`
  );
});

test('should attach a http prefix to the threekitDomain', () => {
  const connection = new ThreekitConnection();

  const authToken = 'bob';
  const orgId = 'bob';
  const assetId = 'bob';
  const threekitDomain = 'preview.threekit.com';

  connection.connect({
    authToken,
    orgId,
    assetId,
    threekitDomain,
  });

  const connectionObj = connection.getConnection();

  expect(connectionObj.threekitDomain).toEqual(`https://${threekitDomain}`);
});

test('should return a connection object when given a valid connection', () => {
  const connection = new ThreekitConnection();

  const authToken = 'bob';
  const orgId = 'bob';
  const assetId = 'bob';
  const threekitDomain = 'preview.threekit.com';

  connection.connect({
    authToken,
    orgId,
    assetId,
    threekitDomain,
  });
  expect(connection.getConnection()).toEqual({
    authToken,
    orgId,
    assetId,
    threekitDomain: `https://${threekitDomain}`,
    serverUrl: '',
  });
});

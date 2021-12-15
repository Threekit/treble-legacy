describe('my test suite', () => {
  // beforeAll(async () => {});
  // afterAll(async () => {});
  // beforeEach(async () => {});
  // afterEach(async () => {});

  it('should expect these to be true', () => {
    // https://jestjs.io/docs/expect
    expect(1 + 1).toBe(2);
    expect(!false).toBe(true);
    expect(0).toBeFalsy();
    expect(undefined).not.toBeDefined();
    expect({ foo: true }).toMatchObject({ foo: true });
  });

  // it('should ...', () => {});
});

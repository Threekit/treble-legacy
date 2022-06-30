describe('my test suite', () => {
  it('should expect these to be true', () => {
    expect(1 + 1).toBe(2);
    expect(!false).toBe(true);
    expect(0).toBeFalsy();
    expect(undefined).not.toBeDefined();
    expect({ foo: true }).toMatchObject({ foo: true });
  });
});

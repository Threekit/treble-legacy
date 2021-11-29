export const prepProcessArgs = args =>
  args.reduce(
    (output, arg) => {
      if (arg.startsWith('--')) {
        let [key, val] = arg.replace('--', '').split('=');
        output.flags[key] = val || undefined;
      } else if (!output.appName) {
        output.appName = arg;
      }
      return output;
    },
    {
      flags: {},
      appName: undefined,
    }
  );

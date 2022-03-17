export const createPatternFactory = (module: string) => {
  return (cmd: string) => ({ cmd, module });
};

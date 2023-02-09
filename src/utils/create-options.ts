const createOptions = (options: string[]) => {
  const formattedOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  formattedOptions.unshift({
    label: 'Choose Option',
    value: '',
  });

  return formattedOptions;
};

export default createOptions;

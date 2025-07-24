export const prepareSuccessResponse = <TData>(data: TData) => {
  return {
    success: true,
    data: data,
  };
};

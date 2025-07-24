export const prepareErrorResponse = (messages: string | string[]) => {
  const messageArray = [messages].flat();

  return {
    success: false,
    errors: messageArray.map((m) => ({ message: m })),
  };
};

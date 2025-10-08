export const isValidEmail = (email: string) =>
  /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

export const isValidPassword = (pw: string) =>
  /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(pw);

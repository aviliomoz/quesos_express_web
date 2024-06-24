type User = {
  id: string;
  name: string;
  email: string;
};

type AuthResponseType = {
  user?: User;
  error?: string;
  message?: string;
};

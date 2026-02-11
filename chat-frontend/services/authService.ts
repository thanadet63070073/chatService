export const loginApi = async (email: string, password: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return response;
};

export const registerApi = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, confirmPassword }),
  });

  return response;
};

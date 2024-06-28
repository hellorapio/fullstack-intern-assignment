export async function login(body: any) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/login",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data.token;
}

export async function getProtectedData(token: string) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/protected",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

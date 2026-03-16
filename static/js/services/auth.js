export async function login(login_credentials) {
  document.querySelector(".loader").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(login_credentials),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    const data = await res.json();
    if (!data.success) alert(data.message);
    else location.reload();
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader").classList.remove("active");
  }
}

export async function signup(signup_credentials) {
  document.querySelector(".loader").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/signup`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(signup_credentials),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data = await res.json();
    if (!data.success) alert(data.message);
    else location.reload();
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader").classList.remove("active");
  }
}

export async function logout() {
  document.querySelector(".loader").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({}),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });

    if (!res.ok) alert("Something went wrong!");
    else location.reload();
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader").classList.remove("active");
  }
}

export async function reset_password(auth_credentials) {
  document.querySelector(".loader").classList.add("active");
  try {
    const res = await fetch(`${window.origin}/api/auth/reset_password`, {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify(auth_credentials),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json",
      }),
    });
    const data = await res.json();
    if (!data.success) alert(data.message);
  } catch (error) {
    alert(error.message);
  } finally {
    document.querySelector(".loader").classList.remove("active");
  }
}

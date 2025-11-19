"use server";

export async function signUp(prevState: any, formData: FormData) {
  function textIsInvalid(text: FormDataEntryValue | null | string) {
    return !text || text.trim().length === 0;
  }

  const errors: string[] = [];

  const user = {
    login: formData.get("login"),
    password: formData.get("password"),
    passwordCopie: formData.get("repeatPass"),
    city: formData.get("ort"),
    street: formData.get("street"),
    house: formData.get("house"),
    plz: formData.get("plz"),
  };

  if (textIsInvalid(user.login)) errors.push("Login darf nicht leer sein.");
  if (textIsInvalid(user.password))
    errors.push("Password darf nicht leer sein.");
  if (user.password !== user.passwordCopie)
    errors.push("Passwörter stimmen nicht überein.");
  //   if (textIsInvalid(user.city)) errors.push("Stadt darf nicht leer sein.");
  //   if (textIsInvalid(user.street)) errors.push("Straße darf nicht leer sein.");
  //   if (textIsInvalid(user.house)) errors.push("Hausnummer darf nicht leer sein.");
  //   if (textIsInvalid(user.plz)) errors.push("PLZ darf nicht leer sein.");

  if (errors.length > 0) {
    return {
      errors,
      values: {
        login: user.login?.toString() ?? "",
        city: user.city?.toString() ?? "",
        street: user.street?.toString() ?? "",
        house: user.house?.toString() ?? "",
        plz: user.plz?.toString() ?? "",
      },
    };
  }

  console.log(user);
}

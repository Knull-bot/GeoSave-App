"use server";
import bcrypt from "bcrypt";
import client from "../../src/lib/db";
import { redirect } from "next/navigation";

export async function signUp(prevState: FormData, formData: FormData) {
  function textIsInvalid(value: FormDataEntryValue | null) {
    const text = typeof value === "string" ? value : "";
    return text.trim().length === 0;
  }

  async function userExists(login: string) {
    const user = await client.query("SELECT * FROM users WHERE username = $1", [
      login,
    ]);
    return user.rows.length > 0;
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
  if ((await userExists(user.login as string)) === true) {
    user.login = "";
    errors.push("Login ist bereits vergeben.");
  }
  if (!user.password || String(user.password).length < 8)
    errors.push("Passwort muss mindestens 8 Zeichen haben.");

  const house =
    typeof user.house === "string" && user.house.trim() !== ""
      ? Number(user.house)
      : null;

  const plz =
    typeof user.plz === "string" && user.plz.trim() !== ""
      ? Number(user.plz)
      : null;

  if (house !== null && Number.isNaN(house)) {
    errors.push("Hausnummer muss eine Zahl sein.");
  }

  if (plz !== null && Number.isNaN(plz)) {
    errors.push("PLZ muss eine Zahl sein.");
  }

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

  const hashedPassword = await bcrypt.hash(user.password as string, 10);

  await client.query(
    "INSERT INTO users (username, password, city, role, street, house, plz) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    [user.login, hashedPassword, user.city, "user", user.street, house, plz],
  );
  redirect("/sign-in");
}

"use client";
import { useActionState } from "react";

import { signUp } from "../actions/SignUp";

export default function SignUpForm() {
  const [state, formAction] = useActionState(signUp, {
    errors: [],
    values: {},
  });
  return (
    <>
      <form className="form" action={formAction}>
        <label htmlFor="login">Login*</label>
        <input
          type="text"
          id="login"
          name="login"
          defaultValue={state?.values.login ?? ""}
        />
        <label htmlFor="password">Password*</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="repeatPass">Repeat password*</label>
        <input type="password" id="repeatPass" name="repeatPass" />
        <label htmlFor="ort">Stadt</label>
        <input
          type="text"
          id="ort"
          name="ort"
          defaultValue={state?.values.city ?? ""}
        />
        <label htmlFor="street">Strasse</label>
        <input
          type="text"
          id="street"
          name="street"
          defaultValue={state?.values.street ?? ""}
        />
        <label htmlFor="house">Hs.</label>
        <input
          type="text"
          id="house"
          name="house"
          defaultValue={state?.values.house ?? ""}
        />
        <label htmlFor="plz">PLZ</label>
        <input
          type="text"
          id="plz"
          name="plz"
          defaultValue={state?.values.plz ?? ""}
        />
        <button type="submit">Sign Up</button>
        {state?.errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </form>
    </>
  );
}

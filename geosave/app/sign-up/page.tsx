"use client";
import { useActionState } from "react";
import classes from "./page.module.css";

import { signUp } from "../actions/SignUp";

export default function SignUpForm() {
  const [state, formAction] = useActionState<any>(signUp as any, {
    errors: [],
    values: {},
    isPending: false,
  });

  return (
    <>
      <div className={classes.center}>
        <form className={classes.form} action={formAction}>
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
          {state?.errors.length > 0 && (
            <ul className={classes.error}>
              {state.errors.map((error: string) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
          <button
            type="submit"
            className={classes.actions}
            disabled={state?.isPending}
          >
            {state?.isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </>
  );
}

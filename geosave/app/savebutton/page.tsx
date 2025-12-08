import classes from "./page.module.css";
import { SendButton } from "@/src/components/Button";

export default function LoggedIn() {
  return (
    <>
      <div className={classes.center}>
        <SendButton></SendButton>
        <p className={classes.p}>Send your location to 112</p>
      </div>
    </>
  );
}

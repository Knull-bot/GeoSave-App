import classes from "./page.module.css";
import { SendButton } from "@/src/components/Button";
import { verifyToken } from "@/src/lib/jwt";
import { cookies } from "next/headers";

export default async function SendPage() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt")?.value;
  const payLoad = cookie ? verifyToken(cookie) : null;
  const id = payLoad?.id ?? null;
  return (
    <>
      <div className={classes.center}>
        <SendButton userId={id}></SendButton>
        <p className={classes.p}>Senden Sie Ihren Standort an 112.</p>
      </div>
    </>
  );
}

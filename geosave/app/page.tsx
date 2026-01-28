import classes from "./page.module.css";
import Link from "next/link";
import logo from "@/src/img/bird.png";
import Image from "next/image";
import Card from "@/src/components/Card";
import pcImg from "@/src/img/computer.png";
import diamondImg from "@/src/img/diamond.png";
import speedImg from "@/src/img/layer.png";
import { verifyToken } from "@/src/lib/jwt";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("jwt")?.value;
  const payLoad = cookie ? verifyToken(cookie) : null;
  const role = payLoad?.role ?? null;
  return (
    <>
      <main className={classes.main}>
        <div className={classes["main-title"]}>
          <Image alt="logo" src={logo}></Image>
          <h1 className={classes.title}>Willkommen bei GeoSave</h1>
          <p className={classes.description}>
            Ihr persönlicher Alarmknopf für Ihre eigene Sicherheit und die Ihrer
            Angehörigen.
          </p>
          <p>
            Es ist kostenlos, sicher und einfach zu bedienen. Legen Sie jetzt
            los!
          </p>
          {role === null && (
            <div className={classes.links}>
              <Link href="/sign-up" className={classes.btn}>
                Registrieren
              </Link>

              <Link href="/sign-in" className={classes.btn}>
                Anmelden
              </Link>
            </div>
          )}
        </div>
        <div className={classes.cards}>
          <Card
            image={pcImg}
            title="Verwenden Sie Ihr Gerät, um den Standort zu senden"
            text="Es ist einfach und bequem. Seien Sie sicher, dass Sie helfen werden, wenn Sie es brauchen."
          />
          <Card
            image={speedImg}
            title="Es ist sehr schnell und einfach zu bedienen"
            text="Danger-Button direkt in Ihrer Tasche!"
          />

          <Card
            image={diamondImg}
            title="Es ist kostenlos!"
            text="Die Sicherheit Ihrer Familie ist unbezahlbar."
          />
        </div>
      </main>
    </>
  );
}

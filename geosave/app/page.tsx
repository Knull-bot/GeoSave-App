import classes from "./page.module.css";
import Link from "next/link";
import logo from "@/src/img/bird.png";
import Image from "next/image";
import Card from "@/src/components/Card";
import pcImg from "@/src/img/computer.png";
import diamondImg from "@/src/img/diamond.png";
import speedImg from "@/src/img/layer.png";

export default async function Home() {
  return (
    <>
      <div className={classes["main-title"]}>
        <Image alt="logo" src={logo}></Image>
        <h1 className={classes.title}>Welcome to GeoSave</h1>
        <p className={classes.description}>
          Its your personal alarm-button for your safety and safety of ypur
          loved ones.
        </p>
        <p>Its free, secure and easy to use. Get started now!</p>
        <div className={classes.links}>
          <Link href="/sign-up" className={classes.btn}>
            Sign Up
          </Link>

          <Link href="/sign-in" className={classes.btn}>
            Sign In
          </Link>
        </div>
      </div>
      <div className={classes.cards}>
        <Card
          image={pcImg}
          title="Use your device to send location"
          text="Its easy and convenient. Be sure that you will become a help when you need it."
        />
        <Card
          image={speedImg}
          title="It's very fast and easy to use"
          text="Danger-Button right in yout pocket! "
        />

        <Card
          image={diamondImg}
          title="It's free!"
          text="Safety of your family is priceless."
        />
      </div>
    </>
  );
}

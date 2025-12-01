import Image, { StaticImageData } from "next/image";
import classes from "./Card.module.css";

export default function Card({
  image,
  text,
}: {
  image?: StaticImageData;
  text?: string;
}) {
  return (
    <div className={classes.card}>
      <Image alt="logo" src={image!} className={classes.cardImg}></Image>
      <p>{text}</p>
    </div>
  );
}

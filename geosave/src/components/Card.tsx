import Image, { StaticImageData } from "next/image";
import classes from "./Card.module.css";

export default function Card({
  image,
  text,
  title,
}: {
  image?: StaticImageData;
  text?: string;
  title: string;
}) {
  return (
    <div className={classes.card}>
      <Image alt="logo" src={image!} className={classes.cardImg}></Image>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

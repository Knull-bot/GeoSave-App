import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.content}>
        <p>© {new Date().getFullYear()} GeoSave. All rights reserved.</p>
      </div>
    </footer>
  );
}

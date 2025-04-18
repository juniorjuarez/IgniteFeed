import React from "react";
import styles from "./Avatar.module.css";

interface IAvatarProps {
  hasBorder?: boolean;
  src: string;
  alt?: string;
}

export const Avatar = ({ hasBorder = true, src, alt }: IAvatarProps) => {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      alt={alt}
    />
  );
};

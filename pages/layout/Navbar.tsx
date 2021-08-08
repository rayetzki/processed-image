import { Fragment } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const Routes = [
  { link: "/animals", caption: "Животные" },
  { link: "/people", caption: "Люди" },
  { link: "/minimalism", caption: "Минимализм" },
  { link: "/plants", caption: "Растения" },
  { link: "/blacknwhite", caption: "Черно-Белое" },
  { link: "/landscape", caption: "Пейзажи" },
  {
    link: "/cities",
    caption: "Города",
    subRoutes: [
      "Запорожье",
      "Одесса",
      "Коростень",
      "Харьков",
      "Чернигов",
      "Киев",
    ].map((city) => ({
      link: `/cities?city=${city}`,
      caption: city,
    })),
  },
];

export const Navbar = () => (
  <nav aria-label="Основная навигация" className={styles.Nav}>
    {Routes.map((route) => (
      <Fragment key={route.link}>
        <div role="menuitem" className={styles.LinkBlock}>
          <Link href={route.link}>
            <a className={styles.Link} aria-haspopup={!!route.subRoutes}>
              {route.caption}
            </a>
          </Link>
          {route.subRoutes && (
            <menu className={styles.SubMenu}>
              <ul className={styles.SubMenuList}>
                {route.subRoutes.map((subRoute) => (
                  <li className={styles.SubMenuListItem} key={subRoute.caption}>
                    <Link href={subRoute.link}>
                      <a className={styles.SubMenuLink}>{subRoute.caption}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </menu>
          )}
        </div>
      </Fragment>
    ))}
  </nav>
);

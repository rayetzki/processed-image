import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import classNames from "classnames";

const Routes = [
  { link: "/animals", caption: "Животные" },
  { link: "/people", caption: "Люди" },
  { link: "/minimalism", caption: "Минимализм" },
  { link: "/plants", caption: "Растения" },
  { link: "/blacknwhite", caption: "Черно-Белое" },
  { link: "/landscape", caption: "Пейзажи" },
  {
    caption: "Города",
    subRoutes: [
      { link: "zp", caption: "Запорожье" },
      { link: "odessa", caption: "Одесса" },
      { link: "korosten", caption: "Коростень" },
      { link: "kharkiv", caption: "Харьков" },
      { link: "chernigov", caption: "Чернигов" },
      { link: "kiev", caption: "Киев" },
    ].map(({ link, caption }) => ({
      link: `/cities?city=${link}`,
      caption,
    })),
  },
];

export default function Navbar() {
  const { asPath: currentRoute } = useRouter();

  return (
    <nav aria-label="Основная навигация" className={styles.Nav}>
      {Routes.map((route) => (
        <Fragment key={route.link}>
          <div role="menuitem" className={classNames(styles.LinkBlock, {
            [styles.Active]: route.link === currentRoute
          })}>
            <Link href={route.link ? route.link : ''}>
              <a className={styles.Link} aria-haspopup={!!route.subRoutes}>
                {route.caption}
              </a>
            </Link>
            {route.subRoutes && (
              <menu className={styles.SubMenu}>
                <ul className={styles.SubMenuList}>
                  {route.subRoutes.map((subRoute) => (
                    <li className={classNames(styles.LinkBlock, {
                      [styles.Active]: subRoute.link === currentRoute
                    })} key={subRoute.caption}>
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
};

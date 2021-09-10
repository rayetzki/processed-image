import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMediaQuery } from 'react-responsive'; 
import styles from "./Navbar.module.css";
import cx from "classnames";

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
      { link: "chernihiv", caption: "Чернигов" },
      { link: "kyiv", caption: "Киев" },
    ].map(({ link, caption }) => ({
      link: `/cities?city=${link}`,
      caption,
    })),
  },
];

const MobileRoutes = [
	{ link: "/animals", caption: "Животные" },
  { link: "/people", caption: "Люди" },
  { link: "/minimalism", caption: "Минимализм" },
  { link: "/plants", caption: "Растения" },
  { link: "/blacknwhite", caption: "Черно-Белое" },
  { link: "/landscape", caption: "Пейзажи" },
	...[
		{ link: "zp", caption: "Запорожье" },
		{ link: "odessa", caption: "Одесса" },
		{ link: "korosten", caption: "Коростень" },
		{ link: "kharkiv", caption: "Харьков" },
		{ link: "chernihiv", caption: "Чернигов" },
		{ link: "kyiv", caption: "Киев" },
	].map(({ link, caption }) => ({
		link: `/cities?city=${link}`,
		caption: `Города -> ${caption}`,
	}))
];


export default function Navbar() {
  const { asPath: currentRoute } = useRouter();
	const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
	const [isMobileMenuExpanded, setMobileMenuExpanded] = useState(false);

  return (
    <nav aria-label="Основная навигация" className={styles.Nav}>
      {!isMobile && Routes.map((route) => (
        <Fragment key={route.caption}>
          <div role="menuitem" className={cx(styles.LinkBlock, {
            [styles.Active]: route.link === currentRoute
          })}>
            <Link href={route.link || '/'}>
              <a className={styles.Link} aria-haspopup={!!route.subRoutes}>
                {route.caption}
              </a>
            </Link>
            {route.subRoutes && (
              <menu className={styles.SubMenu}>
                <ul className={styles.SubMenuList}>
                  {route.subRoutes.map((subRoute) => (
                    <li key={subRoute.link} className={cx(styles.LinkBlock, {
                      [styles.Active]: subRoute.link === currentRoute
                    })}>
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
			{isMobile && isMobileMenuExpanded && (
				<ul className={styles.NavMobileExpanded}>
					{MobileRoutes.map(route => (
						<Fragment key={route.caption}>
							<li role="menuitem" className={cx(styles.LinkBlock, {
								[styles.NavMobileActive]: route.link === currentRoute
							})}>
								<Link href={route.link || '/'}>
									<a className={styles.Link}>{route.caption}</a>
								</Link>
							</li>
						</Fragment>
					))}
				</ul>
			)}
			{isMobile && (
				<Fragment>
					<h1 className={styles.NavMobileHeading}>Пленочная I & 0</h1>
					<div 
						tabIndex={0} 
						onClick={() => setMobileMenuExpanded(!isMobileMenuExpanded)} 
						className={styles.NavMobile}
					>
							<span></span>
							<span></span>
							<span></span>
					</div>
				</Fragment>
			)}
    </nav>
  );
};

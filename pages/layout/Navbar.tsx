import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import cx from "classnames";

const SubRoutes =  [
	{ link: "zp", caption: "Запорожье" },
	{ link: "odessa", caption: "Одесса" },
	{ link: "korosten", caption: "Коростень" },
	{ link: "kharkiv", caption: "Харьков" },
	{ link: "chernihiv", caption: "Чернигов" },
	{ link: "kyiv", caption: "Киев" },
].map(({ link, caption }) => ({ link: `/${link}`, caption }));

const Routes = [
  { link: "/animals", caption: "Животные" },
  { link: "/people", caption: "Люди" },
  { link: "/minimalism", caption: "Минимализм" },
  { link: "/plants", caption: "Растения" },
  { link: "/blacknwhite", caption: "Черно-Белое" },
  { link: "/landscape", caption: "Пейзажи" },
  { caption: "Города", subRoutes: SubRoutes }
];

const MobileRoutes = [
	{ link: "/animals", caption: "Животные" },
  { link: "/people", caption: "Люди" },
  { link: "/minimalism", caption: "Минимализм" },
  { link: "/plants", caption: "Растения" },
  { link: "/blacknwhite", caption: "Черно-Белое" },
  { link: "/landscape", caption: "Пейзажи" },
	...SubRoutes
];

function DesktopNav() {
  const { asPath: currentRoute } = useRouter();

	return (
		<ul className={styles.DesktopNav}>
			{Routes.map(route => (
				<li key={route.caption} role="menuitem" className={cx(styles.LinkBlock, {
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
				</li>
			))}
		</ul>
	);
}

function MobileNav() {
	const [isMobileMenuExpanded, setMobileMenuExpanded] = useState(false);
	const { asPath: currentRoute } = useRouter();

	return (
		<div className={styles.NavMobileBlock}>
			<h2 className={styles.NavMobileHeading}>Пленочная I & 0</h2>
			<div 
				tabIndex={0} 
				onClick={() => setMobileMenuExpanded(!isMobileMenuExpanded)} 
				className={styles.NavMobile}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			{isMobileMenuExpanded && (
				<ul className={styles.NavMobileExpanded}>
					{MobileRoutes.map(route => (
						<li key={route.caption} role="menuitem" className={cx({
							[styles.NavMobileActive]: route.link === currentRoute
						})}>
							<Link href={route.link || '/'}>
								<a className={styles.Link}>{route.caption}</a>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default function Navbar() {
  return (
    <nav aria-label="Основная навигация" className={styles.Nav}>
      <MobileNav />
			<DesktopNav />
    </nav>
  );
};

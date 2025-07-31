import { Link, useLocation } from 'react-router';

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames: string[] = location.pathname.split('/').filter((x) => x).filter((pathname) => isNaN(Number(pathname)))
  const breadCumbs: string[] = pathnames.map((_, id) => {
    return '/' + pathnames.slice(0, id + 1).join('/');
  });
  return (
    <nav className="breadcrumbs-nav">
      <Link className={'breadcrumbs-nav__home'} to={'/'}>Home </Link>
      {breadCumbs.map((pathname, id) => {
        if (id + 1 === breadCumbs.length) {
			return  <span className="breadcrumbs-nav__span" key={id}>
            {' / '}{pathnames[id]}
          </span>
        }
        return (
          <Link key={id} to={pathname}>
             / {pathnames[id]}
          </Link>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;

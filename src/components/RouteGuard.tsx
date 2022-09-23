import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

export { RouteGuard };

// redirect to login page if accessing a private page and not logged in
export const publicPaths = [
  "/login",
  "/",
  "/logout"
];

function RouteGuard({ children }: any) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  
  const { user: currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url: string) {
    let comparePath = [];
    let returnPath = "/login";
    let conditionUser = currentUser;

    let path = url.split("?")[0];
    path = "/"+path.split('/')[1];

    comparePath = publicPaths;

    if (!conditionUser.token && !comparePath.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: returnPath,
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized && children;
}
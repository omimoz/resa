import { Children } from "./typs";
import Style from "./style";

function Layout({ children }: { children: Children }) {
  return <main className={Style}>{children}</main>;
}

export default Layout;

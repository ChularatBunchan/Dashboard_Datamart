import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({children}) => {
    return (
        <div>
            <Sidebar />
            <main>{children}</main>
        </div>
    )
}
export default Layout;
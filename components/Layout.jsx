import Header from "./Header";
import dynamic from 'next/dynamic'

const ComponentWithNoSSR = dynamic(
    () => import('./Header'),
    { ssr: false }
)
const Layout = ({ children }) => (
    <div>
        <ComponentWithNoSSR>
            <Header />
        </ComponentWithNoSSR>
        {children}
    </div>

);
export default Layout;
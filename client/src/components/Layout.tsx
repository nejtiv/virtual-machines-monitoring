//Dependencies import
import type { ReactNode } from "react"

//Layout props
type LayoutProps = {
    children?: ReactNode;
}

//Layout
const Layout = ({children}: LayoutProps) => {
    return(
        <div className="h-screen flex">
            {children}
        </div>
    )
}

export default Layout;
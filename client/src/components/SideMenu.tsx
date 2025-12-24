//Dependencies import
import type { ReactNode } from "react"

//Side Menu props
type SideMenuProps = {
    children?: ReactNode;
}

//Side Menu Component
const SideMenu = ({children}: SideMenuProps) => {
    return(
        <aside className="w-60 flex flex-col">
            {children}
        </aside>
    )
}

export default SideMenu;
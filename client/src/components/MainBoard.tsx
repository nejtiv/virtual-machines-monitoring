//Dependencies import
import type { ReactNode } from "react"

//Main Board props
type MainBoardProps = {
    children?: ReactNode;
}

const MainBoard = ({children}: MainBoardProps) => {
    return(
        <div className="flex-1 bg-gray-100">
            {children}
        </div>
    )
}

export default MainBoard;
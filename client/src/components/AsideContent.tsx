//React import
import { useNavigate } from "react-router-dom";

//Main Component
function AsideContent() {
  //Declare navigate
  const navigate = useNavigate();
  //Navigation between sites
  const navigateHome = () => {
    navigate("/");
  };
  const navigateVM = () => {
    navigate("/virtual-machines");
  };
  const navigateHM = () => {
    navigate("/health-monitor");
  };

  return (
    <>
      <h1
        className="p-1 text-md text-black font-bold border-b border-gray-200 cursor-pointer"
        onClick={navigateHome}
      >
        Aura
      </h1>
      <div className="flex flex-col mt-5 gap-3">
        <a
          className="p-1 pl-3 flex gap-1.5 bg-white items-center font-semibold text-black text-left hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={navigateHome}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fillRule="evenodd"
              d="M1.75 2a.75.75 0 0 0 0 1.5H2V9a2 2 0 0 0 2 2h.043l-1.005 3.013a.75.75 0 0 0 1.423.474L4.624 14h6.752l.163.487a.75.75 0 0 0 1.423-.474L11.957 11H12a2 2 0 0 0 2-2V3.5h.25a.75.75 0 0 0 0-1.5H1.75Zm8.626 9 .5 1.5H5.124l.5-1.5h4.752Zm1.317-5.833a.75.75 0 0 0-.892-1.206 8.789 8.789 0 0 0-2.465 2.814L7.28 5.72a.75.75 0 0 0-1.06 0l-2 2a.75.75 0 0 0 1.06 1.06l1.47-1.47L8.028 8.59a.75.75 0 0 0 1.228-.255 7.275 7.275 0 0 1 2.437-3.167Z"
              clipRule="evenodd"
            />
          </svg>
          Overview
        </a>
        <a
          className="p-1 pl-3 flex gap-1.5 bg-white items-center font-semibold text-black text-left hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={navigateVM}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M6 6v4h4V6H6Z" />
            <path
              fillRule="evenodd"
              d="M5.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2H1.75a.75.75 0 0 0 0 1.5H3v.75H1.75a.75.75 0 0 0 0 1.5H3v.75H1.75a.75.75 0 0 0 0 1.5H3a2 2 0 0 0 2 2v1.25a.75.75 0 0 0 1.5 0V13h.75v1.25a.75.75 0 0 0 1.5 0V13h.75v1.25a.75.75 0 0 0 1.5 0V13a2 2 0 0 0 2-2h1.25a.75.75 0 0 0 0-1.5H13v-.75h1.25a.75.75 0 0 0 0-1.5H13V6.5h1.25a.75.75 0 0 0 0-1.5H13a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-.75V1.75a.75.75 0 0 0-1.5 0V3H6.5V1.75A.75.75 0 0 0 5.75 1ZM11 4.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V5a.5.5 0 0 1 .5-.5h6Z"
              clipRule="evenodd"
            />
          </svg>
          Virtual Machines
        </a>
        <a
          className="p-1 pl-3 flex gap-1.5 bg-white items-center font-semibold text-black text-left hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={navigateHM}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z" />
          </svg>
          Health Monitor
        </a>
      </div>
    </>
  );
}

export default AsideContent;

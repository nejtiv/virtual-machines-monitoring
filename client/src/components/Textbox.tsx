//Textbox props
type TextboxProps = {
    className?: string;
    type?: string;
    name?: string;
    placeholder?: string;
}

//Textbox component
const Textbox = ({className="", type="", name="", placeholder=""}: TextboxProps) => {
    return(
        <input className={`block p-0.5 mb-1 border border-black rounded-sm placeholder:sm:text-xs text-sm ${className}`} type={type} name={name} placeholder={placeholder}>
            
        </input>
    )
}

export default Textbox;
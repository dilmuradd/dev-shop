export default function Input({ placeholder, className }) {
    return (
        <input type="text" placeholder={placeholder} className={`text ${className} rounded-md px-3 py-1 md:h-14`}/>
    )
  }
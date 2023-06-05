import "./customButton.sass";
import useUI from "../../helpers/hooks/useUI";

export default function CustomButton({
  name,
  icon,
  onClick,
  children,
  className,
  type,
  style,
}: any) {
  console.log(name);
  return (
    <button
      type={type}
      className={`custom-button ${className}`}
      style={{
        ...style,
        alignContent: style.alignContent ? style.alignContent : "center",
        justifyContent: style.justifyContent ? style.justifyContent : "center",
      }}
      onClick={onClick}
    >
      {icon ? <div className="icon">{icon}</div> : ""}
      {/* //  TODO handle Name uppercase and name case  */}
      {name ? (
        <div className="name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
      ) : (
        ""
      )}
      {children ? children : ""}
    </button>
  );
}

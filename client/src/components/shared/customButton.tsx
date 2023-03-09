import './customButton.sass';
import useUI from '../../helpers/hooks/useUI';

export default function CustomButton(props: any) {
  const { isSidebarExpanded } = useUI();
  const classNames = props.className ? props.className : '';
  return (
    <button
      ref={props.ref}
      type={props.type}
      data-bs-toggle={props.dataBsToggle}
      data-bs-target={props.dataBsTarget}
      className={`custom-button ${classNames}`}
      style={{
        maxWidth: props.maxWidth,
        width: props.width,
        alignContent: props.alignContent ? props.alignContent : 'center',
        justifyContent: props.justifyContent ? props.justifyContent : 'center',
        marginBottom: '1rem',
      }}
    >
      {props.icon ? <div className="icon">{props.icon}</div> : ''}
      {props.onClick ? (onclick = props.onClick) : ''}
      {props.name ? (
        <div className="name">
          {isSidebarExpanded
            ? props.name.charAt(0).toUpperCase() + props.name.slice(1)
            : ''}
        </div>
      ) : (
        ''
      )}
      {props.children ? props.children : ''}
    </button>
  );
}

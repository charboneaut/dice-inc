import "./DevHatch.css";

export default function DevHatch(props) {
  return (
    <div className="dev" onClick={props.onClick}>
      Enter Development Mode
    </div>
  );
}

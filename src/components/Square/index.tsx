import "./index.css"

interface SquareProps {
    value: string
    onClick: any
}

export const Square = (props: SquareProps) => {
  return (
      <button
          className="square"
          onClick={props.onClick}
      >
          {props.value}
      </button>
  );
}
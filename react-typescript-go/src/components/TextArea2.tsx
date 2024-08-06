import { TextareaHTMLAttributes } from "react";

type TextAreaProps = {
  label: string;
  errorMsg?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea2 = (props: TextAreaProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.name} className="form-label">
        {props.title}
      </label>
      <textarea
        className="form-control"
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        rows={props.rows}
      />
      <div>{props.errorMsg}</div>
    </div>
  );
};

export default TextArea2;

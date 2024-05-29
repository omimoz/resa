import { Children, ReactElement, ReactNode } from "react";
type ShowProps = {
  children: ReactNode;
};

type ShowWhenProps = {
  isTrue: boolean;
  children: ReactNode;
};
function Show(props: ShowProps) {
  let when: ReactNode = null;
  let otherwise = null;
  Children.forEach(props.children, (children) => {
    if ((children as ReactElement<ShowWhenProps>).props.isTrue === undefined) {
      otherwise = children;
    } else if (
      !when &&
      (children as ReactElement<ShowWhenProps>).props.isTrue
    ) {
      when = children;
    }
  });
  return when || otherwise;
}

Show.When = ({ isTrue, children }: ShowWhenProps) => isTrue && children;
Show.Else = ({ children }: ShowProps) => children;
export default Show;

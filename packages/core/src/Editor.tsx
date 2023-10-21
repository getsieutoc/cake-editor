export interface EditorProps {
   title?: string;
}

export function Editor(props: EditorProps) {
   return <div>{props.title ?? "Cake Editor 12312 dsad sad s"}</div>;
}

Editor.displayName = "Editor";

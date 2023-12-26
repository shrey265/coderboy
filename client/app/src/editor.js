import ReactQuill from "react-quill";
import hljs from 'highlight.js';



hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'rust','c','c++'],
  });

const modules = {
    toolbar: [
        [{header: [1,2,3,4,5,6,false]}],
        [{font: []}],
        [{size: []}],
        ["bold","italic","underline","strike","blockquote"],
        [
            {list:"ordered"},
            {list:"bullet"},
            {indent:"-1"},
            {indent:"+1"},
        ],
        ["link","image","video","code"],
    ],
    syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
}

export default function Editor({value,onChange}){


    return (
        <ReactQuill 
        theme={'snow'}
        value={value}
        modules={modules}
        onChange={onChange}
    />
        
    );
}
import { Link } from "./LinkToNote.styled";

const LinkToNote = ({ id, title }) => {

  return <Link to={`/notes/${id}`}>{title}</Link>;
  
};

export default LinkToNote;

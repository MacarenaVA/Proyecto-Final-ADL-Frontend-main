import { useContext, useEffect, useState } from "react"
import CommentsListItem from "./CommentsListItem"
import { CommentsContext } from "../../Context/CommentsProvider"
import NewComment from "./NewComment"


export default function CommentsSection({ classId }) {
  const { comments, getClassComments, setComments } = useContext(CommentsContext);
  const [loadingComments, setLoadingComments] = useState(null);


  useEffect(() => {
    setComments([]);
    setLoadingComments(true);
    getClassComments(classId);
    setLoadingComments(false);
  }, []);

  const listComments = comments.map((commentItem) => {
    return (
      <CommentsListItem key={commentItem.id} commentItem={commentItem} />
    );
  })


  return (
    <>
      <NewComment classId={classId} />
      {loadingComments ? <div>nada por aqui</div> : listComments}
    </>);
}
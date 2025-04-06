import React, { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";
import { ThumbsUp, Trash } from "lucide-react";

interface ICommentProps {
  content: string;
  deleteComment: (comment: string) => void;
}

export const Comment = ({ content, deleteComment }: ICommentProps) => {
  const [likeCount, setLikeCount] = useState(0);

  function handleLikeComment() {
    setLikeCount(likeCount + 1);
  }

  function handleDeleteComment() {
    deleteComment(content);
  }

  return (
    <div className={styles.comment}>
      <Avatar
        src="https://github.com/juniorjuarez.png"
        hasBorder={false}
        alt=""
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContet}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Jose Jurez</strong>
              <time dateTime="2023-05-11 08:13:30" title="11 de Maio às 08:13">
                Cerca de 1h atrás
              </time>
            </div>
            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            {/* <button onClick={() => setLikeCount(likeCount + 1)}> */}
            <ThumbsUp size={16} /> Aplaudir
            <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

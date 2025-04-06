import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import React, {
  type ChangeEvent,
  type FormEvent,
  type InvalidEvent,
} from "react";
import styles from "./Post.module.css";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import { useState } from "react";

interface IAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

interface PostProps {
  author: IAuthor;
  publishedAt: Date;
  content: IContent[];
}

interface IContent {
  type: "paragraph" | "link";
  content: string;
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana"]);
  const [newCommentText, setNewCommentText] = useState("");

  const publisheDateFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'de' yyyy 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelet: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelet;
    });
    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório");
  }
  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <>
      <article className={styles.post}>
        <header>
          <div className={styles.author}>
            <Avatar src={author.avatarUrl} hasBorder />
            <div className={styles.authorInfo}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>
          <time
            dateTime={publishedAt.toISOString()}
            title={publisheDateFormatted}
          >
            {publishedDateRelativeToNow}
          </time>
        </header>
        <div className={styles.content}>
          {content.map((line) => {
            if (line.type === "paragraph") {
              return <p key={line.content}>{line.content}</p>;
            } else if (line.type === "link") {
              return (
                <p key={line.content}>
                  <a href="#">{line.content}</a>
                </p>
              );
            }
          })}
        </div>
        <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
          <strong>Deixe seu feedback</strong>
          <textarea
            onInvalid={handleNewCommentInvalid}
            required
            onChange={handleNewCommentChange}
            value={newCommentText}
            name="comment"
            placeholder="Deixe um comentário..."
          />
          <footer>
            <button disabled={isNewCommentEmpty} type="submit">
              Publicar
            </button>
          </footer>
        </form>

        <div className={styles.commentList}>
          {comments.map((comment) => {
            return (
              <Comment
                content={comment}
                key={comment}
                deleteComment={deleteComment}
              />
            );
          })}
        </div>
      </article>
    </>
  );
}

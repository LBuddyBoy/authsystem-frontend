import { useNavigate } from "react-router";
import TimeAgo from "../../../components/TimeAgo";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <li
      className="postCard"
      onClick={() => navigate("/posts/" + post.id)}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <div className="postCardTitle">
        <h3>{post.title}</h3>
        <div className="postCardByLine">
          <span className="postCardUser">{post.account.username}</span>
          <TimeAgo timeStamp={new Date(post.created_at)} />
        </div>
      </div>
      <div className="postCardStats">
        <span className="postCardStat">
          <p>{post.replies}</p>
          <footer>Replies</footer>
        </span>
        <span className="postCardStat">
          <p>{0}</p>
          <footer>Views</footer>
        </span>
      </div>
    </li>
  );
}

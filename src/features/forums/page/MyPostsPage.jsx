import Loading from "../../../components/Loading";
import useQuery from "../../../hooks/useQuery";
import { Link } from "react-router";
import "../style/myPosts.css";
import PostCard from "../components/PostCard";
import useTitle from "../../../hooks/useTitle";

export default function MyPostsPage() {
  const { data: posts, loading, error } = useQuery("/posts/me", "posts");
  
  useTitle("My Posts");

  if (loading || !posts) return <Loading />;
  if (error) return <div className="errorMsg">Something went wrong.</div>;

  return (
    <div className="myPostsPage">
      <header className="myPostsHeader">
        <h1>My Posts</h1>
        <Link className="newPostBtn" to="/create-post">
          + New Post
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="emptyState">
          <p>You haven’t posted anything yet!</p>
          <Link className="newPostCta" to="/create-post">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="myPostsList">
          {posts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
        </div>
      )}
    </div>
  );
}

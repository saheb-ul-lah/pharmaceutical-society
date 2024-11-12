import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaPen, FaQuestionCircle } from 'react-icons/fa';

const EnhancedPosts = () => {
  const [activeTab, setActiveTab] = useState("alumni");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [posts, setPosts] = useState([]);
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // Simulating initial data fetch
    setPosts([
      { id: 1, author: 'John Doe', timestamp: '2 hours ago', title: 'My Alumni Experience', content: 'It was great!', likes: 5, comments: 3 },
      { id: 2, author: 'Jane Smith', timestamp: '1 day ago', title: 'Career Advice', content: 'Here are some tips...', likes: 10, comments: 7 },
    ]);
    setQueries([
      { id: 1, author: 'Alice Brown', timestamp: '3 hours ago', title: 'Question about Admissions', content: 'How do I apply?', status: 'Open' },
      { id: 2, author: 'Bob Green', timestamp: '2 days ago', title: 'Scholarship Information', content: 'Are there any available?', status: 'Closed' },
    ]);
  }, []);

  const handleTabClick = (tab) => setActiveTab(tab);

  const handleCreateClick = () => setShowCreateForm(true);

  const handleCloseForm = () => {
    setShowCreateForm(false);
    setNewPost({ title: '', content: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString();
    if (activeTab === 'alumni') {
      setPosts(prev => [{
        id: prev.length + 1,
        author: 'Current User',
        timestamp,
        title: newPost.title,
        content: newPost.content,
        likes: 0,
        comments: 0
      }, ...prev]);
    } else {
      setQueries(prev => [{
        id: prev.length + 1,
        author: 'Current User',
        timestamp,
        title: newPost.title,
        content: newPost.content,
        status: 'Open'
      }, ...prev]);
    }
    handleCloseForm();
  };

  const AlumniPosts = () => (
    <div className="posts-list" style={styles.postsList}>
      {posts.map(post => (
        <div key={post.id} className="post-item" style={styles.postItem}>
          <div className="post-header" style={styles.postHeader}>
            <strong>{post.author}</strong>
            <span className="post-timestamp" style={styles.postTimestamp}>{post.timestamp}</span>
          </div>
          <h4 style={styles.postTitle}>{post.title}</h4>
          <p>{post.content}</p>
          <div className="post-details" style={styles.postDetails}>
            {post.likes} likes · {post.comments} comments
          </div>
        </div>
      ))}
    </div>
  );

  const StudentQueries = () => (
    <div className="posts-list" style={styles.postsList}>
      {queries.map(query => (
        <div key={query.id} className="post-item" style={styles.postItem}>
          <div className="post-header" style={styles.postHeader}>
            <strong>{query.author}</strong>
            <span className="post-timestamp" style={styles.postTimestamp}>{query.timestamp}</span>
          </div>
          <h4 style={styles.postTitle}>{query.title}</h4>
          <p>{query.content}</p>
          <div className="post-details" style={styles.postDetails}>
            Status: {query.status}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="posts-container" style={styles.postsContainer}>
      <div className="posts-header" style={styles.postsHeader}>
        <div
          className={`tab ${activeTab === "alumni" ? "active" : ""}`}
          style={{
            ...styles.tab,
            ...(activeTab === "alumni" ? styles.activeTab : {})
          }}
          onClick={() => handleTabClick("alumni")}
        >
          Alumni Posts
        </div>
        <div
          className={`tab ${activeTab === "student" ? "active" : ""}`}
          style={{
            ...styles.tab,
            ...(activeTab === "student" ? styles.activeTab : {})
          }}
          onClick={() => handleTabClick("student")}
        >
          Student Queries
        </div>
      </div>
      <div className="posts-content" style={styles.postsContent}>
        {activeTab === "alumni" ? <AlumniPosts /> : <StudentQueries />}
      </div>
      <button
        className="create-button"
        style={styles.createButton}
        onClick={handleCreateClick}
      >
        {activeTab === "alumni" ? (
          <>
            <FaPen style={styles.buttonIcon} />
            Create your post
          </>
        ) : (
          <>
            <FaQuestionCircle style={styles.buttonIcon} />
            Create your query
          </>
        )}
      </button>
      {showCreateForm && (
        <div className="create-form-overlay" style={styles.createFormOverlay}>
          <div className="create-form" style={styles.createForm}>
            <h2>{activeTab === "alumni" ? "Create a New Post" : "Ask a New Query"}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPost.title}
                onChange={handleInputChange}
                style={styles.formInput}
                required
              />
              <textarea
                name="content"
                placeholder="Content"
                value={newPost.content}
                onChange={handleInputChange}
                style={styles.formTextarea}
                required
              />
              <div style={styles.formButtons}>
                <button type="submit" style={styles.submitButton}>
                  {activeTab === "alumni" ? "Post" : "Submit Query"}
                </button>
                <button type="button" onClick={handleCloseForm} style={styles.cancelButton}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  postsContainer: {
    margin: '20px',
    borderRadius: '15px',
    backgroundColor: '#f7f9fc',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    position: 'relative',
    minHeight: '80vh',
  },
  postsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '10px',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    padding: '15px',
    cursor: 'pointer',
    fontWeight: 500,
    color: '#444',
    transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
    borderRadius: '8px',
    backgroundColor: '#EEEEEE',
  },
  activeTab: {
    backgroundColor: '#4a90e2',
    color: 'white',
    border: '1px solid lightsteelblue',
    transform: 'scale(1.05)',
  },
  postsContent: {
    padding: '20px',
  },
  postsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  postItem: {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
  },
  postHeader: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  postTimestamp: {
    marginLeft: '5px',
    color: '#9ca3af',
  },
  postTitle: {
    color: '#1f2937',
    margin: '10px 0',
  },
  postDetails: {
    fontSize: '0.8rem',
    color: '#9ca3af',
    marginTop: '10px',
    borderLeft: '4px solid #4a90e2',
    paddingLeft: '10px',
  },
  createButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '15px 25px',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  buttonIcon: {
    marginRight: '10px',
  },
  createFormOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  createForm: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '15px',
    width: '80%',
    maxWidth: '600px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  formInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  formTextarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '150px',
    resize: 'vertical',
  },
  formButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  submitButton: {
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
};

export default EnhancedPosts;
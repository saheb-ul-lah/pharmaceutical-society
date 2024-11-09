import React from "react";

const alumniPostsData = [
  {
    id: 1,
    name: "John Doe",
    title: "New Internship Opportunity",
    content: "Exciting internship opportunity at XYZ Pharma. Apply before the end of the month!",
    timestamp: "2 hours ago",
    details: "Looking for recent graduates in Pharmacy with a keen interest in R&D.",
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Full-time Job Opening",
    content: "We're hiring for a full-time role at ABC Pharmaceuticals. Great opportunity to join our team!",
    timestamp: "1 day ago",
    details: "Seeking experienced candidates with a background in clinical trials.",
  },
  {
    id: 3,
    name: "Emily White",
    title: "Achievement",
    content: "Honored to receive the Research Excellence Award for our recent project on new drug formulations!",
    timestamp: "3 days ago",
    details: "Recognition for our contribution to pharmaceutical research and development.",
  },
];

function AlumniPosts() {
  return (
    <div className="posts-list">
      {alumniPostsData.map((post) => (
        <div key={post.id} className="post-item">
          <div className="post-header">
            <strong>{post.name}</strong> • <span className="post-timestamp">{post.timestamp}</span>
          </div>
          <h4>{post.title}</h4>
          <p>{post.content}</p>
          <p className="post-details">{post.details}</p>
        </div>
      ))}
    </div>
  );
}

export default AlumniPosts;

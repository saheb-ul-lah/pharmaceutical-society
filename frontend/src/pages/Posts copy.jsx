import React, { useState } from "react";
import AlumniPosts from "../components/AlumniPosts.jsx";
import StudentQueries from "../components/StudentQueries.jsx";
import "../css/posts.css";

function Posts() {
  const [activeTab, setActiveTab] = useState("alumni");

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div className="posts-container">
      <div className="posts-header">
        <div
          className={`tab ${activeTab === "alumni" ? "active" : ""}`}
          onClick={() => handleTabClick("alumni")}
        >
          Alumni Posts
        </div>
        <div
          className={`tab ${activeTab === "student" ? "active" : ""}`}
          onClick={() => handleTabClick("student")}
        >
          Student Queries
        </div>
      </div>
      <div className="posts-content">
        {activeTab === "alumni" ? <AlumniPosts /> : <StudentQueries />}
      </div>
    </div>
  );
}

export default Posts;

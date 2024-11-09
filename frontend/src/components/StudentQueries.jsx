import React from "react";

const studentQueriesData = [
  {
    id: 1,
    name: "Adam Brown",
    title: "Guidance on Project Topic",
    content: "Could anyone suggest a good project topic for my final year in Pharmacology?",
    timestamp: "5 hours ago",
    details: "Looking for ideas on drug synthesis or patient data analytics.",
  },
  {
    id: 2,
    name: "Sarah Lee",
    title: "Internship Advice",
    content: "Any tips on applying for pharmaceutical internships for the summer?",
    timestamp: "1 day ago",
    details: "Focus: Laboratory or clinical research internships.",
  },
  {
    id: 3,
    name: "Daniel Green",
    title: "Equipment Details",
    content: "Does anyone have information on suppliers for lab equipment?",
    timestamp: "2 days ago",
    details: "Looking for reliable vendors for affordable lab setups.",
  },
];

function StudentQueries() {
  return (
    <div className="posts-list">
      {studentQueriesData.map((query) => (
        <div key={query.id} className="post-item">
          <div className="post-header">
            <strong>{query.name}</strong> • <span className="post-timestamp">{query.timestamp}</span>
          </div>
          <h4>{query.title}</h4>
          <p>{query.content}</p>
          <p className="post-details">{query.details}</p>
        </div>
      ))}
    </div>
  );
}

export default StudentQueries;

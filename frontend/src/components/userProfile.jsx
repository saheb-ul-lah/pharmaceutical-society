import React from 'react';

const socialLinks = [
  { icon: "fas fa-globe fa-lg text-warning", label: "https://mdbootstrap.com" },
  { icon: "fab fa-github fa-lg", label: "mdbootstrap", color: "#333333" },
  { icon: "fab fa-twitter fa-lg", label: "@mdbootstrap", color: "#55acee" },
  { icon: "fab fa-instagram fa-lg", label: "mdbootstrap", color: "#ac2bac" },
  { icon: "fab fa-facebook-f fa-lg", label: "mdbootstrap", color: "#3b5998" },
];

const projectStatus = [
  { title: "Web Design", progress: 80 },
  { title: "Website Markup", progress: 72 },
  { title: "One Page", progress: 89 },
  { title: "Mobile Template", progress: 55 },
  { title: "Backend API", progress: 66 },
];

const ProfileItem = ({ label, value }) => (
  <div className="row">
    <div className="col-sm-3">
      <p className="mb-0">{label}</p>
    </div>
    <div className="col-sm-9">
      <p className="text-muted mb-0">{value}</p>
    </div>
    <hr />
  </div>
);

const ProgressItem = ({ title, progress }) => (
  <>
    <p className="mb-1" style={{ fontSize: '.77rem' }}>{title}</p>
    <div className="progress rounded" style={{ height: '5px' }}>
      <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
    </div>
  </>
);

const UserProfile = () => (
  <section style={{ backgroundColor: '#eee' }}>
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="bg-body-tertiary rounded-3 p-3 mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item"><a href="#">Home</a></li>
          <li className="breadcrumb-item"><a href="#">User</a></li>
          <li className="breadcrumb-item active" aria-current="page">User Profile</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4 text-center">
            <div className="card-body">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="rounded-circle img-fluid"
                style={{ width: '150px' }}
              />
              <h5 className="my-3">John Smith</h5>
              <p className="text-muted mb-1">Full Stack Developer</p>
              <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
              <div className="d-flex justify-content-center mb-2">
                <button type="button" className="btn btn-primary">Follow</button>
                <button type="button" className="btn btn-outline-primary ms-1">Message</button>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body p-0">
              <ul className="list-group list-group-flush rounded-3">
                {socialLinks.map((link, index) => (
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3" key={index}>
                    <i className={link.icon} style={{ color: link.color || '' }}></i>
                    <p className="mb-0">{link.label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <ProfileItem label="Full Name" value="Johnatan Smith" />
              <ProfileItem label="Email" value="example@example.com" />
              <ProfileItem label="Phone" value="(097) 234-5678" />
              <ProfileItem label="Mobile" value="(098) 765-4321" />
              <ProfileItem label="Address" value="Bay Area, San Francisco, CA" />
            </div>
          </div>

          <div className="row">
            {[0, 1].map(i => (
              <div className="col-md-6" key={i}>
                <div className="card mb-4">
                  <div className="card-body">
                    <p className="mb-4">
                      <span className="text-primary font-italic me-1">assignment</span> Project Status
                    </p>
                    {projectStatus.map((item, index) => (
                      <ProgressItem key={index} title={item.title} progress={item.progress} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default UserProfile;

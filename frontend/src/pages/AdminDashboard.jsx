import React, { useState, useEffect } from 'react';

// Icons (assuming you're using a library like react-icons)
import { FaBell, FaSearch, FaChevronDown, FaHome, FaUsers, FaFileAlt, FaSignOutAlt, FaTrash, FaEye, FaEdit, FaPlus, FaBars } from 'react-icons/fa';

const navItems = [
  { icon: FaHome, label: 'Dashboard' },
  { icon: FaUsers, label: 'Alumni' },
  { icon: FaUsers, label: 'Students' },
  { icon: FaFileAlt, label: 'Posts' },
  { icon: FaFileAlt, label: 'Queries' },
];

const quickStats = [
  { label: 'Active Users', value: 1234, change: 5.6 },
  { label: 'New Registrations', value: 567, change: -2.3 },
  { label: 'Upcoming Events', value: 12, change: 10.5 },
  { label: 'Open Tickets', value: 89, change: -7.8 },
];

const alumni = [
  { id: 1, name: 'John Doe', email: 'john@example.com', passingYear: 2021, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', passingYear: 2022, status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', passingYear: 2016, status: 'Inactive' },
];

const students = [
  { id: 1, name: 'Alice Brown', email: 'alice@example.com', graduationYear: 2024, status: 'Active' },
  { id: 2, name: 'Charlie Davis', email: 'charlie@example.com', graduationYear: 2025, status: 'Active' },
  { id: 3, name: 'Eva Green', email: 'eva@example.com', graduationYear: 2023, status: 'Inactive' },
];

const posts = [
  { id: 1, title: 'First Blog Post', author: 'John Doe', dateCreated: '2023-05-01', status: 'Published' },
  { id: 2, title: 'Upcoming Events', author: 'Jane Smith', dateCreated: '2023-05-05', status: 'Draft' },
  { id: 3, title: 'New Product Announcement', author: 'Bob Johnson', dateCreated: '2023-05-10', status: 'Published' },
];

const queries = [
  { id: 1, title: 'Admission Query', author: 'Prospective Student', dateCreated: '2023-05-15', status: 'Open' },
  { id: 2, title: 'Course Information', author: 'Current Student', dateCreated: '2023-05-18', status: 'Closed' },
  { id: 3, title: 'Alumni Event', author: 'Alumni Member', dateCreated: '2023-05-20', status: 'In Progress' },
];

const AdminDashboard = () => {
  const [activeNavItem, setActiveNavItem] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [filteredData, setFilteredData] = useState({
    alumni: alumni,
    students: students,
    posts: posts,
    queries: queries
  });
  const [isContentVisible, setIsContentVisible] = useState(true);

  useEffect(() => {
    const filterData = () => {
      setFilteredData({
        alumni: alumni.filter(item => 
          Object.values(item).some(val => 
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        ),
        students: students.filter(item => 
          Object.values(item).some(val => 
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        ),
        posts: posts.filter(item => 
          Object.values(item).some(val => 
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        ),
        queries: queries.filter(item => 
          Object.values(item).some(val => 
            val.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      });
    };

    filterData();
  }, [searchTerm]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const changeContent = (newActiveNavItem) => {
    setIsContentVisible(false);
    setTimeout(() => {
      setActiveNavItem(newActiveNavItem);
      setIsContentVisible(true);
    }, 300);
  };

  const renderDashboard = () => (
    <div style={styles.dashboardContainer}>
      <h1 style={styles.heading}>Dashboard</h1>
      <div style={styles.statsGrid}>
        {quickStats.map((stat) => (
          <div key={stat.label} style={styles.statCard}>
            <h3 style={styles.statLabel}>{stat.label}</h3>
            <p style={styles.statValue}>{stat.value.toLocaleString()}</p>
            <p style={{...styles.statChange, color: stat.change >= 0 ? 'green' : 'red'}}>
              {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTable = (data, columns) => (
    <table style={styles.table}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} style={styles.tableHeader}>{column.label}</th>
          ))}
          <th style={styles.tableHeader}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={column.key} style={styles.tableCell}>
                {column.key === 'status' ? (
                  <span style={{...styles.badge, backgroundColor: item[column.key] === 'Active' || item[column.key] === 'Published' || item[column.key] === 'Open' ? '#4CAF50' : '#9E9E9E'}}>
                    {item[column.key]}
                  </span>
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
            <td style={styles.tableCell}>
              <div style={styles.actionButtons}>
                <button style={styles.actionButton}><FaEye /></button>
                <button style={styles.actionButton}><FaEdit /></button>
                <button style={styles.actionButton}><FaTrash /></button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderContent = () => {
    switch (activeNavItem) {
      case 'Dashboard':
        return renderDashboard();
      case 'Alumni':
        return (
          <div style={styles.contentContainer}>
            <h1 style={styles.heading}>Alumni Management</h1>
            {renderTable(filteredData.alumni, [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'passingYear', label: 'Passing Year' },
              { key: 'status', label: 'Status' },
            ])}
          </div>
        );
      case 'Students':
        return (
          <div style={styles.contentContainer}>
            <h1 style={styles.heading}>Student Management</h1>
            {renderTable(filteredData.students, [
              { key: 'name', label: 'Name' },
              { key: 'email', label: 'Email' },
              { key: 'graduationYear', label: 'Graduation Year' },
              { key: 'status', label: 'Status' },
            ])}
          </div>
        );
      case 'Posts':
        return (
          <div style={styles.contentContainer}>
            <h1 style={styles.heading}>Posts Management</h1>
            {renderTable(filteredData.posts, [
              { key: 'title', label: 'Title' },
              { key: 'author', label: 'Author' },
              { key: 'dateCreated', label: 'Date Created' },
              { key: 'status', label: 'Status' },
            ])}
          </div>
        );
      case 'Queries':
        return (
          <div style={styles.contentContainer}>
            <h1 style={styles.heading}>Queries Management</h1>
            {renderTable(filteredData.queries, [
              { key: 'title', label: 'Title' },
              { key: 'author', label: 'Author' },
              { key: 'dateCreated', label: 'Date Created' },
              { key: 'status', label: 'Status' },
            ])}
          </div>
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <aside style={{...styles.sidebar, width: isSidebarVisible ? '250px' : '0'}}>
        <div style={styles.sidebarContent}>
          <h2 style={styles.sidebarTitle}>Pharma Society</h2>
          <nav style={styles.nav}>
            {navItems.map((item) => (
              <button
                key={item.label}
                style={{
                  ...styles.navButton,
                  backgroundColor: activeNavItem === item.label ? '#f0f0f0' : 'transparent',
                }}
                onClick={() => changeContent(item.label)}
              >
                <item.icon style={styles.navIcon} />
                {item.label}
              </button>
            ))}
          </nav>
          <button style={styles.logoutButton}>
            <FaSignOutAlt style={styles.navIcon} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <button style={styles.sidebarToggle} onClick={toggleSidebar}>
              <FaBars />
            </button>
            <input
              type="search"
              placeholder="Search..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div style={styles.headerRight}>
            <button style={styles.iconButton}><FaBell /></button>
            <div style={styles.userMenu}>
              <img src="/placeholder.svg" alt="User" style={styles.avatar} />
              <span style={styles.userName}>John Doe</span>
              <FaChevronDown style={styles.chevronIcon} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{...styles.pageContent, ...(isContentVisible ? styles.contentVisible : styles.contentHidden)}}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  sidebar: {
    backgroundColor: '#DDDDDD',
    borderRight: '1px solid #e0e0e0',
    transition: 'width 0.3s ease',
    overflow: 'hidden',
  },
  sidebarContent: {
    width: '250px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  sidebarTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'left',
    color:'#333'
  },
  navIcon: {
    marginRight: '10px',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    color: '#f44336',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    borderBottom: '1px solid #e0e0e0',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  sidebarToggle: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '15px',
  },
  searchInput: {
    padding: '8px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    fontSize: '14px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    marginRight: '15px',
  },
  userMenu: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  userName: {
    fontSize: '14px',
    marginRight: '5px',
  },
  chevronIcon: {
    fontSize: '12px',
  },
  pageContent: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
  contentVisible: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  contentHidden: {
    opacity: 0,
    transform: 'translateY(20px)',
  },
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  statLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  statChange: {
    fontSize: '12px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  tableHeader: {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #e0e0e0',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
  },
  badge: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#ffffff',
  },
  actionButtons: {
    display: 'flex',
    gap: '5px',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default AdminDashboard;
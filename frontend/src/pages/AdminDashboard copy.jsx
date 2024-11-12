import React, { useState } from 'react'
import { Bell, ChevronDown, Search, Home, Users, FileText, ClipboardList, BarChart2, Settings, LogOut, Edit, Eye, Trash } from 'lucide-react'
import { Container, Navbar, Nav, Card, Button, InputGroup, FormControl, OverlayTrigger, Tooltip, Table, Badge, Row, Col, Form } from 'react-bootstrap'
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts'

const areaChartData = [
  { name: 'Jan', uv: 4000 },
  { name: 'Feb', uv: 3000 },
  { name: 'Mar', uv: 2000 },
  { name: 'Apr', uv: 2780 },
  { name: 'May', uv: 1890 },
  { name: 'Jun', uv: 2390 },
]

const barChartData = [
  { name: 'Event A', participants: 400 },
  { name: 'Event B', participants: 300 },
  { name: 'Event C', participants: 200 },
  { name: 'Event D', participants: 278 },
  { name: 'Event E', participants: 189 },
]

const userTypeData = [
  { name: 'New Users', value: 400 },
  { name: 'Returning Users', value: 300 },
  { name: 'Inactive Users', value: 200 },
]

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com',passing_year: 2021, role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com',passing_year: 2022, role: 'Editor', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com',passing_year: 2016, role: 'Viewer', status: 'Inactive' },
]
const alumni = [
  { id: 1, name: 'John Doe', email: 'john@example.com',passing_year: 2021, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com',passing_year: 2022, status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com',passing_year: 2016, status: 'Inactive' },
]
const students = [
  { id: 1, name: 'John Doe', email: 'john@example.com',passing_year: 2021, status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com',passing_year: 2022, status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com',passing_year: 2016, status: 'Inactive' },
]

const posts = [
  { id: 1, title: 'First Blog Post', author: 'John Doe', dateCreated: '2023-05-01', status: 'Published' },
  { id: 2, title: 'Upcoming Events', author: 'Jane Smith', dateCreated: '2023-05-05', status: 'Draft' },
  { id: 3, title: 'New Product Announcement', author: 'Bob Johnson', dateCreated: '2023-05-10', status: 'Published' },
]

const forms = [
  { id: 1, title: 'Contact Form', submissions: 150, dateCreated: '2023-04-15' },
  { id: 2, title: 'Event Registration', submissions: 75, dateCreated: '2023-04-20' },
  { id: 3, title: 'Feedback Survey', submissions: 200, dateCreated: '2023-04-25' },
]

export default function AdminDashboard() {
  const [activeNavItem, setActiveNavItem] = useState('Dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState('name')
  const [sortDirection, setSortDirection] = useState('asc')
  const [timeRange, setTimeRange] = useState('monthly')

  // yahi se uncomment karke dikh jayega
  const navItems = [
    { icon: <Home />, label: 'Dashboard' },
    // { icon: <Users />, label: 'Users' },
    { icon: <Users />, label: 'Alumni' },
    { icon: <Users />, label: 'Students' },
    { icon: <FileText />, label: 'Posts' },
    { icon: <FileText />, label: 'Queries' },
    // { icon: <ClipboardList />, label: 'Forms' },
    // { icon: <BarChart2 />, label: 'Analytics' },
    // { icon: <Settings />, label: 'Settings' },
  ]

  const quickStats = [
    { label: 'Active Users', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) - 50 },
    { label: 'New Registrations', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) - 50 },
    { label: 'Upcoming Events', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) - 50 },
    { label: 'Open Tickets', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) - 50 },
  ]

  const quickActions = ['Add User', 'Create Post', 'Review Form', 'Generate Report']

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedItems = (items) => {
    return [...items].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  const filteredItems = (items) => {
    return sortedItems(items).filter(item =>
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }

  const renderDashboard = () => (
    <>
      <h1 className="text-primary mb-4">Dashboard</h1>
      <Row className="g-4 mb-4">
        {quickStats.map((stat) => (
          <Col key={stat.label} xs={12} md={6} lg={3}>
            <Card className="h-100 border-primary">
              <Card.Body>
                <Card.Title className="text-muted">{stat.label}</Card.Title>
                <Card.Text className="h4 text-primary">{stat.value}</Card.Text>
                <Card.Text className={`small ${stat.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {stat.change >= 0 ? '+' : ''}{stat.change}% from last month
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row className="g-4 mb-4">
        <Col xs={12} lg={6}>
          {/* <Card className="h-100 border-primary">
            <Card.Header className="text-primary">User Engagement</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={areaChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Area type="monotone" dataKey="uv" stroke="#007bff" fill="#007bff" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card> */}
        </Col>
        <Col xs={12} lg={6}>
          {/* <Card className="h-100 border-primary">
            <Card.Header className="text-primary">Event Participation</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Bar dataKey="participants" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
      {/* <Card className="border-primary">
        <Card.Header className="text-primary">Quick Actions</Card.Header>
        <Card.Body>
          <Row className="g-2">
            {quickActions.map((action) => (
              <Col key={action} xs={12} sm={6} md={3}>
                <Button variant="primary" className="w-100">{action}</Button>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card> */}
    </>
  )

  const renderUsers = () => (
    <>
      <h1 className="text-primary mb-4">User Management</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <InputGroup className="w-auto">
          <InputGroup.Text><Search /></InputGroup.Text>
          <FormControl
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {/* <Button variant="primary">Add User</Button> */}
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>User Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('passing year')}>Passing year {sortColumn === 'passing year' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            {/* <th onClick={() => handleSort('role')}>Role {sortColumn === 'role' && (sortDirection === 'asc' ? '▲' : '▼')}</th> */}
            {/* <th onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems(users).map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.passing_year}</td>
              {/* <td>{user.role}</td> */}
              {/* <td>
                <Badge bg={user.status === 'Active' ? 'success' : 'danger'}>
                  {user.status}
                </Badge>
              </td> */}
              <td>
                {/* <Button variant="outline-primary" size="sm" className="me-2">
                  <Edit size={16} />
                </Button> */}
                <Button variant="outline-danger" size="sm">
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
  const renderAlumni = () => (
    <>
      <h1 className="text-primary mb-4">Alumni Management</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <InputGroup className="w-auto">
          <InputGroup.Text><Search /></InputGroup.Text>
          <FormControl
            placeholder="Search alumni..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {/* <Button variant="primary">Add User</Button> */}
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Alumni Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('passing year')}>Passing year {sortColumn === 'passing year' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            {/* <th onClick={() => handleSort('role')}>Role {sortColumn === 'role' && (sortDirection === 'asc' ? '▲' : '▼')}</th> */}
            {/* <th onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems(alumni).map((alumni) => (
            <tr key={alumni.id}>
              <td>{alumni.name}</td>
              <td>{alumni.email}</td>
              <td>{alumni.passing_year}</td>
              {/* <td>{alumni.role}</td> */}
              {/* <td>
                <Badge bg={alumni.status === 'Active' ? 'success' : 'danger'}>
                  {alumni.status}
                </Badge>
              </td> */}
              <td>
                {/* <Button variant="outline-primary" size="sm" className="me-2">
                  <Edit size={16} />
                </Button> */}
                <Button variant="outline-danger" size="sm">
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
  const renderStudents = () => (
    <>
      <h1 className="text-primary mb-4">Students Management</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <InputGroup className="w-auto">
          <InputGroup.Text><Search /></InputGroup.Text>
          <FormControl
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        {/* <Button variant="primary">Add Students</Button> */}
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Students Name {sortColumn === 'name' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('email')}>Email {sortColumn === 'email' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('passing year')}>Passing year {sortColumn === 'passing year' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            {/* <th onClick={() => handleSort('role')}>Role {sortColumn === 'role' && (sortDirection === 'asc' ? '▲' : '▼')}</th> */}
            {/* <th onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems(students).map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.passing_year}</td>
              {/* <td>{student.role}</td> */}
              {/* <td>
                <Badge bg={student.status === 'Active' ? 'success' : 'danger'}>
                  {student.status}
                </Badge>
              </td> */}
              <td>
                {/* <Button variant="outline-primary" size="sm" className="me-2">
                  <Edit size={16} />
                </Button> */}
                <Button variant="outline-danger" size="sm">
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )

  const renderPosts = () => (
    <>
      <h1 className="text-primary mb-4">Posts Management</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <InputGroup className="w-auto">
          <InputGroup.Text><Search /></InputGroup.Text>
          <FormControl
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary">Create New Post</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Post Title {sortColumn === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('author')}>Author {sortColumn === 'author' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('dateCreated')}>Date Created {sortColumn === 'dateCreated' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('status')}>Status {sortColumn === 'status' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems(posts).map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.dateCreated}</td>
              <td>
                <Badge bg={post.status === 'Published' ? 'success' : 'warning'}>
                  {post.status}
                </Badge>
              </td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">
                  <Eye size={16} />
                </Button>
                <Button variant="outline-secondary" size="sm" className="me-2">
                  <Edit size={16} />
                </Button>
                <Button variant="outline-danger" size="sm">
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )

  const renderForms = () => (
    <>
      <h1 className="text-primary mb-4">Forms Management</h1>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <InputGroup className="w-auto">
          <InputGroup.Text><Search /></InputGroup.Text>
          <FormControl
            placeholder="Search forms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary">Create New Form</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Form Title {sortColumn === 'title' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('submissions')}>Submissions {sortColumn === 'submissions' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th onClick={() => handleSort('dateCreated')}>Date Created {sortColumn === 'dateCreated' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems(forms).map((form) => (
            <tr key={form.id}>
              <td>{form.title}</td>
              <td>{form.submissions}</td>
              <td>{form.dateCreated}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2">
                  <Eye size={16} />
                </Button>
                <Button variant="outline-secondary" size="sm" className="me-2">
                  <Edit size={16} />
                </Button>
                <Button variant="outline-danger" size="sm">
                  <Trash size={16} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )

  const renderAnalytics = () => (
    <>
      <h1 className="text-primary mb-4">Analytics</h1>
      <Form.Group className="mb-4">
        <Form.Label>Time Range:</Form.Label>
        <Form.Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Form.Select>
      </Form.Group>
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="h-100 border-primary">
            <Card.Header className="text-primary">User Engagement</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={areaChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Area type="monotone" dataKey="uv" name="Users" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="h-100 border-primary">
            <Card.Header className="text-primary">Event Participation</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="participants" name="Participants" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="border-primary">
            <Card.Header className="text-primary">User Types</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie dataKey="value" data={userTypeData} fill="#8884d8" label />
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )

  const renderSettings = () => (
    <>
      <h1 className="text-primary mb-4">Settings</h1>
      <Row className="g-4">
        <Col xs={12} lg={6}>
          <Card className="border-primary">
            <Card.Header className="text-primary">General Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Site Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter site name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Site Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Enter site description" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} lg={6}>
          <Card className="border-primary">
            <Card.Header className="text-primary">User Permissions</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="allow-user-registration"
                    label="Allow User Registration"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check 
                    type="switch"
                    id="require-email-verification"
                    label="Require Email Verification"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Default User Role</Form.Label>
                  <Form.Select>
                    <option>Subscriber</option>
                    <option>Contributor</option>
                    <option>Author</option>
                    <option>Editor</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12}>
          <Card className="border-primary">
            <Card.Header className="text-primary">Email Settings</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>SMTP Host</Form.Label>
                  <Form.Control type="text" placeholder="Enter SMTP host" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SMTP Port</Form.Label>
                  <Form.Control type="number" placeholder="Enter SMTP port" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SMTP Username</Form.Label>
                  <Form.Control type="text" placeholder="Enter SMTP username" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>SMTP Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter SMTP password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )

  const renderContent = () => {
    switch (activeNavItem) {
      case 'Dashboard':
        return renderDashboard()
      case 'Users':
        return renderUsers()
      case 'Alumni':
        return renderAlumni()
      case 'Students':
        return renderStudents()
      case 'Posts':
        return renderPosts()
      case 'Forms':
        return renderForms()
      case 'Analytics':
        return renderAnalytics()
      case 'Settings':
        return renderSettings()
      default:
        return renderDashboard()
    }
  }

  return (
    <Container fluid className="d-flex h-100 bg-light p-0">
      <Navbar bg="primary" variant="dark" className="flex-column p-3 text-white" style={{ minWidth: '250px' }}>
        <Navbar.Brand className="text-white fs-4 mb-4">Pharma Society</Navbar.Brand>
        <Nav className="flex-column mt-4">
          {navItems.map(({ icon, label }) => (
            <Nav.Link
              key={label}
              className={`d-flex align-items-center text-white py-2 ${activeNavItem === label ? 'bg-warning rounded' : ''}`}
              onClick={() => setActiveNavItem(label)}
            >
              {icon}
              <span className="ms-2">{label}</span>
            </Nav.Link>
          ))}
        </Nav>
        <Nav className="mt-auto">
          <Button variant="outline-light" className="w-100 d-flex align-items-center text-white">
            <LogOut className="me-2" /> Logout
          </Button>
        </Nav>
      </Navbar>

      <Container className="flex-grow-1 p-0">
        <Navbar bg="light" variant="light" className="d-flex justify-content-between p-3 border-bottom">
          <div className="d-flex">
            <InputGroup className="me-3">
              <InputGroup.Text><Search className="text-muted" /></InputGroup.Text>
              <FormControl placeholder="Search..." className="border-secondary" />
            </InputGroup>
            <OverlayTrigger
              placement="bottom"
              overlay={<Tooltip id="notification-tooltip">You have 3 new notifications</Tooltip>}
            >
              <Button variant="outline-primary" className="position-relative me-3">
                <Bell className="text-primary" />
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">3</span>
              </Button>
            </OverlayTrigger>
            <Button variant="outline-primary" className="d-flex align-items-center">
              <img src="/placeholder.svg" alt="Profile" className="rounded-circle me-2" style={{ width: '32px', height: '32px' }} />
              <span>John Doe</span>
              <ChevronDown className="ms-2" />
            </Button>
          </div>
        </Navbar>

        <Container fluid className="p-4 bg-white">
          {renderContent()}
        </Container>
      </Container>
    </Container>
  )
}

import React, { useState } from 'react'
import { Bell, ChevronDown, Search, Home, Users, FileText, ClipboardList, BarChart2, Settings, LogOut } from 'lucide-react'
import { Container, Navbar, Nav, Card, Button, InputGroup, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts'

const areaChartData = [
<<<<<<< HEAD
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

export default function AdminDashboard() {
    const [activeNavItem, setActiveNavItem] = useState('Dashboard')

    const navItems = [
        { icon: <Home />, label: 'Dashboard' },
        { icon: <Users />, label: 'Users' },
        { icon: <FileText />, label: 'Posts' },
        { icon: <ClipboardList />, label: 'Forms' },
        { icon: <BarChart2 />, label: 'Analytics' },
        { icon: <Settings />, label: 'Settings' },
    ]

    const quickStats = [
        { label: 'Active Users', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
        { label: 'New Registrations', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
        { label: 'Upcoming Events', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
        { label: 'Open Tickets', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
    ]

    const quickActions = ['Add User', 'Create Post', 'Review Form', 'Generate Report']

    return (
        <Container fluid className="d-flex h-100 bg-light p-0">
            <Navbar bg="primary" variant="light" className="flex-column p-3 text-white" style={{ minWidth: '250px' }}>
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
                    <h1 className="text-primary mb-4">Dashboard</h1>

                    <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
                        {quickStats.map((stat) => (
                            <Card bg="light" text="dark" className="p-3 h-100 border-primary" key={stat.label}>
                                <Card.Body>
                                    <Card.Title className="text-muted">{stat.label}</Card.Title>
                                    <Card.Text className="h4 text-primary">{stat.value}</Card.Text>
                                    <Card.Subtitle className="text-muted small">
                                        +{stat.change}% from last month
                                    </Card.Subtitle>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>

                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <Card bg="light" text="dark" className="p-3 h-100 border-primary">
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
                        </Card>
                        <Card bg="light" text="dark" className="p-3 h-100 border-primary">
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
                        </Card>
                    </div>

                    <Card bg="light" text="dark" className="mt-4 p-3 border-primary">
                        <Card.Header className="text-primary">Quick Actions</Card.Header>
                        <Card.Body>
                            <div className="d-grid gap-3">
                                {quickActions.map((action) => (
                                    <Button variant="primary" key={action} className="w-100">
                                        {action}
                                    </Button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Container>
            </Container>
        </Container>
    )
}
=======
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

export default function AdminDashboard() {
  const [activeNavItem, setActiveNavItem] = useState('Dashboard')

  const navItems = [
    { icon: <Home />, label: 'Dashboard' },
    { icon: <Users />, label: 'Users' },
    { icon: <FileText />, label: 'Posts' },
    { icon: <ClipboardList />, label: 'Forms' },
    { icon: <BarChart2 />, label: 'Analytics' },
    { icon: <Settings />, label: 'Settings' },
  ]

  const quickStats = [
    { label: 'Active Users', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
    { label: 'New Registrations', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
    { label: 'Upcoming Events', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
    { label: 'Open Tickets', value: Math.floor(Math.random() * 1000), change: Math.floor(Math.random() * 100) },
  ]

  const quickActions = ['Add User', 'Create Post', 'Review Form', 'Generate Report']

  return (
    <Container fluid className="d-flex h-100 bg-light p-0">
      <Navbar bg="primary" variant="light" className="flex-column p-3 text-white" style={{ minWidth: '250px' }}>
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
          <h1 className="text-primary mb-4">Dashboard</h1>

          <div className="row row-cols-1 row-cols-md-4 g-4 mb-4">
            {quickStats.map((stat) => (
              <Card bg="light" text="dark" className="p-3 h-100 border-primary" key={stat.label}>
                <Card.Body>
                  <Card.Title className="text-muted">{stat.label}</Card.Title>
                  <Card.Text className="h4 text-primary">{stat.value}</Card.Text>
                  <Card.Subtitle className="text-muted small">
                    +{stat.change}% from last month
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
          </div>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            <Card bg="light" text="dark" className="p-3 h-100 border-primary">
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
            </Card>
            <Card bg="light" text="dark" className="p-3 h-100 border-primary">
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
            </Card>
          </div>

          <Card bg="light" text="dark" className="mt-4 p-3 border-primary">
            <Card.Header className="text-primary">Quick Actions</Card.Header>
            <Card.Body>
              <div className="d-grid gap-3">
                {quickActions.map((action) => (
                  <Button variant="primary" key={action} className="w-100">
                    {action}
                  </Button>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Container>
    </Container>
  )
}
>>>>>>> origin/main

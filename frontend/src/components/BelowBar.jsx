import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import '../css/belowbar.css';

export default function BelowBar() {
    const socialLinks = [
        { href: 'https://www.facebook.com/ducsjmc/', icon: 'facebook' },
        { href: 'https://twitter.com/DUCSJMC', icon: 'twitter' },
        { href: 'https://maps.app.goo.gl/hVm5jknh8hpqxqP88', icon: 'google' },
        { href: 'https://www.instagram.com/dumasscomm/', icon: 'instagram' },
        { href: 'https://www.linkedin.com/school/dibrugarh-university-dibrugarh/?originalSubdomain=in', icon: 'linkedin' },
    ];

    const importantLinks = [
        { href: 'https://dibru.ac.in/', text: 'Dibrugarh University' },
        { href: 'https://erp.dibru.work/dibru/student/login', text: 'ERP Portal' },
        { href: 'https://docs.google.com/forms/d/e/1FAIpQLSewaN2-wlaET3fROMTOUrpLsG37Vb5Z-ZY_gy1XPCG7ijENhQ/viewform', text: 'DUAA Portal' },
    ];

    const quickLinks = [
        { href: '/', text: 'Home' },
        { href: 'https://scribehow.com/shared/Join_CSJMC_Alumni_Association_and_Update_Profile__iAp2_DMCRyGKgzFFMkeF_A', text: 'Website Instructions' },
        { href: '/alumniform', text: 'Alumni Registration' },
        { href: 'https://forms.gle/b6e8wfEJtxntS8uc8', text: 'Report an Error' },
    ];

    return (
        <MDBFooter bgColor='antiquewhite' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block' style={{ fontFamily: "Montserrat", fontWeight: "700", marginLeft: "110px" }}>
                    Get connected with us on social networks:
                </div>
                <div>
                    {socialLinks.map(({ href, icon }) => (
                        <a key={icon} href={href} target="_blank" rel="noopener noreferrer" className='me-4 text-reset' style={{ fontSize: "20px" }}>
                            <MDBIcon fab icon={icon} />
                        </a>
                    ))}
                </div>
            </section>

            <section>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ fontSize: "18px", color: "#0c133b" }}>
                                <MDBIcon fas icon="university" /> &nbsp;Pharmaceutical Society, Dibrugarh University
                            </h6>
                            <p style={{ fontSize: "16px", fontWeight: "500" }}>
                                &copy;&nbsp;Pharmaceutical Society
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ fontSize: "18px", color: "#0c133b" }}>Important Links</h6>
                            {importantLinks.map(({ href, text }) => (
                                <p key={text}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" className='text-reset' style={{ textDecoration: "none", fontWeight: "600" }}>
                                        <i className="fas fa-angle-right"></i>&nbsp;{text}
                                    </a>
                                </p>
                            ))}
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ fontSize: "18px", color: "#0c133b" }}>Quick Links</h6>
                            {quickLinks.map(({ href, text }) => (
                                <p key={text}>
                                    <a href={href} target="_blank" rel="noopener noreferrer" className='text-reset' style={{ textDecoration: "none", fontWeight: "600" }}>
                                        <i className="fas fa-angle-right"></i>&nbsp;{text}
                                    </a>
                                </p>
                            ))}
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4' style={{ fontSize: "18px", color: "#0c133b" }}>Contact</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                <a href="https://maps.app.goo.gl/wWHJG7H3w6JL9xUZ7" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontWeight: "600", color: "grey" }}>
                                    Pharmaceutical Society, Dibrugarh University, Dibrugarh, Assam 786004
                                </a>
                            </p>
                            <p>
                                <a href="mailto:pharmsociety@dibru.ac.in" style={{ textDecoration: "none", fontWeight: "600", color: "grey" }}>
                                    <MDBIcon icon="envelope" className="me-3" /> pharmsociety@dibru.ac.in
                                </a>
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-3' style={{ backgroundColor: '#0c133b' }} id="textbar">
                Developed By: &nbsp;
                <a target="_blank" rel="noopener noreferrer" className='text-reset fw-bold' id="nametag" href='https://www.devteamindia.in/'>
                    Dev Team India
                </a>

            </div>
        </MDBFooter>
    );
}

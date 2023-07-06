import React from 'react';
import { Row, Col } from 'react-bootstrap';
function Footer() {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year;
    };
    return (
        // <div id="main-footer" className="text-center p-2">
        // m-auto 왼쪽오른쪽 여백 알아서 맞춰라. m : margin
        <div id="main-footer">
            <Row>
                <Col>
                    <div className="footer">
                        Copyright &copy; <span>{thisYear()} - made by TypeQuest</span>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Footer;

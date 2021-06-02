import { FC } from "react";
import User from "./User.interface";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
const Contact: FC<User> = ({ id, first_name, last_name, email, avatar }) => {
    return (
        <ListGroup.Item className="bg-light">
            <Container>
                <Row>
                    <Col xs={1}>
                        <Image
                            src={avatar}
                            className="w-32 h-32"
                            roundedCircle
                        />
                    </Col>
                    <Col>
                        <Row>
                            {first_name} {last_name}
                        </Row>
                        <Row className="text-secondary">{email}</Row>
                    </Col>
                    <Col xs={1}>
                        <input type="checkbox" />
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    );
};
export default Contact;

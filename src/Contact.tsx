import { FC } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { useState } from "react";
interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    gender: string;
    search_field: string;
    addContact: (checkbox_selected: boolean, id: number) => void;
}
const Contact: FC<IUser> = (props) => {
    const [checked, setChecked] = useState(false);
    return (
        <ListGroup.Item
            style={
                props.first_name.includes(props.search_field) ||
                props.last_name.includes(props.search_field)
                    ? { display: "block" }
                    : { display: "none" }
            }
            className="bg-light"
            onClick={() => {
                props.addContact(checked, props.id);
                setChecked(!checked);
            }}
        >
            <Container>
                <Row>
                    <Col xs={1}>
                        <Image
                            src={props.avatar}
                            className="w-32 h-32"
                            roundedCircle
                        />
                    </Col>
                    <Col>
                        <Row>
                            {props.first_name} {props.last_name}{" "}
                        </Row>
                        <Row className="text-secondary">{props.email}</Row>
                    </Col>
                    <Col xs={1}>
                        <input
                            type="checkbox"
                            onChange={(event) =>
                                setChecked(event.target.checked)
                            }
                            checked={checked}
                        />
                    </Col>
                </Row>
            </Container>
        </ListGroup.Item>
    );
};
export default Contact;

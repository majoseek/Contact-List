import Contact from "./Contact";
import axios from "axios";
import { useEffect, useState } from "react";
import User from "./User.interface";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import FormControl from "react-bootstrap/FormControl";
function App() {
    const [users, setUsers] = useState([]);
    const [all_users, setAllUsers] = useState([]);
    useEffect(() => {
        axios
            .get(
                "https://teacode-recruitment-challenge.s3.eu-central-1.amazonaws.com/users.json"
            )
            .then((response) => {
                setUsers(
                    response.data.sort((elem1: User, elem2: User) => {
                        if (elem1.last_name < elem2.last_name) return -1;
                        else return 1;
                    })
                );
                setAllUsers(
                    response.data.sort((elem1: User, elem2: User) => {
                        if (elem1.last_name < elem2.last_name) return -1;
                        else return 1;
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Row className="bg-info text-center p-3 text-white fs-4 rounded">
                            <label style={{ fontWeight: "bold" }}>
                                Contacts
                            </label>
                        </Row>
                        <Row className="mt-3 mb-3">
                            <Col>
                                <Row>
                                    <FormControl
                                        placeholder="Enter contact name"
                                        aria-label="Enter contact name"
                                        aria-describedby="basic-addon1"
                                        onChange={(event) => {
                                            setUsers(
                                                all_users.filter(
                                                    (user: User) => {
                                                        return (
                                                            user.first_name.includes(
                                                                event.target
                                                                    .value
                                                            ) ||
                                                            user.last_name.includes(
                                                                event.target
                                                                    .value
                                                            )
                                                        );
                                                    }
                                                )
                                            );
                                        }}
                                    />
                                </Row>
                            </Col>
                            <Col xs={1}>
                                <FaSearch />
                            </Col>
                        </Row>
                        <ListGroup
                            style={{ overflowY: "scroll", maxHeight: "600px" }}
                        >
                            {users.map((user: User) => {
                                return (
                                    <Contact
                                        key={user.id}
                                        id={user.id}
                                        first_name={user.first_name}
                                        last_name={user.last_name}
                                        email={user.email}
                                        avatar={
                                            !user.avatar
                                                ? "./default_avatar.png"
                                                : user.avatar
                                        }
                                        gender={user.gender}
                                    />
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;

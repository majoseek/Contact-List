import Contact from "./components/Contact";
import axios from "axios";
import { useEffect, useState } from "react";
import User from "./interfaces/User.interface";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import FormControl from "react-bootstrap/FormControl";
function App() {
    const [users, setUsers] = useState([]); //array of users
    const [selected_contacts, setSelectedContacts] = useState<Array<number>>(
        []
    ); //selected contacts (checkbox on)
    const [search_val, setSearchVal] = useState(""); //search bar field value

    /**
     * Function addContact is used when user toggles checkbox
     *
     * @param checkbox_selected - boolean, which tells if user toggled the checkbox
     * @param id - number, which is user id
     * returns void;
     */
    const addContact = (checkbox_selected: boolean, id: number) => {
        if (!checkbox_selected) {
            const select_new_contact: Array<number> = [
                ...selected_contacts,
                id,
            ];
            setSelectedContacts(select_new_contact);
            console.log(select_new_contact);
        } else {
            const delete_contacts = [...selected_contacts];
            const delete_index = delete_contacts.indexOf(id);
            delete_contacts.splice(delete_index, 1);
            setSelectedContacts(delete_contacts);
            console.log(delete_contacts);
        }
    };
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
                                        onChange={(event) =>
                                            setSearchVal(event.target.value)
                                        }
                                        placeholder="Enter contact name"
                                        aria-label="Enter contact name"
                                        aria-describedby="basic-addon1"
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
                                        addContact={addContact}
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
                                        search_field={search_val}
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

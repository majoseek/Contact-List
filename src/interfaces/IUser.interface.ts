import User from "./User.interface";
export default interface IUser extends User {
    search_field: string;
    addContact: (checkbox_selected: boolean, id: number) => void;
}

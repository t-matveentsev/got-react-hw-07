import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";
import s from "./App.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/contactsOps";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return (
    <section className={s.wrapper}>
      <h1>Phone Book</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </section>
  );
}

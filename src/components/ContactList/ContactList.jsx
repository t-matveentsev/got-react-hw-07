import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import s from "./ContactList.module.css";
import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from "../../redux/contactSlice";
import { Triangle } from "react-loader-spinner";

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);
  const loader = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <div>
      {loader && (
        <div className={s.loader}>
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#e9caae"
            ariaLabel="triangle-loading"
          />
        </div>
      )}

      {!loader && contacts.length > 0 ? (
        <ul className={s.wrapper}>
          {contacts.map((item) => (
            <Contact key={item.id} {...item} />
          ))}
        </ul>
      ) : (
        !loader && (
          <p className={s.info}>
            Oops, it seems you don&apos;t have any contacts yet, add them in the
            field above!
          </p>
        )
      )}

      <div>
        {error && (
          <div className={s.error}>
            <h2
              className={s.errorText}
            >{`Unfortunately the server returns this ${error}. Please try later :(`}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;

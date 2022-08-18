import { useEffect, useState } from "react";
import Web3 from "web3";
import { CONTACT_ABI, CONTACT_ADDRESS } from "./config";
import { AbiItem } from "web3-utils";

function App() {
  const [account, setAccount] = useState<any>();
  const [contactList, setContactList] = useState<any>();
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);

      const contactList = new web3.eth.Contract(
        CONTACT_ABI as AbiItem[],
        CONTACT_ADDRESS
      );

      setContactList(contactList);
      console.log(contactList);

      const counter = await contactList.methods.count().call();

      for (var i = 1; i <= counter; i++) {
        const contact = await contactList.methods.contacts(i).call();
        setContacts((contacts) => [...contacts, contact]);
      }
    }

    load();
  }, []);

  return (
    <div>
      Your account is: {account}
      <h1>Contacts</h1>
      <ul></ul>
    </div>
  );
}

export default App;

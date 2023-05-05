import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import "../style/user.scss";
import { useAuth } from "../hooks/clientContext";
import { UserUpdatePayload } from "../types/types";
import { Navigate } from "react-router-dom";
import { setUser } from "../app/features/userSlice";
function User() {
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state: RootState) => state.user.value);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newFirstname, setNewFirstname] = useState<string>(profile?.firstName ?? "");
  const [newLastname, setNewLastname] = useState<string>(profile?.lastName ?? "");

  const handleSave = async () => {
    try {
      if (newFirstname !== "" && newLastname !== "") {
        const payload: UserUpdatePayload = {
          firstName: newFirstname,
          lastName: newLastname
        };
        const updatedUser = await auth.client.profile.update(payload);
        dispatch(setUser(updatedUser));
        setEditMode(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    setNewFirstname(profile?.firstName ?? "");
    setNewLastname(profile?.lastName ?? "");
    setEditMode(false);
  };

  if (!auth.client.isLoggedIn()) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {!editMode && (
            <>
              {profile?.firstName} {profile?.lastName}!
            </>
          )}
        </h1>
        {editMode && (
          <section className="edit-section">
            <div className="edit-inputs">
              <input
                className="edit-input"
                type="text"
                placeholder="Tony"
                value={newFirstname}
                onChange={(e) => setNewFirstname(e.target.value)}
              />
              <input
                className="edit-input"
                type="text"
                placeholder="Jarvis"
                value={newLastname}
                onChange={(e) => setNewLastname(e.target.value)}
              />
            </div>
            <div className="edit-buttons">
              <button type="button" className="edit-button reversed" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="edit-button reversed" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </section>
        )}
        {!editMode && (
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;

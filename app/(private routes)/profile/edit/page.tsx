"use client";

import css from "./EditPage.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function EditPage() {
  const router = useRouter();
  // const [user, setEditUser] = useState<User | null>(null);
  // const [userName, setUserName] = useState("");
  // const setUser = useAuthStore((state) => state.setUser);

  const { user, setUser } = useAuthStore();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getMe().then((user) => {
      setUser(user);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async () => {
    const updatedUser = await updateMe({ username: userName });
    if (user) {
      setUser(updatedUser);
    }
    router.push("/profile");
  };

  const handleCancel = () => {
    router.back();
  };

  const userNameLabel = userName.length === 0 ? user?.username : userName;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={
            user?.avatar ||
            "https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small_2x/default-avatar-profile-icon-of-social-media-user-vector.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {userNameLabel}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={handleChange}
              autoFocus
              value={userName}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

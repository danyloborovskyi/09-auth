"use client";

import css from "./EditPage.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { updateMe, getMe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { type User } from "@/types/user";
import { log } from "console";

export default function EditPage() {
  const router = useRouter();
  const [user, setEditUser] = useState<User | null>(null);
  const [userName, setUserName] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    getMe().then((user) => {
      setEditUser(user ?? null);
    });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //await updateMe({ username: userName, avatar })
    await updateMe({ username: userName });
    if (user) {
      setUser(user);
    }
    router.push("/profile");
    console.log("success");
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src="https://static.jojowiki.com/images/thumb/6/6e/latest/20210313174003/Joseph_young_BT_Infobox_Anime.png/400px-Joseph_young_BT_Infobox_Anime.png"
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSaveUser}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {userName}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={handleChange}
            />
          </div>

          <p>Email: user_email@example.com</p>

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

import css from "./Profile.module.css";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";

export default async function Profile() {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src="https://static.jojowiki.com/images/thumb/6/6e/latest/20210313174003/Joseph_young_BT_Infobox_Anime.png/400px-Joseph_young_BT_Infobox_Anime.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}

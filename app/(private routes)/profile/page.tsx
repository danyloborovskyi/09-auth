import css from "./Profile.module.css";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await getServerMe();
  return {
    title: `Profile: ${user.username}`,
    description: `Personal details of ${user.username}`,
    openGraph: {
      title: `Profile: ${user.username}`,
      description: `Personal details of ${user.username}`,
      url: `https://notehub.com/profile`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
          width: 1200,
          height: 630,
          alt: user.avatar,
        },
      ],
      type: "article",
    },
  };
}

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
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}

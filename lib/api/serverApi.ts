import { cookies } from "next/headers";
import { nextServer } from "./api";
import { type User } from "@/types/user";
import { type Note } from "@/types/note";
import { FetchNotesProps, NoteResponse } from "./clientApi";

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export async function fetchNotesServer(
  params: FetchNotesProps
): Promise<NoteResponse> {
  const cookieStore = await cookies();
  const { search, tag, page, perPage, sortBy } = params;
  const response = await nextServer.get<NoteResponse>("/notes", {
    params: {
      search: search,
      tag,
      page: page,
      perPage: perPage,
      sortBy,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  console.log("Відповідь сервера:", response.data);
  return response.data;
}

export async function fetchNoteByIdServer(id: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

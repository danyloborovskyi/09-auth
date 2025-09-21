import { nextServer } from "../api/api";
import type { User } from "@/types/user";
import type { Note, Tag } from "@/types/note";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesProps {
  search?: string;
  tag?: Tag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export async function fetchNotes(
  params: FetchNotesProps
): Promise<NoteResponse> {
  const { search, tag, page, perPage, sortBy } = params;
  const response = await nextServer.get<NoteResponse>("/notes", {
    params: {
      search: search,
      tag,
      page: page,
      perPage: perPage,
      sortBy,
    },
  });
  console.log("Відповідь сервера:", response.data);
  return response.data;
}

export type NewNote = {
  title: string;
  content: string;
  tag: string;
};

export async function createNote(newNote: NewNote): Promise<Note> {
  const response = await nextServer.post<Note>("/notes", newNote);
  return response.data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const response = await nextServer.delete<Note>(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
}

export const register = async (data: SignUpRequest) => {
  const res = await nextServer.post<User>("/auth/register", data);
  return res.data;
};

export type SignUpRequest = {
  email: string;
  password: string;
  userName: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
};

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export type UpdateUserRequest = {
  username?: string;
  photoUrl?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>("/users/me", payload);
  return res.data;
};

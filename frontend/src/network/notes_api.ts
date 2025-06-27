import { Note } from "../models/note";
import { User } from "../models/user";

//credientials: include is necessary when using CORS or cross-origin requests

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const url: RequestInfo = `${process.env.REACT_APP_BACKEND_URL}${input}`
    console.log(`fetching with ${process.env.REACT_APP_BACKEND_URL}${input}`);
    const response = await fetch(url, init);
    if(response.ok) {
        console.log("this worked")
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function getLoggedInUser(): Promise<User> {
    const response = await fetchData("/api/users", { 
        method: "GET",
        credentials: "include"
    });
    return response.json();
}

export interface SignUpCredentials {
    username: string,
    email: string,
    password: string,
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export interface LogInCredentials {
    username: string,
    password: string,
}

export async function login(credentials: LogInCredentials): Promise<User> {
    const response = await fetchData("/api/users/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

//doesn't require a body because backend alr knows the curr user
export async function logout() {
    await fetchData("/api/users/logout", {
        method: "POST",
        credentials: "include"
    });
}

export async function fetchNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", {
        method: "GET",
        credentials: "include",    
    });
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, {method: "DELETE"});
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    });
    return response.json();
}
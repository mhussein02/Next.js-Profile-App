export type Profile = { id: number; name: string; major: string; year: number; gpa: number };

export let profiles: Profile[] = [
  { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
  { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 }
];

export function findIndexById(id: number) {
  return profiles.findIndex(p => p.id === id);
}

import { Categorie } from "./Categorie.model";

export class user {
  id!: number;
  username!: string;
  password!: string;
  email!: string;
  nbTel!: number;
  role!: string;
  age!: number;
  status!: boolean;
  categorie!: Categorie; // Relation entre User et Categorie
}

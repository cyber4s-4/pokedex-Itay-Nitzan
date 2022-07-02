export class Pokemon {
  pictureSrc: string | null;
  id: number | null;
  name: string | null;
  type: string | null;
  height: string | null;
  weight: string | null;
  moves: string | null;

  constructor(name: string) {
    this.pictureSrc = null;
    this.id = null;
    this.name = name;
    this.type = null;
    this.height = null;
    this.weight = null;
    this.moves = null;
  }
}

export interface CareerNode {
  date: string;
  title: string;
  detail: string;
  meta: string;
  x: number;
  triggered: boolean;
}

export interface SceneryItem {
  x: number;
  y: number;
  size: number;
  variant: number;
}

export interface AnimalItem extends SceneryItem {
  kind: 'rabbit' | 'frog';
  phase: number;
}

export interface KeepsakeItem extends SceneryItem {
  kind:
    | 'note'
    | 'photo'
    | 'ticket'
    | 'tape'
    | 'spark'
    | 'envelope'
    | 'paper-plane'
    | 'badge'
    | 'camera'
    | 'coffee'
    | 'meal';
  phase: number;
}

export interface FlowerItem {
  x: number;
  bornAt: number;
  height: number;
  color: string;
}

export interface ParticleItem {
  kind: 'smoke' | 'burst';
  x: number;
  y: number;
  vx: number;
  vy: number;
  bornAt: number;
  life: number;
}

export interface CareerWorld {
  offset: number;
  elapsed: number;
  lastFootstep: number;
  mode: 'running' | 'rewind';
  rewindProgress: number;
  activeNode: CareerNode | null;
  activeNodeAt: number;
  nodes: CareerNode[];
  clouds: SceneryItem[];
  trees: SceneryItem[];
  birds: SceneryItem[];
  animals: AnimalItem[];
  keepsakes: KeepsakeItem[];
  flowers: FlowerItem[];
  particles: ParticleItem[];
}

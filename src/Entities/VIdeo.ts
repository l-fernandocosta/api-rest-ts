import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./Room";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: "text" })
  url: string;

  @Column({ type: "text" })
  title: string;

  @ManyToOne(() => Room, (room) => room.videos)
  @JoinColumn({ name: "room_id" })
  room: Room;
}

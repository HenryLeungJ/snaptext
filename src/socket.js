"use client";

import { io } from "socket.io-client";

export const socket = io("https://snaptextquick.vercel.app:3000");
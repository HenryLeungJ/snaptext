"use client";

import { io } from "socket.io-client";

export const socket = io("https://snaptextserver.vercel.app/");
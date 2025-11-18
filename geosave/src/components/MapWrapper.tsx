"use client";

import dynamic from "next/dynamic";

interface MapWrapperProps {
  position: [number, number];
  zoom: number;
}

const Map = dynamic(() => import("./Map"), { ssr: false });

export default function MapWrapper(props: MapWrapperProps) {
  return <Map position={props.position} zoom={props.zoom} />;
}
